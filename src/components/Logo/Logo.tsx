import * as React from 'react';
import './Logo.scss';

const Logo = () => {
    return (
            <svg width="100%" height="100%" viewBox="0 0 170 50" className="logo">
                <circle className="letter Oone" cx="57.5" cy="25.5" r="20" />
                <path className="letter D" d="M38.5,25.5c0,11-9,20-20,20c-5,0-13,0-13,0v-20v-20c0,0,6.9,0,13,0C29.5,5.5,38.5,14.5,38.5,25.5z" />
                <circle className="letter Otwo" cx="96.5" cy="25.5" r="20" />
            </svg>
    )
};

export default Logo;
