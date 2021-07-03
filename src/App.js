import React, {useState, useEffect} from 'react'
import Routes from './Routes'
import SignUp from './Users/SignUp'
import {JoblyApi as API} from './backend/helpers/api'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import NavBar_2 from './Users/NavBar_2'
import './App.css';


function App() {

  const [user, setUser] = useState(null)

  return (
    <div className="App">
        <BrowserRouter>
        {(user) ? <NavBar /> : <NavBar_2 /> } 
                <Switch>
                    <Route exact path = "/signup">
                        <SignUp setUser = {setUser}/>
                    </Route>
                </Switch>
            </BrowserRouter>
    </div>
  );
}

export default App;
