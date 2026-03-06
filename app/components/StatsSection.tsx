'use client'

interface StatsSectionProps {
  homepageContent: any
}

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const stats = homepageContent?.stats || homepageContent?.statsItems || []
  if (!stats || stats.length === 0) return null

  return (
    <section className="border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, i: number) => (
            <div key={stat.id || i} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value || stat.number || stat.statValue || stat.number}
              </div>
              <div className="text-sm text-slate-400">
                {stat.label || stat.statLabel || stat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
