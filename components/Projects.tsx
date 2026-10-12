'use client';

import { useState } from 'react';
import type { Project } from '@/data/resume';

// Image-led project cards. The screenshot and links are always visible; "Details" opens the longer text.
export default function Projects({ id, title, items }: { id: string; title: string; items: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <h2>{title}</h2>

      <div className="pgrid">
        {items.map((p, i) => {
          const isOpen = open === i;
          const panelId = `${id}-${i}-more`;
          return (
            <article key={p.name} className="pcard">
              {p.image ? (
                <div className="pshot">
                  <img src={p.image} alt={`${p.name} screenshot`} />
                </div>
              ) : (
                p.stat && (
                  <div className="pshot stat">
                    <strong>{p.stat.value}</strong>
                    <span>{p.stat.label}</span>
                  </div>
                )
              )}

              <div className="pbody">
                <h3>{p.name}</h3>
                <div className="meta"><span>{p.role}</span><span>{p.year}</span></div>
                <p>{p.summary}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>

                <div className="pactions">
                  {p.liveUrl && (
                    <a className="btn pri" href={p.liveUrl} target="_blank" rel="noopener">Live site</a>
                  )}
                  {p.sourceUrl && (
                    <a className="btn" href={p.sourceUrl} target="_blank" rel="noopener">Source</a>
                  )}
                  <button
                    className="ptoggle"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {isOpen ? 'Hide details' : 'Details'}
                  </button>
                </div>

                <div className={`more${isOpen ? ' open' : ''}`} id={panelId}>
                  <div>
                    <div className="pdetail">
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
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
