import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { base58btc } from 'multiformats/bases/base58';
import { base36 } from 'multiformats/bases/base36';
import { CID } from 'multiformats/cid';
import * as Digest from 'multiformats/hashes/digest';
import * as filters from 'libp2p-websockets/src/filters';
import * as WS from 'libp2p-websockets';
import * as IPFS from 'ipfs-core';
import * as ipns from 'ipns';

import { useAuth } from "../../Tracking/Auth";
import useIpfs from '../../IPFS/use-ipfs';


function ProfileHome () {
  let auth = useAuth();
  const [selectedFile, setSelectedFile] = useState();
  const [id, setId] = useState(null);
  const { node } = useIpfs();

  useEffect(() => {
    if (!node) return;
    const getInformations = async () => {
      const nodeId = await node.key.list();
      setId(nodeId);
    }
    getInformations();
  }, [node])

  const addFile = (event: any): void => {
    setSelectedFile(event.target.files[0]);
  }; 

  const handleSubmission = async () => {
    if (selectedFile) {
      // Publication du fichier sur IPFS
      await node.swarm.connect("/ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWP5Yu1E9ZrdNP2ihzckSSL3PB6ooNt4zAfcmfRSZVB1hd");
      console.log(await node.swarm.addrs());
      const { cid } = await node.add(selectedFile);
      const { name, value } = await node.name.publish(cid, {key: "rallys"});
      const multihash = uint8ArrayFromString(name, 'base58btc');
      const digest = Digest.decode(multihash);
      const libp2pKey = CID.createV1(0x72, digest);
      console.log(`/ipns/${libp2pKey.toString(base36)}`);
    } 
	};

  const handleSetupKey = async () => {
    if (!(await node.key.list()).find((k: { name: string; }) => k.name == "rallys")) {
      const key = await node.key.gen(
        "rallys", 
        {
          type: 'ed25519',
          size: 512
        }
      );
      console.log(key);
    }
	};

  const handleExportKey = async () => {
    const key = await node.key.export("rallys", "rallys");
    console.log(key);
    console.log(id)
	};

  const handleImportKey = async () => {
    const privKey = "mGh6NsitgWOtMgkLmlwCvarh01Wb6L/qiy8Lj2nYtywv11fCLm7XnyhBd3/yN28JN79+wTt1QGwzV9tB7VIsb/IRsrnJswyBp6eqo6OqIgGlNuJ3aM1hKI4vx2NB2tCrXa3qJce9Jc5+EMU4suTRVQA";
    const key = await node.key.import("rallys", privKey, "rallys");
    console.log(key);
  }


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
          <Button variant="primary" onClick={handleSetupKey}>Setup Key</Button>{' '}
          <Button variant="primary" onClick={handleExportKey}>Export Key</Button>{' '}
          <Button variant="primary" onClick={handleImportKey}>Import Key</Button>{' '}
          <Button variant="primary" onClick={handleSubmission}>Uploader sur IPFS</Button>
        </div>
      </div>
      </body>
  );
}

export default ProfileHome;


