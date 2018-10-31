import * as React from 'react';
import './SignUp.scss';

import { Redirect } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import Avatar from '../../components/Avatar/Avatar';

import { store } from '../../stores/Store';
import { observer } from 'mobx-react';

@observer export class SignUp extends React.Component {

    render() {
        if (store.users.redirecttoLogin) {
            return <Redirect to='/login' />;
        }
        return (
            <section className="signUp">
                <Header />
                <div className="cCont">
                <h2>Sign Up</h2>
                    <div className="container">
                        <div className="avatares">

                            <div className="avatar" tabIndex={1} onClick={ (e: any) => {store.users.selectAvatar(0); console.log(store.users.user.avatar) }}>
                                <Avatar indentifier={1}  />
                            </div>
                            <div className="avatar" tabIndex={1} onClick={(e: any) => {store.users.selectAvatar(1); console.log(store.users.user.avatar) }}>
                                <Avatar indentifier={2}  />
                            </div>
                            <div className="avatar" tabIndex={1} onClick={(e: any) => {store.users.selectAvatar(2); console.log(store.users.user.avatar) }}>
                                <Avatar indentifier={3}  />
                            </div>
                            <div className="avatar" tabIndex={1} onClick={(e: any) => {store.users.selectAvatar(3); console.log(store.users.user.avatar) }}>
                                <Avatar indentifier={4}  />
                            </div>
                        </div>
                        <form onSubmit={
                            (e) => {
                                e.preventDefault();
                                console.log("creando");
                                store.users.createUser();

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
                                type="text"
                                placeholder="Name"
                                onChange={
                                    (e) => {
                                        store.users.handleNameChange(e.target.value);
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
                            <button
                                type="submit"
 
                                 > Sign Up </button>
                        </form>
                        <p>{store.users.temporalAlert}</p>
                    </div>
                </div>
            </section>
        )
    }




}