import Link from 'next/link';
import { ArrowRight, Box, FileSearch, Gavel, Github, Layers, Linkedin, MessageSquareText, Presentation, TrendingUp } from 'lucide-react';
import { EVENT_NAME, TEAM, TEAM_NAME, TEAM_PHOTO, type TeamMember } from './team';
import './landing.css';

const FEATURES = [
  { icon: MessageSquareText, title: 'Customer signals', text: 'Thousands of feedback rows and new Reddit comments are categorised into unmet needs, with each quotation traceable to its original row.' },
  { icon: FileSearch, title: 'Document intelligence', text: 'Ask questions of the G60 option list, scope documents and keynote. Answers cite the page they came from.' },
  { icon: Box, title: '3D G60 model', text: 'See problems on the car itself: affected parts light up on an interactive model, next to the requirement list.' },
  { icon: TrendingUp, title: 'Successor & market trends', text: 'Successor brief, USPs with adjustable cost estimates and a market trend register for the next generation.' },
  { icon: Gavel, title: 'Decisions & audit', text: 'Approve, edit or reject requirements with a rationale. Every revision lands in a tamper-evident audit trail.' },
  { icon: Presentation, title: 'Executive export', text: 'Export approved requirements and their sources as a board-ready PowerPoint deck.' },
];

const STACK = [
  { group: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Three.js', 'Sketchfab API'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'SQLite'] },
  { group: 'Data & AI', items: ['OpenAI', 'Retrieval-augmented generation', 'pdfplumber', 'openpyxl', 'Reddit collector'] },
  { group: 'Delivery', items: ['python-pptx', 'Playwright', 'Vercel', 'Render'] },
];

const STEPS = [
  { n: '01', title: 'Collect', text: 'Import supplied feedback, catalogues and documents, and pull fresh customer comments from Reddit.' },
  { n: '02', title: 'Understand', text: 'Map every statement to a vehicle area and rank customer needs against a fixed denominator.' },
  { n: '03', title: 'Decide', text: 'Review evidence, record PM decisions with a rationale and export the result for leadership.' },
];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join('');
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="lp-member">
      <div className="lp-photo">
        {member.photo ? <img src={member.photo} alt={member.name} loading="lazy" /> : <span aria-hidden="true">{initials(member.name)}</span>}
      </div>
      <h3>{member.name}</h3>
      <p className="lp-role">{member.role}</p>
      {member.bio && <p className="lp-bio">{member.bio}</p>}
      {member.stack.length > 0 && (
        <ul className="lp-tags" aria-label={`${member.name}'s tech stack`}>
          {member.stack.map(s => <li key={s}>{s}</li>)}
        </ul>
      )}
      {(member.linkedin || member.github) && (
        <div className="lp-links">
          {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin size={16} /></a>}
          {member.github && <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}><Github size={16} /></a>}
        </div>
      )}
    </article>
  );
}

export function Landing() {
  return (
    <div className="lp">
      <header className="lp-nav">
        <a href="#top" className="lp-brand">
          <img src="/bmw-roundel.svg" alt="" width={30} height={30} />
          <span>BMW <strong>Pitstop</strong></span>
        </a>
        <nav aria-label="Sections">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#stack">Tech stack</a>
          <a href="#team">Team</a>
        </nav>
        <Link href="/cockpit" className="lp-btn lp-btn-small">Open app</Link>
      </header>

      <main id="top">
        <section className="lp-hero">
          <p className="lp-eyebrow">{EVENT_NAME} · G60 product planning</p>
          <h1>Customer evidence to product decisions, in one place.</h1>
          <p className="lp-lead">
            BMW Pitstop is a product manager&apos;s cockpit for the BMW 5 Series (G60). It turns customer feedback,
            Reddit discussions and internal documents into ranked, traceable requirements, so the next model is
            shaped by what drivers actually say.
          </p>
          <div className="lp-cta">
            <Link href="/cockpit" className="lp-btn">Launch the app <ArrowRight size={18} /></Link>
            <a href="#team" className="lp-btn lp-btn-ghost">Meet the team</a>
          </div>
          <dl className="lp-stats">
            <div><dt>Customer records</dt><dd>4,000+</dd></div>
            <div><dt>Workspaces</dt><dd>11</dd></div>
            <div><dt>Models compared</dt><dd>G60 · F70 · G70</dd></div>
          </dl>
        </section>

        <section id="features" className="lp-section">
          <p className="lp-eyebrow">What it does</p>
          <h2>Everything a PM needs for the next-generation brief</h2>
          <div className="lp-grid lp-grid-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="lp-card">
                <Icon size={22} className="lp-card-icon" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="lp-section">
          <p className="lp-eyebrow">How it works</p>
          <h2>From raw feedback to a board deck</h2>
          <ol className="lp-steps">
            {STEPS.map(s => (
              <li key={s.n}>
                <span className="lp-step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="stack" className="lp-section">
          <p className="lp-eyebrow">Tech stack</p>
          <h2>How we built it</h2>
          <div className="lp-grid lp-grid-4">
            {STACK.map(({ group, items }) => (
              <article key={group} className="lp-card">
                <Layers size={20} className="lp-card-icon" aria-hidden="true" />
                <h3>{group}</h3>
                <ul className="lp-tags">{items.map(i => <li key={i}>{i}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="lp-section">
          <p className="lp-eyebrow">{TEAM_NAME}</p>
          <h2>The people behind Pitstop</h2>
          <figure className="lp-team-photo">
            <img src={TEAM_PHOTO} alt={`${TEAM_NAME} at the ${EVENT_NAME}`} width={1280} height={690} />
            <figcaption>{TEAM_NAME} at the {EVENT_NAME}, hosted with TUM.ai.</figcaption>
          </figure>
          <div className="lp-grid lp-grid-team">
            {TEAM.map(m => <MemberCard key={m.name} member={m} />)}
          </div>
        </section>

        <section className="lp-final">
          <h2>See it on real G60 data</h2>
          <p>Explore needs, trace quotations to their source and record a decision in a few clicks.</p>
          <Link href="/cockpit" className="lp-btn">Launch the app <ArrowRight size={18} /></Link>
        </section>
      </main>

      <footer className="lp-footer">
        <span>BMW Pitstop · {TEAM_NAME} · {EVENT_NAME}</span>
        <span>Hackathon prototype. Requirements, costs and mappings are unverified demonstration outputs.</span>
      </footer>
    </div>
  );
}
