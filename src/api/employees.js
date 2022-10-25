import request from '@/utils/request'
export function getEmployeeSimple() {
    return request({
        url: '/sys/user/simple'
    })

}
//获取员工列表
export function getEmployeeList(params) {
    return request({
        url: '/sys/user',
        params
    })
}