import success from '../images/success.svg';
import errors from '../images/errors.svg';

function InfoTooltip({setOpenModal, isOpen, flag}) {
    return(
        <div className={`popup  ${isOpen && 'popup_opened'}`}>
            <div className="popup__block">
                <button
                    className="popup__close-button"
                    aria-label="закрыть"
                    id="close-button"
                    onClick={() => {setOpenModal(false)}}
                    value="close" />
                    <img className="popup__tooltip-img" alt="#" src={`${flag ? success : errors}`}/>
                    <h2 className="popup__subtitle">{`${flag ? "Вы успешно зарегистрировались!" : 
                    "Что-то пошло не так! Попробуйте еще раз." }`}</h2>
                    </div>
        </div>
    )
}
export default InfoTooltip;