import React from 'react';

function Login(props) {
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
    props.onLogin(email, password);
    setEmail("");
    setPassword("");
  }

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
          onChange={handleEmailChange}
        />

        <input
          className="login__input"
          type="password"
          required={true}
          placeholder="Пароль"
          onChange={handlePasswordChange}
        />

        <button type="submit" className="login__submit-button">
          Войти
      </button>
      </form>
    </div>

  )
};

export default Login;
