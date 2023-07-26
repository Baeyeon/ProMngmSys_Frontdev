<template>
  <div class="dark">
    <!-- 头部 -->
    <Header :title="platformName" :user="userInfo" ></Header>

    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <Aside id="guide-aside" :isiscollapse="isCollapse"></Aside>

      <!--      内容区域-->
      <router-view style="flex: 1" id="guide-main"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside.vue";
//引导页
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from '@/view/steps';
// import { Edit, Picture, UploadFilled } from "@element-plus/icons-vue";
// import { ElMessage } from "element-plus";
// import { Vue3 } from "@/view/Vue3.vue";//注意导入组件时不要带{}！

export default {
  components: {
    Header,
    Aside,
  },

  data() {
    // 数据绑定
    return {
      isCollapse: false,
      //asideisCollapse:false,
      platformName: "项目管理系统",
      userInfo: {
        nickName: "用户",
        //nickName: "用户" + window.sessionStorage.getItem("userId"),
        avatar: require("@/assets/user_avatar.jpg"),
        driver: null,
      },
    };
  },

  mounted() {
    this.driver = new Driver({
      opacity: 0.6,
      animate: true,
      doneBtnText: "我知道了",
      closeBtnText: "跳过", //  关闭按钮文案
      nextBtnText: "下一步", // 下一步的按钮文案
      prevBtnText: "上一步", // 上一步的按钮文案
      keyboardControl: true, // 允许通过键盘控制（退出关闭，箭头键移动）
    });
    console.log(this.driver);
  },

  methods: {
    toggleFullscreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    },
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    },
    asideCollapse(){
      this.$data.isCollapse = !this.$data.isCollapse;
    },
    fatherMethod() {
      console.log('测试子组件调用父组件方法');
      console.log('测试over');
    }
  },
  watch: {},
};
</script>


<style lang="less">
</style>
