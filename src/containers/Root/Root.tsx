import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import './Root.scss';
import { Home } from '../Home/Home';
import { SignUp } from '../SignUp/SignUp';
import { Login } from '../Login/Login';
import  Groups  from '../Groups/Groups';


import { store } from '../../stores/Store';
import { observer } from 'mobx-react';
import AddGroup from '../../components/AddGroup/AddGroup';
import { Dashboard } from '../Dashboard/Dashboard';
import { AddNote } from '../../components/AddNote/AddNote';

export class Root extends React.Component {
    
    render(){
        return  (
            <Router>
                <div>  
                    <Route exact path="/" component= {Home} />
                    <Route exact path="/signup" component= {SignUp} />
                    <Route exact path="/login" component= {Login} />
                    <PrivateRoute path="/groups" component = {Groups}/>
                    <PrivateRoute path="/groups/addGroup" component = {AddGroup} />
                    <PrivateRoute path="/dashboard/:group" component={Dashboard} />
                    <PrivateRoute exact path="/addNote" component = {AddNote} />

                </div>
            </Router>
            )
    }
}

const PrivateRoute = ({ component: Component , ...rest } : any) => (
    <Route 
        {...rest}
        render = { props =>
            store.users.isAutenticated ?
            (
                <Component { ...props} />
            ) :
            (
                <Redirect to = {{
                    pathname: "/login",
                    state: {from: props.location}
                }} />   
            )
        }    
    />
);

