import { content } from '../data/content.js'
import { ProjectArtwork } from './sections.jsx'

function Arrow({ direction = 'up' }) {
  const path = direction === 'left' ? 'M14 4 4 14m0-9v9h9' : 'M4 14 14 4m-9 0h9v9'
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d={path} /></svg>
}

export function ProjectDetailPage({ project }) {
  const detailCopy = content.copy.projectDetail

  if (!project) {
    return (
      <main className="project-detail-page project-detail-page--not-found" aria-labelledby="project-not-found-title">
        <div className="container project-detail-container">
          <span className="project-detail-kicker">{detailCopy.eyebrow}</span>
          <h1 id="project-not-found-title">{detailCopy.notFoundTitle}</h1>
          <p>{detailCopy.notFoundMessage}</p>
          <a className="button button--primary" href="/">{detailCopy.returnToPortfolio} <Arrow /></a>
        </div>
      </main>
    )
  }

  const index = content.projects.findIndex((entry) => entry.slug === project.slug)
  const previousProject = content.projects[(index - 1 + content.projects.length) % content.projects.length]
  const nextProject = content.projects[(index + 1) % content.projects.length]
  const liveUrl = project.live && !project.live.includes('example.com') ? project.live : null
  const sourceUrl = project.github && !/^https:\/\/github\.com\/?$/.test(project.github) ? project.github : null

  return (
    <main className="project-detail-page" aria-labelledby="project-detail-title">
      <div className="container project-detail-container">
        <a className="project-back-link" href="/projects/"><Arrow direction="left" /> {detailCopy.backToProjects}</a>
        <section className="project-detail-hero">
          <div className="project-detail-copy">
            <span className="project-detail-kicker">{detailCopy.eyebrow}</span>
            <p className="project-detail-index">{detailCopy.pageLabel} {project.number} <span>/</span> {String(content.projects.length).padStart(2, '0')}</p>
            <h1 id="project-detail-title">{project.title}</h1>
            <p className="project-detail-summary">{project.description}</p>
            <div className="project-placeholder-badge">{detailCopy.placeholderBadge}</div>
            {(liveUrl || sourceUrl) ? <div className="project-detail-actions">
              {liveUrl && <a className="button button--primary" href={liveUrl} target="_blank" rel="noreferrer">{content.copy.projects.liveLink} <Arrow /></a>}
              {sourceUrl && <a className="button button--outline" href={sourceUrl} target="_blank" rel="noreferrer">{content.copy.projects.githubLink} <Arrow /></a>}
            </div> : <p className="project-no-demo">Independent concept study · No live demo or public repository.</p>}
          </div>
          <div className="project-detail-art" aria-hidden="true">
            <ProjectArtwork project={project} />
          </div>
        </section>

        <section className="project-detail-overview" aria-labelledby="project-overview-title">
          <div className="project-overview-copy">
            <span className="micro-label">{detailCopy.eyebrow}</span>
            <h2 id="project-overview-title">{detailCopy.overview}</h2>
            <p>{project.description}</p>
            <p className="project-placeholder-note">{detailCopy.placeholderNote}</p>
          </div>
          <dl className="project-detail-facts">
            <div><dt>{detailCopy.category}</dt><dd>{project.category}</dd></div>
            <div><dt>{detailCopy.role}</dt><dd>{project.role}</dd></div>
            <div className="project-detail-tools"><dt>{detailCopy.builtWith}</dt><dd>{project.stack.map((tool) => (
              <span className="project-tool" key={tool}>
                {(content.technologyIcons[tool] ?? []).map((icon) => <i className={`devicon-${icon} colored`} aria-hidden="true" key={icon} />)}
                {tool}
              </span>
            ))}</dd></div>
          </dl>
        </section>

        <nav className="project-detail-pager" aria-label={detailCopy.projectPagesLabel}>
          <a href={`/projects/${previousProject.slug}/`}>
            <span className="project-pager-label"><Arrow direction="left" /> {detailCopy.previous}</span>
            <span className="project-pager-title">{previousProject.title}</span>
          </a>
          <a className="project-pager-all" href="/projects/">{detailCopy.backToProjects}</a>
          <a className="project-pager-next" href={`/projects/${nextProject.slug}/`}>
            <span className="project-pager-label">{detailCopy.next} <Arrow /></span>
            <span className="project-pager-title">{nextProject.title}</span>
          </a>
        </nav>
      </div>
    </main>
  )
}
