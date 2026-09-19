import { useRef } from 'react'
import { motion } from 'motion/react'
import { PiDesktop, PiMoon, PiSun } from 'react-icons/pi'

import { useTheme } from './useTheme'

const options = [
  { value: 'system', label: 'Match device theme', icon: PiDesktop },
  { value: 'light', label: 'Light theme', icon: PiSun },
  { value: 'dark', label: 'Dark theme', icon: PiMoon },
]

// Three-way switch: device, light, dark. `id` keeps the sliding highlight separate per instance.
function ThemeToggle({ id = 'theme' }) {
  const { preference, setTheme } = useTheme()
  const refs = useRef([])

  const handleKeyDown = (e, index) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (index + step + options.length) % options.length
    setTheme(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="inline-flex rounded-full border border-line bg-fg/[0.04] p-0.5"
    >
      {options.map(({ value, label, icon: Icon }, i) => {
        const selected = preference === value
        return (
          <button
            key={value}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            tabIndex={selected ? 0 : -1}
            onClick={() => setTheme(value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`relative grid size-8 place-items-center rounded-full transition-colors duration-200 ${
              selected ? 'text-on-accent' : 'text-muted hover:text-fg'
            }`}
          >
            {selected && (
              <motion.span
                layoutId={`${id}-pill`}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                className="absolute inset-0 rounded-full bg-accent"
              />
            )}
            <Icon size={16} aria-hidden="true" className="relative" />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggle
