import { useState, useEffect } from 'react'
import { ChampionsProvider } from '../src/contexts/championContext.jsx'
import { AppProvider } from '../src/contexts/appContext.jsx'
import BackgroundVideo from '../src/components/BackgroundVideo/BackgroundVideo.jsx'
import Header from '../src/components/Header/Header.jsx'
import Rules from '../src/components/Rules/Rules.jsx'
import Footer from '../src/components/Footer/Footer.jsx'
import Home from '../src/pages/Home/Home.jsx'
import './App.css'

function App() {
  const [isSupportedMonitor, setIsSupportedMonitor] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      const isWidthSupported = width >= 1700 && width <= 2543
      const isHeightSupported = height >= 700 && height <= 1371
      
      setIsSupportedMonitor(isWidthSupported && isHeightSupported)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!isSupportedMonitor) {
    return (
      <div className="work-in-progress-container">
        <div className="work-in-progress">
          🚧 Work in Progress 🚧
          <div className="work-in-progress-subtitle">
            Esta página está optimizada para resoluciones de pantalla de 24 y 27 pulgadas
          </div>
          <div className="work-in-progress-resolution">
            Resolución actual: {window.innerWidth} x {window.innerHeight}
          </div>
        </div>
      </div>
    )
  }

  return (
    <AppProvider>
      <ChampionsProvider>
        <BackgroundVideo />
        <Header />
        <Rules />
        <div className="app-container">
          <Home />
        </div>
        <Footer />
      </ChampionsProvider>
    </AppProvider>
  )
}

export default App