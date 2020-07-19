<template>
    <div class="card">
        <div class="card-header">
            Login
        </div>
        <div class="card-body">
            <form class="form-signin">
                <div class="form-group row">
                    <label class="col-4 col-form-label text-right">Email address</label>
                    <div class="col-8">
                        <input type="email" name="email" class="form-control" autofocus="" v-model="email">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-right">Password</label>
                    <div class="col-8">
                        <input type="password" name="password" class="form-control" v-model="password">
                    </div>
                </div>

                <div class="row">
                    <div class="offset-sm-4 col-sm-8">
                        <error-alert :errors="errors.all()" />
                        <button class="btn btn-lg btn-primary" type="button" @click="login">Login</button>
                    </div>
                </div>
            </form>
        </div>
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
                    .then(this.redirectToDashboard)
                    .catch(this.putToErrorBag)
            },
            alertAndSaveToken(response) {
                alertSuccess({
                    title: 'Login success',
                    text: 'Welcome to our website'
                })

                ApiService.setHeader(response.data.access_token)
            },
             redirectToDashboard() {
                this.$router.push('/dashboard')
            }
        }
    }
</script>
