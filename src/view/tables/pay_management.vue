<template>
  <el-card>
    <el-container>
      <el-header height="40px">
        <!--  card头中的组件  -->
        <el-row>
          <el-col :span="12">
            <div class="card-header-left">
              <el-button type="success" size="large" @click="addClassification">
                <el-icon>
                  <Plus></Plus>
                </el-icon>
                新增
              </el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-header-right">
              <el-button type="success" size="large" circle />
              <el-button type="success" size="large" circle />
              <el-button type="success" size="large" circle />
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main >
        <!--  表格  -->
        <el-table :data="datalist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                  highlight-current-row height="500" style="width: 100%" size="middle" >

          <el-table-column prop="pay" label="付款方式" class="table-column" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="160" type="index">
            <template v-slot="scope">
              <el-button link type="warning" size="large" @click="changeDetail(scope.row)">修改</el-button>
              <el-button
                  link
                  type="danger"
                  size="large"
                  @click.prevent="deleteDetail(scope.$index)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer height="45px">
        <!-- 分页 -->
        <el-row class="row-bg">
          <el-col>
            <el-pagination
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="datalist.length"
                class="pagination"
            />
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </el-card>

  <!--    新增供应商分类信息表单    -->
  <el-dialog v-model="dialogFormVisible" width="650px" title="付款方式管理" @closed="resetFrom">
    <el-form :model="add_vendor_classification_form" :rules="rules" ref="baseForm" class="vendor-form" size="large">


      <el-form-item label="付款方式:" :label-width="formLabelWidth" prop="pay">
        <el-input v-model="add_vendor_classification_form.pay" placeholder="付款方式" />
      </el-form-item>

    </el-form>
    <template #footer >
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false" size="large">取消</el-button>
              <el-button type="primary" size="large" @click="submitFormOfAdd()">提交</el-button>
            </span>
    </template>
  </el-dialog>

  <!--  修改供应商分类信息的表单 -->
  <el-dialog v-model="dialogFormVisibleOfModify" width="650px" title="付款方式修改">
    <el-form :model="modify_vendor_classification_form" :rules="rules" ref="baseForm_2" class="vendor-form" size="large">


      <el-form-item label="付款方式:" :label-width="formLabelWidth" prop="pay">
        <el-input v-model="modify_vendor_classification_form.pay" placeholder="付款方式" />
      </el-form-item>

    </el-form>
    <template #footer >
            <span class="dialog-footer">
              <el-button @click="dialogFormVisibleOfModify = false" size="large">取消</el-button>
              <el-button type="primary" size="large" @click="submitFormOfModify()">提交</el-button>
            </span>
    </template>
  </el-dialog>

</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import {Plus, } from '@element-plus/icons-vue'
export default {
  name: "project_class_management",
  components:{
    Plus,
  },
  data() {
    return {
      dialogFormVisible: false, // 用于控制新增按钮dialog的弹出
      dialogFormVisibleOfModify: false, // 控制修改按钮的dialog弹出
      formLabelWidth: "140px",
      add_vendor_classification_form: { //新增信息表单

        pay: ''
      },
      modify_vendor_classification_form: { //修改信息表单
        pay: ''
      },
      rules: { // 新增信息表单验证的规则

         pay: [
          { required: true, message: '请选择付款方式', trigger: 'blur'}
        ],
      },
      currentPage: 1, // 默认页码为1
      pageSize: 10, // 默认每页pageSize条数据
      disabled: false, //是否禁用分页
      background: true, //是否为分页按钮加背景色
      datalist: [ //表格数据
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        },
        {
          pay:'微信支付'
        }
      ]
    }
  },
  methods: {
    addClassification() { // 新增信息
      console.log("点击新增按钮")
      this.dialogFormVisible = true
    },
    searchClassification() { // 查询（检索）信息
      console.log("点击查询按钮")
    },
    changeDetail(data) { // 修改信息
      this.dialogFormVisibleOfModify = true
      this.modify_vendor_classification_form = data
    },
    deleteDetail() {
      ElMessageBox.confirm(
          '确定要删除吗？',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            buttonSize: 'default'
          }
      )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '删除取消',
            })
          })
    },
    submitFormOfAdd() { // 提交表单，进行表单验证
      this.$refs.baseForm.validate((valid) => { // 表单验证
        if(!valid) {
          this.$message.warning('请按要求填写数据')
          return false
        }
        // 通过验证
        this.dialogFormVisible = false
        this.$message.success('新增成功')
      })
    },
    submitFormOfModify() {
      this.$refs.baseForm_2.validate((valid) => { // 表单验证
        if(!valid) {
          this.$message.warning('请按要求填写数据')
          return false
        }
        // 通过验证
        this.dialogFormVisibleOfModify = false
        this.$message.success('修改成功')
      })
    },
    resetFrom() { // 重置表单信息，都设置为空
      this.add_vendor_classification_form = this.$options.data().add_vendor_classification_form
      this.$refs.baseForm.resetFields() // 移除校验效果
    }
  }
}
</script>

<style scoped>
.card-header-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 690px;
}
.card-header-right {
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
  width: 150px;
}
.table-column {
  width: 120px;
}
.pagination {
  margin-top: 5px;
  margin-left: auto;
  justify-content: flex-end;
}
.el-button--text {
  margin-right: 15px;
}
.el-button {
  margin-left: 10px;
}
.vendor-form .el-select,.el-input {
  width: 350px;
  font-size: 15px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>