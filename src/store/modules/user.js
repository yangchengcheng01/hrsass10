import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
    token: getToken(),
    userInfo: {}
}
const mutations = {
    setToken(state, token) {
        state.token = token
        setToken(token)
    },
    removeToken(state) {
        state.token = null
        removeToken()
    },
    setUserInfo(state, result) {
        state.userInfo = result
    },
    removeUserInfo(state) {
        state.userInfo = {}
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data)
        context.commit('setToken', result)
            //拿到token，登录成功
        setTimeStamp()

    },
    async getUserInfo(context) {
        const result = await getUserInfo()
        const baseInfo = await getUserDetailById(result.userId)
        const baseResult = {...result, ...baseInfo }
        context.commit('setUserInfo', baseResult)
        return result
    },
    //登出操作
    logout(context) {
        context.commit('removeToken')
        context.commit('removeUserInfo')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}