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

  const description = `${project.description} Concept project sample page from ${content.name}'s portfolio.`
  return {
    title: `${project.title} — ${content.name}`,
    description,
    openGraph: { title: `${project.title} — ${content.name}`, description, type: 'article' },
    twitter: { card: 'summary_large_image', title: `${project.title} — ${content.name}`, description }
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = content.projects.find((entry) => entry.slug === slug)
  if (!project) notFound()
  return <App pageType="project" project={project} />
}
