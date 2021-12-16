const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000/api'

export const getSiteAccess = async (site) => {
    return await axios.post('/site/access', site)
        .then(function (response) {
            return response.data;
        })
}
