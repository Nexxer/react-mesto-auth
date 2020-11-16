import React from 'react';
import { useHistory } from "react-router-dom";
import { onLogin } from "./../utils/apiLogin";

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      console.error("Введите данные");
    };

    const clearForm = () => {
      setEmail("");
      setPassword("");
    };

    onLogin(email, password)
      .then((res) => {
        if (res.token) {
          clearForm();
          handleLogin();
          history.push("/");
        } else if (res.message) {
          console.error(res.message)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form
        onSubmit={handleSubmit}
      >
        <input
          className="login__input"
          type="email"
          required={true}
          placeholder="Email"
          onChange={(evt) => setEmail(evt.target.value)}
        />

        <input
          className="login__input"
          type="password"
          required={true}
          placeholder="Пароль"
          onChange={(evt) => setPassword(evt.target.value)}
        />

        <button type="submit" className="login__submit-button">
          Войти
      </button>
      </form>
    </div>

  )
};

export default Login;
