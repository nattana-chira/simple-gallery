import axios from 'axios'
import OAuthService from './oauth'
import { API_BASE_URL } from '../config'

const ApiService = {
    init() {
        axios.defaults.baseURL = API_BASE_URL;
        this.loadHeader()
    },
    loadHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${OAuthService.getToken()}`;
    },
    setHeader(token) {
        OAuthService.saveToken(token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${OAuthService.getToken()}`;
    }
}

export default ApiService