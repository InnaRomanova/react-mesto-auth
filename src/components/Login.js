import React from "react"
import { withRouter } from "react-router-dom"

function Login({ onLogin }) {
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
        onLogin(email, password)
    }

    return (
        <div className="registr">
            <form className="registr__conteiner" onSubmit={handleSubmit}>
                <h2 className="registr__name">Вход</h2>
                <fieldset className="registr__field">
                    <input className="registr__item" placeholder="Email" name="email" type="email" required=""
                        onChange={handleChangeEmail} />
                    <span className="registr__error" />
                    <input className="registr__" placeholder="Пароль" name="password" type="password" required=""
                        onChange={handleChangePassword} />
                    <span className="registr__error" />
                </fieldset>
                <button className="registr__button-submit" type="submit">Войти</button>
            </form>
        </div>
    )
}
export default withRouter (Login);