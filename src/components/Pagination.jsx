import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'

// 1 ... 4 5 6 ... 12 : always the first, last and current page, plus one neighbour either side
function pageList(current, total) {
  const wanted = new Set([1, total, current - 1, current, current + 1])
  const pages = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out = []
  pages.forEach((n, i) => {
    if (i > 0 && n - pages[i - 1] > 1) out.push(`gap-${n}`)
    out.push(n)
  })
  return out
}

// Numbered page buttons. Renders nothing when there is only one page.
function Pagination({ page, pageCount, onChange, label = 'Pages' }) {
  if (pageCount <= 1) return null

  return (
    <nav aria-label={label} className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="icon-btn disabled:pointer-events-none disabled:opacity-40"
      >
        <PiCaretLeft size={18} aria-hidden="true" />
      </button>

      {pageList(page, pageCount).map((item) =>
        typeof item === 'string' ? (
          <span key={item} aria-hidden="true" className="px-1 text-dim">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={`h-10 min-w-10 rounded-full px-3 text-sm font-medium tabular-nums transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97] ${
              item === page ? 'bg-fg text-ink-950' : 'border border-line text-muted hover:border-fg/25 hover:text-fg'
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className="icon-btn disabled:pointer-events-none disabled:opacity-40"
      >
        <PiCaretRight size={18} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Pagination
