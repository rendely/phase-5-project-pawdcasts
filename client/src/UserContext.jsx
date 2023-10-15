import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/api/check_auth')
      .then(r => r.json())
      .then(d => setUser(d))
  }, [])


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}