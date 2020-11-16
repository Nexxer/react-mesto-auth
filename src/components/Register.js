import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { ROUTES_MAP } from '../utils/routesMap';
import { registration } from "./../utils/apiLogin";

function Register({ registrationPopupOpen }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registration(email, password)
      .then((res) => {
        if (res.data.email === email) {
          registrationPopupOpen(res.data);
          history.push("/signin");
        } else {
          registrationPopupOpen(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          onChange={(evt) => setEmail(evt.target.value)}

        />
        <div className="login__input-box">
          <input
            className="login__input"
            type="password"
            required={true}
            placeholder="Пароль"
            onChange={(evt) => setPassword(evt.target.value)}
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