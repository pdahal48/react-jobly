import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import NavBar_2 from './Users/NavBar_2'
import useLocalStorage from './Hooks'
import Home from './Home'
import userContext from './Users/UserContext'
import jwt from 'jsonwebtoken'
import {JoblyApi as API} from './backend/helpers/api'

import './App.css';


function App() {
  const [currUserToken, setCurrUserToken] = useLocalStorage('user-token')
  const [currentUser, setCurrentUser] = useState(null)

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
      {(currentUser !== null) &&
          <userContext.Provider value = {{currentUser, setCurrentUser}}>
        <BrowserRouter>
        {(currUserToken !== null) ? <NavBar /> : <NavBar_2 /> } 
          <Switch>
              <Route exact path = "/">
                  <Home/>
              </Route>
              
          </Switch>
          <Routes />
      </BrowserRouter>
      </userContext.Provider> 
}
      </div>
    </div>
  );
}

export default App;
