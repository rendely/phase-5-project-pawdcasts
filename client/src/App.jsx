import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import Feed from './pages/Feed';
import Podcast from './pages/Podcast';
import Episode from './pages/Episode';
import { Nav } from './components/Nav';
import { MyPawds } from './pages/MyPawds';
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Routes, Route } from 'react-router-dom';


export default function App() {

  const { user } = useContext(UserContext);

  if (user=='loading') return <h2> Loading...</h2>
  if (!user) return (<Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Login />} />
  </Routes>)

  return (
    <>
      <Routes>
        <Route path='/search' element={<Search />} />
        <Route path='/me' element={<MyPawds />} />
        <Route path='/podcast/:id' element={<Podcast />} />
        <Route path='/episode/:id' element={<Episode />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Feed />} />
      </Routes>
      <Nav />
    </>
  )
}