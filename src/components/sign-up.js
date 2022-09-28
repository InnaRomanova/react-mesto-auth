import React, { useEffect, useState } from "react";
import { register } from '../utils/auth';
import Header from "./Header";
import { useNavigate, Link } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";

function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useNavigate();
    const [flag, setFlag] = useState(false);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleRegisterSubmit(email, password)
    }

    const handleRegisterSubmit = (email, password) => {
        register(email, password)
            .then((data) => {
                setFlag(true);
                setOpenModal(true);
                setTimeout(() => {
                    history('/sign-in');
                  }, 2000);
            })
            .catch((err) => {
                setOpenModal(true);
                setFlag(false);
                console.error(err);
            });
    }
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
    },[openModal])

    return (
        <>
            <Header />
            {openModal && <InfoTooltip isOpen={openModal} setOpenModal={setOpenModal} flag = {flag}/>}
            <div className="registr">
                <form className="registr__container" onSubmit={handleSubmit}>
                    <h2 className="registr__name">Регистрация</h2>
                    <div className="registr__field">
                        <input className="registr__item" placeholder="Email" name="email" type="email" required=""
                            onChange={handleChangeEmail} />
                        <span className="registr__error" />
                        <input className="registr__item" placeholder="Пароль" name="password" type="password" required=""
                            onChange={handleChangePassword} />
                        <span className="registr__error" />
                    </div>
                    <button className="registr__button-submit" type="submit">Зарегистрироваться</button>
                    <div className="registr__text">Уже зарегистрированы? <Link to="/sign-in" className="registr__enter">Войти</Link></div>
                </form>
            </div>
        </>
    )
}
export default Register;