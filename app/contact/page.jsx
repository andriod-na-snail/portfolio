import App from '../../src/App.jsx'

const title = 'Contact | Joshua Bacay'
const description = 'Contact Joshua Bacay about software engineering, web systems, interface design, or a thoughtful collaboration.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', url: '/contact', title, description, images: [{ url: '/og-cover.svg', alt: 'Contact Joshua Bacay' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-cover.svg'] }
}

export default function ContactPage() {
  return <App pageType="contact" />
}
