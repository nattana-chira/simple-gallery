import axios from 'axios'

export default {
    login({ email, password } = {}) {
        return axios.get('/login', {
            params: {
                email,
                password
            }
        });
    },
    register({
        email,
        name,
        password,
        password_confirmation
    } = {}) {
        return axios.post('/register', {
            email,
            name,
            password,
            password_confirmation
        });
    },
    checkAuth() {
        return axios.post('/check-auth');
    }
}