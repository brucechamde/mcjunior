import { useCallback, useRef, useState } from 'react'

import Ambient from '../components/Ambient'
import Lightbox from '../components/Lightbox'
import Pagination from '../components/Pagination'
import Reveal from '../components/Reveal'
import { CLOUDINARY } from '../config/gallery'
import { localPhotos } from '../data/localPhotos'
import { useCloudinaryPhotos } from '../hooks/useCloudinaryPhotos'
import { usePagedList } from '../hooks/usePagedList'

const PAGE_SIZE = 12

const skeletonRatios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/2]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/2]']

function Gallery() {
  // Photos load from Cloudinary (see src/config/gallery.js); bundled photos are the fallback.
  const { status, photos } = useCloudinaryPhotos(CLOUDINARY.tags.gallery, localPhotos)
  const loading = status === 'loading'

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const triggerRef = useRef(null)
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
  }, [])

  const { page, pageCount, pageItems, goToPage, gridRef } = usePagedList(photos, PAGE_SIZE, {
    onChange: () => setLightboxIndex(null),
  })

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

        {loading && (
          <div aria-busy="true" aria-label="Loading photos" className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
            {skeletonRatios.map((ratio, i) => (
              <div key={i} className={`mb-4 w-full animate-pulse break-inside-avoid rounded-xl bg-fg/[0.06] ${ratio}`} />
            ))}
          </div>
        )}

        <div key={page} ref={gridRef} className="mt-10 scroll-mt-24 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {pageItems.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % 4) * 80} y={20} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget
                  setLightboxIndex(i)
                }}
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

        {!loading && pageItems.length === 0 && <p className="mt-10 text-sm text-dim">No photos yet. Check back soon.</p>}

        <Pagination page={page} pageCount={pageCount} onChange={goToPage} label="Gallery pages" />
      </div>

      <Lightbox photos={pageItems} index={lightboxIndex} onClose={closeLightbox} onChange={setLightboxIndex} />
    </section>
  )
}

export default Gallery
