import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { GiMoneyStack } from "react-icons/gi";
import { CgShoppingCart } from "react-icons/cg";
import { IconContext } from "react-icons";

import { useAuth } from "../../Tracking/Auth";

function CreationSuivi () {
  // Stockage navigateur
  const productDictString = sessionStorage.getItem('product');
  const monitoringSettingsString = sessionStorage.getItem('new_monitoring');
  var monitoringSettings = JSON.parse(monitoringSettingsString);
  var productDict = JSON.parse(productDictString);
  if (!productDict) {
    productDict = {
      "url": "",
      "brand": "", 
      "name": "",
      "categorie": "",
      "size": "",
      "color": "",
      "sku": ""
    }
}
if (!monitoringSettings) {
  monitoringSettings = {
    "price": true,
    "stock": true
  }
}

  // Etat local
  const [url, setUrl] = useState(productDict.url);
  const [brand, setBrand] = useState(productDict.brand);
  const [name, setName] = useState(productDict.name);
  const [categorie, setCategorie] = useState(productDict.categorie);
  const [size, setSize] = useState(productDict.size);
  const [color, setColor] = useState(productDict.color);
  const [errorUrl, setErrorUrl] = useState("");
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState(monitoringSettings.price);
  const [stock, setStock] = useState(monitoringSettings.stock);
  const [show, setShow] = useState(false);
  const { token, id } = useAuth();

  var buttonStock = "";
  var buttonPrice = "";
  var textStock = "";
  var textPrice = "";

  if(price) {
    buttonPrice = "success";
    textPrice = "Suivi du prix activé";
  }
  else{
    buttonPrice = "danger";
    textPrice = "Suivi du prix désactivé";
  }

  if(stock) {
    buttonStock = "success";
    textStock = "Suivi du stock activé";
  }
  else{
    buttonStock = "danger";
    textStock = "Suivi du stock désactivé";
  }

  // Validation 1 
  const handleInputUrl = async e => {
    e.preventDefault();
    profilesService.validateUrl({
      'url': url
    }).then((result)=>{
      sessionStorage.setItem('product', JSON.stringify(result.data));
      setStep(1);
      setBrand(result.data.brand)
      setName(result.data.name)
      setUrl(result.data.url)
      setCategorie(result.data.categorie)
      setSize(result.data.size)
      setColor(result.data.color)
    }).catch(()=>{ 
      let err = <strong className="error">L'url entrée ne correspond pas à un produit traçable. Veuillez vérifier que l'url est valide et que le site marchant est pris en charge par Fastocks.</strong>;
      setErrorUrl(err)
    });
  }

  // Validation 2 
  const handleInputProduct = async e => {
    e.preventDefault();
    profilesService.validateProduct({
      'url': productDict.url, 
      'market_place': productDict.market_place,
      'brand': brand,
      "name": name,
      "categorie": categorie,
      "size": size,
      "color": color
    }).then((result)=>{
      sessionStorage.setItem('product', JSON.stringify(result.data));
      setStep(2);
    })
  }

  // Validation 3
  const handleInputMonitoring = async e => {
    e.preventDefault();
    profilesService.validateMonitoring({
      'sku': productDict.sku, 
      'stock': stock,
      'price': price
    },
    id,
    token).then((result)=>{
      sessionStorage.removeItem("product");
      sessionStorage.removeItem("new_monitoring");
      setBrand("");
      setName("");
      setUrl("");
      setCategorie("");
      setSize("");
      setColor("");
      setPrice(true);
      setStock(true);
      setShow(true);
      setStep(0);
    })
  }

  // Annuler 
  const handleDeleteProduct = () => {
    sessionStorage.removeItem("product");
    setBrand("")
    setName("")
    setUrl("")
    setCategorie("")
    setSize("")
    setColor("")
    setStep(0);
  }

  // Etat Bouton suivi du prix 
  const updateTrackingPrice = () => {
    var suivi = false;
    if(!price) {
      suivi = true;
    }
    sessionStorage.setItem('new_monitoring', JSON.stringify(
      {
        "stock": stock,
        "price": suivi
      }
    ));
    setPrice(suivi);
  }

  // Etat Bouton suivi du stock
  const updateTrackingStock = () => {
    var suivi = false;
    if(!stock) {
      suivi = true;
    }
    sessionStorage.setItem('new_monitoring', JSON.stringify(
      {
        "stock": suivi,
        "price": price
      }
    ));
    setStock(suivi);
  }

  // Confirmation de la création du suivi
  function AlertDismissible() {
    if (show) {
      return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Le suivi a bien été créé !</Alert.Heading>
          <p>
            Vous pouvez suivre vos produits en cliquant sur l'onglet "Dashboard".
          </p>
        </Alert>
      );
    }
    else {
      return(null)
    }
  }

  // Affichage de l'étape en cours
  if (productDict.url || step !== 0) {
    if (!productDict.sku || step === 1) {
      return (
        <body>
          <div className='safe-container'>
            <h1>Nouveau Suivi</h1>
            <main className="form-new-monitoring"> 
              <h2 className="text-center">Étape 2 / 3 : Caractéristiques du produit</h2> 
              <form onSubmit={handleInputProduct}>
                <div>
                  <input id="brand" className="form-control" value={brand} placeholder="Entrer la marque du produit" required autoFocus onChange={e => setBrand(e.target.value)}></input>
                  <input id="name" className="form-control" value={name} placeholder="Entrer le nom du produit" required autoFocus onChange={e => setName(e.target.value)}></input>
                  <input id="size" className="form-control" value={size} placeholder="Entrer la taille du produit" required autoFocus onChange={e => setSize(e.target.value)}></input>
                  <input id="color" className="form-control" value={color} placeholder="Entrer la couleur du produit" required autoFocus onChange={e => setColor(e.target.value)}></input>
                </div>
                <div className="text-center">
                  <Button id="button-cancel" variant="outline-danger" onClick={handleDeleteProduct}>Annuler</Button>
                  <Button id="button-submit" variant="outline-success" type="submit" value="submit">Confimer</Button>
                </div>
              </form>
            </main>
          </div>
        </body>
      );
    }
    else {
      return (
        <body>
          <div className='safe-container'>
            <h1>Nouveau Suivi</h1>
            <main className="form-new-monitoring"> 
              <h2 className="text-center">Étape 3 / 3 : Paramètres du suivi</h2> 
              <form onSubmit={handleInputMonitoring}>
                <div className="text-center option">
                  <h3>Cliquer pour activer ou desactiver un suivi</h3>
                  <IconContext.Provider value={{ color: "white", className: "monitoring-logo"}}>
                    <div>
                      <GiMoneyStack />
                      <Button id="button-price" variant={buttonPrice} onClick={updateTrackingPrice}>{textPrice}</Button>
                    </div>
                    <div>
                      <CgShoppingCart />
                      <Button id="button-stock" variant={buttonStock} onClick={updateTrackingStock}>{textStock}</Button>
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="text-center">
                  <Button id="button-cancel" variant="outline-danger" onClick={handleDeleteProduct}>Annuler</Button>
                  <Button id="button-submit" variant="outline-success" type="submit" value="submit">Confimer</Button>
                </div>
              </form>
            </main>
          </div>
        </body>
      );
    }
  }
  else {
    return (
      <body>
        <div className='safe-container'>
          <AlertDismissible />
          <h1>Nouveau Suivi</h1>
          <main className="form-new-monitoring"> 
            <h2 className="text-center">Étape 1 / 3 : Validation de l'url</h2> 
            <form onSubmit={handleInputUrl}>
              <div>
                <input id="url_website" className="form-control" placeholder="Entrer l'url du produit à suivre" required autoFocus onChange={e => [setUrl(e.target.value), setErrorUrl("")]}></input>
                {errorUrl}
              </div>
              <div className="text-center">
                <Button id="button-submit" variant="outline-success" type="submit" value="submit">Confimer</Button>
              </div>
            </form>
          </main>
        </div>
      </body>
    );
  }
}

  

export default CreationSuivi;