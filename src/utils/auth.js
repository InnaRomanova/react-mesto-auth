<<<<<<< HEAD
export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (email, password) => {
    return fetch(`${BASE_URL}signup`, {
=======
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {

>>>>>>> dev
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response.status)
        })
}

export const autorization = (email, password) => {
<<<<<<< HEAD
    return fetch(`${BASE_URL}signin`, {
=======
    return fetch(`${BASE_URL}/signin`, {
>>>>>>> dev
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response.status)
        })
}

export const restContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
<<<<<<< HEAD
            'Authorization': `Bearer ${token}`
=======
            'Authorization': `Bearer ${token}`,
>>>>>>> dev
        }
    })
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response.status)
            })
    }