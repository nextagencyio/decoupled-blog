import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_ALL_POSTS, transformPost } from '@/lib/queries'
import { PostCard } from './components/PostCard'
import { SetupGuide } from './components/SetupGuide'
import { AlmostThere } from './components/AlmostThere'
import Header from './components/Header'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { isDemoMode, getMockPosts } from '@/lib/demo-mode'

// Check which env vars are missing
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

  // Demo mode: use mock posts
  if (isDemoMode()) {
    posts = getMockPosts()
  } else {
    const missing = getMissingEnvVars()

    // Show full setup guide if Drupal is not configured
    if (missing.drupal.length > 0) {
      return <SetupGuide missingEnvVars={[...missing.drupal, ...missing.stripe]} />
    }

    // Show "Almost There" if Drupal is configured but Stripe keys are missing
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
    <div className="min-h-screen bg-primary-950">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 text-primary-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Headless Drupal & Decoupled CMS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Build Modern Frontends,{' '}
            <span className="gradient-text">Powered by Drupal</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Practical guides for decoupling Drupal -- from API design and content modeling to Next.js integration and production deployment.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors shadow-lg shadow-primary-600/25"
          >
            Browse All Guides
          </Link>
        </div>

        <section className="mb-14 grid md:grid-cols-3 gap-5">
          {[
            { title: 'Headless Architecture', text: 'API-first patterns, GraphQL schemas, and decoupled deployment strategies.' },
            { title: 'Frontend Integration', text: 'Connect Drupal to Next.js, Nuxt, or Astro with practical, working examples.' },
            { title: 'Content Modeling', text: 'Structure content types, paragraphs, and taxonomies for multi-channel delivery.' },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-6 hover:border-primary-500/30 transition-colors">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400">Failed to load posts: {error}</p>
          </div>
        )}

        {/* Featured post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-400 mb-4">Featured</h2>
            <PostCard post={featuredPost} featured />
          </div>
        )}

        {/* Recent posts grid */}
        {otherPosts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-400 mb-4">Recent Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No posts yet. Import sample content with:
            </p>
            <code className="text-primary-400 text-sm mt-2 block">
              npm run setup-content
            </code>
          </div>
        )}
      </div>
    </div>
  )
}
