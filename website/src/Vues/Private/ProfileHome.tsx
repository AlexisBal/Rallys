import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import { useAuth } from "../../Tracking/Auth";



function ProfileHome () {
  let auth = useAuth();
  const [selectedFile, setSelectedFile] = useState();
  const [hash, setHash] = useState("");
  const [json, setJson] = useState({});

  const addFile = (event: any): void => {
    setSelectedFile(event.target.files[0]);
  }; 

  // Publish on IPFS
  const handleSubmission = async () => {
    if (selectedFile) {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
      const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
      const node = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth
        }
      })
      const added = await node.add(selectedFile);
      setHash(added.path);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
    } 
	};

  // Get a file
  const handleGetFile = async () => {
    const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}`);
    const data = await response.json();
    setJson(data);
    console.log(data);
  }

  // Unpin a file 
  const handleUnpinFile = async () => {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const node = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth
      }
    })
    await node.pin.rm(hash);
    setHash("");
    console.log("Fichier supprimé du répertoire")
  }

  return (
    <div className='safe-container-1'>
      <h1>Hey {auth.keybis}</h1>
    </div>
  );
}

export default ProfileHome;


