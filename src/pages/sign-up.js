import React, { useState } from "react";
import { register } from '../utils/auth';
import Header from "../components/Header";
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useNavigate();

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
            .then(() => {
                // setFlag(true);
                // setIsInfoUser(true);
                setOpenModal(true);
                history('/sign-in');
            })
            .catch((err) => {
                // setFlag(flag);
                // setIsInfoUser(true);
                console.error(err);
            });
    }
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Header />
            {openModal && <p>Modal</p>}
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
                    {/* <div className="registr__text">Уже зарегистрированы?<Link className="registr__enter" to="/sign-in"></Link></div> */}
                </form>
            </div>
        </>
    )
}
export default Register;