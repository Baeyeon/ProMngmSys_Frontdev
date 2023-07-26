<template>
  <el-dialog
    v-model="dialogVisible"
    show-close="false"
    title="新增部门"
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
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="newInfoForm.name"
            :placeholder="newInfoForm.name"
          />
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="newInfoForm.managerid" placeholder="请选择管理员">
            <el-option
              v-for="(item, id) in personData"
              :key="id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="addDepartment()">提交 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVisible2"
    show-close="false"
    title="新增成员"
    width="30%"
  >
    <template #default>
      <el-form
        ref="newInfoFormRef2"
        :model="newInfoForm2"
        :label-position="right"
        label-width="100px"
        :rules="rules2"
      >
        <el-form-item label="新成员名称">
          <el-select v-model="newInfoForm2.id" placeholder="请选择新成员">
            <el-option
              v-for="(item, id) in personData"
              :key="id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">关闭</el-button>
        <el-button type="primary" @click="addMember()">提交 </el-button>
      </span>
    </template>
  </el-dialog>

  <div class="main-left">
    <div>
      <el-card
        style="
          margin: 20px;
          min-height: 100%;
          height: 100%;
          min-width: 100%;
          width: 100%;
        "
      >
        <template #header>
          <div class="card-header">
            <span style="font-weight: 600; font-size: 16px">部门管理</span>
            <el-button
              icon="Plus"
              @click="dialogVisible = true"
              circle
              style="margin-left: calc(60%)"
            />
          </div>
        </template>

        <el-radio-group
          v-model="choose_dept"
          style="
            display: block;
            line-height: 10px;
            white-space: normal;
            margin-right: 0;
            margin-top: -4px;
          "
        >
          <el-radio
            v-for="(item, id) in department"
            :key="id"
            :label="item.id"
            size="large"
            style="
              display: block;
              line-height: 10px;
              white-space: normal;
              margin-right: 0;
              margin-top: -4px;
            "
            @change="departmantChange()"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>

        <!-- <div v-for="(i, id) in department" :key="id">
          <input
            type="radio"
            v-model="choose_dept"
            :value="i.id"
            style="margin-bottom: 12px"
          />

          <span> {{ i.name }} </span>
        </div> -->

        <!-- <span>已选：{{ choose_dept }}</span> -->
      </el-card>
    </div>
  </div>

  <div class="main-right">
    <div>
      <el-card style="margin: 20px">
        <template #header>
          <div class="card-header">
            <span style="font-weight: 600; font-size: 16px">机构用户</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col>
            <el-button
              icon="Plus"
              size="large"
              color="#626aef"
              :dark="isDark"
              plain
              @click="dialogVisible2 = true"
              >添加成员</el-button
            >
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
            <!-- <el-table-column label="多选框" width="100">
              <template #default="scope">
                <el-checkbox
                  v-model="tableRadio"
                  :label="scope.$index"
                  >啊哈</el-checkbox
                >
              </template>
            </el-table-column> -->

            <el-table-column label="负责情况" width="120">
              <template #default="scope">
                <el-radio
                  v-model="tableRadio"
                  :label="scope.$index"
                  @change="handleDanxuanChange(scope.row)"
                  >负责</el-radio
                >
              </template>
            </el-table-column>
            <!-- <el-table-column prop="id" label="ID" width="100" /> -->
            <el-table-column prop="name" label="用户名称" width="180" />
            <el-table-column prop="phone" label="手机号码" width="180" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="danger"
                  @click="handleDelete(scope.row)"
                  text
                  bg
                  icon="Delete"
                  >delete</el-button
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},

  data() {
    // 数据绑定
    return {
      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增的表单
      dialogVisible2: false, //是否显示新增的表单
      choose_dept: "", //选中的部门ID
      tableRadio: -1, //选中的单选框
      currentChargerID: "", //当前部门负责人的ID
      flag: false, //当所选部门变化时flag为true,否则为false
      //表单数据 新增部门
      newInfoForm: {
        name: "",
        managerid: "",
      },
      //表单数据2 新增成员
      newInfoForm2: {
        id: "",
      },
      department: [
        //全部部门数据
        // {
        //   id: 1,
        //   name: "数据化",
        //   managerid: 2,
        //   parentpath: null,
        // },
        // {
        //   id: 2,
        //   name: "自动化部门",
        //   managerid: 15,
        //   parentpath: null,
        // },
        // {
        //   id: 3,
        //   name: "前端部门",
        //   managerid: 10,
        //   parentpath: null,
        // },
        // {
        //   id: 4,
        //   name: "后端部门",
        //   managerid: 35,
        //   parentpath: null,
        // },
        // {
        //   id: 5,
        //   name: "测试部门",
        //   managerid: 40,
        //   parentpath: null,
        // },
        // {
        //   id: 6,
        //   name: "运维部门",
        //   managerid: 49,
        //   parentpath: null,
        // },
        // {
        //   id: 7,
        //   name: "设计部门",
        //   managerid: 6,
        //   parentpath: null,
        // },
        // {
        //   id: 8,
        //   name: "公关部门",
        //   managerid: 17,
        //   parentpath: null,
        // },
        // {
        //   id: 9,
        //   name: "运营部门",
        //   managerid: 24,
        //   parentpath: null,
        // },
        // {
        //   id: 10,
        //   name: "市场部门",
        //   managerid: 32,
        //   parentpath: null,
        // },
        // {
        //   id: 11,
        //   name: "其他部门",
        //   managerid: 1,
        //   parentpath: null,
        // },
      ],
      // tableData: [
      //   {
      //     id: 1,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 2,
      //     charge: false,
      //     name: "张三",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 3,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 4,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 5,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 6,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 7,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 8,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 9,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 10,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 11,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      //   {
      //     id: 12,
      //     charge: false,
      //     name: "李华",
      //     phone: "12334578112",
      //   },
      // ],
      personData: [],
      //当前选中部门的员工，类型是number
      personOfChosendept: [],
    };
  },

  created() {
    this.getPersonList();
    this.getDepartmentList();
  },

  mounted() {},

  methods: {
    //休眠函数，time为毫秒
    sleep(time) {
      var timeStamp = new Date().getTime();
      var endTime = timeStamp + time;
      while (true) {
        if (new Date().getTime() > endTime) {
          return;
        }
      }
    },
    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },
    //页面初始化时就执行，获取所有员工
    getPersonList() {
      axios({
        url: "/institution/person?enabled=1",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.personData = resp.data.data;
        } else {
          this.$message.error("获取员工失败！");
        }
      });
    },
    //获取所有部门，也是创建时执行
    getDepartmentList() {
      axios({
        url: "/institution/department",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.department = resp.data.data;
        } else {
          this.$message.error("获取部门列表失败！");
        }
      });
    },
    handleDanxuanChange(row) {
      //单选框变化的处理
      //alert("单选框处理" + row.id);
      //先发送PUT请求
      //alert(this.choose_dept + " , " + row.id);
      axios({
        url:
          "/institution/department/" + this.choose_dept + "/manager/" + row.id,
        method: "PUT",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.$message.success("修改部门负责人成功");
          this.getClients();
        } else {
          this.$message.error("修改部门负责人失败");
        }
      });
      //这里不能POST之后紧接着GET，感觉是数据库没有更新过来就GET了，得到的是旧数据，采用的对测是sleep一秒后再拿到
      this.sleep(500);
      //更新部门数据
      axios({
        url: "/institution/department",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.department = resp.data.data;
          //this.$message.success("部门更新成功了哦！");
          //还要更新负责人位置
          for (var i = 0; i < this.department.length; i++) {
            if (this.choose_dept == this.department[i].id) {
              this.currentChargerID = this.department[i].managerid;
            }
          }
          //alert("负责人欸：" + this.currentChargerID);
          this.tableRadio = this.personOfChosendept.indexOf(
            this.currentChargerID
          );
        } else {
          this.$message.error("获取部门列表失败！");
        }
      });
    },
    //新增部门方法
    addDepartment() {
      axios({
        url: "/institution/department",
        method: "POST",
        data: {
          name: this.newInfoForm.name,
          managerid: this.newInfoForm.managerid,
        },
      }).then((resp) => {
        if (resp.data.status == 200) {
          // this.$router.push("/dashboard");
          this.$message.success("添加成功");
          this.getDepartmentList();
        } else {
          this.$message.error("添加失败");
        }
        this.dialogVisible = false;
      });
    },
    //监听选中部门发生变化时的函数
    departmantChange() {
      //alert(this.choose_dept);
      for (var i = 0; i < this.department.length; i++) {
        if (this.choose_dept == this.department[i].id) {
          this.currentChargerID = this.department[i].managerid;
        }
      }
      //alert("负责人：" + this.currentChargerID);
      axios({
        url: "/institution/department/person/" + this.choose_dept,
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.personOfChosendept = resp.data.data;
          //下面这里是因为，后端的逻辑是负责人不一定被包含在员工列表里面，所以我这里做了一个判定，如果负责人不在部门员工列表里面那我就放进去
          if (!this.personOfChosendept.includes(this.currentChargerID)) {
            this.personOfChosendept.push(this.currentChargerID);
            //alert("添加成功");
          }
          //JS数组升序排序
          this.personOfChosendept.sort(function (a, b) {
            /*
             * return b-a; —> 降序排序
             * return a-b; —> 升序排列
             */
            return a - b;
          }); //括号里不写回调函数则默认按照字母逐位升序排列
          //alert("当前部门员工列表：" + this.personOfChosendept);
        } else {
          this.$message.error("获取当前部门员工列表失败！");
        }
      });
    },
    addMember() {
      //新增部门成员
      axios({
        url: "/institution/department_person/"+this.choose_dept+"/"+this.newInfoForm2.id,
        method: "POST",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.$message.success("添加成功");
          this.departmantChange();
          this.tableRadio = this.personOfChosendept.indexOf(
            this.currentChargerID
          );
        } else {
          this.$message.error("人员已在该部门中！添加失败");
        }
        this.dialogVisible2 = false;
      });
    },
    search() {
      alert("点你妈，还没写");
    },
    handleEdit(index, row) {
      alert("index:" + index + "，" + "row" + row + "!");
    },
    handleDelete(row) {
      if (row.id === this.currentChargerID) {
        alert("请先指定新的负责人!");
        return;
      }
      //先DELETE
      axios({
        url:
          "/institution/department_person/" + this.choose_dept + "/" + row.id,
        method: "DELETE",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.$message.success("删除成功！");
        } else {
          this.$message.error("删除失败！");
        }
      });
      this.sleep(500);
      //alert("row" + row + "!" + row.id);
      //然后重新获取表格数据
      axios({
        url: "/institution/department/person/" + this.choose_dept,
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.personOfChosendept = resp.data.data;
          //下面这里是因为，后端的逻辑是负责人不一定被包含在员工列表里面，所以我这里做了一个判定，如果负责人不在部门员工列表里面那我就放进去
          if (!this.personOfChosendept.includes(this.currentChargerID)) {
            this.personOfChosendept.push(this.currentChargerID);
          }
          //JS数组升序排序
          this.personOfChosendept.sort(function (a, b) {
            /*
             * return b-a; —> 降序排序
             * return a-b; —> 升序排列
             */
            return a - b;
          }); //括号里不写回调函数则默认按照字母逐位升序排列
          //alert("当前部门员工列表：" + this.personOfChosendept);
        } else {
          this.$message.error("获取当前部门员工列表失败！");
        }
      });
      this.tableRadio = this.personOfChosendept.indexOf(this.currentChargerID);
      return;
    },
  },
  watch: {
    // tableRadio: {
    //   handler(newValue, oldValue) {
    //     alert("tableRadio你变了,从"+oldValue+" 变成 "+newValue);
    //   },
    // },
  },
  computed: {
    tableData() {
      //计算属性，计算出表给中应该显示的当前部门的成员列表
      //这里有一个问题要注意，每次计算完之后，tableData一定是按照id升序排列的！
      //var data = this.personData;
      var data = [];
      //alert(this.personOfChosendept);
      for (var i = 0; i < this.personData.length; i++) {
        //alert("遍历id: "+this.personData[i].id);
        if (this.personOfChosendept.includes(this.personData[i].id)) {
          data.push(this.personData[i]);
        }
      }
      //alert(data.length);
      //每次表格数据更新的时候都要一起更新负责人的位置，但是它总是会更新两次，所以做了判断，如果>0才更新
      if (this.personOfChosendept.indexOf(this.currentChargerID) >= 0) {
        this.tableRadio = this.personOfChosendept.indexOf(
          this.currentChargerID
        );
      }
      return data;
    },
    // tableRadio() {
    //   //负责人单选框
    //   return this.personOfChosendept.indexOf(this.currentChargerID);
    // },
  },
};
</script>



<style>
.main-left {
  width: 25%;

  left: 0;
  float: left;
}
.main-right {
  margin-left: 2%;
  width: 75%;
  float: left;
}
/* 为了不造成样式污染，单据加一个style标签来修改第三方组件样式，pagination表格分页整体居中，上边距20px */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}

/* input[type="radio"] {
  outline: none;
  margin: 10px 5px 1px 20px;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  font-family: PingFangSC-Regular;
  color: rgba(56, 71, 68, 1);
  -webkit-appearance: none;
  border: 1px solid #ddd;
  display: inline-block;
  border-radius: 50%;
}

input[type="radio"]:checked:before {
  content: "";
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #108ee9;
  position: absolute;
  top: 2px;
  left: 2px;
}

input[type="radio"]:checked {
  display: inline-block;
  border: 1px solid #108ee9;
  border-radius: 50%;
  position: relative;
} */
</style>
