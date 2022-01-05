import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./Auth";

function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.keybis) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;