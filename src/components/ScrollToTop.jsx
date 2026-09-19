import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// New page starts at the top, unless the link carries a #section hash.
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
    // Only reset on route change, not when the hash changes within a page.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}

export default ScrollToTop
