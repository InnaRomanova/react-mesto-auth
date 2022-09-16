import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseOverlay }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);  // Подписка на контекст

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();// Запрещаем браузеру переходить по адресу формы
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} name="profile" title="Редактировать профиль"
      onSubmit={handleSubmit} onClose={onClose}
      onCloseOverlay={onCloseOverlay}>
        <div
        className="form"
        id="form_profile"
        name="profile"
        method="post"
        action="#"
        noValidate="">
        <fieldset className="form__user" id="profile__fields">
          <input
            className="form__item"
            type="text"
            id="profile__name"
            name="name"
            placeholder="Введите ваше имя"
            autoComplete="off"
            value={name || ''}
            minLength="2"
            maxLength="40"
            required=""
            onChange={handleChangeName} />
          <span className="form__item-error" id="profile__name-error" />
          <input
            className="form__item"
            type="text"
            id="profile__about"
            name="about"
            placeholder="Ваша профессия"
            minLength="2"
            maxLength="200"
            autoComplete="off"
            value={description || ''}
            required=""
            onChange={handleChangeDescription} />
          <span className="form__item-error" id="profile__about-error" />
        </fieldset>
      </div>
      </PopupWithForm>
  )
}

export default EditProfilePopup;