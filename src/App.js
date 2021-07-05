import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import SignUp from './Users/SignUp'
import Login from './Users/Login'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import NavBar_2 from './Users/NavBar_2'
import useLocalStorage from './Hooks'
import Home from './Home'
import './App.css';


function App() {
  const [user, setUser] = useLocalStorage('user-token')

  return (
    <div className="App">
        <BrowserRouter>
        {(user !== null) ? <NavBar user = {user}/> : <NavBar_2 /> } 
                <Switch>
                    <Route exact path = "/">
                        <Home user = {user}/>
                    </Route>
                    <Route exact path = "/signup">
                        <SignUp setUser = {setUser}/>
                    </Route>
                    <Route exact path = "/login">
                        <Login setUser = {setUser}/>
                    </Route>
                </Switch>
                <Routes />
            </BrowserRouter>
    </div>
  );
}

export default App;
