import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrap" onClick={props.onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt={`Аватар пользователя ${currentUser.name}`}
            className="profile__avatar"
          />
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <button
          type="button"
          className="profile__edit-btn"
          onClick={props.onEditProfile}
        />
        <p className="profile__bio">{currentUser.about}</p>
        <button
          type="button"
          className="profile__add-element"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((card, i) => (
          <Card
            card={card}
            onCardClick={props.onCardClick}
            key={card._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
