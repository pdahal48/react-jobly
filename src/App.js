import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import NavBar_2 from './Users/NavBar_2'
import useLocalStorage from './Hooks'
import Home from './Home'
import UserContext from './Users/UserContext'
import jwt from 'jsonwebtoken'
import {JoblyApi as API} from './backend/helpers/api'
import './App.css';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currUserToken, setCurrUserToken] = useLocalStorage(TOKEN_STORAGE_ID)
  const [currentUser, setCurrentUser] = useState([null])

  useEffect(() => {
    async function getCurrUserName() {
      if (currUserToken) {
        try {
          let { username } = jwt.decode(currUserToken)
          API.token = currUserToken
          let currentUser = await API.get(username)
          setCurrentUser(currentUser.user)
        } catch(e) {
          setCurrentUser(null)
        }
      }}
      getCurrUserName()
    }, [currUserToken])

  function logout() {
    setCurrentUser(null);
    setCurrUserToken(null);
  }


  return (
    <div className="App">
      <div>
        {currentUser !== null ?
      <UserContext.Provider value = {{currentUser, setCurrUserToken, currUserToken}}>
        <BrowserRouter>
        {(currUserToken !== null) ? <NavBar /> : <NavBar_2 /> } 
          <Switch>
              <Route exact path = "/">
                  <Home/>
              </Route>
              
          </Switch>
          <Routes />
      </BrowserRouter>
      </UserContext.Provider>
      : 
      <UserContext.Provider value = {{currentUser, setCurrUserToken, currUserToken, setCurrentUser}}>
      <BrowserRouter>
      <NavBar_2 /> 
        <Switch>
            <Route exact path = "/">
                <Home/>
            </Route>
            
        </Switch>
        <Routes />
    </BrowserRouter>
    </UserContext.Provider>
}
      </div>
    </div>
  );
}

export default App;
