<template>
  <div class="not-found">
    <el-button id="return_button" size="large" type="warning" round @click="returnPage">
      <label style="font-size: 25px; ">返&nbsp;回&nbsp;首&nbsp;页</label>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "notfound",
  methods: {
    returnPage() {
      this.$router.push('/')
    }
  },
}
</script>


<style scoped>
.not-found {
  background: url("../assets/404.gif");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>>