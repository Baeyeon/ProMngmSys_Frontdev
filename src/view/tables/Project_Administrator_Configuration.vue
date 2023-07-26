<template>
  <div>
    <el-dialog v-model="dialogVisible" show-close="false" title="新增项目管理员配置" width="30%">
      <template #default>
        <el-form ref="newInfoFormRef" :model="newInfoForm" :label-position="right" label-width="100px" :rules="rules">

          <el-form-item prop="selectProjectClassificationID" v-if="false">
            <el-input v-model="newInfoForm.selectProjectClassificationID" readonly="true" />
          </el-form-item>
          <el-form-item label="项目类型" prop="project_type">
            <el-input v-model="newInfoForm.project_type" placeholder="请输入项目类型" readonly="true"
              @click="selectProjectType()" />
          </el-form-item>
          <el-form-item prop="project_administrator_id" v-if="false">
            <el-input v-model="newInfoForm.project_administrator_id" readonly="true" v-if="false" />
          </el-form-item>
          <el-form-item label="项目管理员" prop="project_administrator">
            <el-input v-model="newInfoForm.project_administrator" readonly="true" placeholder="请输入项目管理员"
              @click="selectAdministrator()" />
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

    <el-dialog v-model="dialogVisible1" show-close="false" title="选择项目类型" width="50%">
      <el-table :data="
        tableData1.slice(
          (currentPage1 - 1) * pagesize,
          currentPage1 * pagesize
        )
      " border stripe style="width: 100%; margin-top: 20px" max-height="550">
        <el-table-column prop="id" v-if="false" />
        <el-table-column prop="name" label="项目类型名" width="180" />
        <el-table-column prop="code" label="编码" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="selectInFirstDialog(scope.$index, scope.row)" text bg>选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 20px; text-align: center">
        <el-col>
          <el-pagination layout="total,sizes,prev,pager,next,jumper" :total="tableData1.length"
            @size-change="handleSizeChange" @current-change="handleCurrentChange1" :current-page="currentPage1"
            :page-sizes="[5, 10, 20]" :page-size="pagesize" style="
              margin-top: 20px;
              text-align: center;
              justify-content: center;
            ">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" show-close="false" title="选择项目管理员" width="50%">
      <el-table :data="
        tableData2.slice(
          (currentPage2 - 1) * pagesize,
          currentPage2 * pagesize
        )
      " border stripe style="width: 100%; margin-top: 20px" max-height="550">
        <el-table-column prop="id" label="管理员ID" width="180" />
        <el-table-column prop="name" label="管理员" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="selectInSecondtDialog(scope.$index, scope.row)" text bg>选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 20px; text-align: center">
        <el-col>
          <el-pagination layout="total,sizes,prev,pager,next,jumper" :total="tableData2.length"
            @size-change="handleSizeChange" @current-change="handleCurrentChange2" :current-page="currentPage2"
            :page-sizes="[5, 10, 20]" :page-size="pagesize" style="
              margin-top: 20px;
              text-align: center;
              justify-content: center;
            ">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>


    <el-dialog v-model="dialogVisible3" show-close="false" title="修改信息" width="30%">
      <template #default>
        <el-form ref="newInfoFormRef" :model="newInfoForm1" :label-position="right" label-width="100px" :rules="rules">
          <el-form-item prop="project_type_id" v-if="false">
            <el-input v-model="newInfoForm1.project_type_id" readonly="true" />
          </el-form-item>
          <el-form-item prop="project_administrato_id" v-if="false">
            <el-input v-model="newInfoForm1.project_administrator_id" readonly="true" />
          </el-form-item>
          <el-form-item label="项目类型" prop="project_type">
            <el-input v-model="newInfoForm1.project_type" readonly="true" />
          </el-form-item>
          <el-form-item label="项目管理员" prop="project_administrator">
            <el-input v-model="newInfoForm1.project_administrator" readonly="true" placeholder="请输入项目管理员"
              @click="dialogVisible2 = true" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible3 = false">关闭</el-button>
          <el-button type="primary" @click="add1()">提交 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-card style="margin: 20px">
      <el-row :gutter="20">
        <el-col :span="1.8">
          <el-button icon="Plus" size="large" color="#626aef" :dark="isDark" plain @click="dialogVisible = true">添加
          </el-button>
        </el-col>
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input v-model="input" placeholder="请输入内容" size="large">
            <template #append>
              <el-button icon="Search" @click="search()" />
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="
          tableData.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        " border stripe style="width: 100%; margin-top: 20px" max-height="550">
          <el-table-column type="index" />
          <el-table-column prop="id" label="项目类型ID" width="180" />
          <el-table-column prop="name" label="项目类型名" width="180" />
          <el-table-column prop="managerName" label="管理员" width="180" />
          <el-table-column prop="setTime" label="配置时间" width="300" />
          <el-table-column prop="code" label="编码" width="50" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" text bg>Edit</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" text bg>Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 20px; text-align: center">
        <el-col>
          <el-pagination layout="total,sizes,prev,pager,next,jumper" :total="tableData.length"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5, 10, 20]" :page-size="pagesize" style="
              margin-top: 20px;
              text-align: center;
              justify-content: center;
            ">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://114.115.152.241:18080/';
export default {
  components: {},



  mounted() { },
  created() {
    this.getProject_Administrator_Configuration();
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
    handleCurrentChange1: function (currentPage1) {
      //页码更改方法
      this.currentPage1 = currentPage1;
    },
    handleCurrentChange2: function (currentPage2) {
      //页码更改方法
      this.currentPage2 = currentPage2;
    },
    add() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      var dateArr = [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate = year + '-' + dateArr[0] + '-' + dateArr[1];
      var intId = parseInt(this.newInfoForm.selectProjectClassificationID);
      var intManagerID = parseInt(this.newInfoForm.project_administrator_id);
      console.log("add : " + intId + " " + intManagerID + " " + strDate);

      axios({
        url: "/project/projectTypeManager",
        method: "PUT",
        data: {
          id: intId,
          managerId: intManagerID,
          setTime: strDate
        }
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.dialogVisible = false;
          this.tableData = resp.data.data;
        } else {
          alert("修改信息失败");
          this.$message.error("修改信息失败");
        }
      })

      //调用getList()，获取新增后的所有数据
      this.getProject_Administrator_Configuration();
      this.dialogVisible = false;
    },
    add1() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      var dateArr = [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate = year + '-' + dateArr[0] + '-' + dateArr[1];
      // + ' ' + dateArr[2] + ':' + dateArr[3] + ':' + dateArr[4];
      var intId = parseInt(this.newInfoForm1.project_type_id);
      var intManagerID = parseInt(this.newInfoForm1.project_administrator_id);
      console.log("add1 : " + intId + " " + intManagerID + " " + strDate);
      axios({
        url: "/project/projectTypeManager",
        method: "PUT",
        data: {
          id: intId,
          managerId: intManagerID,
          setTime: strDate
        }
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.dialogVisible = false;
          this.tableData = resp.data.data;
        } else {
          alert("修改信息失败");
          this.$message.error("修改信息失败");
        }
      })

      //调用getList()，获取新增后的所有数据
      this.getProject_Administrator_Configuration();
      this.dialogVisible3 = false;
    },
    search() {
      // console.log("in search");
      axios({
        url: "/project/projectType/check?name=" + this.input,
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          // console.log(resp.data.data);
          this.tableData = resp.data.data;
        } else {
          this.$message.error("获取项目管理员配置信息失败！");
        }
      })
    },
    selectProjectType() {
      this.dialogVisible1 = true;
      axios({
        url: "/project/projectType",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData1 = resp.data.data;
          // console.log(resp.data.data);
        } else {
          this.$message.error("获取项目列表失败！");
        }
      })
    },
    selectAdministrator() {
      this.dialogVisible2 = true;
      axios({
        url: "/institution/person?enabled=1",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData2 = resp.data.data;
          console.log(resp.data.data);
        } else {
          this.$message.error("获取项目管理员列表失败！");
        }
      })
    },

    selectInFirstDialog(index, row) {
      this.newInfoForm.selectProjectClassificationID = row.id;
      this.dialogVisible1 = false;
      this.newInfoForm.project_type = row.name;
    },
    selectInSecondtDialog(index, row) {
      this.dialogVisible2 = false;
      this.newInfoForm.project_administrator = row.name;
      this.newInfoForm.project_administrator_id = row.id;
      this.newInfoForm1.project_administrator = row.name;
      this.newInfoForm1.project_administrator_id = row.id;
    },
    handleEdit(index, row) {
      this.dialogVisible3 = true;
      this.newInfoForm1.project_type = row.name;
      this.newInfoForm1.project_type_id = row.id;
      axios({
        url: "/institution/person?enabled=1",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData2 = resp.data.data;
          console.log(resp.data.data);
        } else {
          this.$message.error("获取项目管理员列表失败！");
        }
      })
    },
    handleDelete(index, row) {
      axios({
        url: "/project/projectTypeManager?id=" + row.id,
        method: "DELETE"
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.getProject_Administrator_Configuration();
          this.$message.success("删除成功！");
        } else {
          this.$message.error("删除失败！");
        }
      })


    },
    getProject_Administrator_Configuration() {
      axios({
        url: "/project/projectTypeManager",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
          // console.log(resp.data.data);
        } else {
          this.$message.error("获取项目管理员配置失败！");
        }
      })
    },
  },
  watch: {},
  data() {
    // 数据绑定
    return {
      currentPage: 1, //默认页码为1
      currentPage1: 1, //默认页码为1
      currentPage2: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增的表单
      dialogVisible1: false, //是否显示新增的表单
      dialogVisible2: false, //是否显示新增的表单
      dialogVisible3: false, //是否显示新增的表单

      //表单数据
      newInfoForm: {
        project_type: "",
        selectProjectClassificationID: "",
        project_administrator: "",
        project_administrator_id: "",
        sel: "",


      },
      newInfoForm1: {
        project_type: "",
        project_type_id: "",
        project_administrator: "",
        project_administrator_id:"",
        sel: "",

      },
      tableData: [
      ],
      tableData1: [
      ],
      tableData2: [
      ],
      input: ""
    };
  },
};
</script>



<style>
/* 为了不造成样式污染，单据加一个style标签来修改第三方组件样式，pagination表格分页整体居中，上边距20px */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
