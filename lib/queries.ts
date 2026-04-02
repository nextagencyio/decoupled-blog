// Tagged template that returns the query string
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    nodePosts(first: 50) {
      nodes {
        id
        title
        path
        created {
          time
        }
        body {
          processed
          summary
        }
        excerpt {
          processed
        }
        readTime
        featured
        subscriptionTier
        postImage {
          url
          alt
          width
          height
        }
        authorName
        authorPhoto {
          url
          alt
        }
        tags {
          ... on TermTag {
            id
            name
          }
        }
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePost {
            id
            title
            path
            created {
              time
            }
            body {
              processed
              summary
            }
            excerpt {
              processed
            }
            readTime
            featured
            subscriptionTier
            postImage {
              url
              alt
              width
              height
            }
            authorName
            authorPhoto {
              url
              alt
            }
            tags {
              ... on TermTag {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

export const GET_FEATURED_POSTS = gql`
  query GetFeaturedPosts {
    nodePosts(first: 3) {
      nodes {
        id
        title
        path
        created {
          time
        }
        body {
          summary
        }
        readTime
        featured
        postImage {
          url
          alt
          width
          height
        }
        authorName
        authorPhoto {
          url
          alt
        }
      }
    }
  }
`

export const GET_GENERIC_PAGE = gql`
  query GetGenericPage($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            __typename
            id
            title
            path
            body {
              processed
            }
          }
          ... on NodeHomepage {
            __typename
            id
            title
            path
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            heroImage {
              url
              alt
              width
              height
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredItemsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Transform GraphQL response to our Post type
export function transformPost(node: any): import('./types').Post | null {
  if (!node) return null

  const slug = node.path?.replace(/^\/posts\//, '') || node.id

  // Handle the excerpt - use excerpt field, summary, or first paragraph of body
  let excerpt = node.excerpt?.processed || node.body?.summary || ''
  if (!excerpt && node.body?.processed) {
    // Extract first paragraph as excerpt
    const match = node.body.processed.match(/<p>[\s\S]*?<\/p>/)
    if (match) {
      excerpt = match[0]
    }
  }

  return {
    id: node.id,
    title: node.title,
    slug,
    excerpt,
    body: node.body?.processed || '',
    publishedAt: node.created?.time || new Date().toISOString(),
    readTime: node.readTime || '5 min read',
    featured: node.featured ?? false,
    subscriptionTier: node.subscriptionTier || 'free',
    tags: node.tags || [],
    image: node.image || node.postImage ? {
      url: (node.image || node.postImage).url,
      alt: (node.image || node.postImage).alt || node.title,
      width: (node.image || node.postImage).width || 1200,
      height: (node.image || node.postImage).height || 630,
    } : undefined,
    author: {
      name: node.authorName || 'Decoupled Drupal Team',
      photo: node.authorPhoto?.url,
      avatar: node.authorPhoto ? {
        url: node.authorPhoto.url,
        alt: node.authorPhoto.alt || node.authorName,
      } : undefined,
    },
  }
}
