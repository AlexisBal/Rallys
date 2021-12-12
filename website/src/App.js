import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router";

import PrivateRoute from './Tracking/PrivateRoute';
import { AuthContext } from "./Tracking/Auth";
import useToken from './Tracking/UseToken';
import Informations from "./Tracking/Informations";

import Login from './Screens/Public/Login';
import Register from './Screens/Public/Register';
import Home from './Screens/Public/Home';
import ProfileHome from './Screens/Private/ProfileHome';

import './App.css';


// Public Header
const PublicHeader = props => {
  const { location, token } = props;

  if (token) return null;
  
  return (
    <Navbar collapseOnSelect className='PublicNavBar' fixed="top" expand={true} variant='light'>
      <Navbar.Brand >Fastocks</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={location.pathname} className="mr-auto">
          <Nav.Item>
            <Nav.Link href="/">Accueil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">Se connecter</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">S'inscrire</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};
const PublicHeaderWithRouter = withRouter(PublicHeader);

// Private Header 
const PrivateHeader = props => {
  const { location, token, setSessionToken, setLocalToken, setSessionInformations, setLocalInformations} = props;

  if (!token) return null;

  function logOut() {
    setSessionToken(false);
    setLocalToken(false);
    setSessionInformations({
      id: false,
      first_name: false,
      last_name:false,
      email: false,
      phone: false,
      alert_stock_email: false,
      alert_price_email: false,
      alert_stock_sms: false,
      alert_price_sms: false,
    });

    setLocalInformations({
      id: false,
      first_name: false,
      last_name:false,
      email: false,
      phone: false,
      alert_stock_email: false,
      alert_price_email: false,
      alert_stock_sms: false,
      alert_price_sms: false,
    })
  }
  
  return (
    <Navbar collapseOnSelect className='PrivateNavBar' fixed="top" expand={true} variant='light'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse >
        <Nav activeKey={location.pathname} className="mr-auto ">
          <Nav.Item>
            <Nav.Link href="/myaccount">Accueil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myaccount/monitor">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myaccount/new-monitoring">Nouveau suivi</Nav.Link>
          </Nav.Item>
          <NavDropdown  title="Mon compte" id="basic-nav-dropdown">
            <NavDropdown.Item href="/myaccount/settings">Mes préférences</NavDropdown.Item>
            <NavDropdown.Item href="/myaccount/settings/change-password">Changer mon mot de passe</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logOut}>Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};
const PrivateHeaderWithRouter = withRouter(PrivateHeader);

// App
function App() {
  const {setLocalToken, setSessionToken, token } = useToken();
  const {setLocalInformations, setSessionInformations, id, email, phone, firstName, lastName, alertStockEmail, alertPriceEmail, alertPriceSms, alertStockSms } = Informations();

  return (
    <div className="Main">
      <AuthContext.Provider value={{setLocalToken, setSessionToken, token, setLocalInformations, setSessionInformations, id, email, phone, firstName, lastName, alertStockEmail, alertPriceEmail, alertPriceSms, alertStockSms }}>
        <Router>
          <PublicHeaderWithRouter token={token}/>
          <PrivateHeaderWithRouter token={token} setLocalToken={setLocalToken} setSessionToken={setSessionToken} setLocalInformations={setLocalInformations} setSessionInformations={setSessionInformations}/>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path='/register' component={Register}/>
          <PrivateRoute exact path="/myaccount" component={ProfileHome} />
          <PrivateRoute exact path="/myaccount/settings" component={Reglages} />
          <PrivateRoute exact path="/myaccount/settings/change-password" component={ChangePassword} />
          <PrivateRoute exact path="/myaccount/new-monitoring" component={CreationSuivi} />
          <PrivateRoute exact path="/myaccount/monitor" component={Dashboard} />
          <PrivateRoute exact path="/myaccount/monitor/:id" component={Dashboard} />
          <PrivateRoute exact path="/myaccount/monitor/:id/settings" component={ParametresSuivi} />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;