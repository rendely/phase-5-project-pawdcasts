import { useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] =  useState();
  const feed = [];
  return (
    <UserContext.Provider value={{user, setUser, feed}}>
      {children}
    </UserContext.Provider>
  );
}