import { lazy, Suspense } from 'react'
import { content } from '../data/content.js'

const Lanyard = lazy(() => import('./Lanyard.tsx'))
const portraitImage = '/manus-storage/me_7fa84047.png'
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char])
const badgeInitials = content.name.split(/\s+/).map((part) => part[0] ?? '').join('').slice(0, 2).toUpperCase()

function makeBadgeBackImage() {
  const name = escapeXml(content.name)
  const role = escapeXml(content.role)
  const location = escapeXml(content.location.replace(', Philippines', ''))
  const firstManifesto = escapeXml(content.copy.about.manifestoFirst)
  const secondManifesto = escapeXml(content.copy.about.manifestoSecond)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="900" viewBox="0 0 640 900"><rect width="640" height="900" fill="#f4eee7"/><rect x="22" y="22" width="596" height="856" rx="34" fill="#0b0b0f"/><path d="M64 182h512" stroke="#ff593d" stroke-width="3"/><text x="64" y="118" fill="#ff593d" font-family="Arial,sans-serif" font-size="22" letter-spacing="6">PROFILE / JB—001</text><text x="64" y="385" fill="#f4eee7" font-family="Arial,sans-serif" font-size="162" font-weight="700" letter-spacing="-12">${badgeInitials}</text><text x="66" y="468" fill="#ff593d" font-family="Arial,sans-serif" font-size="22" letter-spacing="4">${role.toUpperCase()}</text><text x="66" y="655" fill="#f4eee7" font-family="Arial,sans-serif" font-size="30">${firstManifesto}</text><text x="66" y="703" fill="#ff593d" font-family="Arial,sans-serif" font-size="30">${secondManifesto}</text><path d="M64 770h512" stroke="#f4eee7" stroke-opacity=".2"/><text x="66" y="821" fill="#b7b0a8" font-family="Arial,sans-serif" font-size="18" letter-spacing="3">${location.toUpperCase()}</text><text x="574" y="821" text-anchor="end" fill="#ff593d" font-family="Arial,sans-serif" font-size="18">${name}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const backImage = makeBadgeBackImage()

export function HeroLanyard({ reducedMotion }) {
  return (
    <div className="hero-lanyard" aria-hidden="true">
      <img className="hero-lanyard__fallback" src={portraitImage} alt="" draggable="false" />
      {!reducedMotion && (
        <Suspense fallback={null}>
          <Lanyard
            className="hero-lanyard__scene"
            frontImage={portraitImage}
            backImage={backImage}
            imageFit="cover"
            cardColor="#fafafa"
            orientation="portrait"
            finish="matte"
            size={0.59}
            anchor="center"
            strapLength={0.58}
            strapColor="#ff593d"
            strapWidth={0.68}
            metal="graphite"
            gravity={0.85}
            damping={0.78}
            elasticity={0.46}
            breeze={0}
            interactive
            intro
          />
        </Suspense>
      )}
    </div>
  )
}
