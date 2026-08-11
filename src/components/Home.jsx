import { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

import img1 from '../assets/images/Img.jpg'
import img2 from '../assets/images/Img2.jpg'
import img3 from '../assets/images/Img3.png'

const banners = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
]

const AUTOPLAY_MS = 5000

function Home() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, AUTOPLAY_MS)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    setIndex(i)
    startTimer()
  }

  const next = () => goTo((index + 1) % banners.length)
  const prev = () => goTo((index - 1 + banners.length) % banners.length)

  return (
    <section id="home" className="relative bg-[#0B0B10] overflow-hidden">
      {/* Background contrast layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Content sits above the background layer */}
      <div className="relative">
        {/* Eyebrow */}
        <div className="pt-28 sm:pt-36 pb-8 sm:pb-10 px-4 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-pink-400">
            MC · DJ · EVENTS
          </p>
        </div>

        {/* Sliding banner */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div
            className="relative w-full max-w-6xl mx-auto aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl"
            onMouseEnter={() => clearInterval(timerRef.current)}
            onMouseLeave={startTimer}
          >
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {banners.map((banner, i) => (
                <div key={i} className="min-w-full h-full relative">
                  <img
                    src={banner.image}
                    alt={`Banner ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              ))}
            </div>

            {/* Prev / next arrows */}
            <button
              onClick={prev}
              aria-label="Previous banner"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next banner"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to banner ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Heading, subtitle, buttons */}
        <div className="pb-10 sm:pb-14 px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Turning your event into an experience
          </h1>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            From intimate private functions to full-scale nightclub takeovers,
            we bring the sound, the energy and the crowd.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold text-sm hover:bg-pink-400 transition-colors"
            >
              Book an event
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-white/40 transition-colors"
            >
              View services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home