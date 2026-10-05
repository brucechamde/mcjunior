import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { PiPause, PiPlay } from 'react-icons/pi'

import { getLevels, toggle } from '../audio/engine'
import { usePlayer } from '../audio/usePlayer'

// Animated DJ deck for the hero: spinning record, tonearm, beat rings and an equalizer.
// Idle: a simulated ~124 BPM loop in pure SVG + CSS. Press "Play a mix" and the tonearm drops onto the
// record while the bars and the kick pulse follow the real audio. Reduced-motion visitors get a still frame.

const BAR_COUNT = 30

const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
  duration: 0.72 + ((i * 37) % 7) * 0.09,
  delay: -(((i * 53) % 10) * 0.09),
  // Centre bars glow brighter, the edges fade out
  opacity: 0.35 + 0.65 * (1 - Math.abs(i - (BAR_COUNT - 1) / 2) / ((BAR_COUNT - 1) / 2)),
}))

const grooves = [112, 105, 98, 91, 84, 77, 70, 63, 56, 49, 42]

function DJDeck() {
  const { playing } = usePlayer()
  const reduce = useReducedMotion()
  const barRefs = useRef([])
  const kickRef = useRef(null)
  const live = playing && !reduce

  // While music plays, drive the bars and the kick pulse from the analyser (no React renders)
  useEffect(() => {
    if (!live) return
    let frame = 0
    const loop = () => {
      const levels = getLevels()
      if (levels) {
        barRefs.current.forEach((bar, i) => {
          if (!bar) return
          // Spread the lower two thirds of the spectrum across the bars
          const bin = Math.min(levels.bins.length - 1, Math.floor(Math.pow(i / BAR_COUNT, 1.5) * 80) + 1)
          bar.style.transform = `scaleY(${0.12 + (levels.bins[bin] / 255) * 0.95})`
        })
        if (kickRef.current) kickRef.current.style.transform = `scale(${1 + levels.bass * 0.045})`
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    const barsNow = barRefs.current
    const kickNow = kickRef.current
    return () => {
      cancelAnimationFrame(frame)
      barsNow.forEach((bar) => bar && (bar.style.transform = ''))
      if (kickNow) kickNow.style.transform = ''
    }
  }, [live])

  return (
    <div className="deck panel relative flex size-full flex-col overflow-hidden p-5 sm:p-6">
      {/* Soft spotlight behind the platter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 45% at 50% 38%, rgb(232 87 127 / 0.16), transparent)' }}
      />

      <div className="relative grid min-h-0 flex-1 place-items-center">
        {/* Beat rings */}
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            aria-hidden="true"
            className="deck-ring absolute aspect-square w-[62%] rounded-full border border-accent/40"
            style={{ animationDelay: `${n * 1.3}s` }}
          />
        ))}

        <div ref={kickRef} aria-hidden="true" className="relative w-full max-w-[26rem] will-change-transform">
          <svg viewBox="0 0 320 300" className="w-full overflow-visible">
            {/* Record */}
            <g className="deck-vinyl" style={{ transformOrigin: '150px 160px' }}>
              <circle cx="150" cy="160" r="120" fill="#0a0a10" stroke="rgb(255 255 255 / 0.12)" strokeWidth="1.5" />
              {grooves.map((r) => (
                <circle key={r} cx="150" cy="160" r={r} fill="none" stroke="rgb(255 255 255 / 0.045)" strokeWidth="1" />
              ))}
              {/* Light sheen so the rotation reads */}
              <path d="M150 160 L150 40 A120 120 0 0 1 254 100 Z" fill="rgb(255 255 255 / 0.05)" />
              <path d="M150 160 L150 280 A120 120 0 0 1 46 220 Z" fill="rgb(255 255 255 / 0.05)" />
              {/* Label */}
              <circle cx="150" cy="160" r="38" fill="var(--accent)" />
              <circle cx="150" cy="160" r="30" fill="none" stroke="rgb(8 8 12 / 0.28)" strokeWidth="1" />
              <text
                x="150"
                y="168"
                textAnchor="middle"
                fontSize="22"
                fontWeight="700"
                letterSpacing="-1"
                fill="var(--on-accent)"
              >
                MC
              </text>
              <circle cx="150" cy="160" r="3" fill="var(--on-accent)" />
            </g>

            {/* Tonearm: rests off the record until music plays, then drops on and sways */}
            <g className={`deck-arm-pose ${playing ? 'is-down' : ''}`} style={{ transformOrigin: '290px 44px' }}>
              <g className={playing ? 'deck-arm' : ''} style={{ transformOrigin: '290px 44px' }}>
                <line x1="290" y1="44" x2="214" y2="128" stroke="var(--muted)" strokeWidth="5" strokeLinecap="round" />
                <rect x="200" y="122" width="24" height="12" rx="3" transform="rotate(48 212 128)" fill="var(--fg)" />
                <circle cx="290" cy="44" r="15" fill="var(--ink-700)" stroke="var(--line)" />
                <circle cx="290" cy="44" r="5" fill="var(--accent)" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Equalizer */}
      <div aria-hidden="true" className="relative mt-4 flex h-16 items-end gap-[3px] sm:h-20">
        {bars.map((bar, i) => (
          <span
            key={i}
            ref={(el) => (barRefs.current[i] = el)}
            className={`deck-bar h-full flex-1 rounded-full bg-accent ${live ? 'is-live' : ''}`}
            style={{ animationDuration: `${bar.duration}s`, animationDelay: `${bar.delay}s`, opacity: bar.opacity }}
          />
        ))}
      </div>

      {/* Play control */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause the mix' : 'Play a mix'}
        className="absolute left-4 top-4 inline-flex h-10 items-center gap-2 rounded-full border border-line bg-ink-950/70 pl-3 pr-4 text-sm font-medium text-fg backdrop-blur transition-[background-color,border-color,transform] duration-200 hover:border-accent/60 hover:bg-ink-950/90 active:scale-[0.97]"
      >
        {playing ? (
          <PiPause size={18} aria-hidden="true" className="text-accent" />
        ) : (
          <PiPlay size={18} aria-hidden="true" className="text-accent" />
        )}
        {playing ? 'Pause' : 'Play a mix'}
      </button>
    </div>
  )
}

export default DJDeck
