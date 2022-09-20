import success from '../images/success.svg';
import errors from '../images/Errors.svg';

function InfoTooltip(onClose, isOpen, flag) {
    return(
        <div className={`popup popup__info-tooltip ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    aria-label="закрыть"
                    id="close-button"
                    onClick={onClose}
                    value="close" />
                    <img className="popup__tooltip-img" alt="#" src={`${flag ? success : errors}`}/>
                    <h2 className="popup__subtitle">{`${flag ? "Вы успешно зарегистрировались!" : 
                    "Что-то пошло не так. Попробуйте еще!" }`}</h2>
                    </div>
        </div>
    )
}
export default InfoTooltip;