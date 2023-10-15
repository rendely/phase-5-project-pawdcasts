import { useState, useEffect} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import { Nav } from './components/Nav';
import Feed from './pages/Feed';
import { MyPawds } from './pages/MyPawds';

export default function App(){
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/check_auth')
      .then(r => r.json())
      .then(d => setUser(d.user_id))
  }, [])


  if (!user) return <Login setUser={setUser} />;
  console.log(user);

  return (
    <>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/search' element={<Search />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/me' element={<MyPawds />} />
      </Routes>
      <Nav />
    </>
  )
}