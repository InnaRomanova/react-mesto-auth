import { useEffect } from 'react'

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {

    useEffect(() => {
        const closeByOverlay = (e) => {
            if (e.target.classList.contains('popup_opened')) {
                onClose()
            }
        }
        const closeByEsc = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
          document.addEventListener('keydown', closeByEsc);
        } else {document.removeEventListener('keydown', closeByEsc)};

        if (isOpen) {
            document.addEventListener('mousedown', closeByOverlay);
        } else {
            document.removeEventListener('mousedown', closeByOverlay);
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
                    action="#">
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