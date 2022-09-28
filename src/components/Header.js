import React, { useState } from 'react';
import logo from '../images/logo-1.svg';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import MobileMenu from './elements/burger';
import CloseButton from './elements/CloseButton';

function Header({ userEmail, setUserEmail }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const matches = useMediaQuery('(min-width: 600px)')
    let location = useLocation();

    function handleSignOut(e) {
        localStorage.removeItem("jwt");
        setUserEmail("");
    }
    return (
        <>
            {show && <div onClick={() => setShow(false)} className="header__burger">
                <div>{userEmail === undefined ? (<></>)
                    : (<div className="header__container">{userEmail}
                        <Link className="header__text" to="/sign-in" onClick={handleSignOut}>
                            Выйти</Link></div>)}
                </div></div>}
            <header className="header">
                <img className="header__logo" src={logo} alt="логотип" />
                {location.pathname === '/sign-in' && <div className="header__container">
                    {matches && <Link className="header__text" to="/sign-up">Регистрация</Link>}</div>}
                {location.pathname === '/sign-up' && <div className="header__container">
                    {matches && <Link className="header__text" to="/sign-in">Войти</Link>}</div>}
                {!matches ? (<div className='header__menu' onClick={handleShow}>{show ? (<CloseButton />) :
                    (<MobileMenu />)}</div>) : (<div>{userEmail === undefined ? (<></>)
                        : (<div className="header__container">{userEmail}<Link className="header__text" to="/sign-in" onClick={handleSignOut}>
                            Выйти</Link></div>)}
                    </div>)}
            </header>
        </>
    );
}
export default Header;