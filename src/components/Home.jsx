import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PiArrowRight, PiCaretLeft, PiCaretRight, PiPause, PiPlay } from 'react-icons/pi'

import Ambient from './Ambient'
import DJDeck from './DJDeck'
import Magnetic from './Magnetic'
import Reveal from './Reveal'

import img1 from '../assets/images/Img.jpg'
import img2 from '../assets/images/Img2.jpg'
import img3 from '../assets/images/Img3.png'

const banners = [
  { image: img1, width: 1656, height: 630 },
  { image: img2, width: 828, height: 315 },
  { image: img3, width: 919, height: 326 },
]

const facts = [
  { value: '13 years', label: 'in the nightclub industry' },
  { value: 'Melbourne', label: 'Australia' },
  { value: 'Telstra, Salmat, Tele Tech', label: 'corporate clients' },
]

const AUTOPLAY_MS = 6000

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

function BannerSlider() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (reduce || !playing || hovering) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % banners.length), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [reduce, playing, hovering, index])

  const go = (i) => setIndex((i + banners.length) % banners.length)

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Featured events">
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative aspect-[2.63/1] overflow-hidden rounded-[var(--radius-panel)] bg-ink-900 ring-1 ring-fg/10 shadow-[0_30px_80px_-30px_rgba(232,87,127,0.35)]"
      >
        {banners.map((banner, i) => (
          <img
            key={banner.image}
            src={banner.image}
            alt={`Featured event banner ${i + 1} of ${banners.length}`}
            width={banner.width}
            height={banner.height}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 size-full object-contain transition-[opacity,transform] duration-[900ms] ease-out ${
              i === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show banner ${i + 1}`}
              aria-current={i === index}
              className="group flex h-6 items-center"
            >
              <span
                className={`block h-1 rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? 'w-8 bg-accent' : 'w-4 bg-fg/25 group-hover:bg-fg/50'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous banner" className="icon-btn">
            <PiCaretLeft size={18} aria-hidden="true" />
          </button>
          {!reduce && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className="icon-btn"
            >
              {playing ? <PiPause size={16} aria-hidden="true" /> : <PiPlay size={16} aria-hidden="true" />}
            </button>
          )}
          <button type="button" onClick={() => go(index + 1)} aria-label="Next banner" className="icon-btn">
            <PiCaretRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <Ambient />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-24">
        {/* Hero */}
        <div className="grid items-center gap-12 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.h1
              {...rise(0.15)}
              className="text-[2.75rem] font-semibold leading-[1.04] tracking-tighter sm:text-6xl xl:text-[4.5rem]"
            >
              Turning your event into an{' '}
              <em className="pb-1 font-medium italic text-accent">experience</em>
            </motion.h1>

            <motion.p {...rise(0.3)} className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">
              From intimate private functions to full-scale nightclub takeovers, we bring the sound, the energy and
              the crowd.
            </motion.p>

            <motion.div {...rise(0.45)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <Link to="/#contact" className="btn-primary">
                  Book an event
                  <PiArrowRight size={18} aria-hidden="true" />
                </Link>
              </Magnetic>
              <Link to="/#services" className="link-arrow">
                View services
                <PiArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            {...rise(0.3)}
            className="relative mx-auto aspect-[4/5] w-full max-w-md lg:col-span-5 lg:aspect-auto lg:h-[min(68dvh,600px)] lg:max-w-none"
          >
            <DJDeck />
          </motion.div>
        </div>

        {/* Featured banners */}
        <Reveal className="mt-16 lg:mt-8">
          <BannerSlider />
        </Reveal>

        {/* Facts */}
        <Reveal as="dl" className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.value}>
              <dt className="text-xl font-medium tracking-tight sm:text-2xl">{fact.value}</dt>
              <dd className="mt-1 text-sm text-dim">{fact.label}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default Home
