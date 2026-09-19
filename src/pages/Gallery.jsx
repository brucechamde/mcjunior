import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PiCaretLeft, PiCaretRight, PiX } from 'react-icons/pi'

import Ambient from '../components/Ambient'
import Reveal from '../components/Reveal'
import { useGalleryPhotos } from '../hooks/useGalleryPhotos'

const skeletonRatios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/2]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/2]']

function Gallery() {
  // Photos load from Cloudinary (see src/config/gallery.js); bundled photos are the fallback.
  const { status, photos, categories: photoCategories } = useGalleryPhotos()
  const categories = ['All', ...photoCategories]
  const loading = status === 'loading'

  // The filter lives in the URL (?category=Weddings) so it can be shared and survives refresh.
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const activeCategory = categories.includes(requested) ? requested : 'All'

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  const filteredPhotos =
    activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory)

  const isOpen = lightboxIndex !== null
  const count = filteredPhotos.length

  const selectCategory = (cat) => {
    setLightboxIndex(null)
    setParams(cat === 'All' ? {} : { category: cat }, { replace: true })
  }

  const openLightbox = (index, e) => {
    triggerRef.current = e.currentTarget
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, count])

  const current = isOpen ? filteredPhotos[lightboxIndex] : null

  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32">
      <Ambient />

      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl">Gallery</h1>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            A look back at the nights, weddings and events we've helped bring to life.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter photos by category">
          {categories.map((cat) => {
            const selected = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                aria-pressed={selected}
                className={`h-10 rounded-full px-5 text-sm font-medium transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97] ${
                  selected
                    ? 'bg-fg text-ink-950'
                    : 'border border-line text-muted hover:border-fg/25 hover:text-fg'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </Reveal>

        {loading && (
          <div aria-busy="true" aria-label="Loading photos" className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
            {skeletonRatios.map((ratio, i) => (
              <div key={i} className={`mb-4 w-full animate-pulse break-inside-avoid rounded-xl bg-fg/[0.06] ${ratio}`} />
            ))}
          </div>
        )}

        <div key={activeCategory} className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filteredPhotos.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % 4) * 80} y={20} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={(e) => openLightbox(i, e)}
                aria-label={`Open photo: ${photo.alt}`}
                className="group relative block w-full overflow-hidden rounded-xl ring-1 ring-fg/10"
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            </Reveal>
          ))}
        </div>

        {!loading && count === 0 && (
          <p className="mt-10 text-sm text-dim">No photos in this category yet. Check back soon.</p>
        )}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center overscroll-contain bg-black/85 px-4 backdrop-blur-md"
          data-theme="dark"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Close viewer"
            className="icon-btn absolute right-4 top-4 sm:right-8 sm:top-8"
          >
            <PiX size={20} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((i) => (i - 1 + count) % count)
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
              setLightboxIndex((i) => (i + 1) % count)
            }}
            aria-label="Next photo"
            className="icon-btn absolute right-4 top-1/2 -translate-y-1/2 sm:right-8"
          >
            <PiCaretRight size={20} aria-hidden="true" />
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tabular-nums text-muted" aria-live="polite">
            {lightboxIndex + 1} / {count}
          </p>
        </div>
      )}
    </section>
  )
}

export default Gallery
