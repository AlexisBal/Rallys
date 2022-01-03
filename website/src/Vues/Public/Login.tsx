import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {Alert} from 'react-bootstrap';

import { useAuth } from "../../Tracking/Auth";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      let formData = new FormData(event.currentTarget);
      let username = formData.get("username") as string;
  
      auth.signin(username, () => {
        navigate(from, { replace: true });
      });
    }

    if (isLoggedIn) {
      return <Navigate to="/myaccount" state={{ from: location }} replace />;
    }

    return (
      <body>
        <div className='safe-container'>
          <main className="form-signin text-center">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Merci de vous connecter</h1>
                <input type="email" id="email" className="form-control" placeholder="Adresse email" required autoFocus onChange={e => setEmail(e.target.value)}></input>
                <input type="password" id="password" className="form-control" placeholder="Mot de passe" required onChange={e => setPassword(e.target.value)}></input>
                <button className="w-100 btn btn-lg btn-primary submit" type="submit" value="submit">Connexion</button>
            </form>
          </main>
        </div>
    </body>
    );
}  

export default Login;