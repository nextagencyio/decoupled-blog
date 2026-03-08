import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_ALL_POSTS, transformPost } from '@/lib/queries'
import { PostCard } from './components/PostCard'
import { SetupGuide } from './components/SetupGuide'
import { AlmostThere } from './components/AlmostThere'
import Header from './components/Header'
import { Footer } from './components/Footer'
import { ArrowRight, Zap, Layers, Code2 } from 'lucide-react'
import Link from 'next/link'
import { isDemoMode, getMockPosts } from '@/lib/demo-mode'

export const dynamic = 'force-dynamic'

function getMissingEnvVars(): { drupal: string[]; stripe: string[] } {
  const drupal: string[] = []
  const stripe: string[] = []

  if (!process.env.DRUPAL_BASE_URL) drupal.push('DRUPAL_BASE_URL')
  if (!process.env.DRUPAL_CLIENT_ID) drupal.push('DRUPAL_CLIENT_ID')
  if (!process.env.DRUPAL_CLIENT_SECRET) drupal.push('DRUPAL_CLIENT_SECRET')
  if (!process.env.STRIPE_SECRET_KEY) stripe.push('STRIPE_SECRET_KEY')
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) stripe.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
  if (!process.env.STRIPE_PRICE_ID) stripe.push('STRIPE_PRICE_ID')

  return { drupal, stripe }
}

export default async function HomePage() {
  let posts: any[] = []
  let error: string | null = null

  if (isDemoMode()) {
    posts = getMockPosts().map(transformPost).filter(Boolean)
  } else {
    const missing = getMissingEnvVars()

    if (missing.drupal.length > 0) {
      return <SetupGuide missingEnvVars={[...missing.drupal, ...missing.stripe]} />
    }

    if (missing.stripe.length > 0) {
      return <AlmostThere missingStripeVars={missing.stripe} />
    }

    const requestHeaders = await headers()
    const client = getServerApolloClient(requestHeaders)

    try {
      const { data } = await client.query({
        query: GET_ALL_POSTS,
      })

      posts = (data?.nodeArticles?.nodes || [])
        .map(transformPost)
        .filter(Boolean)
    } catch (e: any) {
      console.error('Failed to fetch posts:', e)
      error = e.message
    }
  }

  const featuredPost = posts.find(p => p.featured) || posts[0]
  const otherPosts = posts.filter(p => p !== featuredPost)

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-600/8 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <Zap className="h-3.5 w-3.5" />
              Headless Drupal & Decoupled CMS
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              Build Modern Frontends,{' '}
              <span className="gradient-text">Powered by Drupal</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Practical guides for decoupling Drupal — from API design and content modeling to Next.js integration and production deployment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-accent-600/25 hover:shadow-accent-500/30"
              >
                Browse All Guides
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-7 py-3.5 rounded-xl font-semibold transition-all border border-white/10"
              >
                Subscribe Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'Headless Architecture', text: 'API-first patterns, GraphQL schemas, and decoupled deployment strategies for enterprise-grade applications.' },
              { icon: Code2, title: 'Frontend Integration', text: 'Connect Drupal to Next.js, Nuxt, or Astro with practical, production-ready code examples.' },
              { icon: Zap, title: 'Content Modeling', text: 'Structure content types, paragraphs, and taxonomies for multi-channel content delivery.' },
            ].map((item) => (
              <div key={item.title} className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-7 hover:border-primary-500/30 hover:bg-slate-900 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-white font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400">Failed to load posts: {error}</p>
          </div>
        )}

        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-accent-500" />
              <h2 className="font-display text-xl font-bold text-white">Featured</h2>
            </div>
            <PostCard post={featuredPost} featured />
          </section>
        )}

        {otherPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full bg-primary-500" />
                <h2 className="font-display text-xl font-bold text-white">Latest Posts</h2>
              </div>
              <Link href="/posts" className="text-sm text-slate-400 hover:text-accent-400 transition-colors flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && !error && (
          <div className="text-center py-16">
            <p className="text-slate-400 mb-2">No posts yet. Import sample content with:</p>
            <code className="text-accent-400 text-sm bg-slate-900 px-4 py-2 rounded-lg inline-block">
              npm run setup-content
            </code>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <section className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="bg-gradient-to-br from-primary-950 via-primary-900/50 to-slate-900 rounded-3xl p-10 md:p-16 border border-primary-800/30 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Stay ahead of the curve</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
                Get weekly tutorials on headless Drupal, decoupled architecture patterns, and modern frontend development delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-500 text-sm">
                  you@example.com
                </div>
                <button className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-accent-600/25 whitespace-nowrap">
                  Subscribe Free
                </button>
              </div>
              <p className="text-slate-500 text-xs mt-4">Free forever. No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
