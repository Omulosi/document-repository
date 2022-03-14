import React from "react";
import { Route, Switch } from "react-router-dom";
import Account from "./pages/Account";
import AuthRoute from "./pages/AuthRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import FileDetails from "./pages/FileDetails";

export default function App() {
  return (
    <Switch>
      {/*  Public */}
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />

      {/** Private */}
      <AuthRoute path="/home" component={Home} />
      <AuthRoute path="/files/:fileId" component={FileDetails} />
      <AuthRoute path="/files" component={Home} />

      <AuthRoute path="/users/:userId" component={UserProfile} />
      <AuthRoute path="/users" component={Users} />

      {/** user account profile */}
      <AuthRoute path="/account" component={Account} />
    </Switch>
  );
}
