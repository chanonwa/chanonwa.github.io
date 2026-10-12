'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/resume';

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

// KPI tiles: every result is visible at once, and the chosen one opens its details in a panel underneath.
export default function Highlights({ id, title, items }: { id: string; title: string; items: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // The panel keeps the last tile's text while it slides closed.
  const [shown, setShown] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLElement | null)[]>([]);

  // After the panel has opened, move the page only as far as needed to show all of it,
  // and never far enough to push the clicked tile up under the nav.
  // Waiting 0.3s for the open transition means the panel has its final height by then.
  useEffect(() => {
    if (open === null) return;
    const timer = window.setTimeout(
      () => {
        const tile = tiles.current[open];
        const box = panel.current;
        if (!tile || !box) return;
        const nav = document.querySelector('nav');
        const navH = nav ? nav.getBoundingClientRect().height : 69;
        const topLimit = navH + 12;
        const bottomLimit = window.innerHeight - 12;
        const needDown = box.getBoundingClientRect().bottom - bottomLimit;
        if (needDown <= 0) return; // the whole panel is already in view
        const room = tile.getBoundingClientRect().top - topLimit; // how far the tile can rise
        const delta = Math.min(needDown, Math.max(room, 0));
        if (delta > 0) window.scrollBy({ top: delta, behavior: scrollBehavior() });
      },
      scrollBehavior() === 'auto' ? 0 : 320,
    );
    return () => window.clearTimeout(timer);
  }, [open]);

  function toggle(i: number) {
    if (open === i) {
      setOpen(null);
      return;
    }
    setOpen(i);
    setShown(i);
  }

  return (
    <div>
      <h3 className="sub">{title}</h3>

      <div className="tiles">
        {items.map((p, i) => {
          const isOpen = open === i;
          return (
            <button
              key={p.name}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              className={`tile${isOpen ? ' open' : ''}`}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${id}-detail`}
              onClick={() => toggle(i)}
            >
              {p.stat && <span className="tile-value">{p.stat.value}</span>}
              {p.stat && <span className="tile-label">{p.stat.label}</span>}
              <span className="tile-name">{p.name}</span>
              <span className="cue" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
          );
        })}
      </div>

      <div className={`more${open !== null ? ' open' : ''}`} id={`${id}-detail`} ref={panel}>
        <div>
          {/* Every tile's panel sits in the same grid cell, so they all take the height of the tallest. */}
          <div className="panels">
            {items.map((p, i) => (
              <div key={p.name} className={`detail${shown === i ? ' on' : ''}`} aria-hidden={shown !== i}>
                <div>
                  <h3>{p.name}</h3>
                  <div className="meta"><span>{p.role}</span><span>{p.year}</span></div>
                  <p>{p.description}</p>
                  {p.highlights.length > 0 && (
                    <ul>
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
