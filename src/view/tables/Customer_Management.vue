<template>
  <div>
<!--新增表单-->
    <el-dialog v-model="dialogVisible" show-close="false" title="新增客户" width="30%">
      <template #default>
        <el-form ref="newInfoFormRef" :model="newInfoForm" :label-position="right" label-width="100px" :rules="rules">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="newInfoForm.name" placeholder="请填写客户名称" />
          </el-form-item>
          <el-form-item label="客户编码" prop="code">
            <el-input v-model="newInfoForm.code" placeholder="请填写客户编码" />
          </el-form-item>
          <el-form-item label="行业" prop="industry">
            <el-input v-model="newInfoForm.industry" placeholder="请填写行业" />
          </el-form-item>
          <el-form-item label="位置" prop="location">
            <el-input v-model="newInfoForm.location" placeholder="请填写位置" />
          </el-form-item>
          <el-form-item label="所属区域">
            <el-select v-model="newInfoForm.area" placeholder="请选择所属区域">
              <el-option label="西南" value="西南" />
              <el-option label="华南" value="华南" />
              <el-option label="西南" value="西南" />
              <el-option label="西北" value="西北" />
              <el-option label="东南" value="东南" />
              <el-option label="东北" value="东北" />
              <el-option label="中北" value="中北" />
              <el-option label="华中" value="华中" />
            </el-select>
          </el-form-item>
          <el-form-item label="规模" prop="scale">
            <el-input v-model="newInfoForm.scale" type="number" :min="1" placeholder="请填写规模" />
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="newInfoForm.contact" placeholder="请填写联系人" />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="newInfoForm.phone" type="number" :min="1"  placeholder="请填写联系方式" />
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

<!--修改表单--->
    <el-dialog v-model="dialogVisible1" show-close="false" title="修改客户" width="30%">
      <template #default>
        <el-form ref="newInfoFormRef1" :model="newInfoForm1" :label-position="right" label-width="100px" :rules="rules">
          <el-form-item label="客户id" prop="id1" v-if="false">
            <el-input v-model="newInfoForm1.id1" readonly="true" />
          </el-form-item>
          <el-form-item label="客户名称" prop="name1">
            <el-input v-model="newInfoForm1.name1" placeholder="请填写客户名称" />
          </el-form-item>
          <el-form-item label="客户编码" prop="code1">
            <el-input v-model="newInfoForm1.code1" placeholder="请填写客户编码" />
          </el-form-item>
          <el-form-item label="行业" prop="industry1">
            <el-input v-model="newInfoForm1.industry1" placeholder="请填写行业" />
          </el-form-item>
          <el-form-item label="位置" prop="location1">
            <el-input v-model="newInfoForm1.location1" placeholder="请填写位置" />
          </el-form-item>
          <el-form-item label="所属区域">
            <el-select v-model="newInfoForm1.area1" placeholder="请选择所属区域">
              <el-option label="西南" value="西南" />
              <el-option label="华南" value="华南" />
              <el-option label="西南" value="西南" />
              <el-option label="西北" value="西北" />
              <el-option label="东南" value="东南" />
              <el-option label="东北" value="东北" />
              <el-option label="中北" value="中北" />
              <el-option label="华中" value="华中" />
            </el-select>
          </el-form-item>
          <el-form-item label="规模" prop="scale1">
            <el-input v-model="newInfoForm1.scale1" type="number" :min="1" placeholder="请填写规模" />
          </el-form-item>
          <el-form-item label="联系人" prop="contact1">
            <el-input v-model="newInfoForm1.contact1" placeholder="请填写联系人" />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone1">
            <el-input v-model="newInfoForm1.phone1" type="number" :min="1"  placeholder="请填写联系方式" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="modify()">提交 </el-button>
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
          <el-table-column v-if="false" prop="id" label="客户ID" width="50" />
          <el-table-column prop="name" label="客户名称" width="180" />
          <el-table-column prop="contact" label="主要联系人" width="140" />
          <el-table-column prop="phone" label="联系方式" width="180" />
          <el-table-column prop="area" label="所在区域" />
          <el-table-column prop="industry" label="行业" width="180" />
          <el-table-column prop="location" label="位置" width="180" />
          <el-table-column prop="scale" label="规模" width="100" />
          <!-- <el-table-column prop="qualification_certification" label="资质认证附件" /> -->
          <!-- <el-table-column prop="audit_status" label="审核状态" width="180" /> -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" text bg>Edit</el-button>
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
  // 客户管理
  components: {},
  created() {
    //自动加载indexs方法
    this.getClients();
  },

  mounted() { },

  methods: {

    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },

    //修改
    modify() {
      // if (!/^1[34578]\d{9}$/.test(this.newInfoForm1.phone1)) {
      //   alert("手机号格式不正确");
      // }
      var sce=this.newInfoForm1.scale1+"人";
      axios({
        url: "/record/client",
        method: "PUT",
        data: {
          id: this.newInfoForm1.id1,
          name: this.newInfoForm1.name1,
          industry: this.newInfoForm1.industry1,
          location: this.newInfoForm1.location1,
          area: this.newInfoForm1.area1,
          scale: sce,
          contact: this.newInfoForm1.contact1,
          phone: this.newInfoForm1.phone1,
          code: this.newInfoForm1.code1
        }
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.dialogVisible1 = false;
          this.tableData = resp.data.data;
          this.getClients();
        } else {
          this.$message.error("修改信息失败");
        }
      })
    },

    add() {

       var sce=this.newInfoForm.scale+"人";
      axios.post("record/client?name=" + this.newInfoForm.name + "&industry=" + this.newInfoForm.industry
        + "&location=" + this.newInfoForm.location + "&area=" + this.newInfoForm.area
        + "&scale=" + sce + "&contact=" + this.newInfoForm.contact
        + "&phone=" + this.newInfoForm.phone + "&code=" + this.newInfoForm.code
      ).then((resp) => {
        if (resp.data.status == 200) {
          this.$message.success('添加成功！')
        } else {
          this.$message.error('添加失败！')
        }
      })
      this.dialogVisible=false;
      //调用getList()，获取新增后的所有数据
      this.getClients();
      console.log("调用了getClients")
    },
    search() {
      axios({
        url: "/record/client/check?name=" + this.input,
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
        } else {
          this.$message.error("获取员工失败！");
        }
      })
    },

    handleEdit(index, row) {
      this.dialogVisible1 = true;
      this.newInfoForm1.id1 = row.id;

      this.newInfoForm1.name1 = row.name;
      this.newInfoForm1.industry1 = row.industry;
      this.newInfoForm1.location1 = row.location;
      this.newInfoForm1.area1 = row.area;
      this.newInfoForm1.scale1 = row.scale;
      this.newInfoForm1.contact1 = row.contact;
      this.newInfoForm1.phone1 = row.phone;
      this.newInfoForm1.code1 = row.code;
    },

    handleDelete(index, row) {
      axios({
        url: "/institution/person?id=" + row.id,
        method: "DELETE"
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.$message.success("禁用成功！");
        } else {
          this.$message.error("获取员工失败！");
        }
      })
      this.getClients();
    },

    getClients() {
      axios({
        url: "record/client",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
        } else {
          this.$message.error("获取员工失败！");
        }
      })
    },
  },
  watch: {},
  data() {
    // 数据绑定
    return {
      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增的表单
      dialogVisible1: false, //是否显示编辑的表单

      //表单数据
      newInfoForm: {
        id: '',//客户ID
        name: '', // 客户名称
        code: '', // 客户编码
        industry: '', // 行业
        location: '', // 位置
        area: '', // 所属区域
        scale: '', // 规模
        contact: '', // 联系人
        phone: '', // 联系方式
      },
      newInfoForm1: {
        id1: '',//客户ID
        name1: '', // 客户名称
        code1: '', // 客户编码
        industry1: '', // 行业
        location1: '', // 位置
        area1: '', // 所属区域
        scale1: '', // 规模
        contact1: '', // 联系人
        phone1: '', // 联系方式
      },
      input: "",
      tableData: [

      ],
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
