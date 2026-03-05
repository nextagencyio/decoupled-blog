
export interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

export interface DrupalImage {
  url: string
  alt: string
  width?: number
  height?: number
  variations?: ImageVariation[]
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  publishedAt: string
  readTime: string
  featured: boolean
  subscriptionTier?: 'free' | 'premium'
  tags?: Array<{ id: string; name: string }>
  image?: {
    url: string
    alt: string
    width: number
    height: number
  }
  author: {
    name: string
    bio?: string
    photo?: string
    avatar?: {
      url: string
      alt: string
    }
  }
}

export interface Author {
  id: string
  name: string
  bio: string
  avatar?: {
    url: string
    alt: string
  }
}

export interface Subscription {
  id: string
  customerId: string
  email: string
  status: 'active' | 'canceled' | 'past_due' | 'incomplete'
  currentPeriodEnd: string
}

export interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: string[]
  }>
}
