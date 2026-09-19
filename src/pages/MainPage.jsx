import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Home from '../components/Home'
import Services from '../components/Services'
import Events from '../components/Events'
import Contact from '../components/Contact'

function MainPage() {
  const { hash, key } = useLocation()

  // Deep links like /#services scroll to their section, including repeat clicks.
  useEffect(() => {
    if (!hash) return
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => clearTimeout(timer)
  }, [hash, key])

  return (
    <>
      <Home />
      <Services />
      <Events />
      <Contact />
    </>
  )
}

export default MainPage
