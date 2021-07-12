import React from 'react'
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar ({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            title="Обновить Аватар"
            name="edit-avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_avatar"
                type="url"
                name="avatar"
                id="url-avatar"
                placeholder="Ссылка"
                ref={avatarRef}
                required
            />
            <span className="popup__input-error" id="url-avatar-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup