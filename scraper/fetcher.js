const axios = require('axios')
const instance = axios.create({
    headers: {
        'Accept': 'text/html'
    }
})

async function fetchAndDisplay(url) {
        const response = await instance.get(url);
        return response.data;
}

module.exports = fetchAndDisplay