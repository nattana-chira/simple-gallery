<template>
    <div>
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 class="my-0 mr-md-auto font-weight-normal">Simple Image Gallery</h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <router-link tag="a" to="/login" class="p-2 text-dark">Login</router-link>
                <router-link tag="a" to="/register" class="p-2 text-dark">Register</router-link>
            </nav>
        </div>

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <router-view v-if="isLoaded"></router-view>
                    <div v-else>Loading...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AuthAPI from '../services/apis/auth'
    import OAuthService from '../services/oauth'

    export default {
        data() {
            return {
                isLoaded: false
            }
        },
        mounted() {
            this.checkAuth()
        },
        methods: {
            checkAuth() {
                AuthAPI.checkAuth()
                    .catch(error => {
                        if (error.response.status === 401) {
                            OAuthService.destroyToken()
                            this.$router.push('/login')
                        }
                    })
                    .then(response => this.isLoaded = true)
            },
        }
    }
</script>
