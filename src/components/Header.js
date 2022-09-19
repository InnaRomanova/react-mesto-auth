import React from 'react';
import logo from '../images/logo-1.svg';

function Header({userEmail}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <p>Войти {userEmail}</p>
        </header>
    );
    }
    export default Header;