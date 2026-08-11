import { useState, useEffect } from 'react'
import { FaX, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

// Import your gallery photos here — add as many as you like
import gallery1 from '../assets/images/gallery/gallery1.jpeg'
import gallery2 from '../assets/images/gallery/gallery2.jpeg'
import gallery3 from '../assets/images/gallery/gallery3.jpeg'
import gallery4 from '../assets/images/gallery/gallery4.jpeg'
import gallery5 from '../assets/images/gallery/gallery5.jpeg'
import gallery6 from '../assets/images/gallery/gallery6.jpeg'

const photos = [
  { src: gallery1, category: 'Nightclub', alt: 'Nightclub event 1' },
  { src: gallery2, category: 'Weddings', alt: 'Wedding event 1' },
  { src: gallery3, category: 'Corporate', alt: 'Corporate event 1' },
  { src: gallery4, category: 'Nightclub', alt: 'Nightclub event 2' },
  { src: gallery5, category: 'Weddings', alt: 'Wedding event 2' },
  { src: gallery6, category: 'Corporate', alt: 'Corporate event 2' },
  // Add more objects here as you get more photos
]

const categories = ['All', 'Nightclub', 'Weddings', 'Corporate']

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextPhoto = () =>
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length)

  const prevPhoto = () =>
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, filteredPhotos.length])

  // Reset to first photo of new category when filter changes, avoids out-of-range index
  useEffect(() => {
    setLightboxIndex(null)
  }, [activeCategory])

  return (
    <section className="relative bg-[#0B0B10] overflow-hidden px-4 pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* Background contrast layer, same system as rest of site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-24 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-cyan-300 mb-3">
            THE LOOK AND FEEL
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Gallery
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            A look back at the nights, weddings and events we've helped bring to life.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/[0.04] border border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPhotos.map((photo, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="block w-full break-inside-avoid rounded-xl overflow-hidden group relative"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-10">
            No photos in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <FaX className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            aria-label="Previous photo"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          <img
            src={filteredPhotos[lightboxIndex].src}
            alt={filteredPhotos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            aria-label="Next photo"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

          <p className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400">
            {lightboxIndex + 1} / {filteredPhotos.length}
          </p>
        </div>
      )}
    </section>
  )
}

export default Gallery