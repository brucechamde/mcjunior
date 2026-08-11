import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const navItems = [
  { label: 'Home', type: 'scroll', id: 'home' },
  { label: 'Highlights', type: 'link', path: '/highlights' },
  { label: 'Services', type: 'scroll', id: 'services' },
  { label: 'Events', type: 'scroll', id: 'events' },
  { label: 'Gallery', type: 'link', path: '/gallery' },
  { label: 'Contact', type: 'scroll', id: 'contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleScroll = (id) => {
    if (location.pathname === '/') {
      const section = document.getElementById(id)
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
    setMenuOpen(false)
  }

  const renderLink = (item) => {
    if (item.type === 'scroll') {
      return (
        <button
          onClick={() => handleScroll(item.id)}
          className="text-gray-300 font-medium hover:text-pink-400 transition-colors cursor-pointer"
        >
          {item.label}
        </button>
      )
    }
    return (
      <Link
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className="text-gray-300 font-medium hover:text-pink-400 transition-colors"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0B0B10]/80 backdrop-blur-md border-b border-white/10 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 lg:gap-8">
          {navItems.map((item) => (
            <li key={item.label}>{renderLink(item)}</li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#0B0B10]/95 backdrop-blur-md ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-4 pb-4 gap-2">
          {navItems.map((item) => (
            <li key={item.label}>{renderLink(item)}</li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header