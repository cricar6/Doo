import * as React from 'react';

import './Header.scss';
import Logo from '../Logo/Logo';


export const Header = () => {

    return (
    <header>
            <div className="logoContainer" >
                <Logo />
            </div>
            
    </header>)
}