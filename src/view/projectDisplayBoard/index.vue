<template>
  <div class="container-board">
    <div class="header">
      <p class="title">
        <el-icon color="#158aaf" class="icon"><List /></el-icon
        ><span>项目列表看板</span>
      </p>
    </div>

    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="info" @click="onViewProjectDetail(item.id)">
          <p class="name">
            {{ item.name }}<el-icon><Files /></el-icon>
          </p>
          <p class="time">{{ item.starttime }}-{{ item.endtime }}</p>
        </div>
        <el-icon color="#158aaf" class="icon"><DArrowRight /> </el-icon>

        <div class="step" @click="onViewFlowChart(item)">
          <div
            class="step-item"
            v-for="(step, stepIndex) in item.subFlowList"
            :key="stepIndex"
          >
            <el-icon color="#158aaf" class="icon" v-if="stepIndex > 0"
              ><DArrowRight />
            </el-icon>

            <span> {{ step.name }}</span>
          </div>
        </div>
        <el-button
          type="primary"
          color="#158aaf"
          @click="onViewFlowChart(item)"
          :icon="Search"
          size="large"
          >查看流程详情</el-button
        >
      </div>
    </div>
    <el-drawer v-if="drawer" v-model="drawer" :before-close="onBeforeClose" title="流程图" size="60%">
      <FlowChart :treeData="treeData" />
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import FlowChart from "./components/flowChart.vue";
import { ElLoading } from 'element-plus'
export default {
  components: {
    FlowChart,
  },
  data() {
    return {
      list: [],
      drawer: false,
      treeData: {},
    };
  },
  created() {
    this.getProjectList();
  },
  methods: {
    onBeforeClose(done){
      this.getProjectList();
      done()
    },
    deconstruction(item) {
      // item.forEach(node=>{
      //   if()
      // })
    },
    // 跳转到项目详情
    onViewProjectDetail(id) {
      this.$router.push({
        name: "ProjectDisplayBoardDetail",
        query: {
          id: id,
        },
      });
      console.log(id);
    },
    onViewFlowChart(item) {
      console.log(item);
      let data = item;
      data.id = item.id.toString();
      data.label = item.name;
      data.children = item.subFlowList;
      data.children.forEach((node, index) => {
        this.recreated(node);
      });
      this.treeData = data;
      console.debug(this.treeData, "treeData1");
      this.drawer = true;
    },

    recreated(node) {
      node.id = node.id;
      node.label = node.name;
      node.children = node.subFlowList;
      node.subFlowList.forEach((unit) => {
        this.recreated(unit);
      });
    },

    async getProjectList() {
      try {
        const res = await axios({
          url: "http://114.115.152.241:18080/flow/allflow",
          method: "GET",
        });
        const data = res.data.data;
        data.forEach((item) => {});
        this.list = res.data.data;
        console.log(res, "getProjectList");
      } catch (e) {
        this.$message.error("获取列表失败！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-board {
  background: url("../../assets/broadBG.png") no-repeat 0 0;
  background-size: cover;
  flex: 1;

}
.pagination {
  display: flex;
  justify-content: center;
}

.header {
  height: 70px;
  padding: 20px;
  color: #fff;
  border-bottom: 1px solid #158aaf;

  .title {
    display: flex;
    align-items: center;
    // padding-left: 15px;
    // border-left: 3px solid #158aaf;
    .icon {
      font-size: 28px;
      margin-right: 6px;
    }
  }
}

.list {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  padding: 20px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    height: 100px;
    background: linear-gradient(left, right, #000, #666);
    .icon {
      font-size: 36px;
      margin: 0 20px;
    }
    /deep/ .el-step__arrow {
      color: #158aaf;
    }
    .info {
      height: 80px;
      width: 200px;
      border: 1px solid #158aaf;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      color: #fff;
      &:hover {
        background: #158aaf;
      }
      .name {
        display: flex;
        align-items: center;
        /deep/ .el-icon {
          margin-left: 10px;
        }
      }
      .time {
        font-size: 14px;
        margin-top: 5px;
      }
    }
    .step {
      flex: 1;
      margin-right: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: start;
      background: none;
      border: 1px solid #158aaf;
      border-radius: 10px;
      padding: 0 20px;
      &:hover {
        background: #158aaf;
      }
      .step-item {
        // flex: 1;
        // width: 20%;
        color: #fff;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;

        .icon {
          font-size: 16px;
        }
      }
    }

    /deep/ .el-steps {
      margin-right: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      background: none;
      border: 1px solid #158aaf;
      border-radius: 10px;
      // margin-left: 40px;
    }
    /deep/ .el-step__arrow::before {
      background-color: #158aaf;
    }
    /deep/ .el-step__arrow::after {
      background-color: #158aaf;
    }
    /deep/ .el-step__title {
      color: #fff;
    }
    // /deep/ .el-step__icon{
    //   background-color: #158aaf;

    // }
  }
}
div ::-webkit-scrollbar {
  /*滚动条整体*/
  width: 10px;
  border-radius: 5px;
}
div ::-webkit-scrollbar-track {
  /*滚动条轨道*/
  background: #fff;
  border-radius: 10px;
}
div ::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  border-radius: 10px;
  background: #158aaf;
}
div ::-webkit-scrollbar-thumb:hover {
  /*滚动条鼠标事件，鼠标放上去出现的事件*/
  background: #158aaf;
}
div ::-webkit-scrollbar-corner {
  /*滚动条边角*/
  background: #158aaf;
}
</style>
