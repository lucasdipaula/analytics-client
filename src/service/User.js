const axios = require('axios');

axios.defaults.baseURL = 'https://analytics-tool-api.herokuapp.com/api'

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