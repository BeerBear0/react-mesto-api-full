function ImagePopup(props) {
  return (
    <div
      className={`popup popup_dark${props.isOpen ? ' popup_opened' : ''}`}
      id="popupImage"
    >
      <div className="abs-center">
        <button
          aria-label="Закрыть всплывающее окно"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <figure className="popup__image-container">
          <img
            src={props.card.link}
            alt="Подпись"
            id="fullsizeImage"
            className="popup__image"
          />
          <figcaption className="popup__image-title">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
