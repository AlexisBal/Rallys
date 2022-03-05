import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import { useAuth } from "../../Tracking/Auth";

function CreateRallye () {
    let auth = useAuth();
    const [json, setJson] = useState({});

    // Publish on IPFS and save the hash in JSON
    const addFile = async (event: any, key: string): Promise<void> => {
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
        const added = await node.add(event.target.files[0]);
        var jsonBis = json;
        jsonBis[key] = added.path;
        setJson(jsonBis);
    }; 

    // Save data in JSON
    const jsonHandle = (event: any, key: string) => {
        var jsonBis = json;
        jsonBis[key] = event.target.value;
        setJson(jsonBis);
    }
    
    return (
        <div className='safe-container'>
            <h1>Créer un nouveau rallye</h1>
            <div className="form">
                <Form>
                    <Form.Group className="mb-3" controlId="titre">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Titre du rallye" onChange={e => jsonHandle(e, "titre")}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="region">
                        <Form.Label>Region</Form.Label>
                        <Form.Control type="text" placeholder="Region du rallye" onChange={e => jsonHandle(e, "region")}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="departement">
                        <Form.Label>Departement</Form.Label>
                        <Form.Control type="text" placeholder="Departement du rallye" onChange={e => jsonHandle(e, "departement")}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="ville">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control type="text" placeholder="Ville du rallye" onChange={e => jsonHandle(e, "ville")}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="duree">
                        <Form.Label>Durée</Form.Label>
                        <Form.Control type="text" placeholder="Durée du rallye" onChange={e => jsonHandle(e, "duree")}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Description du rallye" onChange={e => jsonHandle(e, "description")}/>
                    </Form.Group>

                    <Form.Group controlId="photo1" className="mb-3">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" name="file" onChange={e => addFile(e, "photo1")}/>
                    </Form.Group>

                    <Button variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
      );
}

export default CreateRallye;