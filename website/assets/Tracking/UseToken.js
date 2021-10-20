import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    var tokenString = sessionStorage.getItem('token');
    if (!tokenString) {
      tokenString = localStorage.getItem('token');
    }
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveLocalToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const saveSessionToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setLocalToken: saveLocalToken,
    setSessionToken: saveSessionToken,
    token
  }
}