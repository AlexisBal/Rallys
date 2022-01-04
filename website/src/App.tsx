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

import Home from './Vues/Public/Home';
import Login from './Vues/Public/Login';
import ProfileHome from './Vues/Private/ProfileHome';

import './App.css';


export default function App() {
  const {setSessionInformations, key } = Informations();

  console.log(key);

  return (
    <div className="Main">
      <AuthContext.Provider value={{setSessionInformations, key }}>
        <PublicHeader />
        <PrivateHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/myaccount"
            element={
              <RequireAuth>
                <ProfileHome />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

// Public Header
function PublicHeader() {
  let location = useLocation();
  const { key } = useAuth();

  console.log(key);

  if (key) return null;

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
  const { key, setSessionInformations } = useAuth();
  const { deactivate } = useWeb3React();

  if (!key) return null;

  function logOut() {
    deactivate();
    setSessionInformations({key: false})
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


function RequireAuth({ children }: { children: JSX.Element }) {
  const { key } = useAuth();
  let location = useLocation();
  console.log(key);

  if (!key) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}


