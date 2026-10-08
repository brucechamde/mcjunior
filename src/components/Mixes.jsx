import { PiPause, PiPlay } from 'react-icons/pi'

import { play, toggle } from '../audio/engine'
import { formatTime } from '../audio/format'
import { usePlayer } from '../audio/usePlayer'
import { mixes } from '../data/mixes'
import Reveal from './Reveal'

function Mixes() {
  const { index, playing, currentTime, duration } = usePlayer()

  return (
    <section id="mixes" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">Mixes</h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            Press play to hear the sound. The deck and the background move with the music.
          </p>
        </Reveal>

        <Reveal delay={120} className="panel mt-12 overflow-hidden lg:mt-14">
          <ul className="divide-y divide-line">
            {mixes.map((mix, i) => {
              const active = index === i
              const isPlaying = active && playing
              const progress = active ? Math.min(1, currentTime / (duration || mix.seconds)) : 0

              return (
                <li key={mix.id}>
                  <button
                    type="button"
                    onClick={() => (active ? toggle() : play(i))}
                    aria-label={`${isPlaying ? 'Pause' : 'Play'} ${mix.title}`}
                    className={`group relative grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-fg/[0.04] sm:px-6 ${
                      active ? 'bg-fg/[0.04]' : ''
                    }`}
                  >
                    <span
                      className={`grid size-11 place-items-center rounded-full border transition-colors duration-200 ${
                        active
                          ? 'border-accent bg-accent text-on-accent'
                          : 'border-line text-fg group-hover:border-accent/60 group-hover:text-accent'
                      }`}
                    >
                      {isPlaying ? (
                        <PiPause size={20} aria-hidden="true" />
                      ) : (
                        <PiPlay size={20} aria-hidden="true" />
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate font-medium">{mix.title}</span>
                      <span className="mt-0.5 block truncate text-sm text-dim">
                        {mix.artist}, {mix.style}
                      </span>
                    </span>

                    <span className="flex items-center gap-4 text-sm tabular-nums text-dim">
                      {isPlaying && (
                        <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
                          {[0, 0.25, 0.5].map((delay) => (
                            <span
                              key={delay}
                              className="deck-bar h-full w-[3px] rounded-full bg-accent"
                              style={{ animationDelay: `${delay}s`, animationDuration: '0.8s' }}
                            />
                          ))}
                        </span>
                      )}
                      <span className="hidden sm:inline">{mix.bpm} BPM</span>
                      <span>{formatTime(mix.seconds)}</span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-0.5 origin-left bg-accent transition-transform duration-300 ease-linear"
                      style={{ width: '100%', transform: `scaleX(${progress})` }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default Mixes
