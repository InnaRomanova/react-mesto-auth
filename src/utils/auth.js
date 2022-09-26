export const BASE_URL = 'https://auth.nomoreparties.co';
// const BASE = 'https://mesto.nomoreparties.co/v1'

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {

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
    return fetch(`${BASE_URL}/signin`, {

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

export const restContent = () => {
    console.log(restContent)
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '6317d273-77cd-40e4-acd5-6cbb113af6b1'
        }
    })
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response.status)
            })
    }