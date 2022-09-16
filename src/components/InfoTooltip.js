import imageOk from '../images/imageOk.png';
import imageErrors from '../images/imageErrors.png';

function InfoTooltip(props) {
    return(
<div className={`popup popup__info ${props.isOpen ? 'popup_visible' : ''}`}>
    <div className="popup__overlay">
        
        <img className="popup__img" src={`${props.flag ? imageOk : imageErrors}`} alt="#"/>
        <div className="popup__close_icon" onClick={props.onClose}>+</div>
        <h2 className="popup__subtitle">{`${props.flag ? "Вы успешно зарегистрировались!" : 
        "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
    </div>
</div>
    )
}
export default InfoTooltip