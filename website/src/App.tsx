import * as React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";

import { useAuth, AuthContext, fakeAuthProvider } from "./Tracking/Auth";
import Informations from "./Tracking/Informations";

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
              <RequireAuth>
                <ProfileHome />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

// Public Header
const PublicHeader = () => {
  let location = useLocation();
  let auth = useAuth();

  if (auth.user) return null;

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
const PrivateHeader = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let auth = useAuth();

  if (!auth.user) return null;

  function logOut() {
    auth.signout(() => navigate("/"));
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
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: any, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

