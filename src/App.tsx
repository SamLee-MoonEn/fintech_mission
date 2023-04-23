import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginMain from './pages/LoginMain'
import SignUp from './pages/SignUp'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginMain />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <div className="fixed bottom-0">Footer</div>
    </BrowserRouter>
  )
}

export default App
