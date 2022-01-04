import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useEagerConnect } from '../../Contracts/Hooks';
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
  const { connector, activate, deactivate, active, error, account } = context;
  const [activatingConnector, setActivatingConnector] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
    if (error) {
      deactivate();
    }
    if (active) {
      setLoggedIn(true);
      auth.signin(account, () => {navigate("/myaccount");});
    }
  }, [activatingConnector, connector])

  if (isLoggedIn) {
    return <Navigate to="/myaccount" state={{ from: location }} replace />;
  }

  return (
    <body>
      <div className='safe-container'>
        <h1>Se Connecter</h1>
        <div>
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled = !triedEager || !!activatingConnector || connected || !!error;

            return (
              <Button
                disabled={disabled}
                key={name}
                onClick={() => {
                  setActivatingConnector(currentConnector);
                  activate(connectorsByName[name]);
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    margin: '0 0 0 1rem'
                  }}
                >
                  { activating }
                  { connected }
                </div>
                {name}
              </Button>
            )
          })}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {(active || error) && (
              <Button
                style={{
                  height: '3rem',
                  marginTop: '2rem',
                  borderRadius: '1rem',
                  borderColor: 'red',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  deactivate();
                }}
              >
                Annuler
              </Button>
            )}
          </div>
        </div>
      </div>
    </body>
  )
}
export default Login;