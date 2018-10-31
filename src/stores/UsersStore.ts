import {
    observable,
    action,
    computed
} from 'mobx';
import {
    createSecureServer
} from 'http2';

import {
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION
} from 'constants';
import { store } from './Store';

interface User {
    id: string;
    avatar: number;
    email: string;
    name: string
    password: string;
    groups: any[]
}

export class UsersStore {

    @observable user: User = {
        id: null,
        avatar: null,
        email: null,
        name: null,
        password: null,
        groups: null
    };

    @observable currentUser: User = null;
    @observable users: any[];

    @observable temporalAlert: String = "";

    @observable redirecttoLogin: boolean;
    @observable isAutenticated: boolean;

    @action selectAvatar(avatarType: number) {
        this.user.avatar = avatarType;
    }

    @action handleEmailChange(email: string) {
        this.user.email = email.toLowerCase();
    }

    @action handleNameChange(name: string) {

        // Method taken from somethinghere stackOverFlow 
        function titleCase(str: string) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join(' ');
        }

        this.user.name = titleCase(name);;
    }

    @action handlePasswordChange(password: string) {
        this.user.password = password;
    }

    IDGenerator = () => {
        return '_' + Math.random().toString(26).substr(2, 9);
    }

    @action createUser() {
        this.users = JSON.parse(localStorage.getItem('userArray'));

        this.user.id = this.IDGenerator();

        let user = {
            id: this.user.id,
            avatar: this.user.avatar,
            email: this.user.email,
            name: this.user.name,
            password: this.user.password,
            groups: this.user.groups
        };

        if (this.users != null) {

            if (user.email == null) {
                this.temporalAlert = "Please write an email.";
                console.log("Please write an email.");
            } else {
                if (this.users.some(e => e.email === user.email)) {
                    this.temporalAlert = "The email you wrote is already registered.";
                    console.log("The email you wrote is already registered.");
                } else {

                    if (user.name == null) {
                        this.temporalAlert = "Please write a name.";
                        console.log("Please write a name.");
                    } else {
                        if (user.password == null) {
                            this.temporalAlert = "Please write a password.";
                            console.log("Please write a password.");
                        } else {
                            if (user.avatar == null) {
                                this.temporalAlert = "Please select an avatar.";
                                console.log("Please select an avatar.");
                            } else {
                                let currentUserArray = [];
                                currentUserArray.push(user);

                                ((this.users != null) ? currentUserArray = this.users.concat(currentUserArray) : console.log("El primer usuario será añadido"));

                                this.users = currentUserArray;
                                localStorage.setItem('userArray', JSON.stringify(this.users));

                                /* let valio = JSON.parse(localStorage.getItem('userArray'));
                                console.log (valio); */

                                console.log("The user: *" + this.user.name + "* has been correctly added.");
                                this.redirecttoLogin = true;
                            }
                        }

                    }

                }
            }

        } else {

            if (user.email == null) {
                this.temporalAlert = "Please write an email.";
                console.log("Please write an email.");
            } else {

                if (user.name == null) {
                    this.temporalAlert = "Please write a name.";
                    console.log("Please write a name.");
                } else {
                    if (user.password == null) {
                        this.temporalAlert = "Please write a password.";
                        console.log("Please write a password.");
                    } else {
                        if (user.avatar == null) {
                            this.temporalAlert = "Please select an avatar.";
                            console.log("Please select an avatar.");
                        } else {
                            let currentUserArray = [];
                            currentUserArray.push(user);

                            ((this.users != null) ? currentUserArray = this.users.concat(currentUserArray) : console.log("El primer usuario será añadido"));

                            this.users = currentUserArray;
                            localStorage.setItem('userArray', JSON.stringify(this.users));

                            /* let valio = JSON.parse(localStorage.getItem('userArray'));
                            console.log (valio); */

                            console.log("The user: *" + this.user.name + "* has been correctly added.");
                            this.redirecttoLogin = true;
                        }
                    }



                }
            }

        };


    }

    @action checkUser() {

        this.users = JSON.parse(localStorage.getItem('userArray'));

        let user = {
            email: this.user.email,
            password: this.user.password
        };

        let temporalUser;

        if (this.users.some(e => e.email === user.email)) {
            if (this.users.some(e => e.password === user.password)) {
                temporalUser = this.users.find(e => e.email === user.email &&
                    e.password === user.password);
                if (typeof temporalUser != "undefined") {
                    this.currentUser = temporalUser;
                     store.groups.groups = JSON.parse(localStorage.getItem('groupArray'));

                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    
                    this.isAutenticated = true;
                    console.log("You are in:" + this.currentUser.name);
                }
            } else {
                console.log("Authentication error: The email and the password doesn't match.");
            }
        } else {
            console.log("Authentication error: This email isn't registered.");
        }
    }


}