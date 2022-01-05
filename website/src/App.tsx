import * as React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import { useAuth, AuthContext } from "./Tracking/Auth";
import Informations from "./Tracking/Informations";
import PrivateRoute from "./Tracking/PrivateRoute";

import Home from './Vues/Public/Home';
import Login from './Vues/Public/Login';
import ProfileHome from './Vues/Private/ProfileHome';

import './App.css';


export default function App() {

  return (
    <div className="Main">
      <AuthProvider>
        <PublicHeader />
        <PrivateHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/myaccount"
            element={
              <PrivateRoute>
                <ProfileHome />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

// Public Header
function PublicHeader() {
  let location = useLocation();
  let auth = useAuth();

  if (auth.keybis) return null;

  return (
    <Navbar collapseOnSelect className='PublicNavBar' fixed="top" expand={true} variant='light'>
      <Navbar.Brand >Rallys</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={location.pathname} className="mr-auto">
          <Nav.Item>
            <Nav.Link href="/">Accueil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">Se connecter</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};

// Private Header 
function PrivateHeader() {
  let location = useLocation();
  let auth = useAuth();
  const { deactivate } = useWeb3React();

  if (!auth.keybis) return null;

  function logOut() {
    deactivate();
    auth.signout();
  }

  return (
    <Navbar collapseOnSelect className='PrivateNavBar' fixed="top" expand={true} variant='light'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse >
        <Nav activeKey={location.pathname} className="mr-auto ">
          <Nav.Item>
            <Nav.Link href="/myaccount">Accueil</Nav.Link>
          </Nav.Item>
          <NavDropdown  title="Mon compte" id="basic-nav-dropdown">
            <NavDropdown.Item href="/myaccount/settings">Mes préférences</NavDropdown.Item>
            <NavDropdown.Item href="/myaccount/settings/change-password">Changer mon mot de passe</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logOut}>Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};


function AuthProvider({ children }: { children: React.ReactNode }) {
  const {setSessionInformations, key } = Informations();
  let [keybis, setKeybis] = React.useState<any>(key);

  let signin = (key: any) => {
    setKeybis(key);
    setSessionInformations({key: key});
  };

  let signout = () => {
    var falseAny:any;
    falseAny = false;
    setKeybis(false);
    setSessionInformations({key: falseAny});
  };

  let value = { signin, signout, keybis };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}