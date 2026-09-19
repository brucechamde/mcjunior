import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { PiList, PiX } from 'react-icons/pi'
import ThemeToggle from './ThemeToggle'
import logo from '../assets/images/logo.png'

const navItems = [
  { label: 'Home', to: '/#home', id: 'home' },
  { label: 'Highlights', to: '/highlights', path: '/highlights' },
  { label: 'Services', to: '/#services', id: 'services' },
  { label: 'Events', to: '/#events', id: 'events' },
  { label: 'Gallery', to: '/gallery', path: '/gallery' },
  { label: 'Contact', to: '/#contact', id: 'contact' },
]

const sectionIds = navItems.filter((item) => item.id).map((item) => item.id)

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const { pathname } = useLocation()

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  // Scroll-spy: highlight the section that sits in the middle of the viewport.
  useEffect(() => {
    if (pathname !== '/') return
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isActive = (item) =>
    item.path ? pathname === item.path : pathname === '/' && activeId === item.id

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[var(--z-header)] border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'border-line bg-ink-950/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link to="/#home" aria-label="The MC Junior Project, home" className="group flex items-center">
          <img
            src={logo}
            alt=""
            width={160}
            height={58}
            className="theme-logo h-8 w-auto transition-transform duration-500 ease-out group-hover:scale-105 sm:h-9"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-10">
        <ul className="flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const active = isActive(item)
            return (
              <li key={item.label} className="relative">
                <Link
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`py-2 text-sm font-medium transition-colors duration-200 hover:text-fg ${
                    active ? 'text-fg' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                  />
                )}
              </li>
            )
          })}
        </ul>
        <ThemeToggle id="theme-desktop" />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="icon-btn md:hidden"
        >
          {menuOpen ? <PiX size={20} aria-hidden="true" /> : <PiList size={20} aria-hidden="true" />}
        </button>
      </nav>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    to={item.to}
                    aria-current={isActive(item) ? 'page' : undefined}
                    className={`block rounded-xl px-3 py-3.5 text-lg font-medium transition-colors ${
                      isActive(item) ? 'text-accent' : 'text-fg hover:bg-fg/[0.04]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-4 sm:px-6">
              <span className="text-sm text-dim">Theme</span>
              <ThemeToggle id="theme-mobile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
