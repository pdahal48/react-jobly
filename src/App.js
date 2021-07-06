import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import SignUp from './Users/SignUp'
import Login from './Users/Login'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import NavBar_2 from './Users/NavBar_2'
import useLocalStorage from './Hooks'
import Home from './Home'
import userContext from './Users/UserContext'
import jwt from 'jsonwebtoken'
import './App.css';


function App() {
  const [currUserToken, setCurrUserToken] = useLocalStorage('user-token')
  const [currUserName, setCurrUsername] = useState()

  useEffect( () => {
    async function getCurrUserName() {
      if (currUserToken === null) return ('/')
      const { username } = jwt.decode(currUserToken)
      setCurrUsername(username)
    }
    getCurrUserName()

  }, [currUserToken])
  return (
    <div className="App">
      <div> 
      <userContext.Provider value = {currUserName}>
        <BrowserRouter>
        {(currUserToken !== null) ? <NavBar /> : <NavBar_2 /> } 
          <Switch>
              <Route exact path = "/">
                  <Home/>
              </Route>
              <Route exact path = "/signup">
                  <SignUp setUser = {setCurrUserToken}/>
              </Route>
              <Route exact path = "/login">
                  <Login setUser = {setCurrUserToken}/>
              </Route>
          </Switch>
          <Routes />
      </BrowserRouter>
      </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
