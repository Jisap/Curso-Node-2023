import axios from 'axios';


export const httpClientPlugin = {
  get: async (url:string) => {

    // fetch tradicional
    // const resp = await fetch(url);
    // const data = await resp.json();
    // return data;

    //axios
    const { data } = await axios.get(url);
    return data;
  }
}
