import React from "react";

function ImagePopup ({card, onClose}) {
    return (
        <div className={`popup popup_type-image ${card ? 'popup__opened' : ''}`}>
            <div className=" popup__image-container">

                <button type="reset" className="popup__close-btn" aria-label="закрыть" onClick={onClose}/>
                <img src={`${card?.link}`} className="popup__image" alt={card?.name} />
                <p className="popup__image-name">{card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup