<template>
  <div>
    <el-dialog
        v-model="dialogVisible"
        show-close="false"
        title="新增支付方式"
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
          <el-form-item label="付款方式" prop="Pay_method">
            <el-input
                v-model="newInfoForm.Pay_method"
                :placeholder="newInfoForm.Pay_method"
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
          <el-table-column prop="Pay_method" label="付款方式" />
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
export default {
  components: {},

  data() {
    // 数据绑定
    return {
      currentPage: 1, //默认页码为1
      pagesize: 5, //默认一页显示5条
      dialogVisible: false, //是否显示新增的表单
      //表单数据
      newInfoForm: {
        Pay_method:""
      },
      tableData: [
        {
          Pay_method: "method1"
        },
        {
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        },{
          Pay_method: "method1"
        }
      ],
    };
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
      alert("点你妈，还没写");
    },
    search() {
      alert("点你妈，还没写");
    },
    handleEdit(index, row) {
      alert("index:" + index + "，" + "row" + row + "!");
    },
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