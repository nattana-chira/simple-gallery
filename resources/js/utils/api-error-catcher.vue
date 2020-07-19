<script>
    import ErrorBag from './error-bag'
    import OAuthService from '../services/oauth'

    export default {
        data() {
            return {
                errorMessage: null,
                errors: new ErrorBag,
                httpStatus: null
            }
        },

        methods: {
            putToErrorBag(httpError) {
                this.httpStatus = httpError.response.status
                this.catchUnauthorized();
                this.errorMessage = httpError.response.data.message
                if (this.httpStatus === 422) {
                    this.errors = new ErrorBag(httpError.response.data.errors)
                }
            },
            catchUnauthorized(httpStatus) {
                if (this.httpStatus === 401) {
                    alert('UNAUTHORIZED !!')
                    OAuthService.destroyToken()
                }
            },
            clearErrors() {
                this.errorMessage = null
                this.errors = new ErrorBag
                this.httpStatus = null
            }
        }
    }
</script>
