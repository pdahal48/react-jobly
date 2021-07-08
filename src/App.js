import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom'
import NavBar from './NavBar'
import useLocalStorage from './Hooks'
import UserContext from './Users/UserContext'
import jwt from 'jsonwebtoken'
import {JoblyApi as API} from './backend/helpers/api'
import './App.css';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currUserToken, setCurrUserToken] = useLocalStorage(TOKEN_STORAGE_ID)
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(() => {
    async function getCurrUserName() {
      if (currUserToken) {
        try {
          let { username } = jwt.decode(currUserToken)
          API.token = currUserToken
          let currentUser = await API.get(username)
          setCurrentUser(currentUser.user)
        } catch(e) {
          console.error("App loadUserInfo: problem loading", e);
          setCurrentUser(null)
        }
      }}
      getCurrUserName()
  }, [currUserToken])

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

  async function login(loginData) {
    try {
      let token = await API.login(loginData);
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

  return (
      <div>
        <BrowserRouter>
          <UserContext.Provider 
            value = {{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
              <div className="App">
              <NavBar logout={logout} />
              <Routes loginUser ={login} signup={signup} />
              </div>
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );

}

export default App;
