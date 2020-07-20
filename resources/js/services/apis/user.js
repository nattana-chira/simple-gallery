import axios from 'axios'

export default {
    getImages() {
        return axios.get('/user/images')
    },
    uploadImages(formData = {}, config = {}) {
        return axios.post('/user/images', formData, config)
    }
}