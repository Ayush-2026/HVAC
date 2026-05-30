"use client"

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h2 className="text-[#0f2a4a] text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-500 text-sm mb-2">{error.message}</p>
        {error.digest && <p className="text-gray-400 text-xs mb-6">Digest: {error.digest}</p>}
        <button
          onClick={reset}
          className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
