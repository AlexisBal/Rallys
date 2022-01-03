import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { Button } from 'react-bootstrap';



function Login() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <body>
      <div className='safe-container'>
        <h1>Engager le portefeuille</h1>
        <main className="form-settings center-content">
        <div>
          <Button variant="primary" onClick={() => activateBrowserWallet()}>Connect</Button>
        </div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
        </main>
      </div>
    </body>
  );
}  

export default Login;