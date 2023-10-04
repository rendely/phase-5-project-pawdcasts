import { createContext } from 'react';


interface UserContextType {
  id: number;
  email: string;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
  return (
    <UserContext.Provider value={{id: 1, email:'test@test.com'}}>
      {children}
    </UserContext.Provider>
  );
}