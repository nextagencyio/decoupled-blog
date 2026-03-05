'use client'

interface HeroSectionProps {
  homepageContent: any
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = homepageContent?.heroTitle || homepageContent?.title || 'Decoupled Blog'
  const subtitle = homepageContent?.heroSubtitle || ''

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-slate-950 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-600/8 rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">{title}</h1>
        {subtitle && <p className="text-lg text-slate-400 mt-6 max-w-xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  )
}
