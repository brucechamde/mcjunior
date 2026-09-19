import { motion } from 'motion/react'

// Fades and lifts content in once, the first time it scrolls into view.
// Sequence (via `delay`) tells the eye what to read first.
function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...rest }) {
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Reveal
