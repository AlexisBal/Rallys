import React, { useState } from 'react';
import { Form, Button, Container, Row, Stack } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import { useAuth } from "../../Tracking/Auth";
import Informations from "../../Tracking/Informations";

function CreateRallyeStep2 () {
    let auth = useAuth();
    const {setLocalInformations, rallye } = Informations();
    const [json, setJson] = useState({});

    if (rallye) {
        console.log(rallye)
    }

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

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        } else {
            const jsonBis = {
                statut: "1",
                rallye: json
            }
            setLocalInformations(jsonBis)
        }
        setValidated(true);
    };
    
    return (
        <div className='safe-container-2'>
            <h1>Créer un nouveau rallye 2</h1>
            <div className="form">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="titre">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Titre du rallye" onChange={e => jsonHandle(e, "titre")} required/>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="region">
                        <Form.Label>Region</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => jsonHandle(e, "region")} required>
                            <option disabled>Region du rallye</option>
                            <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                            <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                            <option value="Bretagne">Bretagne</option>
                            <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                            <option value="Corse">Corse</option>
                            <option value="Grand Est<">Grand Est</option>
                            <option value="Hauts-de-France">Hauts-de-France</option>
                            <option value="Ile-de-France">Ile-de-France</option>
                            <option value="Normandie">Normandie</option>
                            <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                            <option value="Occitanie">Occitanie</option>
                            <option value="Pays de la Loire">Pays de la Loire</option>
                            <option value="Provence-Alpes-Côte d’Azur">Provence-Alpes-Côte d’Azur</option>
                        </Form.Select>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cp">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control type="text" maxLength={5} placeholder="Code postal du rallye" onChange={e => jsonHandle(e, "cp")} required/>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="ville">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control type="text" placeholder="Ville du rallye" onChange={e => jsonHandle(e, "ville")} required/>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="duree">
                        <Form.Label>Durée</Form.Label>
                        <Form.Control type="text" placeholder="Durée du rallye" onChange={e => jsonHandle(e, "duree")} required/>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Description du rallye" onChange={e => jsonHandle(e, "description")} required/>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="photo1">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" name="file" onChange={e => addFile(e, "photo1")} required/>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>
                    <Stack className="col-md-3 mx-auto mt-50">
                        <Button variant="light" type="submit" style={{borderRadius: 60}}>
                            Etape suivante
                        </Button>
                    </Stack>
                </Form>
            </div>
        </div>
      );
}

export default CreateRallyeStep2;