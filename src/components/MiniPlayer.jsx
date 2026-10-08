import { motion } from 'motion/react'
import { PiPause, PiPlay, PiSkipBack, PiSkipForward, PiX } from 'react-icons/pi'

import { next, prev, seek, stop, toggle } from '../audio/engine'
import { formatTime } from '../audio/format'
import { usePlayer } from '../audio/usePlayer'
import { mixes } from '../data/mixes'

// Floating player. Appears once a mix has been started and stays while people browse other pages.
function MiniPlayer() {
  const { index, playing, currentTime, duration, error } = usePlayer()
  if (index === null) return null

  const mix = mixes[index]
  const length = duration || mix.seconds

  return (
    <motion.div
      role="region"
      aria-label="Music player"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 bottom-3 z-[var(--z-header)] mx-auto max-w-xl"
    >
      <div className="panel flex flex-col gap-2 p-3 pb-2.5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1 pl-1">
            <p className="truncate text-sm font-medium" role="status">
              {error ? "Couldn't load this track" : mix.title}
            </p>
            <p className="truncate text-xs text-dim">{mix.artist}</p>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" onClick={prev} aria-label="Previous track" className="icon-btn !size-9">
              <PiSkipBack size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause' : 'Play'}
              className="grid size-10 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {playing ? <PiPause size={20} aria-hidden="true" /> : <PiPlay size={20} aria-hidden="true" />}
            </button>
            <button type="button" onClick={next} aria-label="Next track" className="icon-btn !size-9">
              <PiSkipForward size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={stop} aria-label="Close player" className="icon-btn !size-9 ml-1">
              <PiX size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-1 text-xs tabular-nums text-dim">
          <span className="w-9 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={length}
            step={0.1}
            value={Math.min(currentTime, length)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek"
            className="h-1 min-w-0 flex-1 cursor-pointer accent-accent"
          />
          <span className="w-9">{formatTime(length)}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default MiniPlayer
