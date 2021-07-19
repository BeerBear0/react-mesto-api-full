import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="newAvatarUrl"
        id="newAvatarUrl"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="newAvatarUrl-error" className="popup__error"/>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
