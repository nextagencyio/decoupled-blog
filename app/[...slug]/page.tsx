import { getClient } from '@/lib/drupal-client'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import HomepageRenderer from '../components/HomepageRenderer'
import ResponsiveImage from '../components/ResponsiveImage'
import { Metadata } from 'next'
import { GET_POST_BY_SLUG } from '@/lib/queries'

export const revalidate = 300
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  try {
    const client = getClient()
    const { data } = await apollo.query({ query: GET_POST_BY_SLUG, variables: { path } })
    const title = data?.route?.entity?.title || 'Page'
    return { title }
  } catch {
    return { title: 'Page' }
  }
}

function PageNotFound({ path }: { path: string }) {
  return (
    <div className="text-center py-16">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12">
        <h1 className="text-2xl font-display font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-2">We couldn&#39;t find any content at this path.</p>
        <p className="text-sm text-slate-500">Path: {path}</p>
      </div>
    </div>
  )
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  const client = getClient()

  try {
    const { data } = await apollo.query({ query: GET_POST_BY_SLUG, variables: { path }, fetchPolicy: 'no-cache' })
    if (!entity) {
      return (
        <div className="min-h-screen bg-slate-950">
          <Header />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <PageNotFound path={path} />
          </main>
          <Footer />
        </div>
      )
    }

    if (entity.__typename === 'NodeHomepage') {
      return <HomepageRenderer homepageContent={entity} />
    }

    const title = entity.title || 'Untitled'
    const bodyHtml = entity?.body?.processed || ''
    const image = entity?.image

    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <ErrorBoundary>
            <article className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              {image && (
                <ResponsiveImage
                  image={image}
                  alt={image.alt || title}
                  className="rounded-t-2xl"
                  priority={true}
                />
              )}
              <div className="p-6 md:p-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">{title}</h1>
                <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none prose-dark" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </div>
            </article>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading page by path:', error)
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <PageNotFound path={path} />
        </main>
        <Footer />
      </div>
    )
  }
}
