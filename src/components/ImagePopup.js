function ImagePopup(props) {
  return(
<div className={`popup popup_open-card ${props.card.link && 'popup_opened'}`}>
  <div className="popup__content">
    <button
      className="popup__close-button"
      id="Close-card"
      type="button"
      onClick={props.onClose}
      value="close" />
    <figure className="popup__wrapper">
      <img src={props.card.link} alt={props.card.name} className="popup__image" />
      <figcaption className="popup__caption">{props.card.name}</figcaption>
    </figure>
  </div>
</div>
  )
}

export default ImagePopup;