import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backoffice.nodemy.vn/'
})

export default instance