import React from 'react';
import logo from '../images/logo-1.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
        </header>
    );
    }
    export default Header;