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

    <!-- 对话框组件，在添加品牌与修改已有品牌的业务时候使用结构 
      v-model 属性用户控制对话框的显示与隐藏 true/false
      title 设置对话框左上角标题
    -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽footer -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
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

// 定义新增品牌数据来存储到trademarkParams
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
/* const changePageNo = ()=>{
    // 当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
     getHasTrademark();
} */

// 当下拉菜单发生变化的时候触发次方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  // 当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark()
}

// 添加品牌按钮的回调
const addTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 清空收集数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 第一种写法，ts的问号语法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  // 第二种写法
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

// 修改已有品牌的按钮的回调
// row即当前已有的品牌
const updateTrademark = (row: TradeMark) => {
  // 清空校验规则错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  // 对话框显示
  dialogFormVisible.value = true
  // ES6语法合并对象
  Object.assign(trademarkParams, row)
}

// 对话框底部取消按钮
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}

// 确定按钮
const confirm = async () => {
  // 在发请求之前,要对于整个表单进行校验
  // 调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  // 添加|修改已有品牌
  if (result.code == 200) {
    // 关闭对话框
    dialogFormVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    })
    // 再次发请求获取已有品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    // 添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    })
    // 关闭对话框
    dialogFormVisible.value = false
  }
}

// 上传图片组件->上传图片之前触发的回调
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发，上传文件之前可限制文件类型与大小
  // 限制上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于4M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF'
    })
    return false
  }
}

// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // response即当前这次上传图片post请求服务器返回的数据
  // 收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  // 图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 品牌的自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 当表单元素触发blur时，会触发此方法
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack()
  } else {
    // 校验未通过返回的错误的提示信息
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

// 品牌LOGO的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  // 如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片务必上传'))
  }
}

// 表单校验规则对象
const rules = {
  tmName: [
    // required这个字段务必校验,表单项前面出来五角星
    // trigger代表触发校验规则时机[blur、change]
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl }]
}

// 气泡确认框确定按钮的回调
const removeTradeMark = async (id: number) => {
  // 点击确定按钮删除已有品牌请求
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    // 删除成功提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    })
    // 再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    })
  }
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
