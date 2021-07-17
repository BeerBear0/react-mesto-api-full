const baseAuthUrl = `https://api.mesto.nikko.22.nomoredomains.monster`
// const baseAuthUrl = 'http://localhost:3000';
const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`'Ошибка: ${response.status}'`)

export const register = (email, password) => {
    return fetch(`${baseAuthUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(checkResponse);
};

    export const authorize = (email, password) => {
        return fetch(`${baseAuthUrl}/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(checkResponse)
    }

    export const getContent = (token) => {
        return fetch(`${baseAuthUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    if (res.status === 400) {
                        throw new Error('Токкен не передан или передан не в том формате')
                    }
                    if (res.status === 401) {
                        throw new Error('Переданный токкен некорректен')
                    }
            })
            .then(data => {
                return data
            })
            .catch(err => {
                return Promise.reject(err.message)
            })
    }