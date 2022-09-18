import React from "react";
import {register} from '../utils/auth'

function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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
            // history.push('./sing-in');
          })
          .catch((err) => {
            // setFlag(flag);
            // setIsInfoUser(true);
            console.error(err);
          });
      }

    return (
        <div className="registr">
            <form className="registr__conteiner" onSubmit={handleSubmit}>
                <h2 className="registr__name">Регистрация</h2>
                <fieldset className="registr__field">
                    <input className="registr__item" placeholder="Email" name="email" type="email" required=""
                        onChange={handleChangeEmail} />
                    <span className="registr__error" />
                    <input className="registr__" placeholder="Пароль" name="password" type="password" required=""
                        onChange={handleChangePassword} />
                    <span className="registr__error" />
                </fieldset>
                <button className="registr__button-submit" type="submit">Зарегистрироваться</button>
                 {/* <div className="registr__text">Уже зарегистрированы?<Link className="registr__enter" to="/sign-in"></Link></div> */}
            </form>
        </div>
    )
}
export default Register;