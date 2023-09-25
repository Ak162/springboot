import React from "react";
import { Navigate } from "react-router-dom";

const OGAuthRoute = ({
  element: Element,
  isOgAuthenticated,
  isAuth,
  ...rest
}) => {
  console.log("isOgAuthenticated", isOgAuthenticated);
  return isOgAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to={isAuth ? "/discord-link" : "/"} replace />
  );
};

export default OGAuthRoute;
