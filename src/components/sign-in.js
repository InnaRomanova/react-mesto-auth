import React, { useState, useEffect } from "react";
import { autorization } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";
   const [openModal, setOpenModal] = useState(false);
   const [flag, setFlag] = useState(false);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLoginSubmit(email, password)
    }

    const handleLoginSubmit = (email, password) => {
        autorization(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setEmail(email);
                localStorage.setItem('email', email);
                setTimeout(() => {
                    history('/');
                }, 2000);
            })
            .catch((err) => {
                setOpenModal(true);
                setFlag(false);
                console.error(err);
            });
    }
   
    useEffect(() => {
    }, [openModal])

    return (
        <>
            <Header />
            {openModal && <InfoTooltip isOpen={openModal} setOpenModal={setOpenModal} flag={flag}/>}
            <div className="registr">
                <form className="registr__container" onSubmit={handleSubmit}>
                    <h2 className="registr__name">Вход</h2>
                    <div className="registr__field">
                        <input className="registr__item" placeholder="Email" name="email" type="email" required=""
                            onChange={handleChangeEmail} />
                        <span className="registr__error" />
                        <input className="registr__item" placeholder="Пароль" name="password" type="password" required=""
                            onChange={handleChangePassword} />
                        <span className="registr__error" />
                    </div>
                    <button className="registr__button-submit" type="submit">Войти</button>
                </form>
                {fromPage}
            </div>
        </>
    )
}
export default Login;