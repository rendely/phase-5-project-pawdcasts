import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Search from './pages/Search'
import { Nav } from './components/Nav'
import Feed from './pages/Feed'

function App() {

  return (
    <div>      
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/search' element={<Search />} />
      <Route path='/feed' element={<Feed />} />
    </Routes>
    <Nav />
    </div>
  )
}

export default App
