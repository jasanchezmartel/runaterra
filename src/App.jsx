import React from 'react'
import { ChampionsProvider } from './contexts/championContext.jsx'
import { AppProvider } from './contexts/appContext.jsx'
import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo.jsx'
import Header from './components/Header/Header.jsx'
import Rules from './components/Rules/Rules.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'

function App() {
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