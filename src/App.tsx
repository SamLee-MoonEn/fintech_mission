import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='max-w-[80%]'></div>
      <div className="fixed bottom-0">Footer</div>
    </BrowserRouter>
  )
}

export default App
