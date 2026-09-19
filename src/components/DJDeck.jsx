// Animated DJ deck for the hero: spinning record, swaying tonearm, pulse rings and an equalizer.
// Pure SVG + CSS (transform and opacity only), so it costs no image weight and no extra dependency.
// Everything runs on one ~124 BPM beat; reduced-motion visitors get a still frame (see index.css).

const BAR_COUNT = 30

const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
  duration: 0.72 + ((i * 37) % 7) * 0.09,
  delay: -(((i * 53) % 10) * 0.09),
  // Centre bars glow brighter, the edges fade out
  opacity: 0.35 + 0.65 * (1 - Math.abs(i - (BAR_COUNT - 1) / 2) / ((BAR_COUNT - 1) / 2)),
}))

const grooves = [112, 105, 98, 91, 84, 77, 70, 63, 56, 49, 42]

function DJDeck() {
  return (
    <div aria-hidden="true" className="deck panel relative flex size-full flex-col overflow-hidden p-5 sm:p-6">
      {/* Soft spotlight behind the platter */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 45% at 50% 38%, rgb(232 87 127 / 0.16), transparent)' }}
      />

      <div className="relative grid min-h-0 flex-1 place-items-center">
        {/* Beat rings */}
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            className="deck-ring absolute aspect-square w-[62%] rounded-full border border-accent/40"
            style={{ animationDelay: `${n * 1.3}s` }}
          />
        ))}

        <svg viewBox="0 0 320 300" className="relative w-full max-w-[26rem] overflow-visible">
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

          {/* Tonearm */}
          <g className="deck-arm" style={{ transformOrigin: '290px 44px' }}>
            <line x1="290" y1="44" x2="214" y2="128" stroke="var(--muted)" strokeWidth="5" strokeLinecap="round" />
            <rect x="200" y="122" width="24" height="12" rx="3" transform="rotate(48 212 128)" fill="var(--fg)" />
            <circle cx="290" cy="44" r="15" fill="var(--ink-700)" stroke="var(--line)" />
            <circle cx="290" cy="44" r="5" fill="var(--accent)" />
          </g>
        </svg>
      </div>

      {/* Equalizer */}
      <div className="relative mt-4 flex h-16 items-end gap-[3px] sm:h-20">
        {bars.map((bar, i) => (
          <span
            key={i}
            className="deck-bar h-full flex-1 rounded-full bg-accent"
            style={{ animationDuration: `${bar.duration}s`, animationDelay: `${bar.delay}s`, opacity: bar.opacity }}
          />
        ))}
      </div>
    </div>
  )
}

export default DJDeck
