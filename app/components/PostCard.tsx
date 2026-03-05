import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const postHref = post.slug ? `/posts/${post.slug}` : '/posts'
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={postHref} className="group block">
        <div className="relative grid md:grid-cols-5 gap-0 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-accent-500/40 transition-all duration-300 shadow-xl">
          {post.image && (
            <div className="relative md:col-span-3 aspect-video md:aspect-auto md:min-h-[360px]">
              <Image
                src={post.image.url}
                alt={post.image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                unoptimized={post.image.url.includes('unsplash.com')}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/80 hidden md:block" />
            </div>
          )}
          <div className="md:col-span-2 p-8 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags?.slice(0, 2).map((tag: any) => (
                <span key={tag.id || tag.name} className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent-500/15 text-accent-400 border border-accent-500/20">
                  {tag.name}
                </span>
              ))}
              {post.subscriptionTier === 'premium' && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/20">
                  Premium
                </span>
              )}
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-accent-400 transition-colors leading-tight">
              {post.title}
            </h3>
            {post.excerpt && (
              <div
                className="text-slate-400 line-clamp-3 mb-5 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            )}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                {post.author?.photo && (
                  <Image
                    src={post.author.photo}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                )}
                <div className="text-sm">
                  <p className="text-slate-300 font-medium">{post.author?.name}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <span>{date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-accent-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={postHref} className="group block h-full">
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-accent-500/30 transition-all duration-300 h-full flex flex-col">
        {post.image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized={post.image.url.includes('unsplash.com')}
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.tags?.slice(0, 2).map((tag: any) => (
              <span key={tag.id || tag.name} className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400">
                {tag.name}
              </span>
            ))}
            {post.subscriptionTier === 'premium' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent-500/10 text-accent-400">
                Premium
              </span>
            )}
          </div>
          <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-accent-400 transition-colors leading-snug">
            {post.title}
          </h3>
          {post.excerpt && (
            <div
              className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800">
            {post.author?.photo && (
              <Image
                src={post.author.photo}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full"
                unoptimized
              />
            )}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-slate-400 font-medium">{post.author?.name}</span>
              <span>&middot;</span>
              <span>{date}</span>
              <span>&middot;</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
