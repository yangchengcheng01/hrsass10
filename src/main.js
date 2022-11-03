import Vue from 'vue'

import * as directives from '@/directives'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Components from '@/components'

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from '@/filters'
import checkPermission from '@/mixin/checkPermission'
import i18n from '@/lang'

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})
Vue.use(Components) // 注册自己的插件
Vue.mixin(checkPermission)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})