import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "../components/HelloWorld";
import KayitSayfasi from "../views/KayitSayfasi";
Vue.use(VueRouter)

const routes = [{

        //componentlerim page anlamına karşı gelir, router-link ile yönlendirmesi yapılır
        path: '/', // index sayfası url boş
        name: 'HelloWorlds',
        component: HelloWorld
    }, {
        path: '/KayitSayfasi',
        name: 'KayitSayfasi',
        component: KayitSayfasi
    },

]

const router = new VueRouter({
    mode: 'history', // url adresini duzenliyor, bakılıcak
    base: process.env.BASE_URL,
    routes
})

export default router