<template>
     <div class="card">
        <div class="card-header">
            Register
        </div>
        <div class="card-body">
            <form class="form-signin">  
                <div class="form-group row">
                    <label class="col-4 col-form-label text-right">Email address</label>
                    <div class="col-8">
                        <input type="email" name="email" class="form-control" v-model="email">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-right">Name</label>
                    <div class="col-8">
                        <input type="text" name="name" class="form-control" v-model="name">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-right">Password</label>
                    <div class="col-8">
                        <input type="password" name="password" class="form-control" v-model="password">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-right">Password Confirmation</label>
                    <div class="col-8">
                        <input type="password" name="password_confirmation" class="form-control" v-model="password_confirmation">
                    </div>
                </div>

                <div class="row">
                    <div class="offset-sm-4 col-sm-8">
                        <error-alert :errors="errors.all()" />
                        <button class="btn btn-lg btn-primary" type="button" @click="register">Register</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import ApiService from '../services/api'
    import ApiErrorCatcher from '../utils/api-error-catcher'
    import AuthAPI from '../services/apis/auth'
    import { alertSuccess } from '../utils/alert'

    export default {
        mixins: [ApiErrorCatcher],
        data() {
            return {
                email: '',
                name: '',
                password: '',
                password_confirmation: ''
            }
        },
        methods: {
            register() {
                this.clearErrors()
                const params = { 
                    email: this.email, 
                    name: this.name,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                }
                
                AuthAPI.register(params)
                    .then(this.alertAndSaveToken)
                    .then(this.redirectToHome)
                    .catch(this.putToErrorBag)
            },
            alertAndSaveToken(response) {
                alertSuccess({
                    title: 'Register success',
                    text: 'Welcome to our website'
                })

                ApiService.setHeader(response.data.access_token)
            },
            redirectToHome() {
                this.$router.push('/home')
            }
        }
    }
</script>
