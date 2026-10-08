import { education, experience, profile, projects, skills, volunteering } from '@/data/resume';
import Projects from '@/components/Projects';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <>
      <nav>
        <div className="in">
          <a className="logo" href="#top">{profile.handle}</a>
          <ul>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="tools">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="wrap" id="top">
        <header className="hero">
          <span className="badge"><span className="dot" />{profile.status}</span>
          <h1>{profile.name}.<br /><span>{profile.headline}</span></h1>
          <p className="lede">{profile.intro}</p>
          <div className="cta">
            <a className="btn pri" href="#work">See selected work</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </header>

        <section id="experience">
          <h2>Experience</h2>
          {experience.map((j) => (
            <div className="job" key={j.period + j.title}>
              <div className="when">{j.period}</div>
              <div>
                <h3>{j.title}</h3>
                <div className="co">{j.company} · {j.location}</div>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </section>

        <section id="work">
          <h2>Selected work</h2>
          <Projects projects={projects} />
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group} style={{ display: 'contents' }}>
                <dt>{s.group}</dt>
                <dd>{s.items.map((i) => <span className="chip" key={i}>{i}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="education">
          <h2>Education</h2>
          <div className="edu-list">
            {education.map((e) => (
              <div className="edu" key={e.degree}>
                <div>
                  <strong>{e.degree}</strong>
                  <div className="co">{e.school}</div>
                </div>
                <div className="when">{e.period}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="volunteering">
          <h2>Volunteering</h2>
          <ul className="vol">
            {volunteering.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </section>

        <footer id="contact">
          <span>{profile.email}</span>
          <span className="links">
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
          </span>
        </footer>
      </div>
    </>
  );
}
