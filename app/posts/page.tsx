import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_ALL_POSTS, transformPost } from '@/lib/queries'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { PostCard } from '../components/PostCard'
import { isDemoMode, getMockPosts } from '@/lib/demo-mode'
import { BookOpen } from 'lucide-react'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Posts | Decoupled Drupal Blog',
  description: 'Browse all posts on headless Drupal, decoupled CMS architecture, and modern frontend development.',
}

async function getPosts() {
  if (isDemoMode()) {
    return getMockPosts().map(transformPost).filter(Boolean)
  }

  try {
    const client = getClient()
    const { data } = await client.raw(GET_ALL_POSTS, { first: 50 })
    return (data?.nodeArticles?.nodes || []).map(transformPost).filter(Boolean)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <section className="pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-400" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">All Posts</h1>
          </div>
          <p className="text-slate-400 mt-3 max-w-xl">
            Tutorials, deep dives, and practical guides for building with headless Drupal and decoupled CMS architectures.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400">No posts yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
