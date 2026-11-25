import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { content } from '../data/content.js'
import { BrandMark } from './BrandMark.jsx'
import { Button } from './ui/button'

const sectionLinks = [
  ['hero', '01', content.copy.nav.start],
  ['about', '02', content.copy.nav.about],
  ['skills', '03', content.copy.nav.skills],
  ['projects', '04', content.copy.nav.work],
  ['experience', '05', content.copy.nav.path],
  ['contact', '06', content.copy.nav.talk]
]
const copyrightYear = new Date().getFullYear()

function ArrowUp() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 15V3m-5 5 5-5 5 5" /></svg>
}

export function IntroLoader({ onFinish }) {
  const layerRef = useRef(null)
  const finishRef = useRef(() => {})

  useEffect(() => {
    let finished = false
    const layer = layerRef.current
    const finish = () => {
      if (finished || !layer) return
      finished = true
      animate(layer, {
        translateY: '-100%',
        duration: 680,
        ease: 'inOutExpo',
        onComplete: onFinish
      })
    }
    finishRef.current = finish
    animate(layer.querySelectorAll('.intro-char'), {
      translateY: ['110%', '0%'],
      opacity: [0, 1],
      delay: stagger(52),
      duration: 690,
      ease: 'outExpo'
    })
    const timer = window.setTimeout(finish, 1320)
    return () => window.clearTimeout(timer)
  }, [onFinish])

  return (
    <div ref={layerRef} className="intro-loader" aria-label="Loading portfolio">
      <div className="intro-loader__top"><span className="intro-index">JB / 001</span><span className="intro-skip"><button type="button" onClick={() => finishRef.current()}>Skip intro <span>↗</span></button></span></div>
      <div className="intro-loader__center">
        <span className="intro-kicker">{content.role.toUpperCase()}</span>
        <p className="intro-name" aria-label={content.name}>{Array.from(content.name.toUpperCase()).map((char, index) => <span className="intro-mask" key={`${char}-${index}`}><span className="intro-char">{char === ' ' ? '\u00a0' : char}</span></span>)}</p>
        <div className="intro-loader__line"><span /></div>
      </div>
      <span className="intro-loader__foot">{content.location.toUpperCase()}</span>
    </div>
  )
}

export function Navigation({ theme, onToggleTheme, projectMode = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionHref = (id) => projectMode ? `/#${id}` : `#${id}`
  return (
    <header className="site-nav">
      <a className="nav-brand" href={sectionHref('hero')} aria-label="Joshua Bacay, back to portfolio start"><span className="nav-monogram"><BrandMark /></span><span>{content.name.toUpperCase()}<small>{content.role.toUpperCase()}</small></span></a>
      <div className="nav-actions">
        <nav id="main-menu" className={`nav-links${menuOpen ? ' nav-links--open' : ''}`} aria-label="Main navigation">
          {[['about', content.copy.nav.about], ['skills', content.copy.nav.skills], ['projects', content.copy.nav.work], ['experience', content.copy.nav.path]].map(([id, label], index) => <a href={sectionHref(id)} key={id} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>)}
          <a className="nav-contact" href={sectionHref('contact')} onClick={() => setMenuOpen(false)}>{content.copy.nav.talk} <span>↗</span></a>
        </nav>
        <Button variant="outline" size="lg" className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          <svg viewBox="0 0 20 20" aria-hidden="true">{theme === 'dark' ? <><circle cx="10" cy="10" r="3.5" /><path d="M10 1.5v2m0 13v2m8.5-8.5h-2m-13 0h-2m14.5-6-1.4 1.4m-9.2 9.2L4 16m12 0-1.4-1.4M4 4l1.4 1.4" /></> : <><path d="M16.8 12.2A7 7 0 0 1 7.8 3.2 7.5 7.5 0 1 0 16.8 12.2Z" /></>}</svg>
          <span>{theme === 'dark' ? content.copy.nav.themeLight : content.copy.nav.themeDark}</span>
        </Button>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? content.copy.nav.close : content.copy.nav.menu}</span><i className={menuOpen ? 'menu-icon menu-icon--open' : 'menu-icon'} /></button>
      </div>
    </header>
  )
}

export function TimelineRail() {
  const [active, setActive] = useState('hero')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      setProgress(Math.min(window.scrollY / max, 1))
      const midpoint = window.innerHeight * 0.46
      let current = 'hero'
      sectionLinks.forEach(([id]) => {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= midpoint) current = id
      })
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <aside className="timeline-rail" aria-label="Page timeline">
      <span className="timeline-rail__label">SCROLL / PLAYHEAD</span>
      <div className="timeline-rail__track"><span className="timeline-rail__fill" style={{ transform: `scaleY(${progress})` }} />{sectionLinks.map(([id, number, label]) => <a key={id} href={`#${id}`} className={`timeline-rail__marker${active === id ? ' is-active' : ''}`} aria-label={`Go to ${label}`} aria-current={active === id ? 'location' : undefined} style={{ top: `${(Number(number) - 1) * 20}%` }}><i /><span>{number} / {label.toUpperCase()}</span></a>)}</div>
      <span className="timeline-rail__total">06 KEYFRAMES</span>
    </aside>
  )
}

export function CustomCursor({ reducedMotion }) {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) return undefined
    const cursor = cursorRef.current
    if (!cursor) return undefined
    const interactiveSelector = 'a, button, input, textarea, [role="button"]'
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let raf = 0
    let lastFrame = 0
    let hasMoved = false
    const tick = (time) => {
      const elapsed = lastFrame ? Math.min(time - lastFrame, 40) : 16
      lastFrame = time
      const ease = 1 - Math.exp(-elapsed / 14)
      x += (targetX - x) * ease
      y += (targetY - y) * ease
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (Math.abs(targetX - x) > 0.2 || Math.abs(targetY - y) > 0.2) {
        raf = requestAnimationFrame(tick)
      } else {
        x = targetX
        y = targetY
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
        raf = 0
        lastFrame = 0
      }
    }
    const move = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!hasMoved) {
        x = targetX
        y = targetY
        hasMoved = true
      }
      cursor.classList.add('cursor--visible')
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const interactiveElement = (target) => target instanceof Element ? target.closest(interactiveSelector) : null
    const over = (event) => {
      const current = interactiveElement(event.target)
      const previous = interactiveElement(event.relatedTarget)
      if (current && current !== previous) {
        cursor.classList.add('cursor--active')
      }
    }
    const out = (event) => {
      const previous = interactiveElement(event.target)
      const next = interactiveElement(event.relatedTarget)
      if (previous && previous !== next && !next) {
        cursor.classList.remove('cursor--active')
      }
    }
    const leave = () => cursor.classList.remove('cursor--visible', 'cursor--active')
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      if (raf) cancelAnimationFrame(raf)
      cursor.classList.remove('cursor--visible', 'cursor--active')
    }
  }, [reducedMotion])

  if (reducedMotion) return null
  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
}

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    update()
    const timer = window.setInterval(update, 30_000)
    return () => window.clearInterval(timer)
  }, [])
  return <span className="footer-clock"><i /> {content.copy.footer.shortLocation} <b>{time || '--:--'}</b> {content.copy.footer.timeZone}</span>
}

export function Footer({ reducedMotion }) {
  const toTop = () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="footer-brand" href="/#hero" aria-label="Back to portfolio start, Joshua Bacay"><BrandMark /><i>↗</i></a>
        <p>{content.footerCredit}<br /><span>{content.copy.footer.credit}</span></p>
        <Clock />
        <button className="back-to-top" type="button" onClick={toTop}>{content.copy.footer.backToTop} <ArrowUp /></button>
      </div>
      <div className="container footer-bottom"><span>© {copyrightYear} {content.name.toUpperCase()}</span><span>{content.copy.footer.portfolio}</span><span>{content.copy.footer.endline}</span></div>
    </footer>
  )
}
