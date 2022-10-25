import request from '@/utils/request'
import req from 'express/lib/request'
export function getRoleList(params) {
    return request({
        url: '/sys/role',
        params
    })
}

//获取公司信息
export function getCompanyInfo(companyId) {
    return request({
        url: `/company/${companyId}`
    })
}
// 删除角色
export function deleteRole(id) {
    return request({
        method: 'delete',
        url: `/sys/role/${id}`
    })
}
/** *
 * 修改角色
 * ***/
export function updateRole(data) {
    return request({
        url: `/sys/role/${data.id}`,
        data,
        method: 'put'
    })
}
/**
 * 获取角色详情
 * **/
export function getRoleDetail(id) {
    return request({
        url: `/sys/role/${id}`
    })
}
//新增角色
export function addRole(data) {
    return request({
        method: 'post',
        url: '/sys/role',
        data
    })
}