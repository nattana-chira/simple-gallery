import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Regiser from '../views/Register'
import Home from '../views/Home'
import Gallery from '../views/Gallery'

import { isLoggedIn } from '../services/oauth'

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Regiser },
    { path: '/home', component: Home, beforeEnter: protectRoute },
    { path: '/gallery', component: Gallery, beforeEnter: protectRoute }
]
  
const router = new VueRouter({
    mode: 'history',
    routes
})

function protectRoute(to, from, next) {
    if (isLoggedIn()) {
        next()
    }
}

Vue.use(VueRouter)

export default router