<template>
    <div>
        <form class="form-signin">
            <img class="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

            <div class="form-group">
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" name="email" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
            </div>

            <div class="form-group">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" name="password" class="form-control" placeholder="Password" required="" v-model="password">
            </div>

            <p v-for="(error, i) in errors.all()" :key="i" class="alert alert-danger">
                {{ error }}
            </p>
            <button class="btn btn-lg btn-primary btn-block" type="button" @click="login">Sign in</button>
        </form>
    </div>
</template>

<script>
    import ApiService from '../services/api'
    import AuthAPI from '../services/apis/auth'
    import ApiErrorCatcher from '../utils/api-error-catcher'
    import { alertSuccess } from '../utils/alert'

    export default {
        mixins: [ApiErrorCatcher],
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                this.clearErrors()
                const params = { 
                    email: this.email, 
                    password: this.password 
                }
                
                AuthAPI.login(params)
                    .then(this.alertAndSaveToken)
                    .catch(this.putToErrorBag)
            },
            alertAndSaveToken(response) {
                alertSuccess({
                    title: 'Login success',
                    text: 'Welcome to our website'
                })

                ApiService.setHeader(response.data.access_token)
            }
        }
    }
</script>
