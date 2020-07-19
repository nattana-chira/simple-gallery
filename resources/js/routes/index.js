import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Regiser from '../views/Register'
import Dashboard from '../views/Dashboard'

import { isLoggedIn } from '../services/oauth'

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Regiser },
    { path: '/dashboard', component: Dashboard, beforeEnter: protectRoute }
]
  
const router = new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to, from, next) => {
//     if (isLoggedIn()) {
//         console.log('to', to)
//         console.log('from', from)
//         next()
//     }
// })

function protectRoute(to, from, next) {
    if (isLoggedIn()) {
        next()
    }
}

Vue.use(VueRouter)

export default router