import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginMain from './pages/LoginMain'
import SignUpPage from './pages/SignUp'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginMain />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
