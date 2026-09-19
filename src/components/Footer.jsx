import { Link } from 'react-router-dom'
// Brand logos from Simple Icons (CC0), bundled with react-icons
import { SiFacebook, SiInstagram, SiTiktok } from 'react-icons/si'
import logo from '../assets/images/logo.png'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Highlights', to: '/highlights' },
  { label: 'Gallery', to: '/gallery' },
]

const legal = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]

const socials = [
  { label: 'Instagram', icon: SiInstagram, href: 'https://www.facebook.com/share/1CgoVEDnN4/' },
  { label: 'Facebook', icon: SiFacebook, href: 'https://www.facebook.com/share/1CgoVEDnN4/' },
  { label: 'TikTok', icon: SiTiktok, href: 'https://www.tiktok.com/@mcjuniorproject?_r=1&_t=ZS-98mwt2icCmq' },
]

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Link to="/" aria-label="The MC Junior Project, home">
            <img src={logo} alt="" width={160} height={58} className="theme-logo h-8 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-dim">© {new Date().getFullYear()} Bruce. All rights reserved.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-4 text-sm">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex gap-8">
            {legal.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-dim transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3">
          {socials.map(({ label, icon: Icon, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="icon-btn hover:!border-accent/60 hover:text-accent"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
