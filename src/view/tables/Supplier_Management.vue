<template>
  <div>
<!--新增表单-->
    <el-dialog
      v-model="dialogVisible"
      show-close="false"
      title="新增供应商"
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

          <el-form-item label="供应商名称:" prop="name">
            <el-input
                v-model="newInfoForm.name"
                placeholder="供应商名称"
            />
          </el-form-item>
          <el-form-item label="供应商行业:" prop="industry">
            <el-input
                v-model="newInfoForm.industry"
                placeholder="供应商行业" />
          </el-form-item>
          <el-form-item label="供应商地址:" prop="location">
            <el-input
                v-model="newInfoForm.location"
                placeholder="供应商地址" />
          </el-form-item>
          <el-form-item label="供应商编码:" prop="code">
            <el-input
                v-model="newInfoForm.code"
                placeholder="供应商编码"
            />
          </el-form-item>
          <el-form-item label="联系人:" prop="contact">
            <el-input
                v-model="newInfoForm.contact"
                placeholder="联系人"
            />
          </el-form-item>
          <el-form-item label="联系方式:" prop="phone">
            <el-input
                v-model="newInfoForm.phone"
                placeholder="联系方式"
            />
          </el-form-item>
          <el-form-item label="主要提供物:" prop="goods">
            <el-input
                v-model="newInfoForm.goods"
                placeholder="主要提供物"
            />
          </el-form-item>
          <el-form-item label="供应商状态:" >
            <el-select v-model="newInfoForm.state" placeholder="供应商状态">
              <el-option label="合作中" value="合作中" />
              <el-option label="考察中" value="考察中" />
              <el-option label="已解除" value="已解除" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商评估:" >
            <el-select v-model="newInfoForm.estimate" placeholder="供应商评估">
              <el-option label="临时供应商" value="临时供应商" />
              <el-option label="普通供应商" value="普通供应商" />
              <el-option label="优质供应商" value="优质供应商" />
              <el-option label="战略供应商" value="战略供应商" />
            </el-select>
          </el-form-item>
          <el-form-item label="地区:" >
            <el-select v-model="newInfoForm.area" placeholder="区域">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商规模:" prop="scale">
            <el-input
                v-model="newInfoForm.scale"
                placeholder="供应商规模"
            />
          </el-form-item>
          <el-form-item label="供应商分类:" >
            <el-select v-model="newInfoForm.cname" placeholder="供应商分类">
              <el-option v-for="item in classify_list" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="银行账户:" prop="account">
            <el-input
                v-model="newInfoForm.account"
                placeholder="银行账户"
            />
          </el-form-item>
          <el-form-item label="开户行:" prop="bank">
            <el-input
                v-model="newInfoForm.bank"
                placeholder="开户行"
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
    <el-dialog v-model="dialogVisible1" show-close="false" title="修改供应商" width="30%">
      <template #default>
        <el-form ref="newInfoFormRef1" :model="newInfoForm1" :label-position="right" label-width="100px" :rules="rules">
          <el-form-item label="供应商名称" prop="name1" v-if="false">
            <el-input v-model="newInfoForm1.name" readonly="true" />
          </el-form-item>
          <el-form-item label="供应商行业" prop="industry">
            <el-input v-model="newInfoForm1.industry" placeholder="请填写供应商行业" />
          </el-form-item>
          <el-form-item label="供应商地址" prop="location">
            <el-input v-model="newInfoForm1.location" placeholder="请填写供应商地址" />
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="newInfoForm1.contact" placeholder="请填写联系人" />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="newInfoForm1.phone" placeholder="请填写联系方式" />
          </el-form-item>
          <el-form-item label="主要提供物" prop="goods">
            <el-input v-model="newInfoForm1.goods" placeholder="请填写主要提供物" />
          </el-form-item>
          <el-form-item label="供应商状态">
            <el-select v-model="newInfoForm1.state" placeholder="请选择供应商状态">
              <el-option label="考察中" value="考察中" />
              <el-option label="合作中" value="合作中" />
              <el-option label="已解除" value="已解除" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商评估">
            <el-select v-model="newInfoForm1.estimate" placeholder="请选择供应商评估">
              <el-option label="临时供应商" value="临时供应商" />
              <el-option label="普通供应商" value="普通供应商" />
              <el-option label="优质供应商" value="优质供应商" />
              <el-option label="战略供应商" value="战略供应商" />
            </el-select>
          </el-form-item>
          <el-form-item label="地区">
            <el-select v-model="newInfoForm1.area" placeholder="请选择所属区域">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商规模" prop="scale">
            <el-input v-model="newInfoForm1.scale" type="number" :min="1" placeholder="请填写供应商规模" />
          </el-form-item>
<!--          <el-form-item label="供应商分类">-->
<!--            <el-select v-model="newInfoForm1.cname1" placeholder="请选择供应商分类">-->
<!--              <el-option label="西南" value="西南" />-->
<!--              <el-option label="华南" value="华南" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->

          <el-form-item label="供应商分类:" >
            <el-select v-model="newInfoForm1.cname" placeholder="请选择供应商分类">
              <el-option v-for="item in classify_list" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>

          <el-form-item label="银行账户" prop="contact">
            <el-input v-model="newInfoForm1.account" placeholder="请填写银行账户" />
          </el-form-item>
          <el-form-item label="开户行" prop="bank">
            <el-input v-model="newInfoForm1.bank"  placeholder="请填写开户行" />
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


<!--  查看供应商信息的表单 -->
    <el-dialog v-model="dialogVisible2" width="1100px" show-close="false" title="供应商信息详情">
      <el-form :model="checkForm" :label-position="right" label-width="100px"
               :rules="rules" :inline="true">

        <el-form-item label="供应商名称:" prop="name">
          <el-input v-model="checkForm.name" placeholder="供应商名称" readonly />
        </el-form-item>
        <el-form-item label="供应商行业:" prop="industry">
          <el-input v-model="checkForm.industry" placeholder="供应商行业" readonly />
        </el-form-item>
        <el-form-item label="供应商地址:" prop="location">
          <el-input v-model="checkForm.location" placeholder="供应商地址" readonly />
        </el-form-item>
        <el-form-item label="供应商编码:" prop="code">
          <el-input v-model="checkForm.code" placeholder="供应商编码" readonly />
        </el-form-item>
        <el-form-item label="联系人:" prop="contact">
          <el-input v-model="checkForm.contact" placeholder="联系人" readonly />
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input v-model="checkForm.phone" placeholder="联系方式" readonly />
        </el-form-item>
        <el-form-item label="主要提供物:" prop="goods">
          <el-input v-model="checkForm.goods" placeholder="主要提供物" readonly />
        </el-form-item>
        <el-form-item label="供应商状态:" prop="state">
          <el-input v-model="checkForm.state" placeholder="供应商状态" readonly />
        </el-form-item>
        <el-form-item label="供应商评估:" prop="estimate">
          <el-input v-model="checkForm.estimate" placeholder="供应商评估" readonly />
        </el-form-item>
        <el-form-item label="地区:" prop="area">
          <el-input v-model="checkForm.area" placeholder="区域" readonly />
        </el-form-item>
        <el-form-item label="供应商规模:" prop="scale">
          <el-input v-model="checkForm.scale" placeholder="供应商规模" readonly />
        </el-form-item>
        <el-form-item label="供应商分类:" prop="cname">
          <el-input v-model="checkForm.cname" placeholder="供应商分类" readonly />
        </el-form-item>

      </el-form>
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
            @click="dialogVisible = true"
            >添加</el-button
          >
        </el-col>
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" size="large" v-model="search_content">
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

          <el-table-column prop="name" label="供应商名称" width="180" />
          <el-table-column prop="code" label="供应商编码" width="180" />
          <el-table-column prop="industry" label="供应商行业" width="180" />
          <el-table-column prop="location" label="供应商地址" width="180" />
          <el-table-column prop="contact" label="联系人" width="180" />
          <el-table-column prop="phone" label="联系方式" width="180" />
          <el-table-column prop="scale" label="供应商规模" width="180" />
          <el-table-column prop="cname" label="供应商分类" width="180" />
          <el-table-column prop="state" label="供应商状态" width="180" />
          <el-table-column prop="goods" label="供应商主要提供物" width="180" />
          <el-table-column prop="estimate" label="供应商评估" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="success"
                  @click="handleCheck(scope.$index, scope.row)"
                  text
                  bg
              >查看</el-button
              >
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
      dialogVisible1: false, // 是否显示修改的表单
      dialogVisible2: false, // 是否显示查看的表单
      //新增表单数据
      newInfoForm: {
        ccode:"", // 供应商分类编号
        cname:"", // 供应商分类
        name:"", // 供应商名称
        industry:"", // 供应商行业
        location:"", // 供应商地址
        code:"", // 供应商编码
        contact:"", // 联系人
        phone:"", // 联系方式
        goods:"", // 供应商主要提供物
        state:"", // 供应商状态
        estimate:"", // 供应商评估
        area:"", // 地区
        scale:"", // 供应商规模
        account:"", // 银行账户
        bank:"", // 开户行
      },
      //修改表单
      newInfoForm1:{
        id: "", // 该供应商信息项的编号
        ccode:"", // 供应商分类编号
        cname:"", // 供应商分类
        name:"", // 供应商名称
        industry:"", // 供应商行业
        location:"", // 供应商地址
        code:"", // 供应商编码
        contact:"", // 联系人
        phone:"", // 联系方式
        goods:"", // 供应商主要提供物
        state:"", // 供应商状态
        estimate:"", // 供应商评估
        area:"", // 地区
        scale:"", // 供应商规模
        account:"", // 银行账户
        bank:"", // 开户行
      },
      // 查询表单
      checkForm: {
        ccode:"", // 供应商分类编号
        cname:"", // 供应商分类
        name:"", // 供应商名称
        industry:"", // 供应商行业
        location:"", // 供应商地址
        code:"", // 供应商编码
        contact:"", // 联系人
        phone:"", // 联系方式
        goods:"", // 供应商主要提供物
        state:"", // 供应商状态
        estimate:"", // 供应商评估
        area:"", // 地区
        scale:"", // 供应商规模
        account:"", // 银行账户
        bank:"", // 开户行
      },
      search_content: '',
      classify_list: [],
      tableData: [
      ],
    };
  },
  created() {
    this.searchAllInfo()
    this.searchClassification()
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
      // 因为供应商分类名不重复，可以用分类名称来找到供应商分类的编码，然后作为参数提交给后端
      let index = this.classify_list.findIndex(item=>item.name === this.newInfoForm.cname)
      this.newInfoForm.ccode = this.classify_list[index].code
      // 前后端交互
      axios({
        url: "/management/supplier",
        method: "POST",
        data: {
          ccode: this.newInfoForm.ccode,
          name: this.newInfoForm.name,
          industry: this.newInfoForm.industry,
          location: this.newInfoForm.location,
          code: this.newInfoForm.code,
          contact: this.newInfoForm.contact,
          phone: this.newInfoForm.phone,
          goods: this.newInfoForm.goods,
          state: this.newInfoForm.state,
          estimate: this.newInfoForm.estimate,
          area: this.newInfoForm.area,
          scale: this.newInfoForm.scale,
          cname: this.newInfoForm.cname,
          account: this.newInfoForm.account,
          bank: this.newInfoForm.bank,
        },
      }).then((resp) => {
        if (resp.data.status==200) {
          // this.$router.push("/dashboard");
          this.$message.success('新增成功')
          // 更新表格信息
          this.searchAllInfo()
        }else{
          this.$message.error('新增失败')
        }
        this.dialogVisible = false
      })
    },
    modify() {
      // 因为供应商分类名不重复，可以用分类名称来找到供应商分类的编码，然后作为参数提交给后端
      let index = this.classify_list.findIndex(item=>item.name === this.newInfoForm1.cname)
      this.newInfoForm1.ccode = this.classify_list[index].code
      // 前后端交互
      axios({
        url: "/management/supplier",
        method: "PUT",
        data: {
          id: this.newInfoForm1.id,
          ccode: this.newInfoForm1.ccode,
          name: this.newInfoForm1.name,
          industry: this.newInfoForm1.industry,
          location: this.newInfoForm1.location,
          code: this.newInfoForm1.code,
          contact: this.newInfoForm1.contact,
          phone: this.newInfoForm1.phone,
          goods: this.newInfoForm1.goods,
          state: this.newInfoForm1.state,
          estimate: this.newInfoForm1.estimate,
          area: this.newInfoForm1.area,
          scale: this.newInfoForm1.scale,
          cname: this.newInfoForm1.cname,
          account: this.newInfoForm1.account,
          bank: this.newInfoForm1.bank,
        },
      }).then((resp) => {
        if (resp.data.status==200) {
          // this.$router.push("/dashboard");
          this.$message.success('修改成功')
          // 更新表格信息
          this.searchAllInfo()
        }else{
          this.$message.error('修改失败')
        }
        this.dialogVisible1 = false
      })
    },
    search() {
      axios({
        url: "/management/supplier/check?name="+ this.search_content,
        method: "GET",
      }).then((resp) => {
        if (resp.data.status==200) {
          this.tableData = resp.data.data;
        }else{
          this.$message.error('供应商获取失败')
        }
      })
    },
    handleCheck(index, row) {
      this.dialogVisible2 = true
      this.checkForm = JSON.parse(JSON.stringify(row))
    },
    handleEdit(index, row) {
      this.dialogVisible1 = true
      // 将表格中该行的数据赋值给修改表单
      this.newInfoForm1 = JSON.parse(JSON.stringify(row))
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
      )
          .then(() => {
            // 确认删除后，发起删除请求
            axios({
              url: "/management/supplier/" + row.id,
              method: "DELETE",
            }).then((resp) => {
              if (resp.data.status==200) {
                // this.$router.push("/dashboard");
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                // 更新表格信息
                this.searchAllInfo()
              }else{
                ElMessage({
                  type: 'warning',
                  message: '删除失败',
                })
              }
              this.dialogVisible = false;
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '删除取消',
            })
          })
    },
    //查询所有供应商分类信息,用以获取供应商分类的编码
    searchClassification() {
      axios({
        url: "/management/supplier_classification",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status==200) {
          this.classify_list = resp.data.data;
        }else{
          this.$message.error('供应商获取失败')
        }
      })
    },
    // 查询所有供应商信息
    searchAllInfo() {
      axios({
        url: "/management/supplier",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status==200) {
          this.tableData = resp.data.data;
          console.log(resp.data.data)
        }else{
          this.$message.error('供应商获取失败')
        }
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
