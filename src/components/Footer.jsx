import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <p className="text-sm">
          © {new Date().getFullYear()} Bruce. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/highlights" className="hover:text-white transition-colors">Highlights</Link>
        <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
        </div>

        <div className="flex gap-5">
          
            <a href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          
            <a href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          
            <a href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:text-white transition-colors"
          >
            <FaTiktok size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer