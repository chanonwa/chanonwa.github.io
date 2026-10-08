'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/resume';

export default function Projects({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  // Once a card has finished expanding, scroll just enough to bring all of it into view.
  // Waiting for the 0.3s expand transition means the card has its final height by then.
  useEffect(() => {
    if (open === null) return;
    const card = cards.current[open];
    if (!card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(
      () => card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }),
      reduce ? 0 : 320,
    );
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <div className="grid">
      {projects.map((p, i) => {
        const isOpen = open === i;
        const hasVisual = Boolean(p.image || p.stat);
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
              aria-controls={`project-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
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
            <div className="more" id={`project-${i}`}>
              <div>
                <div className={`detail${hasVisual ? '' : ' solo'}`}>
                  {p.image ? (
                    <div className="shot">
                      <img src={p.image} alt={`${p.name} screenshot`} />
                    </div>
                  ) : (
                    p.stat && (
                      <div className="shot stat">
                        <strong>{p.stat.value}</strong>
                        <span>{p.stat.label}</span>
                      </div>
                    )
                  )}
                  <div>
                    <div className="meta"><span>{p.role}</span><span>{p.year}</span></div>
                    <p>{p.description}</p>
                    <ul>
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    {(p.liveUrl || p.sourceUrl) && (
                      <div className="links">
                        {p.liveUrl && <a className="btn pri" href={p.liveUrl}>Live site</a>}
                        {p.sourceUrl && <a className="btn" href={p.sourceUrl}>Source</a>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
