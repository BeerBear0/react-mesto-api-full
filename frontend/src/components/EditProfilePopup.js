import React from 'react'
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext)

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    function handleNameUpdate(e) {
        setName(e.target.value);
    }

    function handleDescriptionUpdate(e) {
        setAbout(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: about
        })
    }

    return (
        <PopupWithForm
            title="Редактировать Профиль"
            name="Edit-profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}

        >
            <input
                onChange={handleNameUpdate}
                className="popup__input popup__input_type_name"
                value={name || ''}
                type="text"
                name="name"
                id="name-input"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
            />
            <span className="popup__input-error" id="name-input-error" />
            <input
                onChange={handleDescriptionUpdate}
                className="popup__input popup__input_type_about"
                value={about || ''}
                type="text"
                name="about"
                id="about-input"
                placeholder="Работа"
                minLength="2"
                maxLength="200"
                required
            />
            <span className="popup__input-error popup__input-error_two" id="job-input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup