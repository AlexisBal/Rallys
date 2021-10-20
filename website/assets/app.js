import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router";

import { AuthContext } from "./Tracking/Auth";
import useToken from './Tracking/UseToken';
import Informations from "./Tracking/Informations";

import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import Home from './Components/Public/Home';

import './bootstrap.js';
z

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


// App
function App() {
  const {setLocalToken, setSessionToken, token } = useToken();
  const {setLocalInformations, setSessionInformations, id, email, phone, firstName, lastName, alertStockEmail, alertPriceEmail, alertPriceSms, alertStockSms } = Informations();

  return (
    <div className="Main">
      <AuthContext.Provider value={{setLocalToken, setSessionToken, token, setLocalInformations, setSessionInformations, id, email, phone, firstName, lastName, alertStockEmail, alertPriceEmail, alertPriceSms, alertStockSms }}>
        <Router>
          <PublicHeaderWithRouter token={token}/>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path='/register' component={Register}/>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}
