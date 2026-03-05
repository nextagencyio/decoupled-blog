'use client'

import Header from './Header'
import { Footer } from './Footer'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'

interface HomepageRendererProps {
  homepageContent: any
}

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <ErrorBoundary><HeroSection homepageContent={homepageContent} /></ErrorBoundary>
      <ErrorBoundary><StatsSection homepageContent={homepageContent} /></ErrorBoundary>
      <ErrorBoundary><CTASection homepageContent={homepageContent} /></ErrorBoundary>
      <Footer />
    </div>
  )
}
