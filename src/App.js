import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom'
import NavBar from './NavBar'
import useLocalStorage from './Hooks'
import UserContext from './Users/UserContext'
import jwt from 'jsonwebtoken'
import {JoblyApi as API} from './api'
import LoadingSpinner from "./LoadingSpinner";

import './App.css';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currUserToken, setCurrUserToken] = useLocalStorage(TOKEN_STORAGE_ID)
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", currUserToken);

    async function getCurrentUser() {
      if (currUserToken) {
        try {
          let { username } = jwt.decode(currUserToken);
          // put the currUserToken on the Api class so it can use it to call the API.
          API.token = currUserToken;
          let currentUser = await API.get(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [currUserToken]);

  
  async function signup(signupData) {
    try {
      let token = await API.signup(signupData);
      setCurrUserToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function loginUser(data) {
    try {
      let token = await API.login(data);
      setCurrUserToken(token);
      return {success: true}
    } catch (errors) {
      console.error("login failed", errors);
      return {success: false, errors}
    }
  }

  function logout() {
    setCurrentUser(null);
    setCurrUserToken(null);
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    API.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
      <div>
        <BrowserRouter>
          <UserContext.Provider 
            value = {{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
              <div className="App">
              <NavBar logout={logout} />
              <Routes loginUser ={loginUser} signup={signup} />
              </div>
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );

}

export default App;
