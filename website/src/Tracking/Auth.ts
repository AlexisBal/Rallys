import { createContext, useContext } from 'react';

interface AuthContextType {
  keybis: any;
  signin: (key: any) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

