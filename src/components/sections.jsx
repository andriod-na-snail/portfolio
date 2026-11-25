import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content.js'
import { BrandMark } from './BrandMark.jsx'
import { HeroLanyard } from './HeroLanyard.jsx'

function KineticTitle({ children, className = '' }) {
  const words = String(children).split(' ')
  return (
    <span className={`kinetic-title ${className}`} aria-label={children}>
      <span className="sr-only">{children}</span>
      <span className="kinetic-visual" aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span className="kinetic-word" key={`${word}-${wordIndex}`}>
            {Array.from(word).map((char, index) => (
              <span className="kinetic-char" key={`${char}-${index}`}>{char}</span>
            ))}
            {wordIndex < words.length - 1 && <span className="kinetic-space">&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  )
}

function SectionHead({ index, eyebrow, title, note }) {
  return (
    <div className="section-head" data-wipe>
      <div className="section-head__meta">
        <span className="section-index">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="section-title" data-kinetic>
        <KineticTitle>{title}</KineticTitle>
      </h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function ArrowUpRight() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M5 4h9v9" /></svg>
}

export function Hero({ reducedMotion }) {
  const [firstName, ...lastName] = content.name.split(' ')
  return (
    <section id="hero" className="hero section-anchor" aria-labelledby="hero-title">
      <HeroLanyard reducedMotion={reducedMotion} />
      <div className="hero-topline">
        <span className="eyebrow">{content.copy.hero.stamp}</span>
        <span className="hero-availability"><i /> {content.copy.hero.availability}</span>
      </div>
      <div className="hero-content">
        <div className="hero-kicker" data-reveal>
          <span className="jb-mark" aria-hidden="true"><BrandMark /></span>
          <span>{content.copy.hero.kicker}<br />{content.location.replace(', Philippines', '').toUpperCase()}</span>
        </div>
        <h1 id="hero-title" className="hero-name" data-kinetic>
          <KineticTitle>{firstName}</KineticTitle><br />
          <KineticTitle className="hero-name__accent">{lastName.join(' ')}.</KineticTitle>
        </h1>
        <div className="hero-bottom">
          <div className="hero-role" data-reveal>
            <span className="micro-label">{content.copy.hero.roleLabel}</span>
            <p>{content.role}</p>
          </div>
          <p className="hero-tagline" data-reveal>{content.tagline}</p>
          <div className="hero-actions" data-reveal>
            <a className="button button--primary" data-magnetic href="/projects">{content.copy.hero.viewWork} <ArrowUpRight /></a>
            <a className="button button--outline" data-magnetic href="/contact">{content.copy.hero.contact} <ArrowUpRight /></a>
          </div>
        </div>
      </div>
      <div className="hero-side-note" aria-hidden="true"><span>{content.copy.hero.scrollCue}</span><span className="hero-side-line" /></div>
      <div className="hero-index" aria-hidden="true"><span>JB—001</span><span>0{String(content.projects.length).padStart(1, '0')} : 0{String(content.projects.length).padStart(1, '0')}</span></div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="about section section-anchor" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index={content.copy.about.index} eyebrow={content.copy.about.eyebrow} title={content.copy.about.title} note={content.copy.about.note} />
        <div className="about-layout">
          <div className="about-manifesto" data-reveal>
            <span className="micro-label">{content.copy.about.fieldNotes}</span>
            <p>{content.copy.about.manifestoFirst}<br /><span>{content.copy.about.manifestoSecond}</span></p>
            <div className="about-stamp"><span>{content.copy.about.basedIn}</span><strong>{content.copy.about.region}</strong><span>{content.copy.about.coordinates}</span></div>
          </div>
          <div className="about-copy">
            {content.about.map((paragraph, index) => <p key={paragraph} data-reveal data-delay={index * 90}>{paragraph}</p>)}
            <div className="about-facts" data-reveal>
              <span className="micro-label">{content.copy.about.currentlyInto}</span>
              <span>{content.copy.about.interests.map((interest, index) => <span key={interest}>{index > 0 && <b>·</b>}{interest}</span>)}</span>
            </div>
          </div>
        </div>
        <div className="stats-row" aria-label="Portfolio statistics">
          {content.stats.map((stat, index) => (
            <div className="stat" key={stat.label} data-reveal data-count={stat.value} data-delay={index * 100}>
              <strong><span className="stat-number">0</span><span>{stat.suffix}</span></strong>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="about-bottom-rule"><svg viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 15h1000" /></svg></div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="skills section section-anchor" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead index={content.copy.skills.index} eyebrow={content.copy.skills.eyebrow} title={content.copy.skills.title} note={content.copy.skills.note} />
        <div className="skills-layout">
          <div className="skills-intro" data-reveal>
            <div className="skills-orbit" aria-hidden="true"><span /><span /><span /><b>JB</b></div>
            <p>{content.copy.skills.intro}</p>
          </div>
          <div className="skill-groups">
            {content.skills.map((group) => (
              <div className="skill-group" key={group.group} data-reveal>
                <div className="skill-group__head"><span>{group.number}</span><h3>{group.group}</h3><span className="skill-count">{String(group.items.length).padStart(2, '0')} ITEMS</span></div>
                <div className="skill-chips">
                  {group.items.map((skill, index) => {
                    const icons = content.technologyIcons[skill] ?? []
                    return <span className="skill-chip" key={skill} style={{ '--chip-index': index }}>
                      {icons.length > 0 && <span className="skill-chip__icons" aria-hidden="true">{icons.map((icon) => <i className={`devicon-${icon} colored`} key={icon} />)}</span>}
                      <span className="skill-chip__label">{skill}</span><i className="skill-chip__arrow" aria-hidden="true">↗</i>
                    </span>
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectArtwork({ project }) {
  return (
    <div className={`project-art project-art--${project.theme}`} aria-hidden="true">
      <span className="art-coordinates">0{project.number} / {content.copy.projects.conceptFrame}</span>
      <div className="art-grid"><span /><span /><span /><span /></div>
      <div className="art-object">
        <i /><i /><i />
        <b>{project.theme === 'coffee' ? 'DRIP' : project.theme === 'road' ? 'OPEN' : project.theme === 'counter' ? 'POS' : project.theme === 'recall' ? 'RECALL' : 'M.'}</b>
      </div>
      <span className="art-annotation">{content.copy.projects.designStudy}</span>
    </div>
  )
}

export function ProjectsDirectory() {
  const categories = ['ALL', ...new Set(content.projects.map((project) => project.category))]
  const [activeCategory, setActiveCategory] = useState('ALL')
  const visibleProjects = activeCategory === 'ALL'
    ? content.projects
    : content.projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="project-directory section section-anchor" aria-labelledby="project-directory-title">
      <div className="container">
        <div className="project-directory__heading">
          <div className="section-head__meta">
            <span className="section-index">{content.copy.projects.index}</span>
            <span className="eyebrow">{content.copy.projects.eyebrow}</span>
          </div>
          <div className="project-directory__title-row">
            <h1 id="project-directory-title" className="project-directory__title">Selected<br />work<span>.</span></h1>
            <p className="project-directory__intro">A closer look at digital concepts shaped around useful systems, clear interfaces, and thoughtful details.</p>
          </div>
          <div className="project-directory__toolbar">
            <div className="project-directory__filters" role="group" aria-label="Filter projects by category">
              {categories.map((category) => (
                <button className="project-directory__filter" type="button" key={category} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                  {category === 'ALL' ? 'All work' : category}
                </button>
              ))}
            </div>
            <span className="project-directory__count" role="status" aria-live="polite">
              {String(visibleProjects.length).padStart(2, '0')} / {String(content.projects.length).padStart(2, '0')} PROJECTS
            </span>
          </div>
        </div>

        <div className="project-directory__grid">
          {visibleProjects.map((project) => (
            <article className="project-directory-card" key={project.slug} aria-labelledby={`project-${project.slug}-title`}>
              <a className="project-directory-card__art-link" href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true"><ProjectArtwork project={project} /></a>
              <div className="project-directory-card__body">
                <div className="project-directory-card__meta"><span>{project.category}</span><span>{project.number} / {String(content.projects.length).padStart(2, '0')}</span></div>
                <h2 id={`project-${project.slug}-title`}>{project.title}</h2>
                <p className="project-directory-card__role">{project.role}</p>
                <p className="project-directory-card__description">{project.description}</p>
                <div className="project-directory-card__stack" aria-label={`Technology: ${project.stack.join(', ')}`}>
                  {project.stack.map((tool) => <span key={tool}>{(content.technologyIcons[tool] ?? []).map((icon) => <i className={`devicon-${icon} colored`} aria-hidden="true" key={icon} />)}{tool}</span>)}
                </div>
                <a className="project-directory-card__link" href={`/projects/${project.slug}`}>{content.copy.projects.viewDetails} <ArrowUpRight /></a>
              </div>
            </article>
          ))}
        </div>

        <div className="project-directory__closing">
          <div><span className="micro-label">HAVE A GOOD IDEA?</span><p>Let’s make the next one together.</p></div>
          <a className="button button--primary" href="/contact">Start a conversation <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  )
}

export function Projects({ reducedMotion }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const pointerStartRef = useRef(null)
  const projectCount = content.projects.length

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const positionTrack = () => gsap.set(track, { x: -activeIndex * viewport.clientWidth })
    const x = -activeIndex * viewport.clientWidth
    const tween = reducedMotion
      ? (gsap.set(track, { x }), null)
      : gsap.to(track, { x, duration: 0.78, ease: 'power3.inOut', overwrite: 'auto' })
    window.addEventListener('resize', positionTrack)
    return () => {
      tween?.kill()
      window.removeEventListener('resize', positionTrack)
    }
  }, [activeIndex, projectCount, reducedMotion])

  const goTo = (index) => setActiveIndex(Math.max(0, Math.min(projectCount - 1, index)))
  const handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowLeft') { event.preventDefault(); viewportRef.current?.focus({ preventScroll: true }); goTo(activeIndex - 1) }
    else if (event.key === 'ArrowRight') { event.preventDefault(); viewportRef.current?.focus({ preventScroll: true }); goTo(activeIndex + 1) }
    else if (event.key === 'Home') { event.preventDefault(); viewportRef.current?.focus({ preventScroll: true }); goTo(0) }
    else if (event.key === 'End') { event.preventDefault(); viewportRef.current?.focus({ preventScroll: true }); goTo(projectCount - 1) }
  }
  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.target.closest('a, button')) return
    pointerStartRef.current = { id: event.pointerId, x: event.clientX }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const handlePointerUp = (event) => {
    if (pointerStartRef.current?.id !== event.pointerId) return
    const distance = event.clientX - pointerStartRef.current.x
    pointerStartRef.current = null
    if (Math.abs(distance) > 48) goTo(activeIndex + (distance < 0 ? 1 : -1))
  }

  return (
    <section id="projects" className="projects section section-anchor" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead index={content.copy.projects.index} eyebrow={content.copy.projects.eyebrow} title={content.copy.projects.title} note={content.copy.projects.note} />
      </div>
      <div className="project-carousel container">
        <div ref={viewportRef} className="project-track-viewport" role="group" aria-roledescription="carousel" aria-label={content.copy.projects.carouselLabel} tabIndex={0} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStartRef.current = null }}>
          <div id="project-track" ref={trackRef} className="project-track" style={{ width: `${projectCount * 100}%` }}>
            {content.projects.map((project, index) => {
              const slideSize = `${100 / projectCount}%`
              return <article className="project-card" key={project.number} data-reveal role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projectCount}: ${project.title}`} aria-hidden={index !== activeIndex} inert={index !== activeIndex} style={{ width: slideSize, flexBasis: slideSize }}>
                <ProjectArtwork project={project} />
                <div className="project-card__meta"><span>{project.category}</span><span>{project.number} / {String(projectCount).padStart(2, '0')}</span></div>
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-stack">{project.stack.map((tag) => <span className="project-stack__item" key={tag}>{(content.technologyIcons[tag] ?? []).map((icon) => <i className={`devicon-${icon} colored`} aria-hidden="true" key={icon} />)}{tag}</span>)}</div>
                <div className="project-links">
                  <a href={project.live} target="_blank" rel="noreferrer">{content.copy.projects.liveLink} <ArrowUpRight /></a>
                  <a href={project.github} target="_blank" rel="noreferrer">{content.copy.projects.githubLink} <ArrowUpRight /></a>
                </div>
                <a className="project-detail-cta" href={`/projects/${project.slug}`}>{content.copy.projects.viewDetails} <ArrowUpRight /></a>
              </article>
            })}
          </div>
        </div>
        <div className="project-rail-footer">
          <span className="micro-label project-instructions">{content.copy.projects.explore}</span>
          <div className="project-carousel-controls">
            <button className="project-control" type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label={content.copy.projects.previousLabel} aria-controls="project-track"><span aria-hidden="true">←</span>{content.copy.projects.previous}</button>
            <div className="project-indicators" role="group" aria-label={content.copy.projects.chooseProject}>
              {content.projects.map((project, index) => <button className="project-indicator" key={project.number} type="button" aria-label={`${content.copy.projects.showProject} ${project.number}: ${project.title}`} aria-current={index === activeIndex ? 'true' : undefined} aria-controls="project-track" onClick={() => goTo(index)}><span /></button>)}
            </div>
            <button className="project-control" type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === projectCount - 1} aria-label={content.copy.projects.nextLabel} aria-controls="project-track">{content.copy.projects.next}<span aria-hidden="true">→</span></button>
          </div>
          <span className="micro-label project-position" role="status" aria-live="polite" aria-atomic="true">{String(activeIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')} {content.copy.projects.frames}</span>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="experience section section-anchor" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead index={content.copy.experience.index} eyebrow={content.copy.experience.eyebrow} title={content.copy.experience.title} note={content.copy.experience.note} />
        <div className="timeline-layout">
          <div className="timeline-intro" data-reveal><span className="micro-label">{content.copy.experience.period}</span><p>{content.copy.experience.line}</p><div className="timeline-location"><span /> {content.copy.experience.city}<br />{content.copy.experience.country}</div></div>
          <div className="timeline-list">
            <svg className="timeline-draw" viewBox="0 0 30 600" preserveAspectRatio="none" aria-hidden="true"><path d="M15 0v600" /></svg>
            {content.experience.map((item, index) => (
              <article className="timeline-entry" key={item.title} data-reveal data-delay={index * 100}>
                <span className="timeline-node" aria-hidden="true" />
                <span className="micro-label">{item.date}</span>
                <div><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><p className="timeline-description">{item.description}</p></div>
                <span className="timeline-entry-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact({ reducedMotion }) {
  const [status, setStatus] = useState('idle')
  const [draft, setDraft] = useState(null)
  const [copyState, setCopyState] = useState('idle')
  const sectionRef = useRef(null)
  const draftHeadingRef = useRef(null)
  const copyTimerRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return undefined

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          toggleActions: 'play none none reverse'
        }
      })
      entrance
        .fromTo('.contact-prelude', { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.48, ease: 'power3.out', immediateRender: false })
        .fromTo('.contact-intro', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power3.out', immediateRender: false }, '-=.16')
        .fromTo('.contact-info', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power3.out', immediateRender: false }, '-=.14')
        .fromTo('.contact-form-wrap', { autoAlpha: 0, y: 28, rotateX: 2 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.66, ease: 'power3.out', immediateRender: false }, '-=.28')

      gsap.fromTo('.contact-rule', { scaleX: 0, transformOrigin: 'left center' }, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 76%', toggleActions: 'play none none reverse' }
      })
      gsap.to('.contact-signal', {
        yPercent: -10,
        rotate: 4,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.45 }
      })
    }, section)

    return () => context.revert()
  }, [reducedMotion])

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), [])
  useEffect(() => {
    if (status === 'staged') draftHeadingRef.current?.focus()
  }, [status])

  const handleCopyEmail = async () => {
    window.clearTimeout(copyTimerRef.current)
    try {
      await navigator.clipboard.writeText(content.email)
      setCopyState('copied')
    } catch {
      setCopyState('unavailable')
    }
    copyTimerRef.current = window.setTimeout(() => setCopyState('idle'), 1900)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const formData = new FormData(form)
    setDraft({
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim()
    })
    setStatus('staged')
  }

  const handleWriteAnother = () => {
    setStatus('idle')
    window.requestAnimationFrame(() => sectionRef.current?.querySelector('#contact-name')?.focus())
  }
  const draftSubject = draft ? `Portfolio note from ${draft.name}` : ''
  const draftBody = draft ? `${draft.message}\n\nFrom: ${draft.name} (${draft.email})` : ''
  const draftHref = draft
    ? `mailto:${content.email}?subject=${encodeURIComponent(draftSubject)}&body=${encodeURIComponent(draftBody)}`
    : `mailto:${content.email}`

  return (
    <section ref={sectionRef} id="contact" className="contact section section-anchor" aria-labelledby="contact-title">
      <div className="contact-signal" aria-hidden="true"><BrandMark className="contact-signal__mark" /><span>JB—001 / OPEN CHANNEL</span></div>
      <div className="container">
        <div className="contact-prelude"><span className="section-index">{content.copy.contact.index}</span><span className="eyebrow">{content.copy.contact.eyebrow}</span><span className="contact-rule" /></div>
        <div className="contact-heading-row">
          <h2 id="contact-title" className="contact-title" data-kinetic><KineticTitle>{content.copy.contact.titleFirst}</KineticTitle><br /><KineticTitle className="contact-title__accent">{content.copy.contact.titleSecond}</KineticTitle></h2>
          <div className="contact-stamp" aria-hidden="true"><BrandMark /><span>PORTFOLIO / 001<br />PHT · UTC+8</span></div>
        </div>
        <div className="contact-intro">
          <p className="contact-intro__copy">{content.copy.contact.prompt}</p>
          <div className="contact-focus"><span className="micro-label">{content.copy.contact.workFocusLabel}</span><div>{content.copy.contact.workFocus.map((focus) => <span key={focus}>{focus}</span>)}</div></div>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-meta">
              <div className="contact-meta__row"><span className="micro-label">{content.copy.contact.availabilityLabel}</span><span className="contact-availability"><i />{content.copy.hero.availability}</span></div>
              <div className="contact-meta__row"><span className="micro-label">{content.copy.contact.locationLabel}</span><span>{content.location}</span></div>
              <div className="contact-meta__row"><span className="micro-label">{content.copy.contact.timeZoneLabel}</span><span>{content.copy.contact.timeZone}</span></div>
            </div>
            <div className="contact-email-block">
              <span className="micro-label">{content.copy.contact.directLine}</span>
              <div className="contact-email-line">
                <a className="contact-email" href={`mailto:${content.email}`}>{content.email}<ArrowUpRight /></a>
                <button className="email-copy" type="button" onClick={handleCopyEmail} aria-label={copyState === 'copied' ? 'Email copied to clipboard' : 'Copy contact email'}>
                  {copyState === 'copied' ? content.copy.contact.emailCopied : copyState === 'unavailable' ? content.copy.contact.copyUnavailable : content.copy.contact.copyEmail}
                </button>
              </div>
            </div>
            <div className="social-list"><span className="micro-label">{content.copy.contact.elsewhere}</span>{content.socials.map((social, index) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><span>0{index + 1}</span>{social.label}<ArrowUpRight /></a>)}</div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading"><span className="micro-label">{content.copy.contact.formHeading}</span><span className="form-status"><i />{content.copy.contact.formStatus}</span></div>
            {status === 'staged' ? (
              <div className="form-success" role="status" aria-live="polite">
                <span className="success-mark">✓</span>
                <span className="micro-label">LOCAL ONLY · NOT SENT</span>
                <h3 ref={draftHeadingRef} tabIndex={-1}>{content.copy.contact.successTitle}</h3>
                <p>{content.copy.contact.successMessage}</p>
                <div className="contact-note-preview">
                  <span>{draft?.name}</span><span>{draft?.email}</span><p>{draft?.message}</p>
                </div>
                <a className="button button--primary form-submit" href={draftHref}>{content.copy.contact.openEmail} <ArrowUpRight /></a>
                <button className="text-button" type="button" onClick={handleWriteAnother}>{content.copy.contact.writeAnother} <ArrowUpRight /></button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="contact-name">{content.copy.contact.name}<input id="contact-name" name="name" autoComplete="name" required minLength={2} placeholder={content.copy.contact.namePlaceholder} defaultValue={draft?.name ?? ''} /></label>
                <label htmlFor="contact-email">{content.copy.contact.email}<input id="contact-email" name="email" type="email" autoComplete="email" required placeholder={content.copy.contact.emailPlaceholder} defaultValue={draft?.email ?? ''} /></label>
                <label htmlFor="contact-message">{content.copy.contact.message}<textarea id="contact-message" name="message" rows={4} required minLength={10} maxLength={900} placeholder={content.copy.contact.messagePlaceholder} defaultValue={draft?.message ?? ''} /></label>
                <button className="button button--primary form-submit" type="submit">{content.copy.contact.send} <ArrowUpRight /></button>
                <p className="form-footnote">{content.copy.contact.formFootnote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
