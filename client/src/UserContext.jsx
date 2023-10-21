import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState();

  useEffect(() => {
    updateUser()
  }, [])

  function updateUser(){
    fetch('/api/check_auth')
    .then(r => {
      if (r.status === 201) return r.json()
      throw new Error('Not authorized failed')      
    })
    .then(d => setUser(d))
    .catch((error) => console.log(error))
  }

  function logout(){
    fetch('/api/logout')
    .then(setUser(null))
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}