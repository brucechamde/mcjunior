import { useEffect, useRef } from 'react'
import { PiCaretLeft, PiCaretRight, PiX } from 'react-icons/pi'

// Full-screen photo viewer. `index` is null when closed. Arrow keys, Escape and the buttons all work.
function Lightbox({ photos, index, onClose, onChange }) {
  const closeRef = useRef(null)
  const isOpen = index !== null && photos[index] !== undefined
  const count = photos.length

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, index, count, onClose, onChange])

  if (!isOpen) return null
  const current = photos[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center overscroll-contain bg-black/85 px-4 backdrop-blur-md"
      data-theme="dark"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="icon-btn absolute right-4 top-4 sm:right-8 sm:top-8"
      >
        <PiX size={20} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onChange((index - 1 + count) % count)
        }}
        aria-label="Previous photo"
        className="icon-btn absolute left-4 top-1/2 -translate-y-1/2 sm:left-8"
      >
        <PiCaretLeft size={20} aria-hidden="true" />
      </button>

      <img
        key={current.id}
        src={current.full}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85dvh] max-w-full rounded-2xl object-contain shadow-[0_40px_120px_-30px_rgba(232,87,127,0.35)]"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onChange((index + 1) % count)
        }}
        aria-label="Next photo"
        className="icon-btn absolute right-4 top-1/2 -translate-y-1/2 sm:right-8"
      >
        <PiCaretRight size={20} aria-hidden="true" />
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tabular-nums text-muted" aria-live="polite">
        {index + 1} / {count}
      </p>
    </div>
  )
}

export default Lightbox
