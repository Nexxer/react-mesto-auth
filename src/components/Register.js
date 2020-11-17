import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { ROUTES_MAP } from '../utils/routesMap';

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      console.error("Введите данные");
    }
    props.onRegister(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <input
          className="login__input"
          type="email"
          required={true}
          placeholder="Email"
          onChange={handleEmailChange}

        />
        <div className="login__input-box">
          <input
            className="login__input"
            type="password"
            required={true}
            placeholder="Пароль"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="login__submit-button">
          Зарегистрироваться
      </button>
      </form>

      <Link className="login__link" to={ROUTES_MAP.SIGN_IN}>
        <p className="login__link_text">Уже зарегистрированы? Войти</p>
      </Link>

    </div>

  )
}

export default Register;