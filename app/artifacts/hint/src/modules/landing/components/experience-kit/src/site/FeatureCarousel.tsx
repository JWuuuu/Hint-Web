import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import "./feature-carousel.css";

export interface FeatureSlide {
  id: string;
  /** Short uppercase eyebrow, e.g. "Animal tarot". */
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  /** Where the CTA points (Wouter <Link href> or anchor). */
  href: string;
  /** The right-hand visual for this slide. */
  visual: ReactNode;
  /** Accent used for the eyebrow + ambient wash. Default gold. */
  accent?: "gold" | "aqua" | "rose";
}

export interface FeatureCarouselProps {
  slides: FeatureSlide[];
  /** Autoplay interval ms. 0 disables. Default 5200. */
  autoPlayMs?: number;
  /** Render the CTA as your router Link. Default <a>. */
  renderCta?: (slide: FeatureSlide) => ReactNode;
}

/**
 * Public landing "feature tour" — a premium horizontal ad carousel.
 * Swipe / arrows / clickable story-progress segments / autoplay that
 * pauses on hover + drag. This is a *showcase* of Hint's features, not
 * the real draw — keep the live ritual surfaces in src/product.
 *
 * Idiomatic React: the track is positioned with a CSS transform keyed off
 * `index`, and CSS handles the eased slide. Drag offset is applied inline
 * during the gesture only.
 */
export function FeatureCarousel({
  slides,
  autoPlayMs = 5200,
  renderCta,
}: FeatureCarouselProps) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 of the current slide
  const [drag, setDrag] = useState(0); // px during an active gesture
  const paused = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const viewport = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      setIndex((next + n) % n);
      setProgress(0);
    },
    [n],
  );

  // autoplay via progress accumulation (pauses on hover / drag)
  useEffect(() => {
    if (autoPlayMs <= 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const step = 50;
    const id = window.setInterval(() => {
      if (paused.current || dragging.current) return;
      setProgress((p) => {
        const np = p + step / autoPlayMs;
        if (np >= 1) {
          setIndex((i) => (i + 1) % n);
          return 0;
        }
        return np;
      });
    }, step);
    return () => clearInterval(id);
  }, [autoPlayMs, n]);

  // pointer drag / swipe
  const onPointerDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    paused.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    setDrag(e.clientX - startX.current);
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    const threshold = 56;
    if (drag <= -threshold) go(index + 1);
    else if (drag >= threshold) go(index - 1);
    dragging.current = false;
    paused.current = false;
    setDrag(0);
  };

  const width = viewport.current?.clientWidth ?? 0;
  const offset = -index * width + drag;

  return (
    <section
      className="hint-fc"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="hint-fc__bar">
        <span className="hint-fc__tour">Feature tour</span>
        <span className="hint-fc__count">
          {String(index + 1).padStart(2, "0")} · {slides[index].eyebrow}
        </span>
      </div>

      <div className="hint-fc__progress">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="hint-fc__seg"
            aria-label={`Go to ${s.eyebrow}`}
            onClick={() => go(i)}
          >
            <span
              className="hint-fc__fill"
              style={{ transform: `scaleX(${i < index ? 1 : i > index ? 0 : progress})` }}
            />
          </button>
        ))}
      </div>

      <div
        className="hint-fc__viewport"
        ref={viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="hint-fc__track"
          style={{
            transform: `translateX(${offset}px)`,
            transition: dragging.current ? "none" : "transform 0.6s cubic-bezier(.6,.05,.2,1)",
          }}
        >
          {slides.map((slide) => (
            <article key={slide.id} className={`hint-fc__slide accent-${slide.accent ?? "gold"}`}>
              <div className="hint-fc__wash" aria-hidden />
              <div className="hint-fc__copy">
                <span className="hint-fc__eyebrow">{slide.eyebrow}</span>
                <h2 className="hint-fc__title">{slide.title}</h2>
                <p className="hint-fc__body">{slide.body}</p>
                {renderCta ? (
                  renderCta(slide)
                ) : (
                  <a className="hint-fc__cta" href={slide.href}>
                    {slide.ctaLabel} <span aria-hidden>→</span>
                  </a>
                )}
              </div>
              <div className="hint-fc__visual">{slide.visual}</div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="hint-fc__arrow hint-fc__arrow--prev"
        aria-label="Previous"
        onClick={() => go(index - 1)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button
        type="button"
        className="hint-fc__arrow hint-fc__arrow--next"
        aria-label="Next"
        onClick={() => go(index + 1)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </section>
  );
}
