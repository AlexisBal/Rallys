import React, {useState} from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';

import { useAuth } from "../../Tracking/Auth";


declare let window: any;

function Login() {
  let auth = useAuth();
  let navigate = useNavigate();
  const [address, setAddress] = useState("");

  React.useEffect(() => {
    if (address && !auth.keybis) {
      auth.signin(address);
    }
    if (address && auth.keybis) {
      navigate("/myaccount");
    }
  })

  async function connect() {
    if (!window.ethereum) {
      alert("No Metamask detected")
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      window.ethereum.enable().then(() => {
        const signer = provider.getSigner()
        signer.getAddress().then(
          (result) => {setAddress(result)})
      })
    }
  }
  
  return (
    <div className='safe-container-2'>
      <h1>Se Connecter</h1>
      <Button onClick={() => {connect()}}>Engager le wallet</Button>
    </div>
  )
}
export default Login;