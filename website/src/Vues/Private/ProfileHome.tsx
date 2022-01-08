import React, { useState } from 'react';
import * as IPFS from 'ipfs-core';
import { Form, Button } from 'react-bootstrap';

import { useAuth } from "../../Tracking/Auth";


function ProfileHome () {
  let auth = useAuth();
  const [selectedFile, setSelectedFile] = useState();

  const addFile = (event: any): void => {
    setSelectedFile(event.target.files[0]);
  }; 

  const handleSubmission = async () => {
    if (selectedFile) {
      const ipfs = await IPFS.create();
      const { cid } = await ipfs.add(selectedFile);
      console.log(cid.toString());
    }
	};

  return (
    <body>
      <div className='safe-container'>
        <h1>Hey {auth.keybis}</h1>
        <div className="mt-50">
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choisir un fichier</Form.Label>
              <Form.Control type="file" name="file" onChange={addFile} />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSubmission}>Uploader sur IPFS</Button>
        </div>
      </div>
      </body>
  );
}

export default ProfileHome;


