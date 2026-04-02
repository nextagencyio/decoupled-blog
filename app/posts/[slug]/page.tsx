import { getClient } from '@/lib/drupal-client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { GET_POST_BY_SLUG, transformPost } from '@/lib/queries'
import { hasActiveSubscription } from '@/lib/subscription'
import { Paywall } from '@/app/components/Paywall'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { notFound } from 'next/navigation'
import { isDemoMode, getMockPostBySlug } from '@/lib/demo-mode'

export const dynamic = 'force-dynamic'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  let post = null

  if (isDemoMode()) {
    const rawPost = getMockPostBySlug(slug)
    post = rawPost ? transformPost(rawPost) : null
  } else {
    const client = getClient()

    try {
      const data = await client.raw(GET_POST_BY_SLUG, { path: `/posts/${slug}` })

      post = transformPost(data?.route?.entity)
    } catch (e) {
      console.error('Failed to fetch post:', e)
    }
  }

  if (!post) {
    notFound()
  }

  const isSubscribed = await hasActiveSubscription()

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-accent-400 mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>

          <header className="mb-8">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: any) => (
                  <span key={tag.id || tag.name} className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400">
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.author && (
              <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                {(post.author.photo || post.author.avatar) && (
                  <Image
                    src={post.author.photo || post.author.avatar!.url}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                    unoptimized
                  />
                )}
                <div>
                  <p className="text-white font-medium">{post.author.name}</p>
                  {post.author.bio && (
                    <p className="text-slate-400 text-sm line-clamp-1">
                      {post.author.bio.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </div>
              </div>
            )}
          </header>

          {post.image && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image.url}
                alt={post.image.alt}
                fill
                className="object-cover"
                priority
                unoptimized={post.image.url.includes('unsplash.com')}
              />
            </div>
          )}

          {isSubscribed ? (
            <div
              className="prose prose-invert prose-lg max-w-none prose-dark"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          ) : (
            <Paywall excerpt={post.excerpt} />
          )}
        </div>
      </article>
      <Footer />
    </div>
  )
}
