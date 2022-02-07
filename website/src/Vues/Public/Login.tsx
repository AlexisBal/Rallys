import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
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
  const { activate, active, account } = context;
  let auth = useAuth();
  let navigate = useNavigate();

  React.useEffect(() => {
    if (active && !auth.keybis) {
      auth.signin(account);
    }
    if (active && auth.keybis) {
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
  )
}
export default Login;