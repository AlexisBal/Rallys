import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  injected,
  walletconnect,
  walletlink
} from '../../Contracts/Connectors';
import { useAuth } from "../../Tracking/Auth";

const connectorsByName: { [key: string]: any } = {
  'MetaMask': injected,
  'WalletConnect': walletconnect,
  'WalletLink': walletlink
};

function Login() {
  const context = useWeb3React<Web3Provider>();
  const { activate, deactivate, active, error, account } = context;
  const { key, setSessionInformations } = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  React.useEffect(() => {
    if (active && !key) {
      setSessionInformations({key: account});
    }
    if (active && key) {
      navigate("/myaccount");
    }
  })

  async function connect(name: string) {
    try {
      await activate(connectorsByName[name]);
    } catch (ex) {
      console.log(ex)
    }
  }
  
  return (
    <body>
      <div className='safe-container'>
        <h1>Se Connecter</h1>
        <div>
          {Object.keys(connectorsByName).map(name => {
            return (
              <Button
                key={name}
                onClick={() => {
                  connect(name);
                }}
              >
                {name}
              </Button>
            )
          })}
        </div>
      </div>
    </body>
  )
}
export default Login;