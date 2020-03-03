<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-input
      style="width: 280px; margin-bottom: 16px;"
      placeholder="请输入内容"
      v-model="goodsobj.query"
      class="input-with-select"
      @keyup.enter.native="goodsInit"
    >
      <el-button @click="goodsInit" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加商品 -->
    <el-button
      style="margin-left: 16px;"
      type="success"
      plain
      @click="$router.push({name:'categories'})"
    >添加商品</el-button>
    <!-- 表格区域 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="goods_name" width="480" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="130">
          <template slot-scope="scope">
             {{scope.row.add_time | timeFormat}}
          </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template>
          <!-- slot-scope="scope" -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="success" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="审核" placement="top">
            <el-button type="info" plain icon="el-icon-finished"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsobj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="goodsobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      >
    </el-pagination>
  </div>
</template>

<script>
import { getAllGoodsList } from '@/api/goods_index.js'
export default {
  data () {
    return {
      // 总记录数
      total: 10,
      // 商品搜索关键字
      goodsobj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品表格
      goodsList: [
      ]
    }
  },
  methods: {
    // 获取所有商品数据
    goodsInit () {
      getAllGoodsList(this.goodsobj)
        .then(res => {
          console.log(res)
          this.goodsList = res.data.data.goods
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 切换每页显示数据量时触发
    handleSizeChange (val) {
    //  修改全局 pagesize
      this.goodsobj.pagesize = val
      // 重新获取数据
      this.goodsInit()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      // 修改 pageunm
      this.goodsobj.pagenum = val
      // 重新获取数据
      this.goodsInit()
    }
  },
  filters: {
    timeFormat (time) {
      time = new Date(time * 1000)
      return time.getFullYear() + '_' + (time.getMonth() + 1) + '_' + time.getDate()
    }
  },
  mounted () {
    //  所有商品数据
    this.goodsInit()
  }
}
</script>

<style lang="less" scoped>
</style>
