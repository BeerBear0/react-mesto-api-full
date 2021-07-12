const baseAuthUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3000'}`

export const register = (email, password) => {
    return fetch(`${baseAuthUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
                if (res.status !== 400){
                    return res.json();
                }
            }
        )
        .then((res) => {
            return res;
        })
};

    export const authorize = (email, password) => {
        return fetch(`${baseAuthUrl}/signin`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    if (res.status === 400) {
                        throw new Error('Некорректно заполнено одно из полей')
                    }
                    if (res.status === 401) {
                        throw new Error('Пользователь с email не найден')
                    }
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token)
                    return data
                }
            })
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