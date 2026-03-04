/**
 * Demo Mode Module
 *
 * This file contains ALL demo/mock mode functionality.
 * To remove demo mode from a real project:
 * 1. Delete this file (lib/demo-mode.ts)
 * 2. Delete the data/mock/ directory
 * 3. Delete app/components/DemoModeBanner.tsx
 * 4. Remove DemoModeBanner from app/layout.tsx
 * 5. Remove the demo mode check from app/api/graphql/route.ts
 */

import homepageData from '@/data/mock/homepage.json'
import postsData from '@/data/mock/posts.json'
import routesData from '@/data/mock/routes.json'

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
}

const mockDataMap: Record<string, any> = {
  'homepage.json': homepageData,
  'posts.json': postsData,
  'routes.json': routesData,
}

function loadMockData(filename: string): any {
  return mockDataMap[filename] || null
}

export function handleMockQuery(body: string): any {
  try {
    const { query, variables } = JSON.parse(body)

    if (variables?.path) {
      const routePath = variables.path
      const routes = loadMockData('routes.json')
      if (routes && routes[routePath]) {
        return routes[routePath]
      }
    }

    if (query.includes('GetHomepageData') || query.includes('nodeHomepages')) {
      return loadMockData('homepage.json')
    }

    if (query.includes('GetPosts') || query.includes('nodePosts')) {
      return loadMockData('posts.json')
    }

    return { data: {} }
  } catch (error) {
    console.error('Mock query error:', error)
    return { data: {}, errors: [{ message: 'Mock data error' }] }
  }
}

// Auto-generated helper exports for custom app files

export function getMockPosts(): any[] {
  const data = loadMockData('posts.json')
  const key = Object.keys(data?.data || {})[0]
  return key ? (data.data[key]?.nodes || []) : []
}

export function getMockPostBySlug(slug: string): any | null {
  const routes = loadMockData('routes.json')
  if (!routes) return null
  // Search all route entries for matching slug/path
  for (const [routePath, routeData] of Object.entries(routes)) {
    if (routePath.includes(slug) || routePath.endsWith('/' + slug)) {
      return (routeData as any)?.data?.route?.entity || null
    }
  }
  return null
}