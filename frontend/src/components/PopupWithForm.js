function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      id={props.name}
    >
      <div className="popup__container abs-center">
        <button
          aria-label="Закрыть всплывающее окно"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <form
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          <h4 className="popup__form-header">{props.title}</h4>
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonText ? props.buttonText : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
