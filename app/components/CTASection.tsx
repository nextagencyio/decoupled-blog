'use client'

import Link from 'next/link'

interface CTASectionProps {
  homepageContent: any
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = homepageContent?.ctaTitle || 'Subscribe for Premium Tutorials'
  const primaryLabel = homepageContent?.ctaPrimary || 'Subscribe Now'

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-950 via-primary-900/50 to-slate-900 rounded-3xl p-10 md:p-16 border border-primary-800/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Get weekly tutorials on headless Drupal, decoupled architecture patterns, and modern frontend development delivered to your inbox.
            </p>
            <Link
              href="/posts"
              className="inline-block bg-accent-600 hover:bg-accent-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-accent-600/25"
            >
              {primaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
