import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            authRequired: true
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue')
    },
    {
        path: '/signin',
        name: 'Signin',
        component: () => import('../views/Signin.vue')
    },
    {
        path: '/join',
        name: 'Join',
        component: () => import('../views/Join.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.user) {
            next({
                path: '/signin'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
