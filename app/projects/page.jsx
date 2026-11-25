import App from '../../src/App.jsx'

const title = 'Selected work | Joshua Bacay'
const description = 'Explore selected product and interface concepts by Joshua Bacay, a software engineer in Palawan, Philippines.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/projects' },
  openGraph: { type: 'website', url: '/projects', title, description, images: [{ url: '/og-cover.svg', alt: 'Selected work by Joshua Bacay' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-cover.svg'] }
}

export default function ProjectsPage() {
  return <App pageType="projects" />
}
