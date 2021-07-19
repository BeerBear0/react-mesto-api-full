import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const titleRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: titleRef.current.value,
      link: urlRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addPlace"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={titleRef}
        type="text"
        name="newPlaceName"
        id="newPlaceName"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span id="newPlaceName-error" className="popup__input-error"/>
      <input
        ref={urlRef}
        type="url"
        name="newPlaceUrl"
        id="newPlaceUrl"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="newPlaceUrl-error" className="popup__error"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
