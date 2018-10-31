import * as React from 'react';
import { Link } from 'react-router-dom';

import '../../../public/assets/dist/main.scss'
import './Home.scss';
import { Header } from '../../components/Header/Header';

export const Home = () => {

    return (
        <section className="home">
            <Header />

            <div className="content">
                <h1>Optimizing your time</h1>
                <p>Make tasks in groups is easier and faster with Doo.</p>
                <div className="buttons">
                    <Link to="/signup">
                        <button className="iButton">Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </section>
    )
};

