import * as React from "react";
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { useAuth, AuthContext } from "./Tracking/Auth";
import Informations from "./Tracking/Informations";
import PrivateRoute from "./Tracking/PrivateRoute";

import Home from './Vues/Public/Home';
import Login from './Vues/Public/Login';
import ProfileHome from './Vues/Private/ProfileHome';
import CreateRallye from './Vues/Private/CreateRallyeStep1';
import CreateRallyeStep2 from './Vues/Private/CreateRallyeStep2';
import CreateRallyeStep3 from './Vues/Private/CreateRallyeStep3';

import './App.css';


export default function App() {
  return (
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
        <Route
          path="/new-rallye-step1"
          element={
            <PrivateRoute>
              <CreateRallye />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-rallye-step2"
          element={
            <PrivateRoute>
              <CreateRallyeStep2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-rallye-step3"
          element={
            <PrivateRoute>
              <CreateRallyeStep3 />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
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
      <Navbar.Collapse role="responsive-navbar-nav">
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

  if (!auth.keybis) return null;

  function logOut() {
    auth.signout();
  }

  return (
    <Navbar collapseOnSelect className='PrivateNavBar' fixed="top" expand={true} variant='light'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse role="responsive-navbar-nav">
        <Nav activeKey={location.pathname} className="mr-auto ">
          <Nav.Item>
            <Nav.Link href="/myaccount">Accueil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/new-rallye-step1">Nouveau Rallye</Nav.Link>
          </Nav.Item>
          <NavDropdown  title="Mon compte" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={logOut}>Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};


function AuthProvider({ children }: { children: any }) {
  const {setSessionInformations, key } = Informations();
  let [keybis, setKeybis] = React.useState<any>(key);

  let signin = (key: any) => {
    setKeybis(key);
    setSessionInformations({key: key});
  };

  let signout = () => {
    setKeybis(false);
    setSessionInformations({key: false});
  };

  let value = { signin, signout, keybis };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}