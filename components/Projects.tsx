'use client';

import { useEffect, useRef, useState } from 'react';
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

  // After the panel has opened, scroll the page so the row and panel sit in the middle of the window.
  // Waiting 0.3s for the open transition means the panel has its final height by then.
  useEffect(() => {
    if (open === null) return;
    const timer = window.setTimeout(
      () => {
        const row = rail.current;
        const box = panel.current;
        if (!row || !box) return;
        const nav = document.querySelector('nav');
        const navH = nav ? nav.getBoundingClientRect().height : 69;
        const visible = window.innerHeight - navH;
        const middle = (navH + window.innerHeight) / 2; // centre of the area below the nav
        const rowTop = row.getBoundingClientRect().top;
        const b = box.getBoundingClientRect();
        let delta: number;
        if (b.bottom - rowTop <= visible - 32) {
          delta = (rowTop + b.bottom) / 2 - middle; // row and panel both fit: centre them together
        } else if (b.height <= visible - 32) {
          delta = (b.top + b.bottom) / 2 - middle; // only the panel fits: centre the panel
        } else {
          delta = b.top - navH - 16; // taller than the window: put its top just under the nav
        }
        window.scrollBy({ top: delta, behavior: scrollBehavior() });
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

      <div className="rail" ref={rail}>
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
