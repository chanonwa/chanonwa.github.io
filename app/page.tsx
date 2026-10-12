import { experience, highlights, profile, projects, skills } from '@/data/resume';
import Timeline from '@/components/Timeline';
import Highlights from '@/components/Highlights';
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
          </div>
        </div>
      </nav>

      <div className="wrap" id="top">
        <header className="hero">
          <span className="badge"><span className="dot" />{profile.status}</span>
          <h1>{profile.name}.<br /><span>{profile.headline}</span></h1>
          <p className="lede">{profile.intro}</p>
          <div className="cta">
            <a className="btn pri" href="#experience">See experience</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </header>

        <section id="experience">
          <h2>Experience</h2>
          <Highlights id="highlights" title="Key results" items={highlights} />
          <h3 className="sub sub-roles">Roles</h3>
          <Timeline jobs={experience} />
        </section>

        <section id="projects">
          <Projects id="projects" title="Projects" items={projects} />
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
