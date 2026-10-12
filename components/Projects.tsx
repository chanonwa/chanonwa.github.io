'use client';

import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { Project } from '@/data/resume';

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export default function Projects({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // The panel keeps the last project's text while it slides closed.
  const [shown, setShown] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  // Drag the row sideways with a mouse. Touch screens already scroll it natively.
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, id: -1 });

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const row = rail.current;
    if (!row || e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: row.scrollLeft, id: e.pointerId };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const row = rail.current;
    if (!row || !d.active || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 5) return; // a small wobble is still a click
      d.moved = true;
      setDragging(true);
      try {
        row.setPointerCapture(e.pointerId); // keep following the mouse outside the row
      } catch {}
    }
    row.scrollLeft = d.startScroll - dx;
  }

  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;
    d.active = false;
    if (d.moved) setDragging(false);
  }

  // A drag that ends over a card must not also open it.
  function onClickCapture(e: ReactMouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  function nudge(dir: 1 | -1) {
    // One card (260px) plus the 16px gap.
    rail.current?.scrollBy({ left: dir * 276, behavior: scrollBehavior() });
  }

  function toggle(i: number) {
    if (open === i) {
      setOpen(null);
      return;
    }
    setOpen(i);
    setShown(i);

    // Slide the row sideways if the chosen card is cut off at either edge.
    const row = rail.current;
    const card = cards.current[i];
    if (!row || !card) return;
    const r = row.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const dx = c.left < r.left ? c.left - r.left : c.right > r.right ? c.right - r.right : 0;
    if (dx !== 0) row.scrollBy({ left: dx, behavior: scrollBehavior() });
  }

  // After the panel has opened, move the page only as far as needed to show all of it.
  // The clicked card stays where it is unless the panel would otherwise run off the bottom,
  // and the page never moves far enough to push that card up under the nav.
  // Waiting 0.3s for the open transition means the panel has its final height by then.
  useEffect(() => {
    if (open === null) return;
    const timer = window.setTimeout(
      () => {
        const card = cards.current[open];
        const box = panel.current;
        if (!card || !box) return;
        const nav = document.querySelector('nav');
        const navH = nav ? nav.getBoundingClientRect().height : 69;
        const topLimit = navH + 12;
        const bottomLimit = window.innerHeight - 12;
        const needDown = box.getBoundingClientRect().bottom - bottomLimit;
        if (needDown <= 0) return; // the whole panel is already in view
        const room = card.getBoundingClientRect().top - topLimit; // how far the card can rise
        const delta = Math.min(needDown, Math.max(room, 0));
        if (delta > 0) window.scrollBy({ top: delta, behavior: scrollBehavior() });
      },
      scrollBehavior() === 'auto' ? 0 : 320,
    );
    return () => window.clearTimeout(timer);
  }, [open]);

  const current = projects[shown];
  const hasVisual = Boolean(current?.image || current?.stat);

  return (
    <div>
      <div className="sec-head">
        <h2>Projects</h2>
        <div className="rail-btns">
          <button className="rail-btn" type="button" aria-label="Scroll projects left" onClick={() => nudge(-1)}>
            ←
          </button>
          <button className="rail-btn" type="button" aria-label="Scroll projects right" onClick={() => nudge(1)}>
            →
          </button>
        </div>
      </div>

      <div
        className={`rail${dragging ? ' dragging' : ''}`}
        ref={rail}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={onClickCapture}
      >
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <article
              key={p.name}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`proj${isOpen ? ' open' : ''}`}
            >
              <button
                className="proj-head"
                type="button"
                aria-expanded={isOpen}
                aria-controls="project-detail"
                onClick={() => toggle(i)}
              >
                <div
                  className={`thumb ${p.image ? 'img' : p.variant === 'a' ? '' : (p.variant ?? '')}`}
                  style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
                />
                <div className="body">
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <span className="cue" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </article>
          );
        })}
      </div>

      <div className={`more${open !== null ? ' open' : ''}`} id="project-detail" ref={panel}>
        <div>
          {current && (
            <div className={`detail${hasVisual ? '' : ' solo'}`}>
              {current.image ? (
                <div className="shot">
                  <img src={current.image} alt={`${current.name} screenshot`} />
                </div>
              ) : (
                current.stat && (
                  <div className="shot stat">
                    <strong>{current.stat.value}</strong>
                    <span>{current.stat.label}</span>
                  </div>
                )
              )}
              <div>
                <h3>{current.name}</h3>
                <div className="meta"><span>{current.role}</span><span>{current.year}</span></div>
                <p>{current.description}</p>
                <ul>
                  {current.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {(current.liveUrl || current.sourceUrl) && (
                  <div className="links">
                    {current.liveUrl && <a className="btn pri" href={current.liveUrl}>Live site</a>}
                    {current.sourceUrl && <a className="btn" href={current.sourceUrl}>Source</a>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
