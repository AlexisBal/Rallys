import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import { useAuth } from "../../Tracking/Auth";


function ProfileHome () {
  let auth = useAuth();
  const [selectedFile, setSelectedFile] = useState();

  const addFile = (event: any): void => {
    setSelectedFile(event.target.files[0]);
  }; 

  // Publication du fichier sur IPFS
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
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url)
    } 
	};

  // Récupération du fichier
  const handleGetFile = async () => {
    const response = await fetch('https://ipfs.infura.io/ipfs/QmUGqyPXfijRyaatceGtJUFkbZuhsUAXfyjUyi1qXrBBjU');
    const data = await response.json();
    console.log(data)
  }

  return (
    <div className='safe-container'>
      <h1>Hey {auth.keybis}</h1>
      <div className="mt-50">
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choisir un fichier</Form.Label>
            <Form.Control type="file" name="file" onChange={addFile} />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleSubmission}>Upload</Button>{' '}
        <Button variant="primary" onClick={handleGetFile}>Fetch</Button>
      </div>
    </div>
  );
}

export default ProfileHome;


