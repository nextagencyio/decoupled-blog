'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, PenLine } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'All Posts', href: '/posts' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    const banner = document.querySelector('[data-demo-banner]') as HTMLElement | null
    if (banner) {
      const update = () => setBannerHeight(banner.offsetHeight)
      update()
      const observer = new MutationObserver(update)
      observer.observe(banner, { attributes: true, childList: true, subtree: true })
      window.addEventListener('resize', update)
      return () => { observer.disconnect(); window.removeEventListener('resize', update) }
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) return item.name
    }
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      )}
      style={{ top: bannerHeight }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/25">
              <PenLine className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-accent-400 transition-colors">
              Decoupled Blog
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeTab === item.name
                    ? 'text-accent-400 bg-accent-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-3 pl-3 border-l border-slate-700">
              <Link
                href="/posts"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-600 hover:bg-accent-500 text-white transition-colors shadow-lg shadow-accent-600/25"
              >
                Subscribe
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800 pt-3">
            <nav className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    activeTab === item.name
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/posts"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-accent-600 text-white text-center"
              >
                Subscribe
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
