'use client';

import { useState } from 'react';
import type { Project } from '@/data/resume';

export default function Projects({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid">
      {projects.map((p, i) => {
        const isOpen = open === i;
        return (
          <article key={p.name} className={`proj${isOpen ? ' open' : ''}`}>
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
                <div className="detail">
                  <div className="shot" role="img" aria-label={`${p.name} screenshot`}>
                    {p.image ? <img src={p.image} alt="" /> : 'screenshot placeholder'}
                  </div>
                  <div>
                    <div className="meta"><span>{p.role}</span><span>{p.year}</span></div>
                    <p>{p.description}</p>
                    <ul>
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div className="links">
                      {p.liveUrl && <a className="btn pri" href={p.liveUrl}>Live site</a>}
                      {p.sourceUrl && <a className="btn" href={p.sourceUrl}>Source</a>}
                    </div>
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
