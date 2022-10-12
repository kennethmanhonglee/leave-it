import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PetForm from './components/PetForm';
import EditPetForm from './components/EditPetForm';
import HomePage from './components/HomePage';
import SplashPage from './components/SplashPage';
import AboutPage from './components/AboutPage';
import { authenticate } from './store/session';
import { getPetsThunk } from './store/pet';
import { loadFoodThunk } from './store/food';
import CreateFoodForm from './components/CreateFoodForm';
import AddFoodForm from './components/AddFoodForm';
import EditFoodForm from './components/EditFoodForm';
import PetPage from './components/PetPage';
import ErrorPage from './components/ErrorsPage';
import UserPage from './components/UserPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { errors } = await dispatch(authenticate());
      if (!errors) {
        await dispatch(getPetsThunk());
        await dispatch(loadFoodThunk());
      }
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
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <ProtectedRoute path="/add_a_pet" exact>
          <PetForm />
        </ProtectedRoute>
        <ProtectedRoute path="/edit_pet/:petId" exact>
          <EditPetForm />
        </ProtectedRoute>
        <Route path="/sign-up" exact>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/home" exact>
          <HomePage />
        </ProtectedRoute>
        {/* will make into a modal later */}
        <ProtectedRoute path="/pets/:petId/add_food" exact>
          <AddFoodForm />
        </ProtectedRoute>
        <ProtectedRoute path="/pets/:petId" exact>
          <PetPage />
        </ProtectedRoute>
        <ProtectedRoute path="/createFood" exact>
          <CreateFoodForm />
        </ProtectedRoute>
        <ProtectedRoute path="/editFood/:foodId" exact>
          <EditFoodForm />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/edit" exact>
          <UserPage />
        </ProtectedRoute>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
        <Route path="/" exact>
          <SplashPage />
        </Route>
        <Route path="/">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
