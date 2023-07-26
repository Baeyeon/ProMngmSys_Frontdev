<template>
  <div>
<!--新增表单-->
    <el-dialog
      v-model="dialogVisible"
      show-close="false"
      title="新增人员"
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
          <el-form-item label="真实姓名" prop="real_name">
            <el-input
              v-model="newInfoForm.real_name"
              :placeholder="newInfoForm.real_name"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="newInfoForm.gender" placeholder="请选择">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="电话（账号）" prop="phone">
            <el-input
              v-model="newInfoForm.phone"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
                v-model="newInfoForm.email"
            />
          </el-form-item>
          <el-form-item label="入职时间">
            <el-date-picker
                v-model="newInfoForm.entry_time"
                type="date"
                placeholder="选择入职时间"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="岗位" prop="post">
            <el-input
              v-model="newInfoForm.post"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                v-model="newInfoForm.password"
                show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input
                v-model="newInfoForm.confirm_password"
                show-password
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

<!--修改表单-->
    <el-dialog v-model="dialogVisible1" show-close="false" title="修改人员" width="30%">
      <template #default>
        <el-form ref="newInfoFormRef1" :model="newInfoForm1" :label-position="right" label-width="100px">
          <el-form-item label="姓名" prop="name1" >
            <el-input v-model="newInfoForm1.name1" readonly="true" />
          </el-form-item>
          <el-form-item label="性别" prop="sex1">
            <el-select v-model="newInfoForm1.sex1" placeholder="请选择性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" prop="position1">
            <el-input v-model="newInfoForm1.position1" placeholder="请填写岗位" />
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email1">
            <el-input v-model="newInfoForm1.email1" placeholder="请填写电子邮箱" />
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="edit()">提交 </el-button>
        </span>
      </template>
    </el-dialog>

<!--主体部分-->
    <el-card style="margin: 20px">
      <el-row :gutter="20">
        <el-col :span="1.8">
          <el-button
            icon="Plus"
            size="large"
            color="#626aef"
            :dark="isDark"
            plain
            @click="clickAddButton"
            >添加</el-button
          >
        </el-col>
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" size="large" v-model="searchInfo">
            <template #append>
              <el-button icon="search" @click="search()" />
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
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="sex" label="性别" width="180" />

          <el-table-column prop="position" label="岗位" width="180" />
          <el-table-column prop="starttime" label="入职时间" width="180" />
          <el-table-column prop="phone" label="联系电话" width="300" />
          <el-table-column prop="email" label="电子邮箱" width="300" />
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

  // 人员管理

  components: {},

  data() {
    // 数据绑定
    return {
      enabled:1,  //默认人员状态正常为1
      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增表单
      dialogVisible1:false, //是否显示修改表单
      searchInfo:'',//搜索数据
      //新增表单数据
      newInfoForm: {
        real_name: "", // 真实姓名
        gender: "", // 性别
        phone: "", // 电话（账号）
        email: "", // 邮箱
        entry_time: "", // 入职时间
        post: "", // 岗位
        password: "", // 密码
        confirm_password: "", // 确认密码
      },

      tableData: [],

      //修改表单数据
      newInfoForm1:{
        id:"",
        name1:"",
        sex1:"",
        email1:"",
        position1:""
      },
    }
  },

  created() {
    this.getList();
  },

  methods: {
    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },

    //点击添加按钮
    clickAddButton(){
      this.dialogVisible = true;
      // this.add();
    },

    //提交新增表单
    add() {
      console.log("进入add")
      axios.post("/institution/person?name="+this.newInfoForm.real_name+"&sex="+this.newInfoForm.gender
              +"&password="+this.newInfoForm.password+"&position="+this.newInfoForm.post
              + "&starttime="+this.newInfoForm.entry_time+"&phone="+this.newInfoForm.phone
              +"&email="+this.newInfoForm.email+"&icon="+''
      ).then((resp) => {
                  if (resp.data.status==200) {
                    this.$message.success('添加成功！')
                  }else{
                    this.$message.error('添加失败！')
                  }
                })
      //使新增表单不可见
      this.dialogVisible = false;
      //调用getList()，获取新增后的所有数据
      this.getList();
    },

    //按人名查询员工
    search(){
      axios({
        url: "/institution/person/check?enabled=" + this.enabled +"&name="+this.searchInfo,
        method: "GET",
      }).then((resp) =>{
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
        }else{
          this.$message.error("查询失败！");
        }
      })
    },

    //获取所有员工
    getList() {
      axios({
        url: "/institution/person?enabled=" + this.enabled,
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
        }else{
          this.$message.error("获取员工失败！");
        }
      })
    },


    //修改按钮
    handleEdit(index, row) {
      this.dialogVisible1 = true;
      this.newInfoForm1.id = row.id;
      this.newInfoForm1.name1 = row.name;
      this.newInfoForm1.position1 = row.position;
      this.newInfoForm1.email1 = row.email;
      this.newInfoForm1.telephone1 = row.phone;
      this.newInfoForm1.sex = row.sex;
    },

    //修改员工属性
    edit() {
      axios({
        url: "/institution/person/"+this.newInfoForm1.id+"?name="+this.newInfoForm1.name1+"&sex="+this.newInfoForm1.sex1+"&email="+this.newInfoForm1.email1+"&position="+this.newInfoForm1.position1,
        method: "PUT",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
          this.$message.success("修改成功！");
          // console.log("执行了getlist")
          this.getList();
        }else{
          this.$message.error("修改失败！");
        }
      })
      this.dialogVisible1 = false;
    },


    handleDelete(index, row) {
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
          url: "/institution/person/"+row.id,
          method: "DELETE"
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
