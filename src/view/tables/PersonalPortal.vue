<template>
  <div class="main-left">
    <div>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="always">
            <div class="demo-type" style="height: 65px;">
              <span>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              </span>
              <span>
                <div style="margin-left:20px">
                  <div style="font:large bold">Hi,测试账号</div>

                  <div style="font:10px;margin-top: 10px">普通用户</div>
                </div>
              </span>
            </div>

          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card shadow="hover">
            <el-row style="height:33%">
              <el-col :span="4">任务状态</el-col>
              <el-col :span="5">进行中： 4</el-col>
              <el-col :span="7">已完成： 0</el-col>
              <el-col :span="7">已超期： 3</el-col>
            </el-row>
            <el-row style="height:33%">
              <el-col :span="4">任务状态</el-col>
              <el-col :span="5">0/4</el-col>
              <el-col :span="14">
                <el-progress :percentage="50" />
              </el-col>
            </el-row>
            <el-row style="height:33%">
              <el-col :span="4">本月积分</el-col>
              <el-col :span="5">0/0</el-col>
              <el-col :span="14">
                <el-progress :percentage="50" />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs style="margin-top:20px" type="border-card" class="demo-tabs" stretch="true">
      <el-tab-pane label="日工作看板">
        <el-tabs stretch="true">
          <el-tab-pane label="所有">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size:12px">任务名称</span>
                  <span style="font-size:12px">截止时间</span>
                </div>
              </template>
              <div v-for="o in 3" :key="o" class="text item">{{ 'List item ' + o }} </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="紧急重要">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size:12px">任务名称</span>
                  <span style="font-size:12px">截止时间</span>
                </div>
              </template>
              <div v-for="o in 3" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="紧急不重要">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size:12px">任务名称</span>
                  <span style="font-size:12px">截止时间</span>
                </div>
              </template>
              <div v-for="o in 3" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="重要不紧急">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size:12px">任务名称</span>
                  <span style="font-size:12px">截止时间</span>
                </div>
              </template>
              <div v-for="o in 3" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="不重要不紧急">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size:12px">任务名称</span>
                  <span style="font-size:12px">截止时间</span>
                </div>
              </template>
              <div v-for="o in 3" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="审批工作台">
        待添加
      </el-tab-pane>
    </el-tabs>
    <el-card class="box-card" style="margin-top:20px">
      <template #header>
        <div class="card-header">
          <span>经验分享</span>
          <span>
            <el-button class="button" text>新增</el-button>
            <el-button class="button" text>查看全部</el-button>
          </span>

        </div>
      </template>
      <div v-for="o in 2" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </div>
  <div class="main-right">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>悬赏任务</span>
          <el-button class="button" text>查看全部</el-button>
        </div>
      </template>
      <div v-for="o in 1" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>

    <el-card class="box-card">
      <el-calendar>
        <template #dateCell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
      <span>
        <el-button class="button" text>创建日程</el-button>
        <el-button class="button" text>创建会议</el-button>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>消息</span>
        </div>
      </template>
      <div v-for="o in 1" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
.el-calendar-table .el-calendar-day {
  height: 50px;
  font-size: xx-small;
}

.is-selected {
  color: #1989fa;
}


.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-type {
  display: flex;
}

.demo-type>div {
  flex: 1;
  text-align: center;
}

.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card {
  width: 100%;
}

.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}

.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.cell.current .text {
  background: #626aef;
  color: #fff;
}

.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.main-left {
  width: 65%;

  left: 0;
  float: left;
}

.main-right {
  margin-left: 2%;
  width: 30%;
  float: left;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.el-card__body {
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  list-style: none;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  /* color: #303133; */
  padding: 20px;
  padding-bottom: 10px;
}

.el-card mgb20 is-hover-shadow {
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  list-style: none;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  /* background-color: #fff; */
  /* color: #303133; */
  transition: .3s;
  margin-bottom: 10px;
}

.el-progress-bar__outer {
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  list-style: none;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  color: #303133;
  font-size: 12px;
  line-height: 1;
  border-radius: 100px;
  background-color: #ebeef5;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  height: 6px;
}

.el-progress progress el-progress--line {
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  list-style: none;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  color: #303133;
  font-size: 12px;
  position: relative;
  line-height: 1;
  width: 55% !important;
}

element.style {
  width: 500px;
}

.progress {
  width: 55% !important;
}

.el-progress {
  position: relative;
  line-height: 1;
}

.el-card {
  border: 1px solid #ebeef5;
  /* background-color: #fff;
  color: #303133; */
  transition: .3s;
}
</style>
