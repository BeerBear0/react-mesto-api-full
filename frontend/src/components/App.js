import React from "react";
import {Switch, Route, useHistory, Redirect} from 'react-router-dom'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth'

import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App()

{
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [infoPopupOpen, setInfoPopupOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [token, settoken] = React.useState('');
    const history = useHistory();


    React.useEffect(() => {
        if (loggedIn) {
            api.getInfoFromServer(token)
                .then(([cardsData, userData]) => {
                    setCurrentUser(userData)
                    setCards(cardsData)
                })
                .catch(err => console.log(err))
        }
    }, [loggedIn, token])

        function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked, token)
            .then(newCard => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.error(err));
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id, token)
            .then(_ => {
                setCards(state => {
                    return state.filter(c => c._id !== card._id);
                })
            }).catch(err => console.error(err));
    }

    function  handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function  handleEditProfileClick() {
       setIsEditProfilePopupOpen(true)
    }
    function  handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick (card)  {
        setSelectedCard(card)
    }

    function closeAllPopup() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setInfoPopupOpen(false);
    }

    function handleUpdateUser(input) {
        api.patchUserProfile(input, token)
            .then(res => {
                setCurrentUser(res);
                closeAllPopup();
            }).catch(err => console.error(err));
    }

    function handleUpdateAvatar(input) {
        api.patchAvatar(input, token)
            .then(res => {
                setCurrentUser(res);
                closeAllPopup();
            })
            .catch(err => console.error(err));
    }

    function handleAddPlaceSubmit(input) {

        api.postUserCard(input, token)
            .then(card => {
                setCards([card, ...cards])
                closeAllPopup();
            })
            .catch(err => console.log(err));
    }

    function handleRegisterConfirm (foo) {
        setInfoPopupOpen(true)
        setIsSuccess(foo)
    }
    function handleRegister (email, password) {
        auth.register(email, password)
            .then(res => {
                if(res) {
                    handleRegisterConfirm(true)
                    history.push('.sign-in')
                } else {
                    handleRegisterConfirm(false)
                }
            })
            .catch(err => {
             console.log({message: "Некорректно заполнено одно из полей"});
            })
    }

    function handleLogin (email, password) {
        auth.authorize(email, password)
            .then(data => {
                if (data.token) {
                    setEmail(email)
                    setLoggedIn(true)
                    history.push('/')
                }
            })
            .catch( err => console.log(err.name, err.message))
    }

    function onSignOut () {
        localStorage.removeItem('jwt');
        history.push('./login');
        setEmail('')
        setLoggedIn(false)
    }

    function tokenCheck () {
        const jwt = localStorage.getItem('jwt');
        if(jwt) {
            settoken(jwt);
            auth.getContent(jwt)
                .then(res => {
                    if(res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(err => {
                    console.log(err)
                    history.push('/sign-in')
                })
        }
    }

    React.useEffect(() => {
        tokenCheck()
    }, [])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='root' >
                <Header
                    onSignOut={onSignOut}
                    email={email}
                    loggedIn={loggedIn}
                />
                <Switch>
                    <Route path='/sign-in'>
                        <Login
                            onLogin={handleLogin}
                        />
                    </Route>
                    <Route path='/sign-up'>
                        <Register onRegister={handleRegister} />
                    </Route>

                    <ProtectedRoute
                        exact path='/'
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route path='/'>
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>

                </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopup}
                    onUpdateUser={handleUpdateUser} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopup}
                    onAddPlace={handleAddPlaceSubmit} />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopup}
                    onUpdateAvatar={handleUpdateAvatar} />

                <PopupWithForm
                    title="ВЫ уверены?"
                    name="delete-card"
                    btnText="Да" />


                <ImagePopup
                    name={`open-imagePopup`}
                    card={selectedCard}
                    // isOpen={isImagePopupOpen}
                    onClose={closeAllPopup}
                />


                <InfoTooltip
                    isOpen={infoPopupOpen}
                    onClose={closeAllPopup}
                    isSuccess={isSuccess}
                    isClose={closeAllPopup}
                />
            </div>
        </CurrentUserContext.Provider>

    );
}
export default App;