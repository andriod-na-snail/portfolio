'use client'

import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Lightfall = lazy(() => import('./Lightfall.tsx'))

const SECTION_COLORS = {
  hero: { dark: '#ff593d', light: '#bd3b24' },
  about: { dark: '#e28a61', light: '#a94c31' },
  skills: { dark: '#d77758', light: '#a64a30' },
  projects: { dark: '#ff6848', light: '#b43c25' },
  experience: { dark: '#e4a35d', light: '#a4562c' },
  contact: { dark: '#ff593d', light: '#bd3b24' },
  'project-detail-hero': { dark: '#ff6848', light: '#b43c25' },
  'project-detail-overview': { dark: '#e4a35d', light: '#a4562c' }
}

const SECTION_POSITIONS = {
  hero: ['72%', '22%'],
  about: ['24%', '36%'],
  skills: ['74%', '44%'],
  projects: ['37%', '58%'],
  experience: ['70%', '54%'],
  contact: ['27%', '74%'],
  'project-detail-hero': ['73%', '30%'],
  'project-detail-overview': ['28%', '68%']
}

function sectionKey(section) {
  return section.id || section.classList[0] || 'hero'
}

export function GlobalBackdrop({ theme, reducedMotion }) {
  const glowRef = useRef(null)
  const [activeSection, setActiveSection] = useState('hero')
  const color = SECTION_COLORS[activeSection]?.[theme] || SECTION_COLORS.hero[theme]
  const colors = theme === 'light' ? [color, '#c57955'] : [color, '#f4eee7']
  const position = SECTION_POSITIONS[activeSection] || SECTION_POSITIONS.hero

  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id], main.project-detail-page > .container > section'))
    if (!sections.length) return undefined

    const findCurrentSection = () => {
      const marker = window.innerHeight * 0.52
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= marker && bounds.bottom >= marker
      })
      if (current) setActiveSection(sectionKey(current))
    }

    if (reducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current) setActiveSection(sectionKey(current.target))
      }, { threshold: [0.2, 0.4, 0.6] })
      sections.forEach((section) => observer.observe(section))
      findCurrentSection()
      return () => observer.disconnect()
    }

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 58%',
          end: 'bottom 42%',
          onEnter: () => setActiveSection(sectionKey(section)),
          onEnterBack: () => setActiveSection(sectionKey(section))
        })
      })

      const revealTargets = gsap.utils.toArray('.section-head__meta, .section-note, .project-detail-copy, .project-detail-art')
      revealTargets.forEach((target) => {
        gsap.fromTo(target, {
          autoAlpha: 0,
          y: 18,
          x: target.matches('.project-detail-art') ? 16 : 0
        }, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: 0.52,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: target,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      const main = document.querySelector('main')
      if (main && glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: 12,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: main, start: 'top top', end: 'bottom bottom', scrub: 0.7 }
        })
      }
    })

    findCurrentSection()
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div
      className="global-backdrop"
      data-section={activeSection}
      aria-hidden="true"
      style={{ '--active-glow': color, '--glow-x': position[0], '--glow-y': position[1] }}
    >
      <div ref={glowRef} className="global-backdrop__glow" />
      {!reducedMotion && (
        <Suspense fallback={null}>
          <Lightfall
            className="global-backdrop__lightfall"
            colors={colors}
            backgroundColor={color}
            speed={0.12}
            streakCount={2}
            streakWidth={0.55}
            streakLength={0.75}
            density={0.32}
            twinkle={0.12}
            zoom={3.6}
            backgroundGlow={0.035}
            headGlow={0.28}
            depth={0.72}
            bloom={0.12}
            glow={0.42}
            opacity={theme === 'dark' ? 0.35 : 0.26}
            mouseInteraction
            mouseStrength={0.18}
            mouseRadius={0.42}
            mouseDampening={0.2}
            lens={0.18}
            holdToWarp={false}
            intro={false}
            fade={0.18}
            lightMode={theme === 'light'}
            mixBlendMode={theme === 'dark' ? 'screen' : 'multiply'}
            dpr={1}
          />
        </Suspense>
      )}
    </div>
  )
}
