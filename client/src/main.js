import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
// import Routes from './routes'
import { routes } from './routes'
Vue.use(VueRouter)

export const router = new VueRouter({

    routes,

    mode: "history"

});

Vue.config.productionTip = false;

new Vue({

    router,

    render: h => h(App)

}).$mount("#app");