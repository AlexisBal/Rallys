import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import { useAuth } from "../../Tracking/Auth";


function ChangePassword () {
  const { token, id } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMessageOldPwd, setErrorMessageOldPwd] = useState("");
  const [errorMessageNewPwd, setErrorMessageNewPwd] = useState("");
  const [pwdChanged, setPwdChanged] = useState(false);

  if (pwdChanged) {
    return <Redirect to={"/myaccount"} />;
  }

  const handleChangePassword = async e => {
    e.preventDefault();

    if (newPassword === newPasswordConfirm) {
      if (newPassword.length >= 8) {
        var x;
        var y;
        var checked1 = false;
        var checked2 = false;
        const symbols = ['#', '@', '&', '§', '!', '°', '*', '$', '¥', '€', '£', '%', '?', ';', '.', ':', '/', '+', '=', '<', '>', '-', '_', '{', '}', '(', ')', '[', ']']
        for (x=0;x<10;x++) {
          if (newPassword.indexOf(x) !== -1) {
            checked1 = true;
            break;
          }
        }
        if (!checked1) {
          let err = <strong className="error">Le mot de passe doit contenir au minimum 1 chiffre !</strong>;
          setErrorMessageNewPwd(err);
        }
        else {
          setErrorMessageNewPwd("");
          for (y in symbols) {
            if (newPassword.indexOf(symbols[y]) !== -1) {
              checked2 = true;
              break;
            }
          }
          if (!checked2) {
            let err = <strong className="error">Le mot de passe doit contenir au minimum 1 caractère spécial !</strong>;
            setErrorMessageNewPwd(err);
          }
          else {
            setErrorMessageNewPwd("");
            // Requete API 
            profilesService.changePassword({
              "old-password": password,
              "password": newPassword,
              "password-confirm": newPasswordConfirm
            },
            id,
            token
            ).then(()=>{
              setPwdChanged(true)
            }).catch(()=>{ 
              let err = <strong className="error">Veuillez vérifier le mot de passe actuel entré !</strong>;
              setErrorMessageOldPwd(err);
            });
          }
        }
      }
      else {
        let err = <strong className="error">Le mot de passe doit contenir au minimum 8 caractères !</strong>;
        setErrorMessageNewPwd(err);
      }
    }
    else {
      let err = <strong className="error">Les mots de passe saisis sont différents !</strong>;
      setErrorMessageNewPwd(err);
    }
  }
    
  return (
    <body>
      <div className='safe-container'>
        <main className="form-change-password text-center">
          <h1 className="h3 mb-3 fw-normal">Modification du mot de passe</h1>
          <form onSubmit={handleChangePassword}>
            <input type="password" id="password" className="form-control" placeholder="Mot de passe actuel" required autoFocus onChange={e => [setPassword(e.target.value), setErrorMessageOldPwd("")]}></input>
            {errorMessageOldPwd}
            <div>
              <input type="password" id="new-password" className="form-control" placeholder="Nouveau mot de passe" required onChange={e => [setNewPassword(e.target.value), setErrorMessageNewPwd("")]}></input>
              <input type="password" id="new-password-confirm" className="form-control" placeholder="Confirmation du mot de passe" required onChange={e => [setNewPasswordConfirm(e.target.value), setErrorMessageNewPwd("")]}></input>
              {errorMessageNewPwd}
            </div>
            <Button id="button-submit" variant="outline-primary" type="submit" value="submit">Confimer</Button>
          </form>
        </main>
      </div>
    </body>
  );
}

export default ChangePassword;