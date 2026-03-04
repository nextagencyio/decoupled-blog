import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <div className="grid md:grid-cols-2 gap-6 bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-colors">
          {post.image && (
            <div className="relative aspect-video md:aspect-auto">
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
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <div
                className="text-gray-400 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            )}
            {post.author && (
              <p className="text-gray-500 text-sm mt-4">By {post.author.name}</p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-colors h-full">
        {post.image && (
          <div className="relative aspect-video">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              className="object-cover"
              unoptimized={post.image.url.includes('unsplash.com')}
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 text-gray-400 text-sm mb-2">
            <span>{date}</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <div
              className="text-gray-400 text-sm line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
        </div>
      </div>
    </Link>
  )
}

export default PostCard
