<template>
  <!-- <el-dialog
    v-model="dialogVisible"
    show-close="false"
    title="个人中心"
    width="30%"
  >
    <template #default>
      <p style="margin-bottom: 10px">
        个人中心用于修改个人信息（暂时仅限于手机号与密码），原手机号会在输入框中展示而密码处于安全考虑则不会展示。<br />
        想要修改手机号，可直接在输入框中修改；想要修改密码，则需要填写两遍新密码。然后点击“确认修改”即可完成对个人信息的修改。
      </p>
      <el-form
        ref="personalInfoFormRef"
        :model="personalInfoForm"
        :label-position="right"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <span>{{ userId }}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="personalInfoForm.phone"
            :placeholder="personalInfoForm.phone"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="personalInfoForm.newPassword"
            show-password
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="再输一遍" prop="passwordAgain">
          <el-input
            v-model="personalInfoForm.passwordAgain"
            show-password
            placeholder="请再输入一遍新密码"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="this.modifyPersonalInfo()"
          >确认修改
        </el-button>
      </span>
    </template>
  </el-dialog> -->
  <div
    style="
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
    "
    id="guide-header"
  >
    <div
      style="
        width: 50px;
        padding-left: 10px;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
      "
      @click="collapse()"
      id="guide-collapse"
    >
      <el-icon v-if="!coll"><Expand /></el-icon>
      <el-icon v-if="coll"><Fold /></el-icon>
    </div>
    <div
      style="
        width: 200px;
        padding-left: 25px;
        font-weight: bold;
        color: dodgerblue;
        font-size: 20px;
      "
    >
      {{ title }}
    </div>
    <div style="flex: 1"></div>
    <div style="">
      <span>
        <el-button
          text
          bg
          type="primary"
          style="margin-right: 10px"
          @click="yindao()"
        >
          引导页
        </el-button>
      </span>
      <span id="guide-dark">
        <el-switch
          v-model="dark"
          size="large"
          inline-prompt
          active-text="Pay by month"
          inactive-text="Pay by year"
          :active-icon="Sunny"
          :inactive-icon="Moon"
          @change="changeTheme()"
          style="margin-right: 17px; position: relative"
        />
        <!-- <el-button @click="toggleDark()">
          当前状态是: {{ isDark }}
        </el-button> -->
      </span>
      <span id="guide-screenfull">
        <el-icon
          :size="20"
          style="
            margin-right: 17px;
            cursor: pointer;
            position: relative;
            top: 4.5px;
          "
          @click="toggleFullscreen()"
          ><FullScreen
        /></el-icon>
      </span>
      <el-dropdown id="guide-person" style="margin-right:10px;cursor: pointer;">
        <span class="el-dropdown-link" style="font-size: 16px">
          <el-avatar
            :size="35"
            :src="user.avatar"
            style="position: relative; top: 7px"
          ></el-avatar>
          {{ user.nickName }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item @click="dialogVisible = true"
              >个人中心</el-dropdown-item
            > -->
            <el-dropdown-item @click="openGitee()">项目地址</el-dropdown-item>
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
        <el-icon><CaretBottom /></el-icon>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import { Moon, Sunny } from "@element-plus/icons-vue";
import axios from "axios";
// import { useDark, useToggle } from '@vueuse/core'
// const isDark = useDark()
// const toggleDark = useToggle(isDark)

export default {
  name: "Header",
  components: {
    screenfull,
    // useDark,
    // useToggle,
  },
  props: ["title", "user"],
  data() {
    return {
      //伸缩
      coll:true,
      /* 数据 */
      userId: window.sessionStorage.getItem("userId"),
      oldPhone: "",

      /* 表单组件参数，非最终提交的表单数据 */
      personalInfoForm: {
        phone: "",
        newPassword: "",
        passwordAgain: "",
      },

      /* 组件参数 */
      dark: false,
      dialogVisible: false,

      /* 图标 */
      Moon: Moon,
      Sunny: Sunny,
      //url:require("@/assets/user_avatar.jpg"),
    };
  },

  created() {
    //this.getPersonalInfo();
  },

  methods: {
    //伸缩
    collapse(){
      this.$data.coll = !this.$data.coll;
      this.$parent.asideCollapse();
    },
    /* 获取个人信息 */
    // getPersonalInfo() {
    //   axios({
    //     url: "/api/core/getUserInfo",
    //     method: "POST",
    //     data: {
    //       account: this.userId,
    //     },
    //   }).then((resp) => {
    //     if (resp.data.label) {
    //       this.personalInfoForm.phone = resp.data.info.tele;
    //       this.oldPhone = resp.data.info.tele;
    //       console.log(resp.data);
    //     }
    //   });
    // },

    changeTheme() {
      //这里用了很原始的dom树，不得已之举了属于是
      if (this.dark) {
        document
          .getElementsByClassName("WholePage")[0]
          .setAttribute("class", "WholePage dark");
      } else {
        document
          .getElementsByClassName("WholePage")[0]
          .setAttribute("class", "WholePage");
      }
    },
    toggleFullscreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },

    // 修改个人信息
    // modifyPersonalInfo() {
    //   if (this.personalInfoForm.newPassword == "") {
    //     if (this.personalInfoForm.passwordAgain != "") {
    //       this.$message.error("请输入新的密码");
    //     } else {
    //       if (this.personalInfoForm.phone == this.oldPhone) {
    //         this.$message.warning("注意！您的个人信息没有任何更改。");
    //       } else {
    //         // 只修改了手机号
    //         axios({
    //           url: "/api/core/modifyUserInfo",
    //           method: "POST",
    //           data: {
    //             account: this.userId,
    //             phone: this.personalInfoForm.phone,
    //             label: 0,
    //           },
    //         }).then((resp) => {
    //           if (resp.data.label) {
    //             this.$message.success(resp.data.result);
    //             this.dialogVisible = false;
    //             this.getPersonalInfo();
    //           } else {
    //             this.$message.error(resp.data.result);
    //           }
    //         });
    //       }
    //     }
    //   } else {
    //     // 修改了密码
    //     if (this.personalInfoForm.passwordAgain == "") {
    //       this.$message.error("请再输入一次新密码");
    //     } else {
    //       if (
    //         this.personalInfoForm.newPassword !=
    //         this.personalInfoForm.passwordAgain
    //       ) {
    //         this.$message.error("两次输入的密码不相同，请重试！");
    //       } else {
    //         axios({
    //           url: "/api/core/modifyUserInfo",
    //           method: "POST",
    //           data: {
    //             account: this.userId,
    //             phone: this.personalInfoForm.phone,
    //             newPassword: this.personalInfoForm.newPassword,
    //             label: 1,
    //           },
    //         }).then((resp) => {
    //           if (resp.data.label) {
    //             this.$message.success(resp.data.result);
    //             this.dialogVisible = false;
    //             this.getPersonalInfo();
    //           } else {
    //             this.$message.error(resp.data.result);
    //           }
    //         });
    //       }
    //     }
    //   }
    // },

    // 打开项目地址
    openGitee() {
      window.open(
        // "https://www.postcrossing.com/",
        "https://gitee.com/Baeyeon_Lee/d-solv",
        "_blank"
      );
    },

    // 引导使用
    yindao() {
      this.$parent.guide();
    },
  },
  computed: {
    // isDark(){
    //   return useDark();
    // }
  },
};
</script>

<style scoped>
</style>
