// 这个文件用来处理所有与用户相关的操作
// 引入  axios
import axios from '@/utils/myaxios.js'

// 登陆
export const login = (data) => {
  //  axios ({}) 返回了一个 promise 对象
  return axios({
    //   请求路由路径
    url: 'login',
    // 请求方式，默认为get
    method: 'post',
    // post 方式所传递的数据
    data
  })
}
// 获取所有用户数据
export const getAllUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 添加用户
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 编辑用户
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: {
      email: data.email,
      mobile: data.mobile
    }
  })
}

// 根据id删除用户
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 跟据id修改用户装态
export const updateUserStatae = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

// 角色分配用户
export const grantUserRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}
