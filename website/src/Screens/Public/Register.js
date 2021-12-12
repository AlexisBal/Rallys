import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import fr from 'date-fns/locale/fr';

import { useAuth } from "../../Tracking/Auth";


// Réglage de la langue du calendrier
registerLocale('fr', fr)

function Register() {
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errorMail, setErrorMail] = useState(true);
    const [errorPwd, setErrorPwd] = useState(true);
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePwd, setErrorMessagePwd] = useState("");
    const { setSessionToken, token,  setSessionInformations } = useAuth();

    if (token) {
      return <Redirect to={"/myaccount"} />;
    }

    const handleSubmit = async e => {
      e.preventDefault();
      
      // vérification des emails entrées 
      if (email === emailConfirm) {
        setErrorMail(false);
        // vérification des mots de passe entrés 
        if (password === passwordConfirm) {
          if (password.length >= 8) {
            var x;
            var y;
            var checked1 = false;
            var checked2 = false;
            const symbols = ['#', '@', '&', '§', '!', '°', '*', '$', '¥', '€', '£', '%', '?', ';', '.', ':', '/', '+', '=', '<', '>', '-', '_', '{', '}', '(', ')', '[', ']']
            for (x=0;x<10;x++) {
              if (password.indexOf(x) !== -1) {
                checked1 = true;
                break;
              }
            }
            if (!checked1) {
              let err = <strong className="error">Le mot de passe doit contenir au minimum 1 chiffre !</strong>;
              setErrorMessagePwd(err);
              setErrorPwd(true);
            }
            for (y in symbols) {
              if (password.indexOf(symbols[y]) !== -1) {
                checked2 = true;
                break;
              }
            }
            if (!checked2) {
              let err = <strong className="error">Le mot de passe doit contenir au minimum 1 caractère spécial !</strong>;
              setErrorMessagePwd(err);
              setErrorPwd(true);
            }
            else {
              setErrorPwd(false);

              // Formatage Date 
              var jour = birthDate.getDate().toString(); 
              if (jour.length === 1) {
                jour = "0" + jour;
              }
              var mois = (birthDate.getMonth()+1).toString();
              if (mois.length === 1) {
                mois = "0" + mois;
              }
              var annee = birthDate.getFullYear().toString(); 
              const date = annee+'-'+mois+'-'+jour

              // Requete API 
              profilesService.register({
                "gender": gender,
                "birth_date": date,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password": password
              }).then((result)=>{
                setSessionToken({token: result.data.token});
                setSessionInformations({
                  id: {id: result.data.id_user},
                  first_name: {first_name: result.data.first_name},
                  last_name: {last_name: result.data.last_name},
                  email: {email: result.data.email},
                  phone: {phone: result.data.phone},
                  alert_stock_email: {alert_stock_email: result.data.alert_stock_email},
                  alert_price_email: {alert_price_email: result.data.alert_price_email},
                  alert_stock_sms: {alert_stock_sms: result.data.alert_stock_sms},
                  alert_price_sms: {alert_price_sms: result.data.alert_price_sms}
                })
                setLoggedIn(true);
              }).catch(()=>{ 
                let err = <strong className="error">L'adresse mail utilisée existe déjà !</strong>;
                setErrorMessageEmail(err);
                setErrorMail(true);
              });
            }
          }
          else{
            let err = <strong className="error">Le mot de passe doit contenir au minimum 8 caractères !</strong>;
            setErrorMessagePwd(err);
            setErrorPwd(true);
          }
        }
        else {
          let err = <strong className="error">Les mots de passe saisis sont différents !</strong>;
          setErrorMessagePwd(err);
          setErrorPwd(true);
        }
      }
      else {
        let err = <strong className="error">Les adresses email saisies sont différentes !</strong>;
        setErrorMessageEmail(err);
        setErrorMail(true);
      }

      if (!errorPwd) {
        setErrorMessagePwd("");
      }
      if (!errorMail) {
        setErrorMessageEmail("");
      }
    }

    if (isLoggedIn) {
      return <Redirect to={"/myaccount"} />;
    }

    var DateMax = new Date();

    return (
      <body className="text-center">
        <div className='safe-container'>
          <main className="form-register">
            <form onSubmit={handleSubmit} >
                <h1 className="h3 mb-3 fw-normal">Création de votre compte Fastocks</h1>
                <div className="gender" autoFocus onChange={e => setGender(e.target.value)}>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='F' required></input>
                      <label className="form-check-label" for="inlineRadio1">Madame</label>
                  </div>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value='M' required></input>
                      <label className="form-check-label" for="inlineRadio2">Monsieur</label>
                  </div>
                </div>
                <DatePicker 
                required
                popperPlacement="auto"
                wrapperClassName="datePicker" 
                className="form-control" 
                id="birthdate" 
                placeholderText='Date de naissance (JJ/MM/AAAA)' 
                locale={"fr"}
                dateFormat="dd/MM/yyyy"
                selected={birthDate} 
                maxDate={DateMax.setDate(DateMax.getDate() - 4380)}
                
                onChange={date => setBirthDate(date)}/>
                <input type="text" id="lastname" className="form-control" placeholder="Nom de famille" required onChange={e => setLastName(e.target.value)}></input>
                <input type="text" id="firstname" className="form-control" placeholder="Prénom" required onChange={e => setFirstName(e.target.value)}></input>
                <input type="email" id="email" className="form-control" placeholder="Adresse email" autoComplete="on" required  onChange={e => [setEmail(e.target.value), setErrorMessageEmail("")]}></input>
                <input type="email" id="email-confirm" className="form-control" placeholder="Confirmation de l'adresse email" required onChange={e => [setEmailConfirm(e.target.value), setErrorMessageEmail("")]}></input>
                {errorMessageEmail}
                <input type="password" id="password" className="form-control" placeholder="Mot de passe" required onChange={e => [setPassword(e.target.value), setErrorMessagePwd("")]}></input>
                <input type="password" id="password-confirm" className="form-control" placeholder="Confirmation du mot de passe" required onChange={e => [setPasswordConfirm(e.target.value), setErrorMessagePwd("")]}></input>
                {errorMessagePwd}
                <button id="register-confirm" className="w-100 btn btn-lg btn-primary" type="submit" value="submit">Inscription</button>
             </form>
          </main>
        </div>
      </body>
    );
}  

export default Register;