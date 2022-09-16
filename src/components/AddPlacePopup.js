import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onCloseOverlay}) {
  const cardRefName = React.useRef()
  const cardRefLink = React.useRef()

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onAddPlace({
      name: cardRefName.current.value,
      link: cardRefLink.current.value
    });
  }
  
  return (
    <PopupWithForm isOpen={isOpen} name="addPhoto" onClose={onClose}
    onSubmit={handleSubmit} onCloseOverlay={onCloseOverlay}>
      <div
        className="form"
        id="form_photo"
        name="addPhoto"
        method="post"
        action="#"
        noValidate="">
        <h2 className="form__title">Новое место</h2>
        <fieldset className="form__user">
          <input
            className="form__item"
            type="text"
            id="elements__name"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            ref={cardRefName} />
          <span className="form__item-error" id="elements__name-error" />
          <input
            className="form__item"
            type="url"
            id="elements__image"
            name="link"
            placeholder="Ссылка на картинку"
            required
            ref={cardRefLink} />
          <span className="form__item-error" id="elements__image-error" />
        </fieldset>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup