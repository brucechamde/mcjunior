import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Home from '../components/Home'
import Services from '../components/Services'
import Events from '../components/Events'
import Contact from '../components/Contact'

function MainPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo)
      if (section) {
        setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [location])

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