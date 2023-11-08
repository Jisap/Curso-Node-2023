const axios = require('axios');


const httpClientPlugin = {
  get: async (url) => {

    // fetch tradicional
    // const resp = await fetch(url);
    // const data = await resp.json();
    // return data;

    //axios
    const { data } = await axios.get(url);
    return data;
  }
}

module.exports = {
  http: httpClientPlugin
}