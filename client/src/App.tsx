import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import { Nav } from './components/Nav';
import Feed from './pages/Feed';
import { MyPawds } from './pages/MyPawds';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/me' element={<MyPawds />} />
      </Routes>
      <Nav />
    </>
  )
}

export default App;