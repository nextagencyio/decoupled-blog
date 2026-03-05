export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header skeleton */}
      <div className="fixed left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 animate-pulse" />
              <div className="h-5 w-32 rounded bg-slate-800 animate-pulse" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="h-8 w-16 rounded-lg bg-slate-800 animate-pulse" />
              <div className="h-8 w-20 rounded-lg bg-slate-800 animate-pulse" />
              <div className="h-8 w-24 rounded-lg bg-slate-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-36 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="h-7 w-64 rounded-full bg-slate-800 animate-pulse mb-8" />
          <div className="h-14 w-full rounded bg-slate-800 animate-pulse mb-4" />
          <div className="h-14 w-3/4 rounded bg-slate-800 animate-pulse mb-6" />
          <div className="h-5 w-2/3 rounded bg-slate-800/60 animate-pulse mb-10" />
          <div className="flex gap-4">
            <div className="h-12 w-44 rounded-xl bg-slate-800 animate-pulse" />
            <div className="h-12 w-36 rounded-xl bg-slate-800/50 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="h-6 w-24 rounded bg-slate-800 animate-pulse mb-6" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="aspect-[16/10] bg-slate-800 animate-pulse" />
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  <div className="h-5 w-16 rounded-full bg-slate-800 animate-pulse" />
                  <div className="h-5 w-14 rounded-full bg-slate-800 animate-pulse" />
                </div>
                <div className="h-5 w-full rounded bg-slate-800 animate-pulse mb-2" />
                <div className="h-5 w-2/3 rounded bg-slate-800 animate-pulse mb-4" />
                <div className="h-4 w-full rounded bg-slate-800/50 animate-pulse mb-1" />
                <div className="h-4 w-3/4 rounded bg-slate-800/50 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
