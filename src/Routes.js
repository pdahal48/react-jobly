import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Home'
import CompanyList from './Companies/CompanyList'
import JobList from './Jobs/JobList'
import Login from './Users/Login'
import SignUp from './Users/SignUp'
import Logout from './Users/Logout'
import Profile from './Users/Profile'
import CompanyDetail from './Companies/CompanyDetail'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
            <NavBar />
                <Switch>
                    <Route exact path = "/">
                        <Home />
                    </Route>
                    <Route exact path = "/companies">
                        <CompanyList />
                    </Route>
                    <Route exact path = "/companies/:company">
                        <CompanyDetail />
                    </Route>
                    <Route exact path = "/jobs">
                        <JobList />
                    </Route>
                    <Route exact path = "/login">
                        <Login />
                    </Route>
                    <Route exact path = "/signup">
                        <SignUp />
                    </Route>
                    <Route exact path = "/profile">
                        <Profile />
                    </Route>
                    <Route exact path = "/logout">
                        <Logout />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;