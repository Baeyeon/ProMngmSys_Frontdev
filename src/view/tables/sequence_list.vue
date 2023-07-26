<template>
  <div>
<!--供应商选择界面-->
    <el-dialog
        v-model="supplier_choose_dialogVisible"
        show-close="false"
        title="选择供应商"
        width="30%">
      <template #default>
        <el-card style="margin: 20px">
          <el-row :gutter="20">
            <el-col :span="1.8">
              <el-button
                  icon="Plus"
                  size="large"
                  color="#626aef"
                  :dark="isDark"
                  plain
                  @click="supplier_add_dialogVisible = true"
              >添加</el-button
              >
            </el-col>
            <el-col :span="8">
              <!-- 搜索与添加区域 -->
              <el-input placeholder="请输入内容" size="large">
                <template #append>
                  <el-button icon="Search"  />
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-table
                :data="
            SupplierData.slice(
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
              <el-table-column prop="manager" label="供应商联系方式" width="180" />
              <el-table-column prop="contral_class" label="供应商开户行" width="300" />
              <el-table-column prop="jingdu" label="供应商账户" width="300" />
              <el-table-column label="操作">
                <template #default>
                  <el-button
                      type="primary"
                      text
                      bg
                      @click=""
                  >选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row style="margin-top: 20px; text-align: center">
            <el-col>
              <el-pagination
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="SupplierData.length"
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
      </template>
    </el-dialog>

      <el-dialog
        v-model="supplier_add_dialogVisible"
        show-close="false"
        title="供应商信息新增"
        width="30%"
    >
      <template #default>
        <el-form
            ref="supplierFormRef"
            :model="supplierForm"
            :label-position="right"
            label-width="100px"
            :rules="rules"
        >
          <el-form-item label="供应商名称" prop="supplier_name">
            <el-input
                v-model="supplierForm.supplier_name"
                :placeholder="请输入供应商名称"
            />
          </el-form-item>
          <el-form-item label="供应商业" prop="supplier_business">
            <el-input
                v-model="supplierForm.supplier_business"
                :placeholder="请输入供应商业"
            />
          </el-form-item>
          <el-form-item label="供应商地址" prop="supplier_address">
            <el-input
                v-model="supplierForm.supplier_address"
                :placeholder="请输入供应商地址"
            />
          </el-form-item>
          <el-form-item label="供应商编码" prop="supplier_code">
            <el-input
                v-model="supplierForm.supplier_code"
                :placeholder="请输入供应商编码"
            />
          </el-form-item>
          <el-form-item label="联系人" prop="supplier_linkman">
            <el-input
                v-model="supplierForm.supplier_linkman"
                :placeholder="请输入联系人"
            />
          </el-form-item>
          <el-form-item label="联系方式" prop="supplier_linkway">
            <el-input
                v-model="supplierForm.supplier_linkway"
                :placeholder="请输入联系方式"
            />
          </el-form-item>
          <el-form-item label="地区" prop="supplier_area">
            <el-input
                v-model="supplierForm.supplier_area"
                :placeholder="请输入地区"
            />
          </el-form-item>
          <el-form-item label="供应商规模" prop="supplier_scale">
            <el-input
                v-model="supplierForm.supplier_scale"
                :placeholder="请输入供应商规模"
            />
          </el-form-item>
          <el-form-item label="供应商分类编码" prop="supplier_typecode">
            <el-input
                v-model="supplierForm.supplier_typecode"
                :placeholder="请输入供应商分类编码"
            />
          </el-form-item>
          <el-form-item label="供应商银行账号" prop="supplier_bankcode">
            <el-input
                v-model="supplierForm.supplier_bankcode"
                :placeholder="请输入供应商银行账号"
            />
          </el-form-item>
          <el-form-item label="供应商开户行" prop="supplier_bank">
            <el-input
                v-model="supplierForm.supplier_bank"
                :placeholder="请输入供应商开户行"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="supplier_add_dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="add()">提交 </el-button>
        </span>
      </template>
    </el-dialog>

<!--客户选择界面-->
    <el-dialog
        v-model="client_choose_dialogVisible"
        show-close="false"
        title="选择客户"
        width="30%"
    >
      <template #default>
        <el-card style="margin: 20px">
          <el-row :gutter="20">
            <el-col :span="1.8">
              <el-button
                  icon="Plus"
                  size="large"
                  color="#626aef"
                  :dark="isDark"
                  plain
                  @click="client_add_dialogVisible = true"
              >添加</el-button
              >
            </el-col>
            <el-col :span="8">
              <!-- 搜索与添加区域 -->
              <el-input placeholder="请输入内容" size="large">
                <template #append>
                  <el-button icon="Search"  />
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-table
                :data="
            ClientData.slice(
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
              <el-table-column prop="name" label="客户名称" width="180" />
              <el-table-column prop="manager" label="所在区域" width="180" />
              <el-table-column prop="contral_class" label="行业" width="300" />
              <el-table-column prop="jingdu" label="客户地址" width="300" />
              <el-table-column prop="jingdu" label="规模" width="300" />
              <el-table-column prop="jingdu" label="主要联系人" width="300" />
              <el-table-column prop="jingdu" label="联系方式" width="300" />
              <el-table-column label="操作">
                <template #default>
                  <el-button
                      type="primary"
                      text
                      bg
                  >选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row style="margin-top: 20px; text-align: center">
            <el-col>
              <el-pagination
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="ClientData.length"
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
      </template>
    </el-dialog>
      <el-dialog
        v-model="client_add_dialogVisible"
        show-close="false"
        title="客户新增"
        width="30%"
    >
      <template #default>
        <el-form
            ref="clientFormRef"
            :model="clientForm"
            :label-position="right"
            label-width="100px"
            :rules="rules"
        >
          <el-form-item label="客户名称" prop="client_name">
            <el-input
                v-model="clientForm.client_name"
                :placeholder="请输入客户名称"
            />
          </el-form-item>
          <el-form-item label="客户编码" prop="client_code">
            <el-input
                v-model="clientForm.client_code"
                :placeholder="请输入客户名称"
            />
          </el-form-item>
          <el-form-item label="行业" prop="client_industry">
            <el-input
                v-model="clientForm.client_industry"
                :placeholder="请输入客户行业"
            />
          </el-form-item>
          <el-form-item label="位置" prop="client_location">
            <el-input
                v-model="clientForm.client_location"
                :placeholder="请输入客户位置"
            />
          </el-form-item>
          <el-form-item label="所属区域" prop="client_area">
            <el-input
                v-model="clientForm.client_area"
                :placeholder="请输入所属区域"
            />
          </el-form-item>
          <el-form-item label="行业" prop="client_industry">
            <el-input
                v-model="clientForm.client_industry"
                :placeholder="请输入客户行业"
            />
          </el-form-item>
          <el-form-item label="规模" prop="client_scale">
            <el-input
                v-model="clientForm.client_scale"
                :placeholder="请输入客户规模"
            />
          </el-form-item>
          <el-form-item label="联系人" prop="client_linkman">
            <el-input
                v-model="clientForm.client_linkman"
                :placeholder="请输入联系人"
            />
          </el-form-item>
          <el-form-item label="联系方式" prop="client_linkway">
            <el-input
                v-model="clientForm.client_linkway"
                :placeholder="请输入联系方式"
            />
          </el-form-item>

        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="client_add_dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="add()">提交 </el-button>
        </span>
      </template>
    </el-dialog>

<!--主表单，系列列表界面-->
    <el-dialog
        v-model="dialogVisible"
        show-close="false"
        title="新增系列列表"
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
          <el-form-item label="系列名称" prop="project_name">
            <el-input
                v-model="newInfoForm.project_name"
                placeholder="请输入系列名称"
            />
          </el-form-item>

          <el-form-item label="系列负责人" prop="project_managerId">
            <el-input
                v-model="newInfoForm.project_managerId"
                placeholder="请输入系列负责人"
            />
          </el-form-item>

          <el-form-item label="销售人员" prop="project_salemanId">
            <el-input
                v-model="newInfoForm.project_salemanId"
                placeholder="请输入销售人员"
            />
          </el-form-item>

          <el-form-item label="系列管控类型">
            <el-select v-model="newInfoForm.project_controlType" placeholder="请选择系列管控类型">
              <el-option label="供应商管控" value="供应商管控" @click="supplier_choose = true ,client_choose = false"/>
              <el-option label="客户管控" value="客户管控" @click="client_choose = true,supplier_choose = false"/>
              <el-option label="内部项目" value="内部项目" @click="client_choose = false,supplier_choose = false"/>
            </el-select>
          </el-form-item>

          <el-form-item label="供应商选择" prop="supplier_choose" v-show="supplier_choose">
            <el-input
                @click="choose_Supplier"
                v-model="newInfoForm.supplierId"
                placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="客户选择" prop="client_choose" v-show="client_choose">
            <el-input
                @click="choose_Client"
                v-model="newInfoForm.clientId"
                placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="系列类型" prop="project_projectTypeId">
            <el-input
                v-model="newInfoForm.project_projectTypeId"
                placeholder="请输入系列类型"
            />
          </el-form-item>

          <el-form-item label="系列积分" prop="project_score">
            <el-input
                v-model="newInfoForm.project_score"
                placeholder="请输入系列积分"
            />
          </el-form-item>

          <el-form-item label="系列工时" prop="project_time">
            <el-input
                v-model="newInfoForm.project_time"
                placeholder="请输入系列工时"
            />
          </el-form-item>

          <el-form-item label="系列组成员" prop="project_personIdlist">
            <el-input
                v-model="newInfoForm.project_personIdList"
                placeholder="请输入系列组成员"
            />
          </el-form-item>

          <el-form-item label="系列目标" prop="project_target">
            <el-input
                v-model="newInfoForm.project_target"
                placeholder="请输入系列目标"
            />
          </el-form-item>

          <el-form-item label="系列预估/万元" prop="project_estimates">
            <el-input
                v-model="newInfoForm.project_estimates"
                placeholder="请输入系列预估"
            />
          </el-form-item>

          <el-form-item label="系列收益/万元" prop="project_benefit">
            <el-input
                v-model="newInfoForm.project_benefit"
                placeholder="请输入系列收益/万元"
            />
          </el-form-item>

          <el-form-item label="客户收益/万元" prop="project_clientBenefit">
            <el-input
                v-model="newInfoForm.project_clientBenefit"
                placeholder="请输入客户收益/万元"
            />
          </el-form-item>

          <el-form-item label="可持续性" prop="project_sustainability">
            <el-input
                v-model="newInfoForm.project_sustainability"
                placeholder="请输入可持续性"
            />
          </el-form-item>

          <el-form-item label="预计收入" prop="project_profit">
            <el-input
                v-model="newInfoForm.project_profit"
                placeholder="请输入预计收入"
            />
          </el-form-item>

          <el-form-item label="预计支出" prop="project_budget">
            <el-input
                v-model="newInfoForm.project_budget"
                placeholder="请输入预计支出"
            />
          </el-form-item>

            <el-form-item label="系列评估" prop="project_evaluation">
              <el-input
                  v-model="newInfoForm.project_evaluation"
                  placeholder="请输入系列评估"
              />
            </el-form-item>

          <el-form-item label="系列时间" prop="project_startAndEndTime">
            <el-date-picker
                v-model="newInfoForm.project_startAndEndTime"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :size="size"
            />
          </el-form-item>

          <el-form-item label="系列介绍" prop="project_description">
            <el-input
                v-model="newInfoForm.project_description"
                placeholder="请输入系列介绍"
            />
          </el-form-item>

          <el-form-item label="系列附件" prop="">
            <el-upload
                v-model:file-list="project"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="3"
                :on-exceed="handleExceed"
            >
              <el-button type="primary">Click to upload</el-button>
            </el-upload>
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

          <el-table-column prop="name" label="系列名称" width="180" />
          <el-table-column prop="managerId" label="系列负责人" width="180" />
          <el-table-column prop="controlType" label="系列管控类型" width="300" />
          <el-table-column prop="estimates" label="系列预估" width="300" />
          <el-table-column prop="projectTypeId" label="系列类型" width="300" />
          <el-table-column prop="description" label="项目描述" width="300" />
          <el-table-column prop="target" label="系列目标" width="300" />
          <el-table-column prop="estimates" label="系列预估/万元" width="300" />
          <el-table-column prop="budget" label="预计支出/万元" width="300" />
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
                  @click="handleDelete(scope.row)"
                  text
                  bg
              >Delete</el-button>
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

import { ElMessage, ElMessageBox } from 'element-plus'

import axios from 'axios'

export default {
  name: "xiLieLiebiao",
  components:{

  },
  created() {
    this.search()
  },
  data() {
    // 数据绑定
    return {
      dialogVisible: false, // 用于控制新增按钮dialog的弹出
      dialogVisibleOfModify: false, // 控制修改按钮的dialog弹出
      formLabelWidth: "140px",

      supplier_choose:false,
      client_choose:false,
      supplier_choose_dialogVisible:false,
      client_choose_dialogVisible:false,
      supplier_add_dialogVisible:false,
      client_add_dialogVisible:false,

      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      //表单数据
      newInfoForm: {
        project_name: "",
        project_managerId: "",
        project_salemanId: "",
        project_controlType: "",
        project_projectTypeId: "",
        project_score: "",
        project_time: "",
        project_target: "",
        project_estimates: "",
        project_benefit: "",
        project_clientBenefit: "",
        project_sustainability: "",
        project_profit: "",
        project_budget: "",
        project_evaluation: "",
        project_startAndEndTime: "",
        project_description: "",
        project_clientId: "",
        project_supplierId: "",
        project_personIdList: "",

  },
      //系列列表数据
      tableData: [],
      //供应商数据
      SupplierData: [],
      //客户数据
      ClientData: [],
      supplierForm:{},
      clientForm:{

      },
    };
  },

  mounted() {
  },

  methods: {
    //请求所有供应商
    search_Supplier() {
      axios({
        url: "/management/supplier",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status==200) {
          this.SupplierData = resp.data.data;
        }else{
          this.$message.error('供应商获取失败')
        }
      })
    },

    //请求所有客户
    search_Client(){
      axios({
        url: "record/client",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.ClientData = resp.data.data;
        } else {
          this.$message.error("获取员工失败！");
        }
      })
    },

    //选择供应商
    choose_Supplier(){
      this.supplier_choose_dialogVisible = true
      this.search_Supplier();
    },

    //选择客户
    choose_Client(){
      this.client_choose_dialogVisible = true;
      this.search_Client();
    },

    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },

    p(s) {
      return s < 10 ? '0' + s : s
    },
    //添加系列
    add() {
      let d1 = this.newInfoForm.project_startAndEndTime[0]
      let d2 = this.newInfoForm.project_startAndEndTime[1]
      const startDate = d1.getFullYear() + '-' + this.p((d1.getMonth() + 1)) + '-' + this.p(d1.getDate())
      const endDate = d2.getFullYear() + '-' + this.p((d2.getMonth() + 1)) + '-' + this.p(d2.getDate())
      console.log(this.newInfoForm.project_controlClass)
      axios({
        url: "/project/series",
        method: "POST",
        data: {
          name: this.newInfoForm.project_name,
          managerId: this.newInfoForm.project_managerId,
          salemanId: this.newInfoForm.project_salemanId,
          controlType: this.newInfoForm.project_controlType,
          projectTypeId: this.newInfoForm.project_projectTypeId,
          score:this.newInfoForm.project_score,
          time:this.newInfoForm.project_time,
          target:this.newInfoForm.project_target,
          estimates:this.newInfoForm.project_estimates,
          projectBenefit:this.newInfoForm.project_benefit,
          clientBenefit:this.newInfoForm.project_clientBenefit,
          sustainability:this.newInfoForm.project_sustainability,
          profit:this.newInfoForm.project_profit,
          budget:this.newInfoForm.project_budget,
          evaluation:this.newInfoForm.project_evaluation,
          startTime:startDate,
          endTime:endDate,
          description:this.newInfoForm.project_description,
          clientId:this.newInfoForm.project_clientId,
          supplierId:this.newInfoForm.project_supplierId,

        },
      }).then((resp) => {
        if (resp.data.status==200) {
          this.$message.success('添加成功')
          this.search()
        }else{
          this.$message.error('添加失败')
        }
      })
      this.dialogVisible = false;
    },

    search() {
      console.log("点击查询按钮")
      axios({
        url: "/project/series",
        method: "GET",
      }).then((resp) => {
        // console.log("打印resp.data.status"+resp.data.status)
        if (resp.data.status==200) {
          // this.$router.push("/dashboard");
          this.tableData = resp.data.data
          // this.$message.success('查询成功')
        }else{
          this.$message.error('查询失败')
        }
        this.dialogVisible = false;
      })
    },
    handleEdit() {

    },
    handleDelete(tabledata) {
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

            axios({
              url: "/project/series?id=" + tabledata.id,
              method: "DELETE",
            }).then((resp) => {
              // console.log("打印resp.data.status"+resp.data.status)
              if (resp.data.status==200) {
                // this.$router.push("/dashboard");
                this.$message.success('删除成功')
                this.search()
              }else{
                this.$message.error('删除失败')
              }
              this.dialogVisible = false;
            })

            // ElMessage({
            //   type: 'success',
            //   message: '删除成功',
            // })
          })
          .catch(() => {
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
