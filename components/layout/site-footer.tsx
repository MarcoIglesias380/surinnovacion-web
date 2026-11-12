import Image from "next/image";
import Link from "next/link";

const phoneHref = "https://wa.me/56992891678";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-midnight">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-9 px-5 py-14 text-center sm:flex-row sm:text-left">
        <Link href="/#hero" className="brand-lockup flex items-center gap-3" aria-label="Volver al inicio">
            <span className="brand-mark brand-mark--icon relative grid h-16 w-16 shrink-0 place-items-center overflow-visible sm:h-20 sm:w-20">
              <Image
                src="/brand/isotipo2.png"
                alt="Isotipo SurInnovacion"
                fill
                sizes="(min-width: 640px) 80px, 64px"
                className="brand-isotype-img object-contain"
              />
            </span>
            <span className="brand-wordmark brand-wordmark--footer relative h-14 w-[min(58vw,280px)] overflow-visible sm:h-16 sm:w-[320px]" aria-label="SurInnovacion">
              <Image
                src="/brand/surinnovacion-wordmark-2.png"
                alt="Nombre SurInnovacion"
                fill
                sizes="(min-width: 640px) 320px, 58vw"
                className="brand-wordmark-img object-contain"
              />
            </span>
        </Link>
        <div className="space-y-2 text-sm leading-6 text-frost/56">
          <a href={phoneHref} target="_blank" rel="noreferrer" className="block transition hover:text-ion">+56 9 9289 1678</a>
          <p>Valle Volcanes, Puerto Montt, Chile</p>
          <p>Creado por Marco Iglesias &amp; SurInnovacion</p>
          <p>© 2026 SurInnovacion</p>
        </div>
      </div>
    </footer>
  );
}
