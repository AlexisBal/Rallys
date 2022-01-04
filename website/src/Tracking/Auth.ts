import { createContext, useContext } from 'react';

interface AuthContextType {
  key: any;
  setSessionInformations: (key: any) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

