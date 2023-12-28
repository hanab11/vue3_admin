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
        :total="total"
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
import { ref } from 'vue'

// 分页器当前页码
let pageNo = ref(1)
// 每页展示数据个数
let pageSize = ref(5)
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
