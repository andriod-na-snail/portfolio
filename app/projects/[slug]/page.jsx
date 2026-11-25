import { notFound } from 'next/navigation'
import App from '@/App'
import { content } from '@/data/content.js'

export const dynamicParams = false

export function generateStaticParams() {
  return content.projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = content.projects.find((entry) => entry.slug === slug)
  if (!project) return { title: `Project not found — ${content.name}` }

  const description = `${project.description} Independent concept study by ${content.name}; not a commissioned client case study.`
  return {
    title: `${project.title} — ${content.name}`,
    description,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: { title: `${project.title} — ${content.name}`, description, type: 'article', url: `/projects/${slug}/`, images: [{ url: '/og-cover.svg', alt: `${project.title} concept study by ${content.name}` }] },
    twitter: { card: 'summary_large_image', title: `${project.title} — ${content.name}`, description }
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = content.projects.find((entry) => entry.slug === slug)
  if (!project) notFound()
  return <App pageType="project" project={project} />
}
