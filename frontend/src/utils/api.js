
class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInfoFromServer(token) {
        return Promise.all([this.getUserInfo(token),this.getInitialCards(token)])
    }

    // обработчик респонсов сервера
    _handleResponse(res){
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error! : ${res.status}`)
        }

    }

    // получение начальных данных от пользователя
    getUserInfo(token) { // Запрос на загрузку данных пользователя
        return fetch(`${this._baseUrl}/users/me`, {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        })
            .then(this._handleResponse)
    }


    // получение серверных карточек
    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
            }
        )
            .then(this._handleResponse)
    }

    //установка данных профиля
    patchUserProfile(input, token) {
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: input.name,
                    about: input.about
                })
            })
            .then(this._handleResponse)
    }


    // смена аватары
    patchAvatar(input, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`,  {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar: input.avatar
            })
        })
            .then(this._handleResponse)
    }

    postUserCard(input, token) {
        return fetch(`${this._baseUrl}/cards`,  {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: input.name,
                link: input.link
            })
        })
            .then(this._handleResponse)
    }
    changeLikeCardStatus(id, isLiked, token) {
        if(isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'Delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            })
                .then(this._handleResponse)
        }
        else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            })
                .then(this._handleResponse)
        }
    }


    // удалить карточку
    deleteCard(id, token) {
        return fetch(`${this._baseUrl}/cards/${id}`,  {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            }
        )
            .then(this._handleResponse)
    }

}

export const api = new Api({
    baseUrl: `https://api.mesto.nikko.22.nomoredomains.monster`
    // bseUrl: `http://localhost:3000`
})
