import React from "react";
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardDelete, 
    onCardLike, onDeletePopup, onConfirmDelete, setDeleteCard }) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile" type="button">
                <button className="profile__avatar-edit-button" onClick={onEditAvatar}>
                    <img
                        className="profile__image profile__image_avatar"
                        src={currentUser.avatar}
                        alt="аватар" />
                </button>
                <div className="profile__info">
                    <h2 className="profile__name">{currentUser.name}</h2>
                    <button
                        className="profile__edit-button"
                        onClick={onEditProfile}
                        type="button"
                        title="Редактировать" />
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    onClick={onAddPlace}
                    type="button"
                    title="Добавить фотографию" />
            </section>
           
            <section className="elements">
                <ul className="elements__contain">
                    {cards.map((card) => {
                        return (<Card key={card._id} card={card} 
                            onCardClick={onCardClick} onCardLike={onCardLike}
                            onCardDelete={onCardDelete} onDeletePopup={onDeletePopup} 
                            onConfirmDelete={onConfirmDelete} setDeleteCard={setDeleteCard} />)
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main;