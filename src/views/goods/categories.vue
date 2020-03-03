<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps style="margin-bottom: 32px;" :active="activeName - 0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-form :model="addForm" ref="addForm" label-width="120px">
      <el-tabs tab-position="left" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            <el-cascader
              placeholder="请选择分类"
              v-model="addForm.goods_cat"
              :options="cateList"
              :props="cateprop"
              @change="cateSelect"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="addForm.resource" size="medium">
              <el-radio border label="是"></el-radio>
              <el-radio border label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">2</el-tab-pane>
        <el-tab-pane label="商品属性" name="3">3</el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <!-- 上传图片 -->
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :headers="getToken()"
            list-type="picture-card"
            :before-upload="handleBefore"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
      <el-button class="fr" type="primary" @click="addGoods">添加商品</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">5</el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { getAllCateList } from '@/api/cate_index.js'
export default {
  data () {
    return {
      // 商品图片
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      // 商品分类
      cateList: [],
      cateprop: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 列表数据
      addForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: 0,
        pics: [],
        attrs: []
      },
      // 步骤条
      activeName: 0
    }
  },
  methods: {
    // 上传文件之前的钩子
    // file 就是当前你所选择的文件对象
    handleBefore (file) {
      console.log(file)
      if (file.type.indexOf('image/') !== 0) {
        this.$message.error('请选择图片')
        // 它会触发 handleRemove
        return false
      }
    },
    // 实现添加商品
    addGoods () {
      console.log('pics', this.addForm.pics)
    },
    // 获取的 token 数据
    getToken () {
      var token = localStorage.getItem('vue_str_45')
      // console.log('88', token)
      return {
        Authorization: token
      }
    },
    // 上传文件时触发 status
    handleSuccess (response, file, fileList) {
      // console.log('YaY', response)
      if (response.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        // 我
        this.addForm.pics.push({
          pic: response.data.tmp_path
        })
      }
    },
    // 移除文件时触发
    handleRemove (file, fileList) {
      // file 就是用户当前删除的图片对象
      console.log('u2u', file)
      if (!file.response) {
        return
      }
      var current = file.response.data.tmp_path
      for (var i = 0; i < this.addForm.pics.length; i++) {
        if (this.addForm.pics[i].pic === current) {
          this.addForm.pics.splice(i, 1)
          break
        }
      }
    },
    handleClick (obj) {
      console.log('88', this.activeName)
    },
    cateSelect (obj) {
      console.log('99', obj)
      console.log('555', this.addForm.goods_cat.join(','))
    },
    // 文件预览时触发
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  mounted () {
    getAllCateList(3)
      .then(res => {
        // console.log('777', res)
        this.cateList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
</style>
