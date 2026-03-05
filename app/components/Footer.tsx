import Link from 'next/link'
import { PenLine } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <PenLine className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">Decoupled Blog</span>
            </Link>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Practical guides for headless Drupal and decoupled CMS architecture. Tutorials on API design, content modeling, and modern frontend integration.
            </p>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-4">Content</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/posts" className="text-slate-400 hover:text-accent-400 transition-colors text-sm">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-accent-400 transition-colors text-sm">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-slate-400 hover:text-accent-400 transition-colors text-sm">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-4">Subscribe</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Get weekly headless Drupal tutorials and architecture deep dives.
            </p>
            <Link
              href="/posts"
              className="inline-block bg-accent-600 hover:bg-accent-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Subscribe Free
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Decoupled Blog. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Powered by{' '}
            <a
              href="https://decoupled.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Decoupled.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
