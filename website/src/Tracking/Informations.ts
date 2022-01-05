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

  const saveSessionInformations = (userKey: { key: false | any; }) => {
    sessionStorage.setItem('key', JSON.stringify(userKey));
    setKey(userKey.key);
  };

  return {
    setSessionInformations: saveSessionInformations,
    key
  };
}