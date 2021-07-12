import React from "react";

function PopupWithForm({name, title, isOpen, onClose, onSubmit,  children}) {
    return(
        <div className={`popup popup_type_${name} ${isOpen && 'popup__opened'}`} >
            <form
                className="popup__container"
                name={name}
                onSubmit={onSubmit}
            >
                <button
                    className="popup__close-btn"
                    type="reset"
                    aria-label="закрыть"
                    onClick={onClose}

                />
                <h3 className="popup__title">{title}</h3>
                {children}
                <button className="popup__submit" type="submit">Сохранить</button>
            </form>
        </div>

    )
}
export default PopupWithForm