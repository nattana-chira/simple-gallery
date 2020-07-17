import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Regiser from '../views/Register'

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Regiser }
]
  
const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.use(VueRouter)

export default router