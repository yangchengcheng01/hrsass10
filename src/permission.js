import router from "@/router"
import store from "@/store"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
    nProgress.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
    nProgress.done()

})
router.afterEach(() => {
    nProgress.done()
})