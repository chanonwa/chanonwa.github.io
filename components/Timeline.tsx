import type { Job } from '@/data/resume';

// The roles on a vertical timeline, newest first. Static: everything is visible and there is nothing to click.
export default function Timeline({ jobs }: { jobs: Job[] }) {
  return (
    <ol className="vtl">
      {jobs.map((j, i) => (
        <li className={`vrole${i === 0 ? ' latest' : ''}`} key={j.period + j.title}>
          {/* The dates sit beside the line on wide screens and above the title on phones. */}
          <div className="vwhen" aria-hidden="true">{j.period}</div>
          <div className="vline" aria-hidden="true" />
          <div className="vbody">
            <div className="vwhen-inline">{j.period}</div>
            <h3>{j.title}</h3>
            <div className="co">{j.company} · {j.location}</div>
            <ul>
              {j.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
