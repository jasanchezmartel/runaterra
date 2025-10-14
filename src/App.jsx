import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo"
import './index.css'

function App() {

  return (
    <>
      <BackgroundVideo />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/homeneiro" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
