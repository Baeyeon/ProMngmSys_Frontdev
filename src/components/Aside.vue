<template>
  <div>
    <el-menu
      :default-active="this.activePath"
      :collapse="isiscollapse"
      class="el-menu-vertical-demo"
      router
      active-text-color="#409Eff"
      style="min-height: calc(100vh - 51px)"
    >
      <!-- 图标在这里选：https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88 -->
      <el-menu-item index="/PersonalPortal" id="guide-shouye" >
        <el-icon><house /></el-icon>
        <span>个人门户</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><list /></el-icon>
          <span>基础档案</span>
        </template>
        <el-menu-item index="/Customer_Management" @click="click_BasicDoc">
          <el-icon><tickets /></el-icon>客户管理</el-menu-item
        >
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><list /></el-icon>
          <span>机构管理</span>
        </template>
<!--        <el-menu-item index="/TaskList">-->
<!--          <el-icon><tickets /></el-icon>机构管理</el-menu-item-->
<!--        >-->
        <el-menu-item index="/departmentManagement">
          <el-icon><circle-plus /></el-icon>部门管理</el-menu-item
        >
        <el-menu-item index="/Personnel_Management">
          <el-icon><Clock /></el-icon>人员管理</el-menu-item
        >
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <el-icon><list /></el-icon>
          <span>项目管理</span>
        </template>
        <el-sub-menu index="4-1">
          <template #title><el-icon><circle-plus /></el-icon>基础数据</template>
          <el-menu-item index="/Supplier_Classification_Management">
            <el-icon><circle-plus /></el-icon>供应商分类管理</el-menu-item
          >
          <el-menu-item index="/Supplier_Management">
            <el-icon><circle-plus /></el-icon>供应商管理</el-menu-item
          >
          <el-menu-item index="/Payment_method_management">
            <el-icon><circle-plus /></el-icon>支付方式管理</el-menu-item
          >
          <el-menu-item index="/Project_type_management">
            <el-icon><circle-plus /></el-icon>项目类型管理</el-menu-item
          >

           <el-menu-item index="/Project_Administrator_Configuration">
            <el-icon><circle-plus /></el-icon>项目管理员配置</el-menu-item
          >

        </el-sub-menu>
        <el-menu-item index="/project_list">
          <el-icon><circle-plus /></el-icon>项目列表</el-menu-item
        >
        <el-menu-item index="/sequence_list">
          <el-icon><Clock /></el-icon>系列列表</el-menu-item
        >
        <el-menu-item index="/projectDisplayBoard">
          <el-icon><circle-plus /></el-icon>项目列表看板</el-menu-item
        >
        <el-menu-item index="/projectSeriesDisplayBoard">
          <el-icon><circle-plus /></el-icon>项目系列看板</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isiscollapse"],
  data() {
    return {
      activePath: this.$route.path,
    };
  },
  methods: {
    clickButton(){
      this.$router.push('/PersonalPortal')
    }
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.toggle-button {
  background-color: #c3c4c7;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
</style>
