import { useState, useEffect } from 'react'
import { ChampionsProvider } from './contexts/championContext.jsx'
import { AppProvider } from './contexts/appContext.jsx'
import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo.jsx'
import Header from './components/Header/Header.jsx'
import Rules from './components/Rules/Rules.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import './App.css'

function App() {
  const [isSupportedMonitor, setIsSupportedMonitor] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Rangos específicos permitidos: 1700x828 hasta 1900x894
      const isWidthSupported = width >= 1700 && width <= 1900
      const isHeightSupported = height >= 700 && height <= 900
      
      setIsSupportedMonitor(isWidthSupported && isHeightSupported)
    }

    // Verificar al cargar
    checkScreenSize()

    // Verificar al redimensionar
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Si no está en el rango permitido, mostrar mensaje de Work in Progress
  if (!isSupportedMonitor) {
    return (
      <div className="work-in-progress-container">
        <div className="work-in-progress">
          🚧 Work in Progress 🚧
          <div className="work-in-progress-subtitle">
            Esta página está optimizada para resoluciones entre 1700x828 y 1900x894
          </div>
          <div className="work-in-progress-resolution">
            Resolución actual: {window.innerWidth} x {window.innerHeight}
          </div>
        </div>
      </div>
    )
  }

  // Contenido normal para resoluciones compatibles
  return (
    <>
      <BackgroundVideo />
      <AppProvider>
        <ChampionsProvider>
          <Header />
          <Rules />
          <div className="app-container">
            <Home />
          </div>
          <Footer />
        </ChampionsProvider>
      </AppProvider>
    </>
  )
}

export default App