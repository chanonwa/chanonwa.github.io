import { education, experience, profile, projects, skills } from '@/data/resume';
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
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="tools">
            <ThemeToggle />
            <a className="btn pri" href={profile.resumePdf}>Resume PDF</a>
          </div>
        </div>
      </nav>

      <div className="wrap" id="top">
        <header className="hero">
          <span className="badge"><span className="dot" />{profile.status}</span>
          <h1>{profile.name}.<br /><span>{profile.headline}</span></h1>
          <p className="lede">{profile.intro}</p>
          <div className="cta">
            <a className="btn pri" href="#projects">View projects</a>
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
                <div className="co">{j.company}</div>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </section>

        <section id="projects">
          <h2>Projects</h2>
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

        <section>
          <h2>Education</h2>
          {education.map((e) => (
            <div className="edu" key={e.degree}>
              <div>
                <strong>{e.degree}</strong>
                <div style={{ color: 'var(--mut)', fontSize: 14 }}>{e.school}</div>
              </div>
              <div className="when">{e.period}</div>
            </div>
          ))}
        </section>

        <footer id="contact">
          <span>{profile.email}</span>
          <span className="links">
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.resumePdf}>Resume.pdf</a>
          </span>
        </footer>
      </div>
    </>
  );
}
