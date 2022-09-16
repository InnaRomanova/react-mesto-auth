import PopupWithForm from "./PopupWithForm.js"

function RemoveCardPopup({ isOpen, onClose, onRemoveCardPopup, deleteCard, onCloseOverlay }) {
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        onRemoveCardPopup(deleteCard);
        onClose(true)
    };
    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay}
            name="confirmation"
            title="Вы уверены?"
            buttonText="Да" />)
}

export default RemoveCardPopup;