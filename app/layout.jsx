import Script from 'next/script'
import './globals.css'
import '../src/index.css'
import '../src/App.css'

const description = 'Joshua Bacay — Software Engineer in Puerto Princesa, Palawan. Building fast, expressive web experiences with care.'
const title = 'Joshua Bacay — Software Engineer'
const metadataBase = new URL('https://jrizal-olp8uf7s.manus.space')
const themeBootstrap = `(() => {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('joshua-bacay-theme') || localStorage.getItem('joshua-rizal-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
    else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) theme = 'light';
  } catch {}
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();`

export const metadata = {
  metadataBase,
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description: 'A motion-led portfolio for Joshua Bacay, building fast, expressive web experiences.',
    images: [{ url: '/og-cover.svg', alt: 'Joshua Bacay portfolio cover' }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'A motion-led portfolio for Joshua Bacay, building fast, expressive web experiences.',
    images: ['/og-cover.svg']
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <meta name="theme-color" content="#0b0b0f" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devicon@2.17.0/devicon.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
