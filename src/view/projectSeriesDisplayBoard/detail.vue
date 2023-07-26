<template>
  <div class="container-board-detail">
    <div class="header">
      <p class="title">
        <el-icon color="#158aaf" class="icon"><Document /></el-icon
        ><span>{{ detail.name }}</span>
      </p>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="item one">
          <div class="title">
            <el-icon color="#158aaf" :size="16"><FolderOpened /></el-icon>
            <p>项目目标</p>
          </div>
          <div class="item-content">
            <p class="text">
              {{
                detail.target
              }}目标相关性(Realistic)—我们可以把复杂的项目目标分解成更多更小的易于达成的小目标，这些小目标都是有相关性的，我们制作和项目目标相关联的事情。
            </p>
          </div>
        </div>

        <div class="item one">
          <div class="title">
            <el-icon color="#158aaf" :size="16"><FolderOpened /></el-icon>
            <p>项目简介</p>
          </div>
          <div class="item-content">
            <p class="text">
              {{
                detail.description
              }}例如下图（左）的节点包含了一个圆形图形；下图（中）的节点含有有一个圆形和一个文本图形；下图（右）的节点中含有
              5
              个圆形（蓝绿色的圆和上下左右四个锚点）、一个文本图形。但每种节点/边/
              Combo 都会有自己的唯一关键图形 keyShape，下图中三个节点的 keyShape
              都是蓝绿色的圆，keyShape
              主要用于交互检测、样式随状态自动更新等，见 keyShape。
            </p>
          </div>
        </div>
        <div class="item one">
          <div class="title">
            <el-icon color="#158aaf" :size="16"><FolderOpened /></el-icon>
            <p>项目成员信息</p>
          </div>
          <div class="item-content">
            <p class="text">项目经理： {{ detail.managerName }}</p>
            <p class="text">
              项目组成员：
              {{ detail.memberNameList ? detail.memberNameList.join(",") : "" }}
            </p>
            <p class="text">供应商名称: {{ detail.supplierName }}</p>
            <p class="text">供应商名称: {{ detail.supplierName }}</p>
            <p class="text">项目开始时间: {{ detail.startTime }}</p>
            <p class="text">项目结束时间: {{ detail.endTime }}</p>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="chart-list">
          <div class="item">
            <div class="title">
              <el-icon color="#158aaf" :size="16"><FolderOpened /></el-icon>
              <p>项目收入</p>
            </div>
            <div class="chart" ref="chartA"></div>
          </div>
          <div class="item">
            <div class="title">
              <el-icon color="#158aaf" :size="16"><FolderOpened /></el-icon>
              <p>项目任务</p>
            </div>
            <div class="chart" ref="chartB"></div>
          </div>
          <div class="item">
            <div class="title">
              <el-icon color="#158aaf" :size="16"><FolderOpened /></el-icon>
              <p>项目问题</p>
            </div>
            <div class="chart" ref="chartC"></div>
          </div>
        </div>
        <div class="flow">
          <FlowChart v-if="treeData" :treeData="treeData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FlowChart from "./components/flowChart.vue";
export default {
  components: {
    FlowChart,
  },
  data() {
    return {
      detailID: "",
      detail: {},
      treeData: null,
    };
  },
  created() {
    console.log(this.$route);
    this.detailID = this.$route.query.id;
    this.getProjectDetail();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    async getProjectDetail() {
      try {
        const res = await axios({
          url: "http://114.115.152.241:18080/project/projectwithflow",
          method: "GET",
          params: {
            id: this.detailID,
          },
        });
        this.detail = res.data.data;
        let data = {};
        data.id = this.detail.id.toString();
        data.label = this.detail.name;
        data.children = this.detail.subflow;
        data.children.forEach((node, index) => {
          this.recreated(node);
        });
        this.treeData = data;

        console.log(res, "getProjectList");
      } catch (e) {
        this.$message.error(e);
      }
    },
    recreated(node) {
      node.id = node.id;
      node.label = node.name;
      node.children = node.subFlowList;
      node.subFlowList.forEach((unit) => {
        this.recreated(unit);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChartA = this.$echarts.init(this.$refs.chartA);
      let myChartB = this.$echarts.init(this.$refs.chartB);
      let myChartC = this.$echarts.init(this.$refs.chartC);

      myChartC.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
            show:false,

        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Email",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Search Engine",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "Baidu",
            type: "bar",
            barWidth: 5,
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "Google",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "Bing",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "Others",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      });
      // 绘制图表
      myChartB.setOption({
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
            show:false,
          text: "Gradient Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
            show:false,
          data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        },
        toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "Line 2",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "Line 3",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "Line 5",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      });
      myChartA.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-board-detail {
  background: url("../../assets/broadBG.png") no-repeat 0 0;
  background-size: cover;
  flex: 1;
  display: flex;
  flex-direction: column;
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
  .content {
    padding: 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    .content-left {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .item {
        height: 30%;
        width: 100%;
        border: 1px solid #158aaf;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        .title {
          color: #fff;
          font-size: 16px;
          padding: 5px 0;
          display: flex;
          align-items: center;
          p {
            margin-left: 5px;
          }
        }
        .item-content {
          color: #fff;
          flex: 1;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          overflow: hidden;
        }
      }
    }
    .content-right {
      height: 100%;
      width: 65%;
      display: flex;
      flex-direction: column;
      .chart-list {
        display: flex;
        justify-content: space-around;
        height: 30%;
        .item {
          width: 30%;
          border: 1px solid #158aaf;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          padding: 0 10px 10px 10px;
          .title {
            color: #fff;
            font-size: 16px;
            padding: 5px 10px;
            display: flex;
            align-items: center;
            p {
              margin-left: 5px;
            }
          }
          .chart {
            flex: 1;
          }
        }
      }
      .flow {
        flex: 1;
      }
    }
  }
}
</style>