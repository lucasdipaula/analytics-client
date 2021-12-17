const axios = require('axios');

axios.defaults.baseURL = 'https://analytics-tool-api.herokuapp.com/api'

export const getSiteAccess = async (site) => {
    return await axios.post('/site/access', site)
        .then(function (response) {
            return response.data;
        })
}
