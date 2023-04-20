import { BrowserRouter, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginMain from './pages/LoginMain'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LoginMain />
      <div className="fixed bottom-0">Footer</div>
    </BrowserRouter>
  )
}

export default App
