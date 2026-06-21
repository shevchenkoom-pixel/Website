import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Link2,
  Mail,
  Network,
  Sparkles,
  Target,
} from "lucide-react";

const career = [
  {
    company: "GroupBWT",
    role: "Lead Upwork Researcher",
    period: "May 2025 - Present",
    location: "Kyiv, Ukraine",
    summary:
      "Driving client acquisition on Upwork through strategic bidding, profile optimization, performance tracking, automation, and personalized lead engagement.",
  },
  {
    company: "Host Service",
    role: "Lead Generation Specialist",
    period: "March 2025 - Present",
    location: "Kyiv, Ukraine",
    summary:
      "Building outbound infrastructure across SEO, SMM, domain setup, email warm-up, cold outreach strategy, templates, testing, and campaign analytics.",
  },
  {
    company: "9 Lives Metrics",
    role: "Lead Generation Specialist",
    period: "September 2024 - March 2026",
    location: "Remote",
    summary:
      "Owned market research, domain configuration, cold outreach systems, hypothesis testing, lead generation, and reporting on campaign performance.",
  },
  {
    company: "Freelance",
    role: "Lead Generation Specialist",
    period: "July 2022 - December 2023",
    location: "Kyiv, Ukraine",
    summary:
      "Delivered lead generation programs with market research, personalized email and LinkedIn outreach, cold strategy, and campaign tracking.",
  },
  {
    company: "CIENCE",
    role: "Core Data Researcher",
    period: "2020 - 2022",
    location: "Remote",
    summary:
      "Developed a strong research foundation in B2B data quality, targeting, segmentation, and structured prospect intelligence.",
  },
];

const capabilities = [
  "Upwork acquisition strategy",
  "Personalized bidding systems",
  "Cold email and LinkedIn outreach",
  "Lead research and segmentation",
  "Domain setup and email warm-up",
  "Pipeline reporting and analytics",
  "Pipedrive workflow discipline",
  "AI-assisted automation with Claude Code",
];

const portfolioLinks = [
  {
    title: "LinkedIn Profile",
    text: "Professional background, certifications, and current roles.",
    href: "https://www.linkedin.com/in/oleksii-shevchenko-53a66723b",
    icon: Link2,
  },
  {
    title: "Profile PDF",
    text: "Source resume exported from LinkedIn.",
    href: "/Profile.pdf",
    icon: BriefcaseBusiness,
  },
  {
    title: "Email",
    text: "Direct contact for collaborations and opportunities.",
    href: "mailto:alex.m.shevchenko@gmail.com",
    icon: Mail,
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Oleksii Shevchenko home">
          <span>OS</span>
          Oleksii Shevchenko
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#career">Career</a>
          <a href="#portfolio">Portfolio</a>
          <a className="nav-cta" href="mailto:alex.m.shevchenko@gmail.com">
            Contact
          </a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} /> B2B growth, Upwork acquisition, outreach systems
          </p>
          <h1>Oleksii Shevchenko</h1>
          <p className="lead">
            Lead Upwork Researcher and Lead Generation Specialist building
            measurable outbound systems for client acquisition, pipeline growth,
            and high-quality business conversations.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#portfolio">
              View portfolio <ArrowUpRight size={18} />
            </a>
            <a className="secondary-button" href="mailto:alex.m.shevchenko@gmail.com">
              Start a conversation
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Growth operating dashboard">
          <div className="panel-top">
            <span>Growth System</span>
            <strong>Lead quality index</strong>
          </div>
          <div className="metric-grid">
            <div>
              <BarChart3 size={22} />
              <strong>Analytics</strong>
              <span>campaign metrics</span>
            </div>
            <div>
              <Target size={22} />
              <strong>Targeting</strong>
              <span>market research</span>
            </div>
            <div>
              <Network size={22} />
              <strong>Outreach</strong>
              <span>email and LinkedIn</span>
            </div>
          </div>
          <div className="pipeline">
            <span style={{ width: "92%" }} />
            <span style={{ width: "74%" }} />
            <span style={{ width: "84%" }} />
          </div>
        </div>
      </section>

      <section id="about" className="section two-column">
        <div>
          <p className="section-kicker">About me</p>
          <h2>Strategic researcher with a revenue-first operating mindset.</h2>
        </div>
        <div className="body-copy">
          <p>
            I combine analytical research, proactive communication, and repeatable
            outbound processes to help teams find the right prospects, open the
            right conversations, and improve win rates over time.
          </p>
          <p>
            My work spans Upwork profile optimization, personalized bidding,
            cold outreach strategy, market research, email infrastructure,
            campaign reporting, and AI-assisted tooling for faster iteration.
          </p>
        </div>
      </section>

      <section className="section capabilities">
        <div className="section-heading">
          <p className="section-kicker">Core strengths</p>
          <h2>Built for enterprise-style pipeline execution.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <div className="capability" key={item}>
              <CheckCircle2 size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="career" className="section">
        <div className="section-heading">
          <p className="section-kicker">Career journey</p>
          <h2>From data research to full-cycle growth operations.</h2>
        </div>
        <div className="timeline">
          {career.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.role}`}>
              <div>
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p>{item.company} · {item.location}</p>
              </div>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="section portfolio">
        <div className="section-heading">
          <p className="section-kicker">Portfolio links</p>
          <h2>Professional profile and contact points.</h2>
        </div>
        <div className="portfolio-grid">
          {portfolioLinks.map(({ title, text, href, icon: Icon }) => (
            <a
              className="portfolio-card"
              href={href}
              key={title}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon size={24} />
              <strong>{title}</strong>
              <span>{text}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
