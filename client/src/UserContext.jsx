import { createContext } from 'react';

export const UserContext = createContext(null);


export const UserProvider = ({children}) => {
  return (
    <UserContext.Provider value={{id: 1, email:'test@test.com'}}>
      {children}
    </UserContext.Provider>
  );
}