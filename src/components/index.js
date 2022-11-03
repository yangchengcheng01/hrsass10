//  全局自定义组件的注册
// import PageTools from './PageTools'
// export default {
//     install(Vue) {
//         Vue.component('PageTools', PageTools)
//     }
// }
import UploadExcel from './UploadExcel'
import PageTools from './PageTools'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ThemePicker from './ThemePicker'
import LangSelect from './lang'
import TagsView from './TagsView'
// import ScreenFull from './ScreenFull'

export default {
    install(Vue) {
        //  注册全局的通用栏组件对象
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcel', UploadExcel)
        Vue.component('ImageUpload', ImageUpload)
        Vue.use(Print) // 注册导入上传组件
        Vue.component('ThemePicker', ThemePicker)
        Vue.component('LangSelect', LangSelect)
        Vue.component('TagsView', TagsView)

        // Vue.component('ScreenFull', ScreenFull)
    }
}