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

Vue.use(ElementUI, { locale })
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})
Vue.use(Components) // 注册自己的插件
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})