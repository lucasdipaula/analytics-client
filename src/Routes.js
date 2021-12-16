import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup/SignUp';

const Routes = (props) => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/entrar" exact={true} component={() => <Login loggedUser={props.loggedUser} setLoggedUser={props.setLoggedUser} />} />
                <Route path="/cadastrar" exact={true} component={() => <SignUp loggedUser={props.loggedUser} setLoggedUser={props.setLoggedUser} />} />
                <Route path="/dashboard" exact={true} component={() => <Dashboard loggedUser={props.loggedUser} setLoggedUser={props.setLoggedUser} />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;