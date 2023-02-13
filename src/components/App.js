//корневой компонент

<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Routes, useNavigate, Navigate, Route } from 'react-router-dom';
import * as auth from '../utils/auth.js';
=======
import { useEffect, useState } from 'react';
import { restContent } from "../utils/auth";
>>>>>>> dev
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import newApi from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import RemoveCardPopup from './RemoveCardPopup.js';
<<<<<<< HEAD
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

=======
>>>>>>> dev

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isRemoveCardPopupOpen, setisRemoveCardPopupOpen] = useState(false);
  const [selectCard, setSelectCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
<<<<<<< HEAD
  const [deleteCard, setDeleteCard] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [flag, setFlag] = useState(false);
  const [isInfoUser, setIsInfoUser] = useState(false);
  const [loginIn, setLoginIn] = useState('');
  const history = useNavigate();
=======
  const [deletedCard, setDeletedCard] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLogged, setIsLogged] = useState(false);
>>>>>>> dev

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

  const handleRegisterSubmit = (email, password) => {
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
<<<<<<< HEAD
    setDeleteCard(false);
    setIsInfoUser(false);
=======
    setDeletedCard(false);
>>>>>>> dev
  }

  useEffect(() => {
    {isLogged && Promise.all([newApi.getCards(), newApi.getUserInfo()])
      .then(([cards, userData]) => {
        setCards(cards);
        setСurrentUser(userData)
      })
      .catch((err) => {
        console.error(err);
      })
<<<<<<< HEAD
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
=======
  }}, [isLogged])
>>>>>>> dev

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      const dataEmail = localStorage.getItem("email");
      restContent(jwt)
        .then(() => {
          setUserEmail(dataEmail);
          setIsLogged(true);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__wrapper">
<<<<<<< HEAD
          <Header email={userEmail} onSignOut={handleSignOut} />
          <Routes>
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
                <Register onRegister={handleRegisterSubmit} />
              </Route>
              <Route path="/sign-in">
                <Login onLogin={handleLoginSubmit} />
              </Route>
              <Route path="/">
                {loginIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" />}
              </Route>
          </Routes>
=======
          <Header
            userEmail={userEmail}
            setUserEmail={setUserEmail} />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            setCards={setCards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onDeletePopup={setisRemoveCardPopupOpen}
            setDeletedCard={setDeletedCard} 
            />
>>>>>>> dev
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
           />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
           />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
           />
        <RemoveCardPopup
          isOpen={isRemoveCardPopupOpen}
          onClose={closeAllPopups}
          onRemoveCardPopup={handleCardDelete}
          deletedCard={deletedCard}
           />
        <ImagePopup
          card={selectCard}
          onClose={closeAllPopups}
<<<<<<< HEAD
          onCloseOverlay={closeByOverlay} />
        <InfoTooltip flag={flag} isOpen={isInfoUser} onClose={closeAllPopups}/>
=======
           />
>>>>>>> dev
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;