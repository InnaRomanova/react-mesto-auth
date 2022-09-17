import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo-1.svg';

function Header({email, onSignOut}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <Routes>
                <Route path="/sign-up">
                    <div className="header__container">
                        <Link to="sing-in" className="header__link"> Войти </Link>
                    </div>
                </Route>
                <Route path="/sign-in">
                <div className="header__container">
                        <Link to="sing-up" className="header__link"> Зарегистрироваться </Link>
                    </div>
                </Route>
                <Route path="/">
                <div className="header__container">
                    <div>{email}</div>
                        <Link to="sing-in" className="header__link" onClick={onSignOut}> Выйти </Link>
                    </div>
                </Route>
            </Routes>
        </header>
    );
}
export default Header;