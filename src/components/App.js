//корневой компонент

import { useEffect, useState } from 'react';
import { restContent } from "../utils/auth";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import newApi from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js';
import RemoveCardPopup from './RemoveCardPopup.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isRemoveCardPopupOpen, setisRemoveCardPopupOpen] = useState(false);
  const [selectCard, setSelectCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLogged, setIsLogged] = useState(false);

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

  const closeAllPopups = () => {
    setIsEditAvatarClick(false);
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setIsImagePopupOpened(false);
    setisRemoveCardPopupOpen(false);
    setSelectCard({});
    setDeletedCard(false);
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
  }}, [isLogged])

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
           />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;