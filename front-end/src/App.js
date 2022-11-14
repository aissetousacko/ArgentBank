import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './styles/index.css'
import './styles/home.css'
import './styles/login.css'
import './styles/profile.css'
import { Provider } from 'react-redux'
import { store } from './app/store'

function App() {
  return (
    <div className="content">
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
