import { useState } from 'react';

export default function Informations() {
  const getInformations = () => {
    var key = sessionStorage.getItem('key');
    if (key) {
      const userKey = JSON.parse(key);
      return userKey
    } else {
      return false;
    }
    
  };

  const [key, setKey] = useState(getInformations());

  const saveSessionInformations = (userInformations: { key: { key: any; }; }) => {
    sessionStorage.setItem('key', JSON.stringify(userInformations.key));
    setKey(userInformations.key.key);
  };

  return {
    setSessionInformations: saveSessionInformations,
    key
  };
}