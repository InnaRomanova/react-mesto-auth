import { useEffect } from 'react'

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit,
    onCloseOverlay }) {
    useEffect(() => {
        if (isOpen) {
          document.addEventListener('mousedown', onCloseOverlay);
        } else {
          document.removeEventListener('mousedown', onCloseOverlay);
        }
      }, [isOpen])

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} id={`popup-${name}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    aria-label="закрыть"
                    id="close-button"
                    onClick={onClose}
                    value="close" />
                <form
                    className="form"
                    id="form_profile"
                    name={name}
                    onSubmit={onSubmit}
                    method="post"
                    action="#"
                    noValidate="">
                    <h2 className="form__title">{title}</h2>
                    {children}
                    <button
                        className="form__button"
                        id="form__button__profile"
                        type="submit"
                        name="profile__save"
                        value="Сохранить">
                        {buttonText || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm