import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import './Login.scss';

import { store } from '../../stores/Store';
import { observer } from 'mobx-react';

interface LoginProps {
    history : any,
    match: any,
    location: any
}

@observer class LoginTemp extends React.Component <LoginProps> {

    state = {
        redirectToReferrer : false
    }

    login = () => {
        store.users.checkUser();
        this.setState({redirectToReferrer:true});
    };

    render() {
        const from = this.props.location.state || {from : {pathname: "/"} };
        const  redirectToReferer  = this.state.redirectToReferrer;

        if (store.users.isAutenticated==true) {
            return <Redirect to= "/admin"/>
        }
        
        if (redirectToReferer) {
            return <Redirect to= {from}/>
        }

        return (
            <section>
                <Header />
                <div className="cContLogin">
                <h2>Login</h2>
                    <div className="container">
                        <form onSubmit={
                            (e) => {
                                e.preventDefault();
                                store.users.checkUser();
                                this.props.history.push ("/groups");

                            }
                            }>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={
                                (e) => {
                                    store.users.handleEmailChange(e.target.value);
                                }
                            } />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={
                                (e) => {
                                    store.users.handlePasswordChange(e.target.value);
                                }
                            } />
                            <button type="submit"> Login </button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export const Login = withRouter(LoginTemp);