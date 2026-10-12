'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Job } from '@/data/resume';

// The roles as a rising staircase, oldest on the left, so growth reads at a glance.
// Select a step to read what was done in that role. The latest role is open to begin with.
export default function CareerPath({ jobs }: { jobs: Job[] }) {
  // Oldest first, so the steps rise from left to right.
  const steps = [...jobs].sort((a, b) => a.start - b.start || a.end - b.end);
  const [selected, setSelected] = useState(steps.length - 1);

  return (
    <div>
      <div className="steps">
        {steps.map((j, i) => {
          const years = j.end - j.start;
          return (
            <button
              key={j.period + j.title}
              type="button"
              className={`step${selected === i ? ' on' : ''}`}
              style={{ '--i': i } as CSSProperties}
              aria-pressed={selected === i}
              aria-controls="career-detail"
              onClick={() => setSelected(i)}
            >
              <span className="step-period">
                {j.period}
                {years > 0 ? ` · ${years} yrs` : ''}
              </span>
              <span className="step-title">{j.title}</span>
              <span className="step-co">{j.company}</span>
            </button>
          );
        })}
      </div>

      {/* Every role's panel sits in the same grid cell, so the panel never changes size when you switch. */}
      <div className="rpanels" id="career-detail">
        {steps.map((j, i) => (
          <div key={j.period + j.title} className={`rdetail${selected === i ? ' on' : ''}`} aria-hidden={selected !== i}>
            <h3>{j.title}</h3>
            <div className="co">{j.company} · {j.location} · {j.period}</div>
            <ul>
              {j.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
