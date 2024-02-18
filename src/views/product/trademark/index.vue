<template>
  <div>
    <!-- 卡片组件，提供阴影效果、框架样式 -->
    <el-card class="box-card">
      <!-- 顶部添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>

      <!-- 表格组件，用于展示数据
      table
        border 设置表格纵向是否有边框
      table-column 表格某列
        label 本列标题 
        width 设置本列宽度 
        align 设置本列对齐方式
      -->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO"></el-table-column>
        <el-table-column label="品牌操作"></el-table-column>
      </el-table>

      <!-- 分页器组件
      pagination
        v-model:current-page 设置分页器当前页码
        v-model:page-size 设置每页展示数据个数 
        page-sizes 设置下拉菜单数据（个数选择）
        background 设置分页器按钮的背景颜色
        layout 设置分页器六个子组件布局，如果加->会把箭头后子组件顶到最右侧
      -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="400"
        :pager-count="9"
      />
    </el-card>

    <!-- 对话框组件，在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!-- 
      v-model 属性用户控制对话框的显示与隐藏 true显示 false隐藏
      title 设置对话框左上角标题
    -->
  </div>
</template>

<script setup lang="ts">
import { ElMessage, UploadProps, formEmits } from 'element-plus'
// 引入组合式API函数ref
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入请求回调
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark
} from '@/api/product/trademark'
// 引入ts类型
import type {
  Records,
  TradeMarkResponseData,
  TradeMark
} from '@/api/product/trademark/type'

let pageNo = ref<number>(1) // 分页器当前页码
let pageSize = ref<number>(5) // 每页展示数据个数
let total = ref<number>(0) // 存储已有品牌数据总数
let trademarkArr = ref<Records>([]) // 存储已有品牌的数据
let dialogFormVisible = ref<boolean>(false) // 控制对话框可视化（显示与隐藏）

// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '', // 品牌名
  logoUrl: '' // logo地址
})

let formRef = ref() // 通过ref获取el-form组件实例

// 组件挂载完毕钩子：发一次请求，获取第一页、一页五个已有品牌数据
onMounted(() => {
  getHasTrademark()
})

// 获取已有品牌的接口，封装为一个函数：在任何情况下，调用函数获取数据
const getHasTrademark = async (pager = 1) => {
  // 当前页码
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value
  )
  if (result.code == 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据(当前的页码)
// const changePageNo = ()=>{
//     //当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//     getHasTrademark();
// }

// 当下拉菜单发生变化的时候触发次方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  // 当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark()
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
