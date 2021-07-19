import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDesc(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: desc,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDesc(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editName"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="editProfileName"
        id="editProfileName"
        className="popup__input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span id="editProfileName-error" className="popup__error"/>
      <input
        type="text"
        name="editProfileBio"
        id="editProfileBio"
        className="popup__input"
        placeholder="Краткая информация"
        required
        minLength="2"
        maxLength="200"
        value={desc || ''}
        onChange={handleChangeDescription}
      />
      <span id="editProfileBio-error" className="popup__error"/>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
