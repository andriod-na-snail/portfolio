import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene({ reducedMotion = false }) {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      host.classList.add('hero-scene--fallback')
      const fallback = document.createElement('div')
      fallback.className = 'scene-fallback-art'
      host.appendChild(fallback)
      return () => {
        host.classList.remove('hero-scene--fallback')
        fallback.remove()
      }
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 60)
    camera.position.z = 7.8

    const composition = new THREE.Group()
    scene.add(composition)

    const coreGeometry = new THREE.IcosahedronGeometry(1.46, 2)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff593d'),
      wireframe: true,
      transparent: true,
      opacity: 0.93
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    composition.add(core)

    const innerGeometry = new THREE.IcosahedronGeometry(0.62, 1)
    const innerMaterial = new THREE.MeshBasicMaterial({ color: '#ff593d', wireframe: true, transparent: true, opacity: 0.3 })
    const inner = new THREE.Mesh(innerGeometry, innerMaterial)
    composition.add(inner)

    const ringGeometry = new THREE.TorusGeometry(2.05, 0.006, 4, 180)
    const ringMaterial = new THREE.MeshBasicMaterial({ color: '#ff593d', transparent: true, opacity: 0.53 })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI * 0.38
    ring.rotation.y = Math.PI * 0.12
    composition.add(ring)

    const orbitGeometry = new THREE.TorusGeometry(2.36, 0.003, 4, 180)
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: '#f4eee7', transparent: true, opacity: 0.16 })
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
    orbit.rotation.x = Math.PI * 0.74
    orbit.rotation.y = Math.PI * 0.28
    composition.add(orbit)

    const mobile = window.innerWidth < 700
    const particleCount = mobile ? 180 : 420
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.7 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({ color: '#ff765e', size: 0.016, transparent: true, opacity: 0.56, sizeAttenuation: true })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const pointer = { x: 0, y: 0 }
    let scrollProgress = 0
    let visible = true
    let frame = 0
    let elapsed = 0
    const clock = new THREE.Clock()

    const render = () => {
      frame = 0
      if (!visible || document.hidden) return
      if (!reducedMotion) elapsed += Math.min(clock.getDelta(), 0.04)
      composition.rotation.y = reducedMotion ? 0.14 : elapsed * 0.12 + pointer.x * 0.18
      composition.rotation.x = reducedMotion ? -0.12 : Math.sin(elapsed * 0.32) * 0.08 + pointer.y * 0.12
      ring.rotation.z = reducedMotion ? 0.06 : elapsed * 0.1
      particles.rotation.y = reducedMotion ? 0 : elapsed * 0.025
      const fade = reducedMotion ? 0.62 : Math.max(0.18, 1 - scrollProgress * 0.72)
      composition.scale.setScalar(reducedMotion ? 1 : 1 - Math.min(scrollProgress * 0.1, 0.16))
      coreMaterial.opacity = 0.78 * fade
      innerMaterial.opacity = 0.3 * fade
      ringMaterial.opacity = 0.53 * fade
      renderer.render(scene, camera)
      if (!reducedMotion && !mobile) frame = window.requestAnimationFrame(render)
    }
    const invalidate = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
      invalidate()
    }
    const onScroll = () => {
      const distance = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      scrollProgress = window.scrollY / distance
      invalidate()
    }
    const onVisibility = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      } else invalidate()
    }
    const resize = () => {
      const width = host.clientWidth
      const height = Math.max(host.clientHeight, 1)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      invalidate()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      } else invalidate()
    }, { threshold: 0.01 })
    visibilityObserver.observe(host)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    onScroll()
    render()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      coreGeometry.dispose()
      coreMaterial.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      orbitGeometry.dispose()
      orbitMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [reducedMotion])

  return (
    <div ref={hostRef} className="hero-scene" aria-hidden="true" />
  )
}
