import { Link } from 'react-router-dom'
import { PiArrowLeft } from 'react-icons/pi'

import Ambient from '../components/Ambient'

function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <Ambient />
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-8xl font-semibold tracking-tighter text-accent sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">This page isn't on the lineup</h1>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
          The link may be old or mistyped. Head back to the main page to find what you need.
        </p>
        <Link to="/" className="btn-primary mt-9">
          <PiArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
