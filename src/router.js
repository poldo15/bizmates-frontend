import Vue from 'vue';
import Router from 'vue-router';

// import PlacesInfo from './views/PlacesInfoView.vue';
import Dashboard from './views/DashboardView.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Dasboard',
        component: Dashboard,
    },
    // {
    //     path: '/information/:lat/:lon',
    //     name: 'PlacesInfo',
    //     component: PlacesInfo,
    // }
]

const router = new Router({
    mode: 'history',
    routes
})

export default router