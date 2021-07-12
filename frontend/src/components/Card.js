import React from "react";
import { CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`element__delete-btn ${!isOwn ? '' : 'element__delete-btn_active'}`
    );

    const isLike = card.likes.some(item => item._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-btn ${isLike && 'element__like_active'}`
    )

    function handleImageClick() {
        onCardClick(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }
    function handleCardLikeClick() {
        onCardLike(card);
    }
    return (
        <div className="card-template">
            <article className="element">
                <div className="element__btn-image">
                    <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName} />
                    <button type="button" className="element__open-image">
                        <img className="element__image" onClick={handleImageClick} src={card.link} alt={card.name} />
                    </button>
                </div>
                <div className="element__info">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like-counter">
                        <button  onClick={handleCardLikeClick} type="button" className={cardLikeButtonClassName} />
                        <span className="element__handle-like">{card.likes.length > 0 ? `${card.likes.length}` : 0}</span>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Card