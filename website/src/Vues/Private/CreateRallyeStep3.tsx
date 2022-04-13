import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Stack, InputGroup, FormControl } from 'react-bootstrap';
import QRCode from "react-qr-code";
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../Tracking/Auth";
import Informations from "../../Tracking/Informations";


function CreateRallyeStep3 () {
    // Objet Authentification (Public Key)
    let auth = useAuth();
    // Objet Navigation (redirection)
    let navigate = useNavigate();
    // Sauvegarde du rallye 
    const {setLocalInformations, rallye } = Informations();

    // Publication sur IPFS et sauvegarde du hash
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
        var jsonBis = rallye;
        jsonBis.rallye.rallye[key] = added.path;
        setLocalInformations(jsonBis)
    }; 
    
    // Affichage
    return (
        <div className='safe-container-2'>
            <h1>Créer un nouveau rallye {'>'} Etape 3</h1>
            <Stack className="col-md-3 mx-auto mt-50">
                <QRCode value="hey" />
            </Stack>
        </div>
      );
}

export default CreateRallyeStep3;