import React from 'react';
import logo from '../images/logo-1.svg';
import {Link, Route, Routes } from 'react-router-dom';

function Header({ userEmail }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <div className="header__container"><Link className="header__text" to="/sign-up">Регистрация</Link></div>
            <div className="header__container"><Link className="header__text" to="/sign-in">Войти</Link></div>
                
            <div className="header__container">{userEmail}<Link className="header__text" to="/sign-up">Выйти</Link></div>
           
        </header>
    );
}
export default Header;