import React, { useState } from 'react';
import logo from '../images/logo-1.svg';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import MobileMenu from './elements/burger';
import Offcanvas from 'react-bootstrap/Offcanvas';
import HeaderDrop from './HeaderDrop';
import { getAllByPlaceholderText } from '@testing-library/react';
import CloseButton from './elements/CloseButton';

function Header({ userEmail, setUserEmail }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(!show);

    const matches = useMediaQuery('(min-width: 600px)')
    let location = useLocation();

    console.log({ matches })

    function handleSignOut(e) {
        localStorage.removeItem("jwt");
        setUserEmail("");
    }
    return (
        <>
            {show && <div onClick={() => setShow(false)} className="header__burger">
                <div>{userEmail === undefined ? (<></>)
                    : (<div className="header__container">{userEmail}
                        <Link className="header__text" to="/sign-up" onClick={handleSignOut}>
                            Выйти</Link></div>)}
                </div></div>}
            <header className="header">
                {/* <HeaderDrop email={userEmail} open={show} onClose={handleClose} /> */}
                <img className="header__logo" src={logo} alt="логотип" />
                {location.pathname === '/sign-in' && <div className="header__container">
                    {matches && <Link className="header__text" to="/sign-up">Регистрация</Link>}</div>}
                {location.pathname === '/sign-up' && <div className="header__container">
                    {matches && <Link className="header__text" to="/sign-in">Войти</Link>}</div>}
                {!matches ? (<div className='header__menu' onClick={handleShow}>{show ? (<CloseButton />) :
                    (<MobileMenu />)}</div>) : (<div>{userEmail === undefined ? (<></>)
                        : (<div className="header__container">{userEmail}<Link className="header__text" to="/sign-up" onClick={handleSignOut}>
                            Выйти</Link></div>)}
                    </div>)}
            </header>
        </>
    );
}
export default Header;