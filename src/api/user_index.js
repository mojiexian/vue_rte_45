// 这个文件用来处理所有与用户相关的操作
// 引入  axios
import axios from '@/utils/myaxios.js'

// 登陆
export const login = (data) => {
  //  axios ({}) 返回了一个 promise 对象
  return axios({
    //   请求路由路径
    ulr: 'login',
    // 请求方式，默认为get
    method: 'post',
    // post 方式所传递的数据
    data
  })
}
