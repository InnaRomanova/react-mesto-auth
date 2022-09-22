import React from 'react';
import logo from '../images/logo-1.svg';
import {Link, Route, Routes } from 'react-router-dom';

function Header({ userEmail, setUserEmail }) {
    function handleSignOut(e) {
        localStorage.removeItem("jwt");
        setUserEmail("");
      }
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            {/* <div className="header__container"><Link className="header__text" to="/sign-up">Регистрация</Link></div>
            <div className="header__container"><Link className="header__text" to="/sign-in">Войти</Link></div> */}
                
            <div className="header__container">{userEmail}<Link className="header__text" to="/sign-up" onClick={handleSignOut}>
                Выйти</Link></div>
           
        </header>
    );
}
export default Header;