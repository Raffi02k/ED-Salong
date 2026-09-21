import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { reviews, reviewsStats, type Review } from "../content/reviews";
import { site } from "../content/siteContent";
import "../styles/reviews.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Stars({ rating }: { rating: number }) {
  const value = Number.isFinite(rating) ? Math.max(0, Math.min(5, rating)) : 5;

  return (
    <span
      className="reviews-stars"
      role="img"
      aria-label={`${value.toLocaleString("sv-SE")} av 5 stjärnor`}
    >
      <span aria-hidden="true">★★★★★</span>
      <span
        className="reviews-stars-fill"
        style={{ width: `${(value / 5) * 100}%` }}
        aria-hidden="true"
      >
        ★★★★★
      </span>
    </span>
  );
}

function wrapPosition(position: number, width: number) {
  return width + ((((position - width) % width) + width) % width);
}

type ReviewRowProps = {
  items: Review[];
  reverse?: boolean;
  row: number;
  paused: boolean;
  reduced: boolean;
};

function ReviewRow({
  items,
  reverse = false,
  row,
  paused,
  reduced,
}: ReviewRowProps) {
  const id = useId();
  const rail = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);

  const pointerDown = useRef(false);
  const manual = useRef(false);

  const drag = useRef<{
    x: number;
    left: number;
  } | null>(null);

  const buttonScroll = useRef<{
    from: number;
    to: number;
    started: number;
  } | null>(null);

  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  function interact() {
    buttonScroll.current = null;
    manual.current = true;
  }

  function wrap() {
    const el = rail.current;
    const width = group.current?.offsetWidth || 0;

    if (!el || reduced || !width || width < el.clientWidth) {
      return;
    }

    const previous = el.scrollLeft;
    const next = wrapPosition(previous, width);

    if (Math.abs(next - previous) > 0.5) {
      el.scrollLeft = next;
      if (drag.current) {
        drag.current.left += next - previous;
      }
    }
  }

  useEffect(() => {
    const el = rail.current;
    if (!el) return;

    buttonScroll.current = null;
    drag.current = null;
    pointerDown.current = false;
    manual.current = false;

    if (reduced) {
      el.scrollLeft = 0;
      return;
    }

    const initialWidth = group.current?.offsetWidth || 0;
    const canLoop = initialWidth >= el.clientWidth;

    el.scrollLeft = canLoop ? initialWidth + (reverse ? 150 : 0) : 0;

    let frame = 0;
    let lastTime = 0;
    let position = el.scrollLeft;
    let visible = true;

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          })
        : null;

    observer?.observe(el);

    function tick(now: number) {
      const element = rail.current;
      if (!element) return;

      const width = group.current?.offsetWidth || 0;
      const delta = lastTime ? Math.min(now - lastTime, 40) : 0;
      lastTime = now;

      const movement = buttonScroll.current;
      const canLoop = width > 0 && width >= element.clientWidth;

      if (movement) {
        const progress = Math.min(
          1,
          Math.max(0, (now - movement.started) / 420),
        );
        const eased = 1 - Math.pow(1 - progress, 3);
        position = movement.from + (movement.to - movement.from) * eased;

        if (canLoop) {
          position = wrapPosition(position, width);
        }

        element.scrollLeft = position;

        if (progress === 1) {
          buttonScroll.current = null;
          manual.current = false;
          position = element.scrollLeft;
        }
      } else if (
        canLoop &&
        visible &&
        !document.hidden &&
        !pausedRef.current &&
        !pointerDown.current &&
        !drag.current
      ) {
        if (manual.current) {
          position = element.scrollLeft;
          manual.current = false;
        }

        const speed = reverse ? 0.027 : 0.03;
        const direction = reverse ? -1 : 1;

        position += direction * delta * speed;
        position = wrapPosition(position, width);

        element.scrollLeft = position;
      } else {
        position = element.scrollLeft;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      buttonScroll.current = null;
    };
  }, [items, reverse, reduced]);

  function scroll(direction: number) {
    const el = rail.current;
    if (!el) return;

    interact();
    wrap();

    const offset = direction * el.clientWidth * 0.72;

    if (reduced) {
      el.scrollLeft += offset;
      return;
    }

    buttonScroll.current = {
      from: el.scrollLeft,
      to: el.scrollLeft + offset,
      started: performance.now(),
    };
  }

  const orderedItems = reverse ? [...items].reverse() : items;
  const copies = reduced ? [0] : [0, 1, 2];

  return (
    <div className="reviews-row">
      <div
        ref={rail}
        id={id}
        className="reviews-rail"
        tabIndex={0}
        role="region"
        aria-label={`Omdömen rad ${row + 1}. Svep eller använd pilarna.`}
        onWheel={() => {
          interact();
          wrap();
        }}
        onKeyDown={() => {
          interact();
          wrap();
        }}
        onScroll={() => {
          if (manual.current && !buttonScroll.current) {
            wrap();
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          pointerDown.current = true;
          interact();

          if (event.pointerType === "mouse") {
            drag.current = {
              x: event.clientX,
              left: event.currentTarget.scrollLeft,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const distance = event.clientX - drag.current.x;
          event.currentTarget.scrollLeft = drag.current.left - distance;
          interact();
        }}
        onPointerUp={() => {
          pointerDown.current = false;
          drag.current = null;
          wrap();
        }}
        onPointerCancel={() => {
          pointerDown.current = false;
          drag.current = null;
          wrap();
        }}
        onLostPointerCapture={() => {
          pointerDown.current = false;
          drag.current = null;
          wrap();
        }}
      >
        <div className="reviews-track">
          {copies.map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? group : undefined}
              className="reviews-group"
              aria-hidden={copy === (reduced ? 0 : 1) ? undefined : true}
            >
              {orderedItems.map((review) => (
                <article className="reviews-card" key={`${copy}-${review.id}`}>
                  <div className="reviews-card-top">
                    <Stars rating={review.rating} />
                    {review.source && (
                      <span className="reviews-source">{review.source}</span>
                    )}
                  </div>

                  <blockquote>“{review.text}”</blockquote>

                  <div className="reviews-person">
                    <strong>{review.name}</strong>
                    <span>{review.service || "Kund på Österlånggatan"}</span>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="reviews-controls">
          <span>Rad {row + 1} · Dra eller svep</span>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={`Scrolla rad ${row + 1} åt vänster`}
            aria-controls={id}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={`Scrolla rad ${row + 1} åt höger`}
            aria-controls={id}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export type ReviewsSectionProps = {
  customReviews?: Review[];
  title?: string;
  subtitle?: string;
  showFooter?: boolean;
};

export function ReviewsRail({
  customReviews,
  title = "En känsla som sitter kvar.",
  subtitle,
  showFooter = true,
}: ReviewsSectionProps) {
  const headingId = useId();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const items = customReviews || reviews;

  if (!items.length) return null;

  return (
    <section className="reviews-widget" aria-labelledby={headingId}>
      <div className="wrap reviews-heading">
        <p className="reviews-eyebrow">Kundomdömen · Trollhättan</p>
        <div className="reviews-header-flex">
          <div>
            <h2 id={headingId}>{title}</h2>
            {subtitle && (
              <p className="note" style={{ margin: "14px 0 0" }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="reviews-score-badge">
            <span className="reviews-score-number">
              {reviewsStats.average.toFixed(1)}
            </span>
            <div className="reviews-score-meta">
              <Stars rating={reviewsStats.average} />
              <span className="reviews-score-label">
                {reviewsStats.total} nöjda omdömen
              </span>
            </div>
          </div>
        </div>

        {!reduced && (
          <button
            type="button"
            className="reviews-pause"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            {paused
              ? "▶ Starta automatisk scroll"
              : "⏸ Pausa automatisk scroll"}
          </button>
        )}
      </div>

      <div className="reviews-rows">
        {[false, true].map((reverse, row) => (
          <ReviewRow
            key={row}
            items={items}
            reverse={reverse}
            row={row}
            paused={paused}
            reduced={reduced}
          />
        ))}
      </div>

      {showFooter && (
        <footer className="reviews-footer wrap">
          <Link to="/recensioner">
            Läs fler omdömen <span>↗</span>
          </Link>
        </footer>
      )}
    </section>
  );
}

export const ReviewsSection = ReviewsRail;
