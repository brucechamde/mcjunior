import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import Highlights from './pages/Highlights'
import Gallery from './pages/Gallery'

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App