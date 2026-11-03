import { NextResponse } from "next/server";

type LeadRequest = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  message?: unknown;
  consent?: unknown;
  company?: unknown;
  elapsedMs?: unknown;
};

type Lead = {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  source: string;
  receivedAt: string;
};

const limits = { name: 120, email: 160, whatsapp: 40, message: 2000 };
const minimumElapsedMs = 2000;

function asTrimmedString(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(lead: Lead) {
  const rows: [string, string][] = [
    ["Nombre", lead.name],
    ["Correo", lead.email || "no indicado"],
    ["WhatsApp", lead.whatsapp || "no indicado"],
    ["Recibido", lead.receivedAt]
  ];
  const html = [
    "<h2>Nueva solicitud de asesoria</h2>",
    "<table cellpadding=\"6\" style=\"border-collapse:collapse\">",
    ...rows.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`),
    "</table>",
    "<h3>Mensaje</h3>",
    `<p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>`
  ].join("");
  const text = [
    "Nueva solicitud de asesoria",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Mensaje:",
    lead.message
  ].join("\n");
  return { html, text };
}

async function storeLead(lead: Lead) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { attempted: false, ok: false, detail: "almacen no configurado" };

  const table = process.env.LEADS_TABLE || "leads";
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email || null,
        whatsapp: lead.whatsapp || null,
        message: lead.message,
        source: lead.source,
        received_at: lead.receivedAt
      })
    });
    if (!response.ok) {
      return { attempted: true, ok: false, detail: `almacen respondio ${response.status}` };
    }
    return { attempted: true, ok: true, detail: "almacenado" };
  } catch (error) {
    return { attempted: true, ok: false, detail: `almacen fallo: ${String(error)}` };
  }
}

async function notifyLead(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !to || !from) return { attempted: false, ok: false, detail: "correo no configurado" };

  const { html, text } = buildEmail(lead);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((value) => value.trim()).filter(Boolean),
        reply_to: lead.email || undefined,
        subject: `Asesoria IA: ${lead.name}`,
        html,
        text
      })
    });
    if (!response.ok) {
      return { attempted: true, ok: false, detail: `correo respondio ${response.status}` };
    }
    return { attempted: true, ok: true, detail: "notificado" };
  } catch (error) {
    return { attempted: true, ok: false, detail: `correo fallo: ${String(error)}` };
  }
}

export async function POST(request: Request) {
  let body: LeadRequest;
  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud invalida." }, { status: 400 });
  }

  if (asTrimmedString(body.company, 80)) {
    return NextResponse.json({ ok: true, channels: [] });
  }

  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (elapsedMs > 0 && elapsedMs < minimumElapsedMs) {
    return NextResponse.json({ ok: true, channels: [] });
  }

  const name = asTrimmedString(body.name, limits.name);
  const email = asTrimmedString(body.email, limits.email);
  const whatsapp = asTrimmedString(body.whatsapp, limits.whatsapp);
  const message = asTrimmedString(body.message, limits.message);

  if (!name || !message) {
    return NextResponse.json({ ok: false, error: "Escribe tu nombre y un mensaje breve." }, { status: 422 });
  }
  if (email && !looksLikeEmail(email)) {
    return NextResponse.json({ ok: false, error: "Revisa el correo que escribiste." }, { status: 422 });
  }
  if (!email && !whatsapp) {
    return NextResponse.json(
      { ok: false, error: "Deja un correo o un WhatsApp para poder responderte." },
      { status: 422 }
    );
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "Necesitamos tu autorizacion para contactarte." },
      { status: 422 }
    );
  }

  const lead: Lead = {
    name,
    email,
    whatsapp,
    message,
    source: "landing-contacto",
    receivedAt: new Date().toISOString()
  };

  const [stored, notified] = await Promise.all([storeLead(lead), notifyLead(lead)]);

  const lost = !stored.ok && !notified.ok;
  const unconfigured = !stored.attempted && !notified.attempted;
  console.log(
    JSON.stringify({
      event: "lead",
      receivedAt: lead.receivedAt,
      name: lead.name,
      stored: stored.detail,
      notified: notified.detail,
      ...(lost ? { email: lead.email, whatsapp: lead.whatsapp, message: lead.message } : {})
    })
  );

  if (unconfigured) {
    return NextResponse.json({ ok: true, channels: [], fallback: "whatsapp" });
  }

  if (lost) {
    return NextResponse.json(
      { ok: false, error: "No pudimos registrar tu mensaje. Escribenos por WhatsApp y te respondemos igual." },
      { status: 502 }
    );
  }

  const channels = [stored.ok ? "almacen" : null, notified.ok ? "correo" : null].filter(Boolean);
  return NextResponse.json({ ok: true, channels });
}
