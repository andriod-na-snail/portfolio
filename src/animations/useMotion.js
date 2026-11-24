import { useEffect, useState } from 'react'
import { animate, stagger } from 'animejs'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

export function useReveal(enabled, reducedMotion) {
  useEffect(() => {
    if (!enabled) return undefined
    const elements = document.querySelectorAll('[data-reveal]')
    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target
        const delay = Number(element.dataset.delay || 0)
        element.classList.add('is-visible')
        animate(element, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 760,
          delay,
          ease: 'outExpo'
        })
        observer.unobserve(element)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [enabled, reducedMotion])
}

export function useMagnetic(enabled) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(pointer: coarse)').matches) return undefined
    const buttons = document.querySelectorAll('[data-magnetic]')
    const cleanups = []

    buttons.forEach((button) => {
      const move = (event) => {
        const bounds = button.getBoundingClientRect()
        const x = event.clientX - bounds.left - bounds.width / 2
        const y = event.clientY - bounds.top - bounds.height / 2
        animate(button, {
          translateX: x * 0.12,
          translateY: y * 0.16,
          duration: 300,
          ease: 'outExpo'
        })
      }
      const leave = () => animate(button, {
        translateX: 0,
        translateY: 0,
        duration: 600,
        ease: 'outElastic(1, .35)'
      })
      button.addEventListener('pointermove', move)
      button.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        button.removeEventListener('pointermove', move)
        button.removeEventListener('pointerleave', leave)
      })
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [enabled])
}

export function playStaggeredLetters(selector, reducedMotion) {
  const chars = document.querySelectorAll(selector)
  if (reducedMotion || !chars.length) return
  animate(chars, {
    opacity: [0, 1],
    translateY: ['115%', '0%'],
    rotateZ: [4, 0],
    delay: stagger(32),
    duration: 760,
    ease: 'outExpo'
  })
}

export function drawSvgPath(path, reducedMotion) {
  if (!path) return
  const length = path.getTotalLength()
  path.style.strokeDasharray = `${length}`
  path.style.strokeDashoffset = reducedMotion ? '0' : `${length}`
  if (!reducedMotion) {
    animate(path, { strokeDashoffset: [length, 0], duration: 1300, ease: 'inOutSine' })
  }
}

export function countUp(node, target, reducedMotion) {
  if (!node) return
  if (reducedMotion) {
    node.textContent = String(target)
    return
  }
  const counter = { value: 0 }
  animate(counter, {
    value: target,
    round: 1,
    duration: 1250,
    ease: 'outExpo',
    onUpdate: () => { node.textContent = String(counter.value) }
  })
}
