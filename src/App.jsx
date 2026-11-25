'use client'

import { useCallback, useEffect, useState } from 'react'
import { animate, stagger } from 'animejs'
import { countUp, drawSvgPath, useMagnetic, useReducedMotion, useReveal } from './animations/useMotion.js'
import { About, Contact, Experience, Hero, Projects, ProjectsDirectory, Skills } from './components/sections.jsx'
import { CustomCursor, Footer, IntroLoader, Navigation, TimelineRail } from './components/chrome.jsx'
import { ProjectDetailPage } from './components/ProjectDetailPage.jsx'
import { GlobalBackdrop } from './components/backgrounds/GlobalBackdrop.jsx'

function useKinetic(enabled, reducedMotion) {
  useEffect(() => {
    if (!enabled) return undefined
    const headings = document.querySelectorAll('[data-kinetic]')
    if (reducedMotion) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const chars = entry.target.querySelectorAll('.kinetic-char')
        animate(chars, {
          opacity: [0, 1],
          translateY: ['108%', '0%'],
          rotateZ: [3, 0],
          delay: stagger(22),
          duration: 810,
          ease: 'outExpo'
        })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.26 })
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [enabled, reducedMotion])
}

function useSpecialMotion(enabled, reducedMotion) {
  useEffect(() => {
    if (!enabled) return undefined
    const targets = document.querySelectorAll('[data-count], [data-wipe], .timeline-draw path, .about-bottom-rule path, .jb-mark path')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const node = entry.target
        if (node.dataset.count) countUp(node.querySelector('.stat-number'), Number(node.dataset.count), reducedMotion)
        else if (node.hasAttribute('data-wipe')) {
          if (!reducedMotion) animate(node, { clipPath: ['inset(0 0 12% 0)', 'inset(0 0 0% 0)'], duration: 860, ease: 'outExpo' })
        } else drawSvgPath(node, reducedMotion)
        observer.unobserve(node)
      })
    }, { threshold: 0.25 })
    targets.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [enabled, reducedMotion])
}

function useProjectTilt(enabled) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(pointer: coarse)').matches) return undefined
    const cards = document.querySelectorAll('.project-card')
    const cleanups = []
    cards.forEach((card) => {
      const move = (event) => {
        const bounds = card.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5
        animate(card, { rotateX: -y * 3.2, rotateY: x * 3.2, duration: 260, ease: 'outExpo' })
      }
      const leave = () => animate(card, { rotateX: 0, rotateY: 0, duration: 520, ease: 'outElastic(1, .4)' })
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave) })
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [enabled])
}

function IntroLoaderMotion({ ready, reducedMotion }) {
  useEffect(() => {
    if (!ready || reducedMotion) return
    const lines = document.querySelectorAll('.hero-kicker, .hero-role, .hero-tagline, .hero-actions')
    animate(lines, { opacity: [0, 1], translateY: [20, 0], delay: stagger(90, { start: 120 }), duration: 700, ease: 'outExpo' })
  }, [ready, reducedMotion])
  return null
}

function readInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  const documentTheme = document.documentElement.dataset.theme
  if (documentTheme === 'light' || documentTheme === 'dark') return documentTheme
  try {
    const savedTheme = window.localStorage.getItem('joshua-bacay-theme') || window.localStorage.getItem('joshua-rizal-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function App({ pageType = 'home', project = null } = {}) {
  const isHomePage = pageType === 'home'
  const [theme, setTheme] = useState('dark')
  const [themeReady, setThemeReady] = useState(false)
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(reducedMotion || !isHomePage)
  const [showLoader, setShowLoader] = useState(!reducedMotion && isHomePage)

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    try {
      window.localStorage.setItem('joshua-bacay-theme', nextTheme)
    } catch {
      // Theme changes still work for the current page when storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(readInitialTheme())
      setThemeReady(true)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!preference) return undefined
    const followSystemPreference = (event) => {
      try {
        if (window.localStorage.getItem('joshua-bacay-theme') || window.localStorage.getItem('joshua-rizal-theme')) return
      } catch {
        // Continue following the system preference when storage is unavailable.
      }
      setTheme(event.matches ? 'light' : 'dark')
    }
    preference.addEventListener?.('change', followSystemPreference)
    return () => preference.removeEventListener?.('change', followSystemPreference)
  }, [])

  useEffect(() => {
    if (!themeReady) return
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0b0f' : '#f5f2ec')
  }, [theme, themeReady])

  const onIntroFinish = useCallback(() => {
    setShowLoader(false)
    window.requestAnimationFrame(() => setReady(true))
  }, [])

  useReveal(ready, reducedMotion)
  useKinetic(ready, reducedMotion)
  useSpecialMotion(ready, reducedMotion)
  useMagnetic(ready && !reducedMotion)
  useProjectTilt(ready && !reducedMotion)

  if (!isHomePage) {
    if (pageType === 'project') {
      return (
        <>
          <GlobalBackdrop theme={theme} reducedMotion={reducedMotion} />
          <CustomCursor reducedMotion={reducedMotion} />
          <Navigation theme={theme} onToggleTheme={toggleTheme} projectMode />
          <ProjectDetailPage project={project} />
          <Footer reducedMotion={reducedMotion} />
        </>
      )
    }

    return (
      <>
        <GlobalBackdrop theme={theme} reducedMotion={reducedMotion} />
        <CustomCursor reducedMotion={reducedMotion} />
        <Navigation theme={theme} onToggleTheme={toggleTheme} projectMode />
        <main className={`standalone-route standalone-route--${pageType}`}>
          {pageType === 'projects' ? <ProjectsDirectory /> : <Contact reducedMotion={reducedMotion} standalone />}
        </main>
        <Footer reducedMotion={reducedMotion} />
      </>
    )
  }

  return (
    <>
      <GlobalBackdrop theme={theme} reducedMotion={reducedMotion} />
      {showLoader && <IntroLoader onFinish={onIntroFinish} />}
      <CustomCursor reducedMotion={reducedMotion} />
      <Navigation theme={theme} onToggleTheme={toggleTheme} />
      <TimelineRail />
      <main className={`portfolio${ready ? ' portfolio--ready' : ' portfolio--waiting'}`} aria-hidden={!ready}>
        <Hero reducedMotion={reducedMotion} />
        <About />
        <Skills />
        <Projects reducedMotion={reducedMotion} />
        <Experience />
        <Contact reducedMotion={reducedMotion} />
        <Footer reducedMotion={reducedMotion} />
      </main>
      <IntroLoaderMotion ready={ready} reducedMotion={reducedMotion} />
    </>
  )
}

export default App
