import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "./components//LoginForm";
import SignUpForm from "./components/SignupForm";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PetForm from "./components/PetForm";
import EditPetForm from "./components/EditPetForm";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";
import AboutPage from "./components/AboutPage";
import { authenticate } from "./store/session";
import { get_pets_thunk } from "./store/pet";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const logged_in = await dispatch(authenticate());
      if (logged_in) await dispatch(get_pets_thunk());
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
        <ProtectedRoute path="/edit_pet/:pet_id" exact={true}>
          <EditPetForm />
        </ProtectedRoute>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
        <Route path="/" exact>
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
