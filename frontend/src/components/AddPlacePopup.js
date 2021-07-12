import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [cardName, setCardName] = React.useState('');
    const [cardLinkImg, setCardLingImg] = React.useState('');



    function handleChangeName(e) {
        setCardName(e.target.value);
    }

    function handleChangeLink (e) {
        setCardLingImg(e.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();
        onAddPlace({
            name: cardName,
            link: cardLinkImg
        })
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="New-place"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_title"
                onChange={handleChangeName}
                value={cardName}
                type="text"
                name="title"
                id="title-input"
                placeholder="Название"
                minLength="1"
                maxLength="30"
                required
            />
            <span className="popup__input-error" id="title-input-error"/>
            <input
                className="popup__input popup__input_type_url"
                onChange={handleChangeLink}
                value={cardLinkImg}
                type="url"
                name="url"
                id="url-input"
                placeholder="Ссылка"
                required
            />
            <span className="popup__input-error popup__input-error_two" id="url-input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup