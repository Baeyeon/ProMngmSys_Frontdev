<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <img :src="bgimage" alt="" />
    </div>
    <div class="login-box">
      <div class="login-form">
        <img :src="ava" alt="" class="avatar" />
        <Motion>
          <h2>项目管理系统</h2>
        </Motion>

        <el-form ref="ruleFormRef" :model="ruleForm" size="large">
          <Motion :delay="100">
            <el-form-item prop="username">
              <el-input
                clearable
                :input-style="{ 'user-select': 'none' }"
                v-model="ruleForm.username"
                :placeholder="useTologin"
                prefix-icon="User"
              >
                <!-- <template #prefix>
                  <el-icon class="el-input__icon"><Key /></el-icon>
                </template> -->
              </el-input>
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item prop="password">
              <el-input
                clearable
                :input-style="{ 'user-select': 'none' }"
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
                prefix-icon="Lock"
              />
            </el-form-item>
          </Motion>

          <!-- <Motion :delay="200">
            <el-form-item prop="verifyCode">
              <el-input
                clearable
                :input-style="{ 'user-select': 'none' }"
                v-model="ruleForm.verifyCode"
                placeholder="验证码"
              >
                <template v-slot:append>
                  <ReImageVerify v-model:code="imgCode" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>  -->

          <Motion :delay="250">
            <el-form-item>
              <div class="w-full h-20px flex justify-between items-center">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <el-button
                  type="text"
                  @click="this.$router.push('/undo')"
                >
                  忘记密码?</el-button
                >
              </div>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                round
                @click="goLogin()"
              >
                登录
              </el-button>
            </el-form-item>
          </Motion>

          <Motion :delay="350">
            <el-form-item>
              <el-divider>
                <p class="text-gray-500 text-xs">第三方登录</p>
              </el-divider>
              <div class="w-full flex justify-evenly">
                <span :title="`微信登陆`">
                  <i
                    class="
                      iconfont
                      icon-weixin
                      cursor-pointer
                      text-gray-500
                      hover:text-blue-400
                    "
                  ></i>
                </span>
                <span :title="`支付宝登陆`">
                  <i
                    class="
                      iconfont
                      icon-zhifubao
                      cursor-pointer
                      text-gray-500
                      hover:text-blue-400
                    "
                  ></i>
                </span>
                <span :title="`QQ登陆`">
                  <i
                    class="
                      iconfont
                      icon-QQ
                      cursor-pointer
                      text-gray-500
                      hover:text-blue-400
                    "
                  ></i>
                </span>
                <span :title="`微博登陆`">
                  <i
                    class="
                      iconfont
                      icon-weibo
                      cursor-pointer
                      text-gray-500
                      hover:text-blue-400
                    "
                  ></i>
                </span>
              </div>
            </el-form-item>
          </Motion>
        </el-form>
        <!-- 手机号登陆 -->
        <!-- <phone v-if="currentPage === 1" /> -->
        <!-- 二维码登陆 -->
        <!-- <qrCode v-if="currentPage === 2" /> -->
        <!-- 注册 -->
        <!-- <regist v-if="currentPage === 3"/> -->
        <!-- 忘记密码 -->
        <!-- <update v-if="currentPage === 4" /> -->
      </div>
    </div>
  </div>
</template>


<script>
import { ElMessage } from "element-plus";
import regist from "@/components/Register.vue";
import axios from "axios";
import Motion from "@/view/utils/motion.ts";

export default {
  name: "Login",
  components: {
    regist,
    Motion,
  },

  data() {
    return {
      bg: require("@/assets/login/bg.png"),
      bgimage: require("@/assets/login/img-1.svg"), //这里可以换成img-1.svg
      ava: require("@/assets/login/avatar.svg"),

      //currentPage: 0, //当前页面，这个后期可以用store存起来，弃用了
      checked: false,
      useTologin: "账号/手机号",
      ruleForm: {
        username: "",
        password: "",
      },

      thirdParty: [
        {
          title: "微信",
          icon: "wechat",
        },
        {
          title: "支付宝",
          icon: "alipay",
        },
        {
          title: "QQ",
          icon: "qq",
        },
        {
          title: "微博",
          icon: "weibo",
        },
      ],
    };
  },

  mounted() {
    this.ruleForm.username = window.localStorage.getItem("userId");
    let pwdAccess = window.localStorage.getItem("pwdAccess");
    if (pwdAccess) {
      const data = JSON.parse(pwdAccess);
      this.checked = data.remember;
      this.ruleForm.password = data.password;
    }
  },

  methods: {
    goLogin() {
      if (this.ruleForm.username === "" || this.ruleForm.password === "") {
        ElMessage({ //弹出信息提示框
          showClose: true,
          message: "账号或密码为空",
          type: "warning",
        });
      } else {
        // axios({
        //     url: "/api/core/login",
        //     method: "POST",
        //     data: {
        //       // label: label,
        //       account: this.ruleForm.username,
        //       password: this.ruleForm.password,
        //     },
        //   }).then((resp) => {
        //     if (resp.data.label) {
        //       // 登录成功
        //       window.sessionStorage.setItem("token", "true");
        //       window.sessionStorage.setItem("userId", resp.data.account);
        //       // 保存这次登录的用户账号
        //       window.localStorage.setItem("userId", resp.data.account);
        //       // 根据checked判断是否记住密码
        //       if (this.checked) {
        //         const pwdAccess = {
        //           remember: this.checked,
        //           password: this.ruleForm.password,
        //         };
        //         window.localStorage.setItem("pwdAccess", JSON.stringify(pwdAccess));
        //       } else {
        //         const pwdAccess = {
        //           remember: this.checked,
        //           password: "",
        //         };
        //         window.localStorage.setItem("pwdAccess", JSON.stringify(pwdAccess));
        //       }
        //       // 跳转到主页
        //       this.$router.push("/MainPage");
        //       ElMessage({
        //         showClose: true,
        //         message: resp.data.result,
        //         type: "success",
        //       });
        //     } else {
        //       // 登录失败
        //       ElMessage({
        //         showClose: true,
        //         message: resp.data.result,
        //         type: "error",
        //       });
        //     }
        // this.$router.push("/dashboard");
        // })
        this.$router.push("/PersonalPortal");
      }

      //正规的登陆方法，暂时注释掉
      // let label;
      // if (this.ruleForm.username === "" || this.ruleForm.password === "") {
      //   ElMessage({
      //     showClose: true,
      //     message: "账号或密码为空",
      //     type: "warning",
      //   });
      // } else {
      //   if (this.$data.useID) {
      //     label = 0;
      //   } else {
      //     label = 1;
      //   }
      // };
      // axios({
      //   url: "/api/core/login",
      //   method: "POST",
      //   data: {
      //     label: label,
      //     account: this.ruleForm.username,
      //     password: this.ruleForm.password,
      //   },
      // }).then((resp) => {
      //   if (resp.data.label) {
      //     // 登录成功
      //     window.sessionStorage.setItem("token", "true");
      //     window.sessionStorage.setItem("userId", resp.data.account);
      //     // 保存这次登录的用户账号
      //     window.localStorage.setItem("userId", resp.data.account);
      //     // 根据checked判断是否记住密码
      //     if (this.checked) {
      //       const pwdAccess = {
      //         remember: this.checked,
      //         password: this.ruleForm.password,
      //       };
      //       window.localStorage.setItem("pwdAccess", JSON.stringify(pwdAccess));
      //     } else {
      //       const pwdAccess = {
      //         remember: this.checked,
      //         password: "",
      //       };
      //       window.localStorage.setItem("pwdAccess", JSON.stringify(pwdAccess));
      //     }
      //     // 跳转到主页
      //     this.$router.push("/MainPage");
      //     ElMessage({
      //       showClose: true,
      //       message: resp.data.result,
      //       type: "success",
      //     });
      //   } else {
      //     // 登录失败
      //     ElMessage({
      //       showClose: true,
      //       message: resp.data.result,
      //       type: "error",
      //     });
      //   }
      // });
    },
  },

  computed: {
  },
};
</script>


<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.login-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}

.login-form {
  width: 360px;
}

.avatar {
  width: 350px;
  height: 80px;
}

.login-form h2 {
  text-transform: uppercase;
  margin: 15px 0;
  color: rgb(126, 118, 118);
  font: bold 200% Consolas, Monaco, monospace;
}

@media screen and (max-width: 1180px) {
  .login-container {
    grid-gap: 9rem;
  }

  .login-form {
    width: 290px;
  }

  .login-form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 360px;
  }

  .avatar {
    width: 280px;
    height: 80px;
  }
}

@media screen and (max-width: 968px) {
  .wave {
    display: none;
  }

  .img {
    display: none;
  }

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-box {
    justify-content: center;
  }
}
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
