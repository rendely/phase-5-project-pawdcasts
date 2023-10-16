import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import { Nav } from './components/Nav';
import Feed from './pages/Feed';
import { MyPawds } from './pages/MyPawds';
import { UserContext } from "./UserContext";
import { useContext } from "react";


export default function App() {

  const { user, setUser } = useContext(UserContext);

  if (!user) return <Login />;

  return (
    <>
      <Routes>
        <Route path='/search' element={<Search />} />
        <Route path='/me' element={<MyPawds />} />
        <Route path='/' element={<Feed />} />
      </Routes>
      <Nav />
    </>
  )
}