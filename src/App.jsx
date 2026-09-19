import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WaveBackground from './components/WaveBackground'
import ScrollToTop from './components/ScrollToTop'
import MainPage from './pages/MainPage'
import Highlights from './pages/Highlights'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  const location = useLocation()

  return (
    <>
      <WaveBackground />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <ScrollToTop />
      <main id="main" tabIndex={-1} key={location.pathname} className="page-in outline-none">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
