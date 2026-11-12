"use client";

import { ArrowDownRight, ArrowUpRight, Check, ExternalLink, Loader2, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { CSSProperties, FormEvent, useCallback, useEffect, useRef, useState } from "react";

type SequenceProfile = {
  count: number;
  directory: string;
  key: "desktop" | "mobile";
  avifDirectory?: string;
};

const sequenceProfiles: Record<SequenceProfile["key"], SequenceProfile> = {
  desktop: { count: 120, directory: "/hero/sequence-v2/desktop", key: "desktop" },
  mobile: {
    count: 72,
    directory: "/hero/sequence-v2/mobile",
    key: "mobile",
    avifDirectory: "/hero/sequence-v2/mobile-avif"
  }
};

// Un AVIF de 1x1 para preguntarle al navegador si sabe decodificarlo. En movil
// los mismos cuadros pesan 36% menos en AVIF y ademas quedan mas fieles al
// video original, pero Safari solo lo admite desde iOS 16, asi que el perfil
// WebP se mantiene como respaldo.
const AVIF_DE_PRUEBA =
  "data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAG1pZjFhdmlmbWlhZgAAANZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAD6AAEAAAAAAAAAFwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAVmlwcnAAAAA4aXBjbwAAAAxhdjFDgSACAAAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAAAfbWRhdBIACgc4AAYQENBpMgofkD///8QAAK/u";

const phoneHref = "https://wa.me/56992891678";

const projects = [
  ["Columba Boutique", "Identidad y vitrina digital para una boutique.", "https://www.columbaboutique.com/"],
  ["Ecommerce Ferreteria", "Catalogo digital de ferreteria, simple de recorrer.", "https://catalogo-distribuidora-oriente.vercel.app/"],
  ["Marco Iglesias", "Servicios, experiencia y divulgacion en IA.", "https://marcoiglesias.cl/"],
  ["Marca Visible", "Una propuesta digital con identidad propia.", "https://marca-visible.vercel.app/"]
] as const;

const posts = [
  ["IA en empresas", "OpenAI", "https://openai.com/index/how-the-world-is-putting-chatgpt-to-work/"],
  ["Seguridad y agentes", "Anthropic", "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals"],
  ["Modelos y decisiones", "Vercel", "https://vercel.com/blog/ai-gateway-production-index-july-2026"]
] as const;

type FormState = { name: string; email: string; whatsapp: string; message: string };

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type FrameTask = {
  index: number;
  resolve: (image: HTMLImageElement | null) => void;
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

// Las capas del scrollytelling se superponen y solo se separan por opacidad.
// Una capa con opacity 0 sigue siendo clicable, asi que el panel de proyectos
// invisible se quedaba con los toques de los botones del hero. Se apaga el
// puntero junto con la opacidad para que solo reciba clics lo que se ve.
function capaVisible(opacity: number): CSSProperties {
  return { opacity, pointerEvents: opacity < 0.05 ? "none" : "auto" };
}

function getFrameSource(profile: SequenceProfile, index: number, avif = false) {
  const boundedIndex = Math.max(0, Math.min(profile.count - 1, index));
  const numero = String(boundedIndex + 1).padStart(3, "0");
  return avif && profile.avifDirectory
    ? `${profile.avifDirectory}/frame-${numero}.avif`
    : `${profile.directory}/frame-${numero}.webp`;
}

function useAvifSupport() {
  const [soportado, setSoportado] = useState<boolean | null>(null);

  useEffect(() => {
    const prueba = new window.Image();
    prueba.onload = () => setSoportado(prueba.width > 0);
    prueba.onerror = () => setSoportado(false);
    prueba.src = AVIF_DE_PRUEBA;
  }, []);

  return soportado;
}

class ProgressiveFrameLoader {
  private active = 0;
  private activeIndexes = new Set<number>();
  private cache = new Map<number, Promise<HTMLImageElement | null>>();
  private disposed = false;
  private queue: FrameTask[] = [];
  private wanted = new Set<number>();

  constructor(
    private readonly profile: SequenceProfile,
    private readonly avif: boolean,
    private readonly concurrency = 4
  ) {}

  updateWindow(indexes: number[]) {
    this.wanted = new Set(indexes);
    const retainedQueue: FrameTask[] = [];

    this.queue.forEach((task) => {
      if (this.wanted.has(task.index)) retainedQueue.push(task);
      else {
        this.cache.delete(task.index);
        task.resolve(null);
      }
    });
    this.queue = retainedQueue;

    this.cache.forEach((_, index) => {
      if (!this.wanted.has(index) && !this.activeIndexes.has(index)) this.cache.delete(index);
    });
  }

  load(index: number, priority = false) {
    if (index < 0 || index >= this.profile.count || this.disposed) return Promise.resolve(null);
    const cached = this.cache.get(index);
    if (cached) return cached;

    let resolveTask: (image: HTMLImageElement | null) => void = () => undefined;
    const promise = new Promise<HTMLImageElement | null>((resolve) => {
      resolveTask = resolve;
    });
    const task = { index, resolve: resolveTask };
    this.cache.set(index, promise);
    if (priority) this.queue.unshift(task);
    else this.queue.push(task);
    this.pump();
    return promise;
  }

  dispose() {
    this.disposed = true;
    this.queue.forEach((task) => task.resolve(null));
    this.queue = [];
    this.cache.clear();
    this.wanted.clear();
  }

  private pump() {
    while (!this.disposed && this.active < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      if (!task) return;
      this.active += 1;
      this.activeIndexes.add(task.index);
      const image = new window.Image();
      image.decoding = "async";

      const finish = (loadedImage: HTMLImageElement | null) => {
        this.active -= 1;
        this.activeIndexes.delete(task.index);
        if (!this.wanted.has(task.index)) this.cache.delete(task.index);
        task.resolve(loadedImage);
        this.pump();
      };

      image.onload = () => {
        image.decode().catch(() => undefined).then(() => finish(image));
      };
      image.onerror = () => {
        this.cache.delete(task.index);
        finish(null);
      };
      image.src = getFrameSource(this.profile, task.index, this.avif);
    }
  }
}

function useSequenceProfile() {
  const [profileKey, setProfileKey] = useState<SequenceProfile["key"] | null>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const narrowViewport = window.matchMedia("(max-width: 767px)");
    const update = () => {
      const mobileDevice = coarsePointer.matches || navigator.maxTouchPoints > 0 || narrowViewport.matches;
      setProfileKey(mobileDevice ? "mobile" : "desktop");
    };
    update();
    coarsePointer.addEventListener("change", update);
    narrowViewport.addEventListener("change", update);
    return () => {
      coarsePointer.removeEventListener("change", update);
      narrowViewport.removeEventListener("change", update);
    };
  }, []);

  return profileKey ? sequenceProfiles[profileKey] : null;
}

function FrameSequence({ profile, avif, progress }: { profile: SequenceProfile; avif: boolean; progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const desiredIndexRef = useRef(-1);
  const lastImageRef = useRef<HTMLImageElement | null>(null);
  const loaderRef = useRef<ProgressiveFrameLoader | null>(null);
  const [ready, setReady] = useState(false);

  const drawImage = useCallback((image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || image.naturalWidth === 0 || image.naturalHeight === 0) return;
    const bounds = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const outputWidth = Math.max(1, Math.round(bounds.width * pixelRatio));
    const outputHeight = Math.max(1, Math.round(bounds.height * pixelRatio));
    if (canvas.width !== outputWidth || canvas.height !== outputHeight) {
      canvas.width = outputWidth;
      canvas.height = outputHeight;
    }
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const scale = Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.drawImage(image, (bounds.width - width) / 2, (bounds.height - height) / 2, width, height);
    lastImageRef.current = image;
  }, []);

  useEffect(() => {
    const loader = new ProgressiveFrameLoader(profile, avif);
    loaderRef.current = loader;
    desiredIndexRef.current = -1;
    lastImageRef.current = null;
    return () => {
      loader.dispose();
      if (loaderRef.current === loader) loaderRef.current = null;
    };
  }, [avif, profile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      if (lastImageRef.current) drawImage(lastImageRef.current);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [drawImage]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    const index = Math.round(progress * (profile.count - 1));
    if (desiredIndexRef.current === index) return;
    desiredIndexRef.current = index;
    const offsets = [0, 1, 2, 3, 4, 5, 6, 8, 10, -1, -2, -3];
    const windowIndexes = offsets
      .map((offset) => index + offset)
      .filter((candidate) => candidate >= 0 && candidate < profile.count);
    loader.updateWindow(windowIndexes);
    windowIndexes.forEach((frameIndex, order) => {
      loader.load(frameIndex, order === 0).then((image) => {
        if (!image || loaderRef.current !== loader || desiredIndexRef.current !== frameIndex) return;
        drawImage(image);
        if (canvasRef.current) canvasRef.current.dataset.frame = String(frameIndex + 1);
        setReady(true);
      });
    });
  }, [drawImage, profile, progress]);

  return (
    <>
      <canvas ref={canvasRef} className="story-frame" aria-hidden="true" />
      <div className={`story-frame-loader${ready ? " story-frame-loader--ready" : ""}`} aria-hidden="true">
        <span>Preparando experiencia</span>
        <i />
      </div>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", whatsapp: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const whatsappFallback = `${phoneHref}?text=${encodeURIComponent([
    "Hola, quiero coordinar la asesoria gratuita de 30 minutos.",
    form.name.trim() ? `Nombre: ${form.name.trim()}` : "",
    form.email.trim() ? `Correo: ${form.email.trim()}` : "",
    form.whatsapp.trim() ? `WhatsApp: ${form.whatsapp.trim()}` : "",
    form.message.trim() ? `Mensaje: ${form.message.trim()}` : ""
  ].filter(Boolean).join("\n"))}`;

  const update = (field: keyof FormState) => (event: { target: { value: string } }) => {
    if (status === "error") setStatus("idle");
    setError("");
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const fail = (reason: string) => {
    setError(reason);
    setStatus("error");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.message.trim()) return fail("Escribe tu nombre y un mensaje breve.");
    if (!form.email.trim() && !form.whatsapp.trim()) return fail("Deja un correo o un WhatsApp para poder responderte.");
    if (!consent) return fail("Marca la autorizacion para que pueda contactarte.");

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          message: form.message,
          consent,
          company: trap,
          elapsedMs: openedAt.current ? Date.now() - openedAt.current : 0
        })
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fallback?: string }
        | null;
      if (!response.ok || !payload?.ok) {
        return fail(payload?.error ?? "No pudimos registrar tu mensaje. Puedes escribirme por WhatsApp.");
      }
      if (payload.fallback === "whatsapp") {
        window.location.href = whatsappFallback;
        return;
      }
      setStatus("sent");
    } catch {
      fail("Se cayo la conexion antes de enviar. Puedes reintentar o escribirme por WhatsApp.");
    }
  };

  if (status === "sent") {
    return (
      <div className="story-form__sent" role="status">
        <p className="story-form__sent-title">
          <Check aria-hidden="true" /> Mensaje recibido
        </p>
        <p>Te escribo personalmente para coordinar los 30 minutos.</p>
        <a className="story-link" href={whatsappFallback} target="_blank" rel="noreferrer">
          Adelantarlo por WhatsApp <MessageCircle aria-hidden="true" />
        </a>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="story-form" onSubmit={submit} noValidate>
      <input aria-label="Nombre" autoComplete="name" placeholder="Nombre" required disabled={sending} value={form.name} onChange={update("name")} />
      <input aria-label="Correo" autoComplete="email" type="email" placeholder="Correo" disabled={sending} value={form.email} onChange={update("email")} />
      <input aria-label="WhatsApp" autoComplete="tel" type="tel" inputMode="tel" placeholder="WhatsApp" disabled={sending} value={form.whatsapp} onChange={update("whatsapp")} />
      <textarea aria-label="Mensaje" placeholder="Cuentame brevemente en que te puedo ayudar" required disabled={sending} value={form.message} onChange={update("message")} />
      <div aria-hidden="true" className="story-form__trap">
        <label htmlFor="contacto-empresa">Empresa</label>
        <input id="contacto-empresa" name="company" tabIndex={-1} autoComplete="off" value={trap} onChange={(event) => setTrap(event.target.value)} />
      </div>
      <label className="story-form__consent">
        <input type="checkbox" checked={consent} disabled={sending} onChange={(event) => { if (status === "error") setStatus("idle"); setError(""); setConsent(event.target.checked); }} />
        <span>Autorizo a SurInnovacion a usar estos datos solo para responder esta consulta.</span>
      </label>
      {error ? <p className="story-form__error" role="alert">{error}</p> : null}
      <div className="story-form__actions">
        <button type="submit" className="story-link" disabled={sending}>
          {sending ? <>Enviando <Loader2 className="story-form__spin" aria-hidden="true" /></> : <>Solicitar asesoria gratuita <Send aria-hidden="true" /></>}
        </button>
        {status === "error" ? (
          <a className="story-link" href={whatsappFallback} target="_blank" rel="noreferrer">
            Escribir por WhatsApp <MessageCircle aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </form>
  );
}

export function ScrollytellingLandingV2() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const profile = useSequenceProfile();
  const avifSoportado = useAvifSupport();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let restoreTimer = 0;
    let preservedProgress: number | null = null;
    let landscape = window.innerWidth > window.innerHeight;

    const update = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const bounds = scene.getBoundingClientRect();
      const distance = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const nextProgress = reducedMotion ? 1 : clamp(-bounds.top / distance);
      progressRef.current = nextProgress;
      setProgress((current) => Math.abs(current - nextProgress) > 0.001 ? nextProgress : current);
    };

    const requestUpdate = () => {
      if (preservedProgress !== null) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    };

    const restoreOrientationProgress = () => {
      const scene = sceneRef.current;
      if (!scene || preservedProgress === null) return;
      const savedProgress = preservedProgress;
      const distance = Math.max(scene.offsetHeight - window.innerHeight, 1);
      window.scrollTo({ top: scene.offsetTop + distance * savedProgress, behavior: "auto" });
      preservedProgress = null;
      update();
    };

    const handleResize = () => {
      const nextLandscape = window.innerWidth > window.innerHeight;
      if (nextLandscape !== landscape && preservedProgress === null) {
        preservedProgress = progressRef.current;
        landscape = nextLandscape;
      }
      if (preservedProgress !== null) {
        window.clearTimeout(restoreTimer);
        restoreTimer = window.setTimeout(() => {
          requestAnimationFrame(() => requestAnimationFrame(restoreOrientationProgress));
        }, 180);
        return;
      }
      requestUpdate();
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(restoreTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const moveToNarrativeStation = () => {
      if (window.location.hash === "#contacto") {
        const contact = document.getElementById("contacto");
        if (contact) window.scrollTo({ top: contact.offsetTop, behavior: "smooth" });
        return;
      }
      if (window.location.hash === "#blog") {
        const blog = document.getElementById("blog");
        if (blog) window.scrollTo({ top: blog.offsetTop, behavior: "smooth" });
        return;
      }
      if (window.location.hash !== "#proyectos") return;
      const scene = sceneRef.current;
      if (!scene) return;
      const distance = Math.max(scene.offsetHeight - window.innerHeight, 1);
      window.scrollTo({ top: scene.offsetTop + distance * 0.84, behavior: "smooth" });
    };
    moveToNarrativeStation();
    window.addEventListener("hashchange", moveToNarrativeStation);
    return () => window.removeEventListener("hashchange", moveToNarrativeStation);
  }, []);

  const renderedProgress = reducedMotion ? 1 : progress;
  const introOpacity = reducedMotion ? 1 : clamp((0.27 - progress) / 0.07);
  const cityOpacity = reducedMotion ? 0 : clamp(Math.min((progress - 0.27) / 0.07, (0.72 - progress) / 0.07));
  const futureOpacity = reducedMotion ? 0 : clamp(Math.min((progress - 0.6) / 0.07, (0.94 - progress) / 0.07));
  const projectsOpacity = reducedMotion ? 1 : clamp(Math.min((progress - 0.76) / 0.07, (0.94 - progress) / 0.04));
  const contactProfile = profile ?? sequenceProfiles.mobile;
  const contactFrameSource = getFrameSource(contactProfile, contactProfile.count - 1);

  return (
    <>
      <section ref={sceneRef} id="hero" className="story-scene">
        <div className="story-sticky">
          {profile && avifSoportado !== null ? (
            <FrameSequence
              key={`${profile.key}-${avifSoportado ? "avif" : "webp"}`}
              profile={profile}
              avif={avifSoportado}
              progress={renderedProgress}
            />
          ) : (
            <>
              <canvas className="story-frame" aria-hidden="true" />
              <div className="story-frame-loader" aria-hidden="true"><span>Preparando experiencia</span><i /></div>
            </>
          )}
          <div className="story-shade" />
          <div className="story-copy story-copy--intro" style={capaVisible(introOpacity)}>
            <p>Marco Iglesias · Master y divulgador de Inteligencia Artificial</p>
            <h1>Inteligencia artificial para tu empresa.</h1>
            <p className="story-intro-lede">IA, sitios web, plataformas y CRM. Asesoria gratuita de 30 minutos.</p>
            <div className="story-hero-actions">
              <a href="#proyectos">Ver proyectos <ArrowDownRight aria-hidden="true" /></a>
              <a href={`${phoneHref}?text=${encodeURIComponent("Hola, quiero coordinar la asesoria gratuita de 30 minutos.")}`} target="_blank" rel="noreferrer">Asesoria gratuita <MessageCircle aria-hidden="true" /></a>
            </div>
          </div>
          <div className="story-copy story-copy--city" style={capaVisible(cityOpacity)}>
            <p>Puerto Montt · Chile</p>
            <h2>Automatizacion e IA para empresas del sur de Chile.</h2>
          </div>
          <div className="story-copy story-copy--future" style={capaVisible(futureOpacity)}>
            <p>SurInnovacion</p>
            <h2>Puerto Montt, hacia adelante.</h2>
          </div>
          <span id="proyectos" className="story-anchor story-anchor--projects" aria-hidden="true" />
          <section className="story-hologram story-hologram--projects" style={capaVisible(projectsOpacity)} aria-label="Proyectos">
            <h2>Proyectos de IA y automatizacion</h2>
            <div className="story-projects">{projects.map(([name, description, href]) => <a key={name} href={href} target="_blank" rel="noreferrer"><span><strong>{name}</strong><small>{description}</small></span><ArrowUpRight aria-hidden="true" /></a>)}</div>
          </section>
        </div>
      </section>
      <section id="blog" className="story-outro">
        <div className="story-outro-stage">
          <Image className="story-outro-frame" src="/sections/fundador-bahia-marco-v3.png" alt="Marco Iglesias frente a la bahia de Puerto Montt" fill sizes="100vw" quality={82} />
          <div className="story-outro-shade" />
          <div className="story-outro-intro">
            <p>Blog Tech</p>
            <h2>Divulgacion de IA para decidir mejor.</h2>
            <h3>La innovacion ya no es opcional.</h3>
            <p className="story-outro-description">La IA ya esta cambiando como las empresas venden, atienden, automatizan y crecen.</p>
          </div>
          <section className="story-hologram story-hologram--blog" aria-label="Blog Tech">
            <h3>Blog Tech</h3>
            <div className="story-sources">{posts.map(([title, source, href]) => <a key={title} href={href} target="_blank" rel="noreferrer"><span>{title}</span><small>{source}</small><ExternalLink aria-hidden="true" /></a>)}</div>
          </section>
        </div>
      </section>
      <section id="contacto" className="story-contact-stage">
        <Image className="story-contact-frame" src={contactFrameSource} alt="" fill unoptimized aria-hidden="true" />
        <div className="story-contact-shade" />
        <div className="story-contact-copy">
          <p>Contacto</p>
          <h2>Agenda tu asesoria gratuita de 30 minutos.</h2>
        </div>
        <section className="story-hologram story-hologram--contact" aria-label="Formulario de contacto">
          <h3>Cuentame de tu empresa</h3>
          <ContactForm />
        </section>
      </section>
    </>
  );
}
