import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components//LoginForm";
import SignUpForm from "./components/SignupForm";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import PetForm from "./components/PetForm";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path="/add_a_pet" exact={true}>
          <PetForm />
        </ProtectedRoute>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <Route path="/" exact>
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
