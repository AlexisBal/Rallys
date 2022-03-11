import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Stack } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import { useAuth } from "../../Tracking/Auth";
import Informations from "../../Tracking/Informations";

function CreateRallyeStep2 () {
    let auth = useAuth();
    const {setLocalInformations, rallye } = Informations();
    const [json, setJson] = useState(rallye);
    const [questions, setQuestions] = useState(new Array(1, 2));
    const list1 = new Array(1, 2);
    const [reponses, setReponses] = useState(new Array(list1, list1));

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
        jsonBis.rallye.rallye[key] = added.path;
        setJson(jsonBis);
    }; 

    // Save data in JSON
    const jsonHandle = (event: any, key: string) => {
        var jsonBis = json;
        jsonBis[key] = event.target.value;
        setJson(jsonBis);
    }

    const nbReponsesHandle = (nb: number, id:number) => {
        let reponsesBis = new Array();
        let listReponses = new Array();
        var x: number; 
        reponses.forEach(value => {
            reponsesBis.push(value);
        });
        for (x=1; x<=nb; x++) {
            listReponses.push(x);
        }
        reponsesBis[id-1] = listReponses; 
        setReponses(reponsesBis);
    }

    const nbQuestionsHandle = (nb: number) => {
        let listQuestions = new Array();
        var reponsesBis = reponses;
        var x: number; 
        for (x=1; x<=nb; x++) {
            listQuestions.push(x);
            if (!reponses[x-1]) {
                reponsesBis[x-1] = new Array(1,2);
            }
        }
        setQuestions(listQuestions);
        setReponses(reponsesBis);
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
            <h1>Créer un nouveau rallye {'>'} Etape 2</h1>
            <div className="form">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="questions">
                        <Form.Label>Nombre Questions</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => nbQuestionsHandle(parseInt(e.target.value))} required>
                            <option disabled>Nombre de questions</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                        </Form.Select>
                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                    </Form.Group>

                    <div>{
                        questions.map((question) => {
                            return (
                                <div key={question}>
                                    <h2>Question {question}</h2>
                                    <Form.Group className="mb-3" controlId="enonce">
                                        <Form.Label>Énoncé</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Enoncé de la question" onChange={e => jsonHandle(e, "enonce")} required />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="question">
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Question" onChange={e => jsonHandle(e, "enonce")} required />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="reponses" key={question}>
                                        <Form.Label>Nombre Réponses</Form.Label>
                                        <Form.Select key={question} aria-label="Default select example" onChange={e => nbReponsesHandle(parseInt(e.target.value), question)} required>
                                            <option disabled>Nombre de réponses</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                        </Form.Select>
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <div>
                                        {
                                        reponses[question-1].map((reponse) => {
                                            return (
                                                <Form.Group className="mb-3" controlId="reponse" key={reponse}>
                                                    <Form.Label>Réponse {reponse}</Form.Label>
                                                    <Form.Control type="text" placeholder="Réponse" onChange={e => jsonHandle(e, "reponse" + reponse)} required />
                                                    <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                                </Form.Group>
                                            );
                                        })}
                                    </div>

                                    <Form.Group controlId="photo1">
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control type="file" name="file" onChange={e => addFile(e, "photo1")} />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            )
                        })}
                    </div>

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