class Api {
  constructor({ baseUrl, token, cohort }) {
    this._baseUrl = baseUrl
    this._token = token;
    this._cohort = cohort;
  }

  _request(adres, method, info) {
    const pattern = {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    }

    return fetch(
      `${this._baseUrl}/${this._cohort}/${adres}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          Promise.reject(`ошибка: ${res.status}`)
        }
      })
  }

  getUserInfo() {
    return this._request('users/me', 'GET')
  }

  editUserInfo(userInfo) {
    return this._request('users/me', 'PATCH', userInfo)
  }

  editAvatar(avatarInfo) {
    return this._request('users/me/avatar', 'PATCH', avatarInfo)
  }

  getCards() {
    return this._request('/cards', 'GET')
  }

  setNewCard(data) {
    return this._request('/cards', 'POST', data)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`cards/likes/${cardId}`, isLiked? 'DELETE' : 'PUT') 
  }

  changeDeleteCardStatus(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }
}
const newApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  token: '6317d273-77cd-40e4-acd5-6cbb113af6b1',
  cohort: 'cohort-47'
})

export default newApi