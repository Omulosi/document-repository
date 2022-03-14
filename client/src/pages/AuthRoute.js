import React from "react";
import { Redirect, Route } from "react-router-dom";
import userStore from "stores/userStore";

export default function AuthRoute({ component: Component, ...rest }) {
  const current = userStore((state) => state.current);
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

// <Route
// {...rest}
// render={(props) =>
//   current || storage?.state?.current ? (
//     <Component {...props} />
//   ) : (
//     <Redirect to="/login" />
//   )
// }
// />
