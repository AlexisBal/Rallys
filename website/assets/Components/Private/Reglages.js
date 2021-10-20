import React, {useRef, useState} from 'react';
import {Button, Accordion, Card, useAccordionToggle, InputGroup, FormControl} from 'react-bootstrap';
import {BsFillBellFill} from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { IconContext } from "react-icons";

import { useAuth } from "../../Tracking/Auth";


function Reglages () {

  const { token, firstName, lastName, id, phone, email, alertStockEmail, alertPriceEmail, alertPriceSms, alertStockSms, setSessionInformations } = useAuth();
  const phoneInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [errorPhone, setErrorPhone] = useState("");

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);
    return (
      <Button
        style={{marginTop: "20px"}}
        variant="outline-primary"
        onClick={decoratedOnClick}
      >
       {children}
      </Button>
    );
  }
  
  var buttonStockEmail = "";
  var buttonPriceEmail = "";
  var textStockEmail = "";
  var textPriceEmail = "";
  var buttonStockSms = "";
  var buttonPriceSms = "";
  var textStockSms = "";
  var textPriceSms = "";

  if(alertPriceEmail) {
    buttonPriceEmail = "outline-success";
    textPriceEmail = "Alerte prix activée";
  }
  else{
    buttonPriceEmail = "outline-danger";
    textPriceEmail = "Alerte prix désactivée";
  }
  if(alertStockEmail) {
    buttonStockEmail = "outline-success";
    textStockEmail = "Alerte stock activée";
  }
  else{
    buttonStockEmail = "outline-danger";
    textStockEmail = "Alerte stock désactivée";
  }

  if(alertPriceSms) {
    buttonPriceSms = "outline-success";
    textPriceSms = "Alerte prix activée";
  }
  else{
    buttonPriceSms = "outline-danger";
    textPriceSms = "Alerte prix désactivée";
  }
  if(alertStockSms) {
    buttonStockSms = "outline-success";
    textStockSms = "Alerte stock activée";
  }
  else{
    buttonStockSms = "outline-danger";
    textStockSms = "Alerte stock désactivée";
  }

  const handleUpdateSettings = (requete) => {
    return profilesService.updateSettings(
      requete,
      id, 
      token
    )
  }

  const updateAlertStockEmail = () => {
    var alert = false;
    if(!alertStockEmail) {
      alert = true;
    }
    setSessionInformations({
      id: {id: id},
      first_name: {first_name: firstName},
      last_name: {last_name: lastName},
      email: {email: email},
      phone: {phone: phone},
      alert_stock_email: {alert_stock_email: alert},
      alert_price_email: {alert_price_email: alertPriceEmail},
      alert_stock_sms: {alert_stock_sms: alertStockSms},
      alert_price_sms: {alert_price_sms: alertPriceSms}
    })
    handleUpdateSettings({
      phone: phone,
      alert_stock_email: alert,
      alert_price_email: alertPriceEmail,
      alert_stock_sms: alertStockSms,
      alert_price_sms: alertPriceSms
    });
  }

  const updateAlertPriceEmail = () => {
    var alert = false;
    if(!alertPriceEmail) {
      alert = true;
    }
    setSessionInformations({
      id: {id: id},
      first_name: {first_name: firstName},
      last_name: {last_name: lastName},
      email: {email: email},
      phone: {phone: phone},
      alert_stock_email: {alert_stock_email: alertStockEmail},
      alert_price_email: {alert_price_email: alert},
      alert_stock_sms: {alert_stock_sms: alertStockSms},
      alert_price_sms: {alert_price_sms: alertPriceSms}
    })
    handleUpdateSettings({
      phone: phone,
      alert_stock_email: alertStockEmail,
      alert_price_email: alert,
      alert_stock_sms: alertStockSms,
      alert_price_sms: alertPriceSms
    });
  }

  const updateAlertStockSms = () => {
    var alert = false;
    if(!alertStockSms) {
      alert = true;
    }
    setSessionInformations({
      id: {id: id},
      first_name: {first_name: firstName},
      last_name: {last_name: lastName},
      email: {email: email},
      phone: {phone: phone},
      alert_stock_email: {alert_stock_email: alertStockEmail},
      alert_price_email: {alert_price_email: alertPriceEmail},
      alert_stock_sms: {alert_stock_sms: alert},
      alert_price_sms: {alert_price_sms: alertPriceSms}
    })
    handleUpdateSettings({
      phone: phone,
      alert_stock_email: alertStockEmail,
      alert_price_email: alertPriceEmail,
      alert_stock_sms: alert,
      alert_price_sms: alertPriceSms
    });
  }

  const updateAlertPriceSms = () => {
    var alert = false;
    if(!alertPriceSms) {
      alert = true;
    }
    setSessionInformations({
      id: {id: id},
      first_name: {first_name: firstName},
      last_name: {last_name: lastName},
      email: {email: email},
      phone: {phone: phone},
      alert_stock_email: {alert_stock_email: alertStockEmail},
      alert_price_email: {alert_price_email: alertPriceEmail},
      alert_stock_sms: {alert_stock_sms: alertStockSms},
      alert_price_sms: {alert_price_sms: alert}
    })
    handleUpdateSettings({
      phone: phone,
      alert_stock_email: alertStockEmail,
      alert_price_email: alertPriceEmail,
      alert_stock_sms: alertStockSms,
      alert_price_sms: alert
    });
  }

  const changePhone  = () => {
    setPhoneNumber(false)
  }

  const updatePhone = () => {
    handleUpdateSettings({
      phone: phoneInput.current.value,
      alert_stock_email: alertStockEmail,
      alert_price_email: alertPriceEmail,
      alert_stock_sms: alertStockSms,
      alert_price_sms: alertPriceSms
    }).then(() => {
      setSessionInformations({
        id: {id: id},
        first_name: {first_name: firstName},
        last_name: {last_name: lastName},
        email: {email: email},
        phone: {phone: phoneInput.current.value},
        alert_stock_email: {alert_stock_email: alertStockEmail},
        alert_price_email: {alert_price_email: alertPriceEmail},
        alert_stock_sms: {alert_stock_sms: alertStockSms},
        alert_price_sms: {alert_price_sms: alertPriceSms}
      });
      setPhoneNumber(true);
    }).catch(()=>{ 
      let err = <strong className="error">Ce téléphone est déjà utilisé !</strong>;
      setErrorPhone(err);
    });
  }

  var StatutPhone;
  var ButtonPhone;
  if (phone) {
    StatutPhone = <text>Vous recevez les alertes Fastocks au <strong>{phone}</strong></text>;
    ButtonPhone = "Gérer mes alertes";
  }
  else {
    StatutPhone = <text>Vous ne recevez pas encore vos alertes par sms.</text>;
    ButtonPhone = "Activer les SMS";
  }
  
  function PhoneCardBody() {
    if (phoneNumber) {
      return (
        <Card.Body>
          <div>
            <h3>Cliquer pour activer ou desactiver une alerte</h3>
            <Button style={{margin: "20px"}} variant={buttonStockSms} onClick={updateAlertStockSms}>{textStockSms}</Button>
            <Button style={{margin: "20px"}} variant={buttonPriceSms} onClick={updateAlertPriceSms}>{textPriceSms}</Button>
          </div>
          <Button style={{marginTop: "20px"}} onClick={changePhone}>Modifier le numéro de téléphone</Button>
        </Card.Body>
      );
    }
    else {
      return (
        <Card.Body>
          <InputGroup >
            <FormControl 
              placeholder="Numéro de téléphone (+33698568971)"
              className="form-control"
              ref={phoneInput}
            />
            <InputGroup.Append>
              <Button variant="outline-success" onClick={updatePhone}>Valider</Button>
            </InputGroup.Append>
          </InputGroup>
          {errorPhone}
        </Card.Body>
      );
    }
  }

  return (
    <body id='settings-body'>
      <div className='safe-container'>
        <h1>Mes préférences</h1>
        <main className="form-settings text-center">
          <Accordion defaultActiveKey="0" id="alert-mail">
            <Card>
              <Card.Header style={{backgroundColor: "white"}}>
                <IconContext.Provider value={{ color: "white", className: "alert-mail-logo"}}>
                  <div>
                    <BsFillBellFill />
                  </div>
                </IconContext.Provider>
                <h2>Mes alertes par mail</h2> 
                <div> 
                  <text>Vous recevez les alertes Fastocks sur <strong>{email}</strong></text>    
                </div>
                <CustomToggle eventKey="1">Gérer mes alertes</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <h3>Cliquer pour activer ou desactiver une alerte</h3>
                  <Button style={{margin: "20px"}} variant={buttonStockEmail} onClick={updateAlertStockEmail}>{textStockEmail}</Button>
                  <Button style={{margin: "20px"}} variant={buttonPriceEmail} onClick={updateAlertPriceEmail}>{textPriceEmail}</Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion defaultActiveKey="0" id="alert-sms">
            <Card>
              <Card.Header style={{backgroundColor: "white"}}>
                <IconContext.Provider value={{ color: "white", className: "alert-sms-logo"}}>
                  <div>
                    <MdPhoneIphone/>
                  </div>
                </IconContext.Provider>
                <h2>Mes alertes par SMS</h2> 
                <div> 
                  {StatutPhone}
                </div>
                <CustomToggle eventKey="1">{ButtonPhone}</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <PhoneCardBody />
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </main>
      </div>
    </body>
  );
}

export default Reglages;