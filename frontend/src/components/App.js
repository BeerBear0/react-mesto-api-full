import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { api } from '../utils/api';
import { auth } from '../utils/authApi';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { POPUP_DEFAULT } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...POPUP_DEFAULT,
      selectedCard: {},
      currentUser: {},
      cards: [],
      loggedIn: false,
      userEmail: '',
      TooltipStatus: 'not',
    };
  }

  async componentDidMount() {
      auth
        .tokenCheck()
        .then(res => {
          if (res.email) {
            this.setState({
              loggedIn: true,
              userEmail: res.email
            });
              this.fetchMainData();
          }
        })
        .catch(err => {
          console.error(err);
        });
  }

  fetchMainData = () => {
    api.getUserInfo().then(
      (currentUser) => {
        this.setState({ currentUser });
      }
    )
    api.getCards().then(
      (cards) => {
        this.setState({ cards })
      }
    )
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleCardClick = card => {
    this.setState({
      selectedCard: {
        name: card.name,
        link: card.link,
      },
      isImagePopupOpen: true,
    });
  };

  handleUpdateUser = ({ name, about }) => {
    api
      .changeUserInfo({ name, about })
      .then(userData => {
        this.setState({ currentUser: userData });
        this.closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleUpdateAvatar = url => {
    api
      .changeUserAvatar(url)
      .then(userData => {
        this.setState({ currentUser: userData });
        this.closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  };

  closeAllPopups = () => {
    this.setState(POPUP_DEFAULT);
  };

  handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        this.setState(state => {
          return {
            cards: state.cards.map(c => (c._id === card._id ? newCard : c)),
          };
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleCardDelete = card => {
    api
      .deleteCard(card._id)
      .then(() => {
        this.setState(state => {
          return {
            cards: state.cards.filter(c => c._id !== card._id),
          };
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then(newCard => {
        this.setState({ cards: [...this.state.cards, newCard] });
        this.closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  };

  deleteToken = () => {
    auth.logout().then(() => {
      this.setState({
        loggedIn: false,
        userEmail: '',
      })
    })
  };

  authorize = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then((res) => {
        if (res.message === 'ok') {
          this.setState({
            loggedIn: true,
            userEmail: email,
          });
          this.fetchMainData();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  register = ({ email, password }) => {
    auth
      .register({ email, password })
      .then(res => {
        if (res.data) {
          this.setState({
            TooltipStatus: 'ok',
          });
        }
      })
      .catch(err => {
        this.setState({
          TooltipStatus: 'not',
        });
        console.error(err);
      })
      .finally(() => {
        this.setState({
          isInfoTooltipOpen: true,
        });
      });
  };

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header
          email={this.state.userEmail}
          loggedIn={this.state.loggedIn}
          exitUser={this.deleteToken}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={this.state.loggedIn}
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onEditAvatar={this.handleEditAvatarClick}
            onCardClick={this.handleCardClick}
            cards={this.state.cards}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
          />

          {!this.state.loggedIn ? (
            <>
              <Route path="/sign-up">
                <Register onSubmit={this.register} />
              </Route>
              <Route path="/sign-in">
                <Login onSubmit={this.authorize} />
              </Route>
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
        <Footer />

        <PopupWithForm
          title="Вы уверены?"
          name="confirmDelete"
          buttonText="Да"
          onClose={this.closeAllPopups}
        />

        <EditProfilePopup
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onAddPlace={this.handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar}
        />

        <ImagePopup
          card={this.state.selectedCard}
          isOpen={this.state.isImagePopupOpen}
          onClose={this.closeAllPopups}
        />

        <InfoTooltip
          isOpen={this.state.isInfoTooltipOpen}
          status={this.state.TooltipStatus}
          onClose={this.closeAllPopups}
        />
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
