import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_ALL_POSTS, transformPost } from '@/lib/queries'
import Header from '../components/Header'
import { PostCard } from '../components/PostCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Posts | Blog',
  description: 'Browse our posts.',
}

async function getPosts() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query({
      query: GET_ALL_POSTS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return (data?.nodeArticles?.nodes || []).map(transformPost).filter(Boolean)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">All Posts</h1>
          {posts.length === 0 ? (
            <p className="text-gray-400">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
