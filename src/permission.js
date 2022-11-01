import router from "@/router"
import store from "@/store"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
    nProgress.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) {
                const { roles } = await store.dispatch('user/getUserInfo')
                const routes = await store.dispatch('permission/filerRoutes', roles.menus)
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加到路由表
                next(to.path)
                    // console.log(routes)
            }
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