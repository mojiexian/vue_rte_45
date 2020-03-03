// 这个文件用来处理所有商品分类的相关操作
// 1.引入 axios
import axios from '@/utils/myaxios.js'

// 获取所有商品分类数据
export const getAllCateList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
