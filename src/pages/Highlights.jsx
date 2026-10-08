import { useCallback, useRef, useState } from 'react'
import { PiCalendarBlank } from 'react-icons/pi'

import Ambient from '../components/Ambient'
import Lightbox from '../components/Lightbox'
import Pagination from '../components/Pagination'
import Reveal from '../components/Reveal'
import { CLOUDINARY } from '../config/gallery'
import { localHighlights } from '../data/localHighlights'
import { useCloudinaryPhotos } from '../hooks/useCloudinaryPhotos'
import { usePagedList } from '../hooks/usePagedList'

const PAGE_SIZE = 9

// Recap text for the lead photo. Edit this when there is a new night to feature.
const featuredHighlight = {
  tag: 'Nightclub',
  date: 'Aug 27, 2026',
  iso: '2026-08-27',
  title: 'Outstanding Vol.7 was one for the books',
  excerpt:
    "The Moser Room came alive with a packed floor, a killer lineup, and a crowd that didn't stop moving until close. Here's a look back at the night.",
}

function Highlights() {
  // Photos load from Cloudinary by tag (see src/config/gallery.js); bundled photos are the fallback.
  const { status, photos } = useCloudinaryPhotos(CLOUDINARY.tags.highlights, localHighlights, 'Highlight photo')
  const loading = status === 'loading'
  const [lead, ...rest] = photos

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const triggerRef = useRef(null)
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
  }, [])

  const { page, pageCount, pageItems, goToPage, gridRef } = usePagedList(rest, PAGE_SIZE, {
    onChange: () => setLightboxIndex(null),
  })

  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32">
      <Ambient />

      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl">Highlights</h1>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            Recaps from the nights, weddings and projects we've been part of lately.
          </p>
        </Reveal>

        {loading && (
          <div aria-busy="true" aria-label="Loading photos" className="mt-14 h-80 animate-pulse rounded-[var(--radius-panel)] bg-fg/[0.06] lg:mt-20" />
        )}

        {/* Lead photo with the recap */}
        {lead && (
          <Reveal as="article" className="group panel mt-14 overflow-hidden lg:mt-20">
            <div className="grid md:grid-cols-2">
              <div className="relative h-72 overflow-hidden md:h-full md:min-h-[26rem]">
                <img
                  src={lead.full}
                  alt={lead.alt}
                  width={lead.width}
                  height={lead.height}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium text-accent">{featuredHighlight.tag}</span>
                  <span className="flex items-center gap-1.5 text-dim">
                    <PiCalendarBlank size={16} aria-hidden="true" />
                    <time dateTime={featuredHighlight.iso}>{featuredHighlight.date}</time>
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {featuredHighlight.title}
                </h2>
                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">{featuredHighlight.excerpt}</p>
              </div>
            </div>
          </Reveal>
        )}

        {/* The rest of the night, a page at a time */}
        <div key={page} ref={gridRef} className="mt-6 scroll-mt-24 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {pageItems.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % 3) * 100} y={20} className="group">
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget
                  setLightboxIndex(i)
                }}
                aria-label={`Open photo: ${photo.alt}`}
                className="relative block aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-fg/10"
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            </Reveal>
          ))}
        </div>

        <Pagination page={page} pageCount={pageCount} onChange={goToPage} label="Highlights pages" />
      </div>

      <Lightbox photos={pageItems} index={lightboxIndex} onClose={closeLightbox} onChange={setLightboxIndex} />
    </section>
  )
}

export default Highlights
