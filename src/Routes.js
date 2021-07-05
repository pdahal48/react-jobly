import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import CompanyList from './Companies/CompanyList'
import JobList from './Jobs/JobList'
import Login from './Users/Login'
import Logout from './Users/Logout'
import Profile from './Users/Profile'
import CompanyDetail from './Companies/CompanyDetail'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
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