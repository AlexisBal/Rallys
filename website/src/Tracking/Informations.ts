import { useState } from 'react';

export default function Informations() {
  const getKey = () => {
    var key = sessionStorage.getItem('key');
    if (key) {
      const userKey = JSON.parse(key);
      return userKey
    } 
    return false;
  };

  const getRallye = () => {
    var rallyeCreation = localStorage.getItem('rallye_creation');
    if (rallyeCreation) {
      const userRallyeCreation = JSON.parse(rallyeCreation);
      return userRallyeCreation
    }
    return false;
  };

  const [key, setKey] = useState(getKey());
  const [rallye, setRallye] = useState(getRallye());

  const saveSessionInformations = (userKey: { key: false | any; }) => {
    sessionStorage.setItem('key', JSON.stringify(userKey.key));
    setKey(userKey.key);
  };

  const saveLocalInformations = (userRallye: any) => {
    localStorage.setItem('rallye_creation', JSON.stringify(userRallye));
    setRallye(userRallye)
  };

  return {
    setSessionInformations: saveSessionInformations,
    setLocalInformations: saveLocalInformations,
    rallye,
    key
  }
}