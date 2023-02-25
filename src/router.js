import Vue from 'vue';
import Router from 'vue-router';

// import About from './views/AboutView.vue';
import Dashboard from './views/DashboardView.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Dasboard',
        component: Dashboard,
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About,
    // }
]

const router = new Router({
    mode: 'history',
    routes
})

export default router