//корневой компонент

import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Switch, useHistory, Redirect, Route } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js';
import newApi from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import RemoveCardPopup from './RemoveCardPopup.js';
import Login from './Login';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isRemoveCardPopupOpen, setisRemoveCardPopupOpen] = useState(false);
  const [selectCard, setSelectCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [flag, setFlag] = useState(false);
  const [isInfoUser, setIsInfoUser] = useState(false);
  const [loginIn, setLoginIn] = useState('');
  const history = useHistory();

  const handleCardClick = (card) => {
    setSelectCard(card);
    setIsImagePopupOpened(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarClick(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfileClick(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlaceClick(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    newApi.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
        )
      }).catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    // const isOwn = card.owner._id === currentUser._id;
    newApi.changeDeleteCardStatus(card._id)
      .then((newCard) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      }).catch((err) => {
        console.error(err);
      });
  }

  const handleAddPlaceSubmit = (card) => {
    newApi.setNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlaceClick(false);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateAvatar = (avatarData) => {
    newApi.editAvatar(avatarData)
      .then((newData) => {
        setСurrentUser(newData);
        setIsEditAvatarClick(false);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateUser = (user) => {
    newApi.editUserInfo(user)
      .then((newData) => {
        setСurrentUser(newData);
        setIsEditProfileClick(false);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleRedisterSubmit = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setFlag(true);
        setIsInfoUser(true);
        history.push('./sing-in');
      })
      .catch((err) => {
        setFlag(flag);
        setIsInfoUser(true);
        console.error(err);
      });
  }

  const handleLoginSubmit = (email, password) => {
    auth.autorization(email, password)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      setLoginIn(true);
      history.push('/');
      setUserEmail(email);
    })
    .catch((err) => {
      setFlag(flag);
      setIsInfoUser(true);
      console.error(err);
    });
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setUserEmail('');
  }

  const checkToken= () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
      .restContent(jwt)
      .then((data) => {
        setLoginIn(true);
        setUserEmail(data.data.email);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
    })
  }}

  React.useEffect(()=> {
    checkToken();
  }, [])

  const closeAllPopups = () => {
    setIsEditAvatarClick(false);
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setIsImagePopupOpened(false);
    setisRemoveCardPopupOpen(false);
    setSelectCard({});
    setDeleteCard(false);
    setIsInfoUser(false);
  }

  useEffect(() => {
    Promise.all([newApi.getCards(), newApi.getUserInfo()])
      .then(([cards, userData]) => {
        setCards(cards);
        setСurrentUser(userData)
      })
      .catch((err) => {
        console.error(err);
      })
  }, [loginIn]);

  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups()
    }
  }

  const closeByOverlay = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }
  }

  useEffect(() => {
    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isImagePopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }
    return () => (document.removeEventListener('keydown', closeByEsc));
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isImagePopupOpened]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__wrapper">
          <Header email={userEmail} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              path="/main"
              loginIn={loginIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              setCards={setCards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onDeletePopup={setisRemoveCardPopupOpen}
              setDeleteCard={setDeleteCard} />
              <Route path="/sign-up">
                <Register onRegister={handleRedisterSubmit} />
              </Route>
              <Route path="/sign-in">
                <Login onLogin={handleLoginSubmit} />
              </Route>
              <Route path="/">
                <Register to="/main" /> : <Redirect to="/sign-in" />
              </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onCloseOverlay={closeByOverlay} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseOverlay={closeByOverlay} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onCloseOverlay={closeByOverlay} />
        <RemoveCardPopup
          isOpen={isRemoveCardPopupOpen}
          onClose={closeAllPopups}
          onRemoveCardPopup={handleCardDelete}
          deleteCard={deleteCard}
          onCloseOverlay={closeByOverlay} />
        <ImagePopup
          card={selectCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay} />
        <InfoTooltip flag={flag} isOpen={isInfoUser} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
