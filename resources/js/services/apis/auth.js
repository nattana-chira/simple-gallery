import axios from 'axios'

export default {
    login({ email, password }) {
        return axios.get('/login', {
            params: {
                email,
                password
            }
        });
    },
    register() {

    }
}