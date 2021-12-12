import { useState } from 'react';

export default function Informations() {
  const getInformations = () => {
    var publicKeyString = sessionStorage.getItem('key');
    var emailString = sessionStorage.getItem('email');
    const userPublicKey = JSON.parse(publicKeyString);
    const userEmail = JSON.parse(emailString);
    return [
      userPublicKey?.key, 
      userEmail?.email,
    ]
  };

  const [key, setKey] = useState(getInformations()[0]);;
  const [email, setEmail] = useState(getInformations()[1]);

  const saveSessionInformations = userInformations => {
    sessionStorage.setItem('key', JSON.stringify(userInformations.key));
    sessionStorage.setItem('email', JSON.stringify(userInformations.email));
    setKey(userInformations.key.key);
    setEmail(userInformations.email.email);
  };

  return {
    setSessionInformations: saveSessionInformations,
    key,
    email,
  }
}