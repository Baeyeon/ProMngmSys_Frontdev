<template>
  <div>
<!--   新增表单 -->
    <el-dialog
      v-model="dialogVisible"
      show-close="false"
      title="新增供应商分类"
      width="30%"
    >
      <template #default>
        <el-form
          ref="newInfoFormRef"
          :model="newInfoForm"
          :label-position="right"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item label="供应商分类编码:" prop="code">
            <el-input
                v-model="newInfoForm.code"
                placeholder="供应商分类编码"
            />
          </el-form-item>
          <el-form-item label="供应商分类名称:" prop="name">
            <el-input
                v-model="newInfoForm.name"
                placeholder="供应商分类名称"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="add()">提交 </el-button>
        </span>
      </template>
    </el-dialog>
<!--   修改表单 -->
    <el-dialog
        v-model="dialogVisibleOfModify"
        show-close="false"
        title="修改供应商分类"
        width="30%"
    >
      <template #default>
        <el-form
            ref="newInfoFormRef"
            :model="updateInfoForm"
            :label-position="right"
            label-width="100px"
            :rules="rules"
        >
          <el-form-item label="供应商分类编码:" prop="code">
            <el-input
                v-model="updateInfoForm.code"
                placeholder="供应商分类编码"
            />
          </el-form-item>
          <el-form-item label="供应商分类名称:" prop="name">
            <el-input
                v-model="updateInfoForm.name"
                placeholder="供应商分类名称"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleOfModify = false">关闭</el-button>
          <el-button type="primary" @click="modify()">提交 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-card style="margin: 20px">
      <el-row :gutter="20">
        <el-col :span="1.8">
          <el-button
            icon="Plus"
            size="large"
            color="#626aef"
            :dark="isDark"
            plain
            @click="dialogVisible = true"
            >添加</el-button
          >
        </el-col>
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" size="large">
            <template #append>
              <el-button icon="Search" @click="search()" />
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          border
          stripe
          style="width: 100%; margin-top: 20px"
          max-height="550"
        >
          <el-table-column type="index" />
          <el-table-column prop="code" label="供应商分类编码" width="180" />
          <el-table-column prop="name" label="供应商分类名称" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                text
                bg
                >Edit</el-button
              >
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                text
                bg
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 20px; text-align: center">
        <el-col>
          <el-pagination
            layout="total,sizes,prev,pager,next,jumper"
            :total="tableData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize"
            style="
              margin-top: 20px;
              text-align: center;
              justify-content: center;
            "
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  components: {},

  data() {
    // 数据绑定
    return {
      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增的表单
      dialogVisibleOfModify: false, //是否显示修改的表单
      //表单数据
      newInfoForm: {
        code: '', // 供应商分类编码
        name: '' // 供应商分类名称
      },
      updateInfoForm: {
        id:'',// 供应商分类的id
        code: '', // 供应商分类编码
        name: '' // 供应商分类名称
      },
      tableData: [
        // { id:'',
        //  code:'',
        //  name:''}
      ],
    };
  },
  created() {
    this.search();
  },
  mounted() {},

  methods: {
    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },
    add() {
      axios({
        url: "/management/supplier_classification",
        method: "POST",
        data: {
          code: this.newInfoForm.code,
          name: this.newInfoForm.name,
        },
      }).then((resp) => {
        // console.log("打印resp.data.status"+resp.data.status)
        if (resp.data.status==200) {
          // this.$router.push("/dashboard");
          this.$message.success('添加成功')
          this.search()
        }else{
          this.$message.error('添加失败')
        }
        this.dialogVisible = false;
      })

    },
    modify() {
      axios({
        url: "/management/supplier_classification",
        method: "PUT",
        data: {
          id:this.updateInfoForm.id,
          code: this.updateInfoForm.code,
          name: this.updateInfoForm.name,
        },
      }).then((resp) => {
        // console.log("打印resp.data.status"+resp.data.status)
        if (resp.data.status==200) {
          // this.$router.push("/dashboard");
          this.$message.success('修改成功')
          this.search()
        }else{
          this.$message.error('修改失败')
        }
        this.dialogVisibleOfModify = false;
      })
    },

    search() {
      axios({
        url: "/management/supplier_classification",
        method: "GET",
      }).then((resp) => {
        // console.log("打印resp.data.status"+resp.data.status)
        if (resp.data.status==200) {

          console.log()
          this.tableData = resp.data.data;
        }else{
          this.$message.error('供应商获取失败')
        }
        // this.dialogFormVisible = false;
      })
    },

    handleEdit(index, row) {
      // alert("index:" + index + "，" + "row" + row + "!");
      this.dialogVisibleOfModify = true
      this.updateInfoForm = JSON.parse(JSON.stringify(row))
    },
    handleDelete(index, row) {
      // alert("index:" + index + "，" + "row" + row + "!");
      ElMessageBox.confirm(
          '确定要删除吗？',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            buttonSize: 'default'
          }
      ).then(() => {
        // 确认删除后，发起删除请求
        axios({
          url: "/management/supplier_classification?id=" + row.id,
          method: "DELETE",
        }).then((resp) => {
          // console.log("打印resp.data.status"+resp.data.status)
          if (resp.data.status==200) {
            // this.$router.push("/dashboard");
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            // 删除成功后查询数据库，完成表格的刷新
            this.search()
          }else{
            ElMessage({
              type: 'warning',
              message: '删除失败',
            })
          }
          // this.dialogFormVisible = false;
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '删除取消',
        })
      })
    },
  },
  watch: {},
};
</script>



<style>
/* 为了不造成样式污染，单据加一个style标签来修改第三方组件样式，pagination表格分页整体居中，上边距20px */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
