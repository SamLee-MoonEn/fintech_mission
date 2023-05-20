import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginMain from './pages/LoginMain'
import SignUpPage from './pages/SignUp'
import MainPage from './pages/MainPage'
import AccountInfo from './pages/AccountInfo'
import ExpenseInfo from './pages/ExpenseInfo'
import Sidebar from './components/Sidebar'
import StockInfo from './pages/StockInfo'

function App() {
  return (
    <BrowserRouter>
      <main className="drawer drawer-end">
        <input id="drawer" type="checkbox" className=" drawer-toggle" />
        <section className=" drawer-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginMain />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/accountinfo" element={<AccountInfo />} />
            <Route path="/expenseinfo" element={<ExpenseInfo />} />
            <Route path="/stockinfo" element={<StockInfo />} />
          </Routes>
        </section>
        <Sidebar />
      </main>
    </BrowserRouter>
  )
}

export default App
