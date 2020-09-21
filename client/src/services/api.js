import axios from 'axios'

const api = axios.create({
    baseURL: 'https://language-center.herokuapp.com/'
})

export default api