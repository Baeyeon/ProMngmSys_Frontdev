<template>
  <div>
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
                  <el-button icon="Search" @click="search()" />
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
                  <el-button icon="Search" @click="search()" />
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
    <el-dialog
        v-model="dialogVisible"
        show-close="false"
        title="新增项目列表"
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
          <el-form-item label="项目名称" prop="project_name">
            <el-input
                v-model="newInfoForm.project_name"
                placeholder="请输入项目名称"
            />
          </el-form-item>
          <el-form-item label="项目负责人" prop="project_manager">
            <el-input
                v-model="newInfoForm.project_manager"
                placeholder="请输入项目负责人"
            />
          </el-form-item>
          <el-form-item label="项目管控类型">
            <el-select v-model="newInfoForm.project_controlClass" placeholder="请选择项目管控类型">
              <el-option label="供应商管控" value="供应商管控" @click="supplier_choose = true ,client_choose = false"/>
              <el-option label="客户管控" value="客户管控"  @click="client_choose = true,supplier_choose = false"/>
              <el-option label="内部项目" value="内部项目" @click="client_choose = false,supplier_choose = false"/>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商选择" prop="supplier_choose" v-show="supplier_choose">
            <el-input
                    @click="choose_Supplier"
                v-model="newInfoForm.supplier_choose"
                placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="客户选择" prop="client_choose" v-show="client_choose">
          <el-input
                  @click="choose_Client"
                  v-model="newInfoForm.client_choose"
              placeholder="请输入"
          />
          </el-form-item>
          <el-form-item label="项目类型" prop="project_class">
            <el-input
                v-model="newInfoForm.project_class"
                placeholder="请输入项目类型"
            />
          </el-form-item>
          <el-form-item label="项目工时" prop="project_hour">
            <el-input
                v-model="newInfoForm.project_hour"
                placeholder="请输入项目工时"
            />
          </el-form-item>
          <el-form-item label="项目目标" prop="project_goal">
            <el-input
                v-model="newInfoForm.project_goal"
                placeholder="请输入项目目标"
            />
          </el-form-item>
          <el-form-item label="项目收益/万元" prop="project_earn">
            <el-input
                v-model="newInfoForm.project_earn"
                placeholder="请输入项目收益/万元"
            />
          </el-form-item>
          <el-form-item label="可持续性" prop="project_substain">
            <el-input
                v-model="newInfoForm.project_substain"
                placeholder="请输入可持续性"
            />
          </el-form-item>
          <el-form-item label="预计支出" prop="project_outcome">
            <el-input
                v-model="newInfoForm.project_outcome"
                placeholder="请输入预计支出"
            />
          </el-form-item>
          <el-form-item label="项目时间" prop="project_time">
            <el-date-picker
                v-model="newInfoForm.project_time"
                type="daterange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :size="size"
            />
          </el-form-item>
          <el-form-item label="项目介绍" prop="project_intro">
            <el-input
                v-model="newInfoForm.project_intro"
                :rows="2"
                type="textarea"
                placeholder="请输入项目介绍"
            />
          </el-form-item>

          <el-form-item label="销售人员" prop="project_sellman">
            <el-input
                v-model="newInfoForm.project_sellman"
                placeholder="请输入销售人员"
            />
          </el-form-item>
          <el-form-item label="项目系列" prop="project_xilie">
            <el-select v-model="newInfoForm.project_xilie" placeholder="请选择项目系列">
              <el-option label="ww" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目积分" prop="project_jifen">
            <el-input
                v-model="newInfoForm.project_jifen"
                placeholder="请输入项目积分"
            />
          </el-form-item>
          <el-form-item label="项目组成员" prop="project_people">
            <el-input
                v-model="newInfoForm.project_people"
                placeholder="请输入项目组成员"
            />
          </el-form-item>
          <el-form-item label="项目预估/万元" prop="project_yugu">
            <el-input
                v-model="newInfoForm.project_yugu"
                placeholder="请输入项目预估"
            />
          </el-form-item>
          <el-form-item label="客户收益/万元" prop="project_consumerIncome">
            <el-input
                v-model="newInfoForm.project_consumerIncome"
                placeholder="请输入客户收益/万元"
            />
          </el-form-item>
          <el-form-item label="预计收入" prop="project_yuguIncome">
            <el-input
                v-model="newInfoForm.project_yuguIncome"
                placeholder="请输入预计收入"
            />
          </el-form-item>
          <el-form-item label="项目评估" prop="project_assess">
            <el-input
                v-model="newInfoForm.project_assess"
                placeholder="请输入项目评估"
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
          <el-table-column prop="name" label="项目名称" width="180" />
          <el-table-column prop="manager" label="项目负责人" width="180" />
          <el-table-column prop="contral_class" label="项目管控类型" width="300" />
          <el-table-column prop="jingdu" label="项目进度" width="300" />
          <el-table-column prop="class" label="项目类型" width="300" />
          <el-table-column prop="people" label="项目组成员" width="300" />
          <el-table-column prop="target" label="项目目标" width="300" />
          <el-table-column prop="yugu" label="项目预估/万元" width="300" />
          <el-table-column prop="income" label="项目收益/万元" width="300" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="primary"
                  text
                  bg
              >详情</el-button
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

export default {
  components: {},

  data() {
    // 数据绑定
    return {
      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增的表单
      supplier_choose:false,
      client_choose:false,
      supplier_choose_dialogVisible:false,
      client_choose_dialogVisible:false,
      supplier_add_dialogVisible:false,
      client_add_dialogVisible:false,
      //表单数据
      newInfoForm: {
       project_name: "",
        project_manager: "",
        project_controlClass: "",
        project_class: "",
        project_hour: "",
        project_goal: "",
        project_earn: "",
        project_substain: "",
        project_outcome: "",
        project_time: "",
        project_intro: "",
        project_sellman: "",
        project_xilie: "",
        project_jifen: "",
        project_people: "",
        project_yugu: "",
        project_consumerIncome: "",
        project_yuguIncome: "",
        project_assess: "",
      },
      supplierForm:{

      },
      clientForm:{

      },
      //项目列表数据
      tableData:[],
      //供应商数据
      SupplierData: [],
      //客户数据
      ClientData: [],
    };
  },

  mounted() {
    this.getList();
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

    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },

    //获取项目列表
    getList(){
      axios({
        url: "/project/project",
        method: "GET",
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
        } else {
          this.$message.error("获取项目列表失败！");
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

    p(s) {
      return s < 10 ? '0' + s : s
    },
    //添加项目
    add() {
      let d1 = this.newInfoForm.project_time[0]
      let d2 = this.newInfoForm.project_time[1]
      const startDate = d1.getFullYear() + '-' + this.p((d1.getMonth() + 1)) + '-' + this.p(d1.getDate())
      const endDate = d2.getFullYear() + '-' + this.p((d2.getMonth() + 1)) + '-' + this.p(d2.getDate())
      console.log(this.newInfoForm.project_controlClass)
      axios({
        url: "/project/project",
        method: "POST",
        data: {
          name: this.newInfoForm.project_name,
          managerId: this.newInfoForm.project_manager,
          salemanId: this.newInfoForm.project_sellman,
          controlType:this.newInfoForm.project_controlClass,
          seriesId:this.newInfoForm.project_xilie,
          projectTypeId:this.newInfoForm.project_class,
          score:this.newInfoForm.project_jifen,
          time:this.newInfoForm.project_hour,
          target:this.newInfoForm.project_goal,
          estimates:this.newInfoForm.project_yugu,
          projectBenefit:this.newInfoForm.project_yuguIncome,
          clientBenefit: this.newInfoForm.project_consumerIncome,
          sustainability:this.newInfoForm.project_substain,
          profit:this.newInfoForm.project_earn,
          budget:this.newInfoForm.project_outcome,
          evaluation:this.newInfoForm.project_assess,
          startTime:startDate,
          endTime:endDate,
          description:this.newInfoForm.project_intro,
          clientId:this.newInfoForm.project_clientId,
          supplierId:this.newInfoForm.project_supplierId,

        }
      }).then((resp) => {
        if (resp.data.status == 200) {
          this.tableData = resp.data.data;
        } else {
          this.$message.error("添加项目列表失败！");
        }
      })
      this.getList();
      this.dialogVisible = false;

    },

    //
    search() {

    },

    //
    handleEdit(index, row) {
      alert("index:" + index + "，" + "row" + row + "!");
    },

    //
    handleDelete(index, row) {
      alert("index:" + index + "，" + "row" + row + "!");
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
