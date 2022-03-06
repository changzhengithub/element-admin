/**
 * @desc 状态管理器 - 权限控制
 * @author changz
*/

import storage from 'store'
// eslint-disable-next-line
import { infoApi, logoutApi } from '@/api/empower'
import { asyncRouterMap } from '@/router/router.config'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'

const empower = {
  state: {
    permission: [], // 权限列表
    routerList: [], // 路由列表
  },
  mutations: {
    // 设置权限列表
    setPermission(state, permission) {
      state.permission = permission
    },
    // 过滤后的路由列表
    setRouterList(state, routerList) {
      state.routerList = routerList
    }
  },
  actions: {
    // 获取用户信息
    GetInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        infoApi(params).then(res => {
          const data = res.data
          // 缓存用户信息
          storage.set(USER_INFO, data)
          // 获取用户权限列表，可以是后端直接返回权限列表，也可以根据返回角色类型设置权限列表
          const { role } = data
          const roleMenu = {
            '1': ['', '', ''], // 管理员
            '2': ['', '', ''] // 用户
          }
          const permissionList = roleMenu[role]
          // 保存权限列表
          commit('setPermission', permissionList)
          resolve(permissionList)
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    // 根据role过滤对应路由
    FilterRoutes({ commit }, res) {
      const { permissionList } = res;
      return new Promise((resolve, reject) => {
        const routerList = filterAsyncRouter(asyncRouterMap, permissionList)
        console.log(routerList);
        routerList.push({
          path: '/:catchAll(.*)',
          redirect: '/exception',
          hidden: true
        })
        commit('setRouterList', routerList)
        resolve()
      })
    },
  
    // 登出
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logoutApi().then(response => {
          if (response.code != 200) {
            reject(response);
            return
          }
          commit('setPermission', []);
          commit('setRouterList', []);
          storage.remove(ACCESS_TOKEN);
          storage.remove(USER_INFO);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default empower

// 根据权限列表过滤路由
// 根据具体业务来进行过滤
function filterAsyncRouter(routerMap, permissionList) {
  const routerList = routerMap.filter(route => {
    if (route.name === 'Index') return true
    if (route.meta && route.meta.permission) {
      const { permission } = route.meta;
      if (permissionList.includes(permission)) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, permissionList);
          // 如果有子路由重定向到第一个
          if (route.children.length) route.redirect = route.children[0].path
        }
        return true
      }
    }
    return false
  })
  return routerList
}
