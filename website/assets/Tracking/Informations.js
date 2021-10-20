import { useState } from 'react';

export default function Informations() {
  const getInformations = () => {
    var idString = sessionStorage.getItem('id');
    var firstNameString = sessionStorage.getItem('first_name');
    var lastNameString = sessionStorage.getItem('last_name');
    var emailString = sessionStorage.getItem('email');
    var phoneString = sessionStorage.getItem('phone');
    var alertStockEmailString = sessionStorage.getItem('alert_stock_email');
    var alertPriceEmailString = sessionStorage.getItem('alert_price_email');
    var alertStockSmsString = sessionStorage.getItem('alert_stock_sms');
    var alertPriceSmsString = sessionStorage.getItem('alert_price_sms');
    if (!idString) {
      idString = localStorage.getItem('id');
      firstNameString = localStorage.getItem('first_name');
      lastNameString = localStorage.getItem('last_name');
      emailString = localStorage.getItem('email');
      phoneString = localStorage.getItem('phone');
      alertStockEmailString = localStorage.getItem('alert_stock_email');
      alertPriceEmailString = localStorage.getItem('alert_price_email');
      alertStockSmsString = localStorage.getItem('alert_stock_sms');
      alertPriceEmailString = localStorage.getItem('alert_price_sms');
    }
    const userId = JSON.parse(idString);
    const userFirstName = JSON.parse(firstNameString);
    const userLastName = JSON.parse(lastNameString);
    const userEmail = JSON.parse(emailString);
    const userPhone = JSON.parse(phoneString);
    const userAlertStockEmail = JSON.parse(alertStockEmailString);
    const userAlertPriceEmail = JSON.parse(alertPriceEmailString);
    const userAlertStockSms = JSON.parse(alertStockSmsString);
    const userAlertPriceSms = JSON.parse(alertPriceSmsString);
    return [
      userId?.id, 
      userFirstName?.first_name,
      userLastName?.last_name,
      userEmail?.email,
      userPhone?.phone,
      userAlertStockEmail?.alert_stock_email,
      userAlertPriceEmail?.alert_price_email,
      userAlertStockSms?.alert_stock_sms,
      userAlertPriceSms?.alert_price_sms,
    ]
  };

  const [id, setId] = useState(getInformations()[0]);
  const [firstName, setFirstName] = useState(getInformations()[1]);
  const [lastName, setLastName] = useState(getInformations()[2]);
  const [email, setEmail] = useState(getInformations()[3]);
  const [phone, setPhone] = useState(getInformations()[4]);
  const [alertStockEmail, setAlertStockEmail] = useState(getInformations()[5]);
  const [alertPriceEmail, setAlertPriceEmail] = useState(getInformations()[6]);
  const [alertStockSms, setAlertStockSms] = useState(getInformations()[7]);
  const [alertPriceSms, setAlertPriceSms] = useState(getInformations()[8]);

  const saveLocalInformations = userInformations => {
    localStorage.setItem('id', JSON.stringify(userInformations.id));
    localStorage.setItem('first_name', JSON.stringify(userInformations.first_name));
    localStorage.setItem('last_name', JSON.stringify(userInformations.last_name));
    localStorage.setItem('email', JSON.stringify(userInformations.email));
    localStorage.setItem('phone', JSON.stringify(userInformations.phone));
    localStorage.setItem('alert_stock_email', JSON.stringify(userInformations.alert_stock_email));
    localStorage.setItem('alert_price_email', JSON.stringify(userInformations.alert_price_email));
    localStorage.setItem('alert_stock_sms', JSON.stringify(userInformations.alert_stock_sms));
    localStorage.setItem('alert_price_sms', JSON.stringify(userInformations.alert_price_sms));
    setId(userInformations.id.id);
    setFirstName(userInformations.first_name.first_name);
    setLastName(userInformations.last_name.last_name);
    setEmail(userInformations.email.email);
    setPhone(userInformations.phone.phone);
    setAlertStockEmail(userInformations.alert_stock_email.alert_stock_email);
    setAlertPriceEmail(userInformations.alert_price_email.alert_price_email);
    setAlertStockSms(userInformations.alert_stock_sms.alert_stock_sms);
    setAlertPriceSms(userInformations.alert_price_sms.alert_price_sms);
  };

  const saveSessionInformations = userInformations => {
    sessionStorage.setItem('id', JSON.stringify(userInformations.id));
    sessionStorage.setItem('first_name', JSON.stringify(userInformations.first_name));
    sessionStorage.setItem('last_name', JSON.stringify(userInformations.last_name));
    sessionStorage.setItem('email', JSON.stringify(userInformations.email));
    sessionStorage.setItem('phone', JSON.stringify(userInformations.phone));
    sessionStorage.setItem('alert_stock_email', JSON.stringify(userInformations.alert_stock_email));
    sessionStorage.setItem('alert_price_email', JSON.stringify(userInformations.alert_price_email));
    sessionStorage.setItem('alert_stock_sms', JSON.stringify(userInformations.alert_stock_sms));
    sessionStorage.setItem('alert_price_sms', JSON.stringify(userInformations.alert_price_sms));
    setId(userInformations.id.id);
    setFirstName(userInformations.first_name.first_name);
    setLastName(userInformations.last_name.last_name);
    setEmail(userInformations.email.email);
    setPhone(userInformations.phone.phone);
    setAlertStockEmail(userInformations.alert_stock_email.alert_stock_email);
    setAlertPriceEmail(userInformations.alert_price_email.alert_price_email);
    setAlertStockSms(userInformations.alert_stock_sms.alert_stock_sms);
    setAlertPriceSms(userInformations.alert_price_sms.alert_price_sms);
  };

  return {
    setLocalInformations: saveLocalInformations,
    setSessionInformations: saveSessionInformations,
    id,
    firstName,
    lastName,
    email,
    phone,
    alertStockEmail,
    alertPriceEmail,
    alertStockSms,
    alertPriceSms
  }
}