const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000/api'

export const doLogin = async (credentials) => {
    return await axios.post('/login', credentials)
        .then(function (response) {
            return response;
        })
}

export const doCreateUser = async (newUser) => {
    return await axios.post('/user', newUser)
        .then(function (response) {
            return response
        })
}