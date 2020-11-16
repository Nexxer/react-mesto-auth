import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { api } from '../utils/api';
import { getJWT } from "./../utils/apiLogin";
import CurrentUserContext from './../contexts/CurrentUserContext';
import { ROUTES_MAP } from '../utils/routesMap';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import NotFound from "./NotFound";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [userMail, setUserMail] = useState('TEST');

  const history = useHistory();

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getJWT(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserMail(res.data.email);
            history.push("/");
          } else {
            setLoggedIn(false);
            localStorage.removeItem('jwt');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([values, card]) => {
        setCurrentUser(values);
        setCards(card);
      })
      .catch((err) => {
        console.log(`Данные не получены. ${err}`);
      })
  }, []);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка лайка. ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки. ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard('');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    api
      .setUserInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных пользователя. ${err}`);
      })
  }

  function handleUpdateAvatar(avatar) {
    api
      .setNewAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара. ${err}`);
      })
  }

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(card)
      .then((res) => {
        const newCard = res;
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки. ${err}`);
      })
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div style={{ backgroundColor: "#000" }}>
        <div className="page">

          <Header
            userMail={userMail}
            onSignOut={handleLogout}
          />

          <Switch>
            <ProtectedRoute path={ROUTES_MAP.MAIN} exact
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route path={ROUTES_MAP.SIGN_UP}>
              <Register
                registrationPopupOpen={setIsRegisterPopupOpen}
              />
            </Route>

            <Route path={ROUTES_MAP.SIGN_IN}>
              <Login
                handleLogin={handleLogin}
              />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
          />

        </div>
      </div >

    </CurrentUserContext.Provider>
  );
}

export default App;
