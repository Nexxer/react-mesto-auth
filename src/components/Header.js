import React from 'react';
import logo from '../image/logo.svg';
import { Route, useHistory, Link } from 'react-router-dom';
import { ROUTES_MAP } from '../utils/routesMap';

function Header({ userMail, onSignOut }) {
  const history = useHistory();

  const exit = () => {
    onSignOut();
    localStorage.removeItem("jwt");
    history.push("/signin");
  };

  return (
    <header className="header">
      <Link to={ROUTES_MAP.MAIN}>
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>

      <Route path={ROUTES_MAP.MAIN} exact>
        <div className="header__user">
          <p className="header__user-mail">{userMail}</p>
          <Link className="header__link" to={ROUTES_MAP.SIGN_IN} onClick={exit}>
            Выйти
        </Link>
        </div>
      </Route>

      <Route path={ROUTES_MAP.SIGN_UP}>
        <Link className="header__link" to={ROUTES_MAP.SIGN_IN}>
          Войти
        </Link>
      </Route>

      <Route path={ROUTES_MAP.SIGN_IN}>
        <Link className="header__link" to={ROUTES_MAP.SIGN_UP}>
          Регистрация
        </Link>
      </Route>

      <Route path={ROUTES_MAP.NOT_FOUND}>
        <Link className="header__link" to={ROUTES_MAP.MAIN}>
          На главную
        </Link>
      </Route>

    </header >
  )
};

export default Header;
