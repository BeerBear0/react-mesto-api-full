import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const card = props.card;
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonVisible = isOwn ? true : false;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__btn-like ${
    isLiked ? 'element__btn-like_active' : ''
  }`;

  const handleClick = () => {
    props.onCardClick(card);
  };

  const handleLikeClick = () => {
    props.onCardLike(card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(card);
  };

  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <h3 className="element__header">{card.name}</h3>
      <button
        aria-label="Нравится"
        type="button"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      >
        {card.likes.length}
      </button>
      {cardDeleteButtonVisible && (
        <button
          aria-label="Удалить"
          type="button"
          className="element__btn-trash"
          onClick={handleDeleteClick}
        />
      )}
    </article>
  );
}

export default Card;
