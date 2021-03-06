import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Stack, InputGroup, FormControl } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../Tracking/Auth";
import Informations from "../../Tracking/Informations";


function CreateRallyeStep2 () {
    // Objet Authentification (Public Key)
    let auth = useAuth();
    // Objet Navigation (redirection)
    let navigate = useNavigate();
    // Sauvegarde du rallye 
    const {setLocalInformations, rallye } = Informations();
    // Nombre de questions - Affichage dynamique
    const [questions, setQuestions] = useState(new Array(1, 2));
    // Chargement de la sauvegarde
    const [chargementQuestions, setChargementQuestions] = useState(false);
    const [chargementReponses, setChargementReponses] = useState(false);
    // Nombre de réponses par question - Affichage dynamique
    const list1 = new Array(1, 2);
    const [reponses, setReponses] = useState(new Array(list1, list1));
    // Vérification du formulaire
    const [validated, setValidated] = useState(false);

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

    // Sauvegarde sous la forme de JSON
    const jsonQuestionsHandle = (value: any, question:number, key: string) => {
        let jsonBis = {};
        jsonBis = rallye;
        const key1 = "question" + question;
        // Initialisation de dictionnaires pour éviter des erreurs
        if (!jsonBis["rallye"]["rallye"]) {
            jsonBis["rallye"]["rallye"] = {};
        }
        if (!jsonBis["rallye"]["rallye"][key1]) {
            jsonBis["rallye"]["rallye"][key1] = {};
        }
         // Sauvegarde
        jsonBis["rallye"]["rallye"][key1][key] = value;
        setLocalInformations(jsonBis);
    }

    const jsonReponseHandle = (valueBis: any, question:number) => {
        let jsonBis = {};
        jsonBis = rallye;
        var verif = false;
        var verif2 = false;
        const key1 = "question" + question;
        // Initialisation de dictionnaires pour éviter des erreurs
        if (!jsonBis["rallye"]["rallye"]) {
            jsonBis["rallye"]["rallye"] = {};
        }
        if (!jsonBis["rallye"]["rallye"][key1]) {
            jsonBis["rallye"]["rallye"][key1] = {};
        }
        // Vérifie si la réponse est déjà répertoriée comme étant vraie
        if (jsonBis["rallye"]["rallye"][key1]?.solution) {
            jsonBis["rallye"]["rallye"][key1].solution.forEach((value: string, index: number) => {
                if (value == valueBis) {
                    delete jsonBis["rallye"]["rallye"][key1].solution[index];
                    verif = true;
                }
            })
            if (!verif) {
                if (jsonBis["rallye"]["rallye"][key1].solution.length+1 >= jsonBis["rallye"]["rallye"][key1].nombre_reponses) {
                    verif2 = true;
                    alert("Trop de réponses sélectionnées à la question "+question+" !");
                    const idCheckbox = "checkbox-"+question+"-"+valueBis;
                    const findCheckbox = document.getElementById(idCheckbox);
                    if (findCheckbox) {
                        findCheckbox["checked"] = false;
                    }
                }
            }
        } 
        if (validated) {
            const idCheckbox = "controlCheckbox"+question;
            const findCheckbox = document.getElementsByClassName(idCheckbox);
            var length = rallye.rallye.rallye['question'+question].solution.length; 
            if (!verif) {
                length += 1;
            } else {
                length -= 1;
            }
            if (length == 0) {
                if (findCheckbox) {
                    for (var y=0; y<findCheckbox.length; y++) {
                        findCheckbox[y].setAttribute("class", "is-invalid form-control controlCheckbox"+question);
                    }
                }
            } else {
                if (findCheckbox) {
                    for (var y=0; y<findCheckbox.length; y++) {
                        findCheckbox[y].setAttribute("class", "is-valid form-control controlCheckbox"+question);
                    }
                }
            }
        }
        // Ajoute la solution au json
        if (!verif && !verif2) {
            jsonBis["rallye"]["rallye"][key1].solution.push(valueBis);
        }
        // Suppression des valeurs nulles
        const cleanList =  jsonBis["rallye"]["rallye"][key1].solution.filter((element: null) => {
            return element !== null;
        });
        jsonBis["rallye"]["rallye"][key1].solution = cleanList;
        // Sauvegarde
        setLocalInformations(jsonBis);
    }

    // Nombre de réponses par question - Affichage dynamique
    const nbReponsesHandle = (nb: number, id:number) => {
        let reponsesBis = new Array();
        let listReponses = new Array();
        var jsonBis = rallye;
        var x: number; 
        reponses.forEach(value => {
            reponsesBis.push(value);
        });
        for (x=1; x<=nb; x++) {
            listReponses.push(x);
        }
        reponsesBis[id-1] = listReponses; 
        // Initialisation de dictionnaires pour éviter des erreurs
        if (!jsonBis["rallye"]["rallye"]) {
            jsonBis["rallye"]["rallye"] = {};
        }
        if (!jsonBis["rallye"]["rallye"]["question"+id]) {
            jsonBis["rallye"]["rallye"]["question"+id] = {};
        }
        // Supprime les réponses non utilisées
        if (jsonBis["rallye"]["rallye"]["question"+id].nombre_reponses > nb) {
            for (var i = nb+1; i <= jsonBis["rallye"]["rallye"]["question"+id].nombre_reponses; i++) {
                delete jsonBis["rallye"]["rallye"]["question"+id]["reponse"+i];
            }
        }
        // Mise à jour du nombre de réponses
        jsonBis["rallye"]["rallye"]["question"+id].nombre_reponses = nb;
        // Sauvegarde
        setLocalInformations(jsonBis)
        // Affichage
        setReponses(reponsesBis);
    }

    const nbReponsesInit = () => {
        let reponsesBis = new Array();
        for (var x=1; x<=rallye.rallye.rallye.nombre_questions; x++) {
            let listReponses = new Array();
            var nbRep: number;
            if(rallye.rallye.rallye["question"+x]?.nombre_reponses) {
                nbRep = rallye.rallye.rallye["question"+x].nombre_reponses;
            } else {
                nbRep = 2;
                let rallysBis = rallye;
                // Initialisation de dictionnaires pour éviter des erreurs
                if (!rallysBis["rallye"]["rallye"]) {
                    rallysBis["rallye"]["rallye"] = {};
                }
                if (!rallysBis["rallye"]["rallye"]["question"+x]) {
                    rallysBis["rallye"]["rallye"]["question"+x] = {};
                }
                rallysBis["rallye"]["rallye"]["question"+x]["nombre_reponses"] = 2;
                setLocalInformations(rallysBis);
            }
            for (var y=1; y<=nbRep; y++) {
                listReponses.push(y);
            }
            reponsesBis[x-1] = listReponses;
        }
        setReponses(reponsesBis);
    }

    const nbQuestionsInit = () => {
        let listQuestions = new Array();
        var nbQuestions: number;
        if (rallye.rallye.rallye?.nombre_questions) {
            nbQuestions = rallye.rallye.rallye.nombre_questions;
        } else {
            let rallysBis = rallye;
            // Initialisation de dictionnaires pour éviter des erreurs
            if (!rallysBis["rallye"]["rallye"]) {
                rallysBis["rallye"]["rallye"] = {};
            }
            rallysBis["rallye"]["rallye"]["nombre_questions"] = 2;
            setLocalInformations(rallysBis);
            nbQuestions = 2;
        }
        for (var x=1; x<=nbQuestions; x++) {
            listQuestions.push(x);
        }
        setQuestions(listQuestions);
    }

    const checkboxInit = () =>  {
        for (var x=1; x<=rallye.rallye.rallye.nombre_questions; x++) {
            if (rallye.rallye.rallye["question"+x]?.solution) {
                rallye.rallye.rallye["question"+x].solution.forEach((value: string) => {
                    const idCheckbox = "checkbox-"+x+"-"+value;
                    const findCheckbox = document.getElementById(idCheckbox);
                    if (findCheckbox) {
                        findCheckbox.setAttribute("checked", "true");
                    }
                })
            } else {
                let rallysBis = rallye;
                // Initialisation de dictionnaires pour éviter des erreurs
                if (!rallysBis["rallye"]["rallye"]) {
                    rallysBis["rallye"]["rallye"] = {};
                }
                if (!rallysBis["rallye"]["rallye"]["question"+x]) {
                    rallysBis["rallye"]["rallye"]["question"+x] = {};
                }
                rallysBis["rallye"]["rallye"]["question"+x]["solution"] = [];
                setLocalInformations(rallysBis);
            }
        }
    }

    // Nombre de questions - Affichage dynamique
    const nbQuestionsHandle = (nb: number) => {
        let listQuestions = new Array();
        var reponsesBis = reponses;
        var jsonBis = rallye;
        var x: number; 
        for (x=1; x<=nb; x++) {
            listQuestions.push(x);
            if (!reponses[x-1]) {
                reponsesBis[x-1] = new Array(1,2);
            }
        }
        // Initialisation d'un dictionnaire pour éviter des erreurs
        if (!jsonBis["rallye"]["rallye"]) {
            jsonBis["rallye"]["rallye"] = {};
        }
        // Supprime les questions non utilisées
        for (var i = nb+1; i <= jsonBis["rallye"]["rallye"].nombre_questions; i++) {
            delete jsonBis["rallye"]["rallye"]["question"+i];
        }
        // Mise à jour du nombre de questions
        jsonBis["rallye"]["rallye"]["nombre_questions"] = nb;
        // Sauvegarde
        setLocalInformations(jsonBis)
        // Affichage
        setQuestions(listQuestions);
        setReponses(reponsesBis);
    }

    // Soumission du formulaire
    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;  
        for (var q=1; q<=rallye.rallye.rallye.nombre_questions; q++) {
            const idCheckbox = "controlCheckbox"+q;
            const findCheckbox = document.getElementsByClassName(idCheckbox);
            if (rallye.rallye.rallye['question'+q].solution.length == 0) {
                if (findCheckbox) {
                    for (var y=0; y<findCheckbox.length; y++) {
                        findCheckbox[y].setAttribute("class", "is-invalid form-control controlCheckbox"+q);
                    }
                }
            } else {
                if (findCheckbox) {
                    for (var y=0; y<findCheckbox.length; y++) {
                        findCheckbox[y].setAttribute("class", "is-valid form-control controlCheckbox"+q);
                    }
                }
            }
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } 
        setValidated(true);
    };

    useEffect(() => {
        if (!chargementQuestions) {
            nbQuestionsInit();
            setChargementQuestions(true);
        } 
        if (!chargementReponses) {
            nbReponsesInit();
            checkboxInit();
            setChargementReponses(true);
        }
    });
    
    // Affichage
    return (
        <div className='safe-container-2'>
            <h1>Créer un nouveau rallye {'>'} Etape 2</h1>
            <div className="form">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="questions">
                        <Form.Label>Nombre Questions</Form.Label>
                        <Form.Select aria-label="Default select example" defaultValue={rallye.rallye.rallye?.nombre_questions || 2} onChange={e => nbQuestionsHandle(parseInt(e.target.value))} required>
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
                                        <Form.Control as="textarea" rows={4} placeholder="Enoncé de la question" defaultValue={rallye.rallye.rallye?.["question"+question]?.enonce} onChange={e => jsonQuestionsHandle(e.target.value, question, "enonce")} required />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="question">
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Question" defaultValue={rallye.rallye.rallye?.["question"+question]?.question} onChange={e => jsonQuestionsHandle(e.target.value, question, "question")} required />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="reponses">
                                        <Form.Label>Nombre Réponses</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={e => nbReponsesHandle(parseInt(e.target.value), question)} required defaultValue={rallye.rallye.rallye?.["question"+question]?.nombre_reponses || 2}>
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
                                                <div key={reponse+question}>
                                                    <Form.Group className="mb-3" key={reponse+question}>
                                                        <Form.Label>Réponse {reponse} (Cocher s'il s'agit d'une bonne réponse)</Form.Label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control className={"controlCheckbox"+question} type="text" placeholder="Réponse" onChange={e => jsonQuestionsHandle(e.target.value, question, "reponse" + reponse)} required defaultValue={rallye.rallye.rallye?.["question" + question]?.["reponse" + reponse]} />
                                                            <InputGroup.Checkbox id={"checkbox-"+question+"-reponse"+reponse} value={"reponse"+reponse} onClick={(e: { target: { value: any; }; }) => jsonReponseHandle(e.target.value, question)} />
                                                            <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Pas de réponses vraies sélectionnées. Veuillez cocher au moins 1 case.</Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <Form.Group className="mb-3" controlId="explication">
                                        <Form.Label>Explication</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Explication" defaultValue={rallye.rallye.rallye?.["question"+question]?.explication} onChange={e => jsonQuestionsHandle(e.target.value, question, "explication")} required />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="points">
                                        <Form.Label>Nombre Points</Form.Label>
                                        <Form.Control type="number" placeholder="Nombre de points" defaultValue={rallye.rallye.rallye?.["question"+question]?.points} onChange={e => jsonQuestionsHandle(parseInt(e.target.value), question, "points")} required />
                                        <Form.Control.Feedback>Ok !</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="photo1">
                                        <Form.Label>Photo (Facultatif)</Form.Label>
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