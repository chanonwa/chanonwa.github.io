import type { Job } from '@/data/resume';

// Career at a glance: one row per role on a shared year axis.
// A role whose start equals its end is drawn as a dot, so no duration is implied for it.
// The details for each role are in the timeline below, so this chart is hidden from screen readers.
export default function CareerChart({ jobs }: { jobs: Job[] }) {
  const first = Math.min(...jobs.map((j) => j.start));
  const last = Math.max(...jobs.map((j) => j.end));
  const span = Math.max(last - first, 1);
  const pct = (year: number) => ((year - first) / span) * 100;
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i);

  return (
    <div className="career" aria-hidden="true">
      <div className="career-axis">
        <span />
        <div className="career-ticks">
          {years.map((y, i) => (
            <span
              key={y}
              className={i % 2 === 1 ? 'odd' : undefined}
              style={{
                left: `${pct(y)}%`,
                transform: i === 0 ? 'none' : i === years.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      {jobs.map((j) => {
        const length = j.end - j.start;
        return (
          <div className="career-row" key={j.period + j.title}>
            <span className="career-label">{j.short}</span>
            <div className="career-track" style={{ backgroundSize: `${100 / span}% 100%` }}>
              {length > 0 ? (
                <span
                  className="career-bar"
                  style={{ left: `${pct(j.start)}%`, width: `${(length / span) * 100}%` }}
                >
                  {length} {length === 1 ? 'yr' : 'yrs'}
                </span>
              ) : (
                <>
                  <span className="career-dot" style={{ left: `${pct(j.start)}%` }} />
                  <span className="career-note" style={{ left: `${pct(j.start)}%` }}>{j.period}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
