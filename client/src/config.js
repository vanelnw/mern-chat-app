import axios from 'axios'

export const appAxios = axios.create({
    baseUrl: "https://yabadev-chat-app.herokuapp.com/"
})