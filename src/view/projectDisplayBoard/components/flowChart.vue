<template>
  <div id="container" ref="graph"></div>
  <el-dialog
    destroy-on-close
    v-model="addDialogFormVisible"
    :width="400"
    title="添加流程"
  >
    <el-form :model="form" ref="ruleForm" :rules="rules">
      <el-form-item label="流程名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入流程名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfrimAddNode()">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    destroy-on-close
    v-model="editDialogFormVisible"
    :width="400"
    title="修改信息"
  >
    <el-form :model="form" ref="editForm" :rules="editRules">
      <el-form-item label="流程名称" prop="name">
        <el-input v-model="editform.name" placeholder="请输入流程名称" />
      </el-form-item>
      <el-form-item label="进度更新" prop="schedule">
        <el-slider v-model="editform.schedule" />
      </el-form-item>
      <el-form-item label="优先级设置" prop="priority">
        <el-input-number v-model="editform.priority" :min="1" :max="100" />
      </el-form-item>
      <el-form-item label="周期变更" prop="processTime">
        <el-date-picker
          v-model="processTime"
          @change="onProcessTimeChange"
          type="daterange"
          value-format="YYYY-MM-DD"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onconfirmEditProcess()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <div class="menu-project menu" ref="project">
    <div class="item" type="1">
      <el-icon><DocumentAdd /></el-icon> 添加流程
    </div>
    <div class="item" type="2">
      <el-icon><Edit /></el-icon> 项目修改
    </div>
    <div class="item" type="3">
      <el-icon><DocumentDelete /></el-icon> 项目删除
    </div>
    <div class="item" type="4">
      <el-icon><Timer /></el-icon> 周期调整
    </div>
  </div>
  <div class="menu-process menu" ref="process">
    <div class="item" type="1">
      <el-icon><DocumentAdd /></el-icon> 流程添加
    </div>
    <div class="item" type="2">
      <el-icon><DocumentDelete /></el-icon> 流程删除
    </div>
    <div class="item" type="3">
      <el-icon><Timer /></el-icon> 时间设置
    </div>
    <div class="item" type="4">
      <el-icon><Setting /></el-icon> 优先级设置
    </div>
    <div class="item" type="5">
      <el-icon><Edit /></el-icon> 周期变更
    </div>
    <div class="item" type="6">
      <el-icon><EditPen /></el-icon> 重命名
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
  ];
};

const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
    ["M", x, y - 2 * r + 2],
    ["L", x, y - 2],
  ];
};
const defaultStateStyles = {
  hover: {
    stroke: "#1890ff",
    lineWidth: 2,
  },
};

const defaultNodeStyle = {
  fill: "#158aaf",
  stroke: "#158aaf",
  radius: 5,
};

const defaultEdgeStyle = {
  stroke: "#158aaf",
  endArrow: {
    path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
    fill: "#158aaf",
    d: -20,
  },
};

const defaultLayout = {
  type: "compactBox",
  direction: "TB",
  getId: function getId(d) {
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    return 40;
  },
  getHGap: function getHGap() {
    return 70;
  },
};

const defaultLabelCfg = {
  style: {
    fill: "#fff",
    width: 200,
    fontSize: 12,
  },
};

import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import Node from "element-plus/es/components/cascader-panel/src/node";
const that = this;
export default {
  props: {
    treeData: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      processTime: null,
      graph: null,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      activedNode: {},
      activedParentNode: {},
      form: {
        id: "",
        name: "",
      },
      editform: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入流程名称",
            trigger: "blur",
          },
          //   {
          //     min: 3,
          //     max: 5,
          //     message: "Length should be 3 to 5",
          //     trigger: "blur",
          //   },
        ],
      },
      editRules: {
        // name: [
        //   {
        //     required: true,
        //     message: "请输入名称",
        //     trigger: "blur",
        //   },
        //   //   {
        //   //     min: 3,
        //   //     max: 5,
        //   //     message: "Length should be 3 to 5",
        //   //     trigger: "blur",
        //   //   },
        // ],
      },
      menu: null,
    };
  },
  
  created() {
    
    G6.Util.traverseTree(this.treeData, (d) => {
      d.leftIcon = {
        style: {
          fill: "#e6fffb",
          stroke: "#e6fffb",
        },
        img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
      };
      return true;
    });

    G6.registerNode(
      "icon-node",
      {
        options: {
          size: [60, 20],
          stroke: "#91d5ff",
          fill: "#91d5ff",
        },
        draw(cfg, group) {
          const styles = this.getShapeStyle(cfg);
          const { labelCfg = {} } = cfg;

          const w = styles.width;
          const h = styles.height;
          console.log(w, h);
          const keyShape = group.addShape("rect", {
            attrs: {
              ...styles,
              x: -w / 2,
              y: -h / 2,
            },
          });

          /**
           * leftIcon 格式如下：
           *  {
           *    style: ShapeStyle;
           *    img: ''
           *  }
           */
          console.log("cfg.leftIcon", cfg.leftIcon);
          if (cfg.leftIcon) {
            const { style, img } = cfg.leftIcon;
            group.addShape("rect", {
              attrs: {
                x: 1 - w / 2,
                y: 1 - h / 2,
                width: 38,
                height: styles.height - 2,
                fill: "#158aaf",
                ...style,
              },
            });

            group.addShape("image", {
              attrs: {
                x: 8 - w / 2,
                y: 8 - h / 2,
                width: 24,
                height: 24,
                img:
                  img ||
                  "https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png",
              },
              name: "image-shape",
            });
          }

          // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
          group.addShape("marker", {
            attrs: {
              x: 40 - w / 2,
              y: 52 - h / 2,
              r: 6,
              stroke: "#73d13d",
              cursor: "pointer",
              symbol: EXPAND_ICON,
            },
            name: "add-item",
          });

          group.addShape("marker", {
            attrs: {
              x: 80 - w / 2,
              y: 52 - h / 2,
              r: 6,
              stroke: "#ff4d4f",
              cursor: "pointer",
              symbol: COLLAPSE_ICON,
            },
            name: "remove-item",
          });

          if (cfg.label) {
            group.addShape("text", {
              attrs: {
                ...labelCfg.style,
                text: cfg.label,
                x: 50 - w / 2,
                y: 25 - h / 2,
              },
            });
          }

          return keyShape;
        },
        update: undefined,
      },
      "rect"
    );
    G6.registerEdge("flow-line", {
      draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;

        const { style } = cfg;
        const shape = group.addShape("path", {
          attrs: {
            stroke: style.stroke,
            endArrow: style.endArrow,
            path: [
              ["M", startPoint.x, startPoint.y],
              ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
              ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
              ["L", endPoint.x, endPoint.y],
            ],
          },
        });

        return shape;
      },
    });
  },

  mounted() {
    this.$nextTick(() => {
      const container = this.$refs.graph;
      // console.log(container.scrollWidth, "container");
      const width = container.scrollWidth || container.offsetWidth || 900;
      const height = container.scrollHeight || container.offsetHeight || 500;
      const minimap = new G6.Minimap({
        size: [150, 100],
      });
      const that = this;

      this.menu = new G6.Menu({
        offsetX: 6,
        offsetX: 10,
        itemTypes: ["node"],
        getContent(e) {
          console.log(e, "getContent");
          const meunDom = document.getElementsByClassName(
            "g6-component-contextmenu"
          )[0];
          meunDom.style.display = "block";

          if (!e.item._cfg.model.projecttype) {
            that.activedParentNode = Object.assign(
              {},
              e.item._cfg.parent._cfg.model
            );
          }

          if (e.item._cfg.model.projecttype) {
  
            return that.$refs.project;
          } else {
            return that.$refs.process;
          }
        },
        handleMenuClick(target, item) {
          console.log(target, item);

          const type = target.getAttribute("type");

          if (item._cfg.model.projecttype||item._cfg.model.projecttype===null) {

            switch (type) {
              case "1":
                that.onAddNode(item._cfg.model);
                break;
              case "3":
                that.onRemoveProJect(item._cfg.model);
                break;
            }
            console.log(1, item._cfg.model);
          } else {
            switch (type) {
              case "1":
                that.onAddNode(item._cfg.model);
                break;
              case "2":
                that.onRemoveNode(item._cfg.model);
                break;
              default:
                that.onEditProcess(item._cfg.model);
            }
            console.log(2, item._cfg.model);
          }
          const meunDom = document.getElementsByClassName(
            "g6-component-contextmenu"
          )[0];
          meunDom.style.display = "none";
        },
      });

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        linkCenter: true,
        plugins: [minimap, this.menu],
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          type: "icon-node",
          size: [120, 40],
          style: defaultNodeStyle,
          labelCfg: defaultLabelCfg,
        },
        defaultEdge: {
          type: "flow-line",
          style: defaultEdgeStyle,
        },
        nodeStateStyles: defaultStateStyles,
        edgeStateStyles: defaultStateStyles,
        layout: defaultLayout,
      });

      this.graph.data(this.treeData);
      this.graph.render();
      this.graph.fitView();

      this.graph.on("node:mouseenter", (evt) => {
        const { item } = evt;
        this.graph.setItemState(item, "hover", true);
      });

      this.graph.on("node:mouseleave", (evt) => {
        const { item } = evt;
        this.graph.setItemState(item, "hover", false);
      });

      this.graph.on("node:click", (evt) => {
        const { item, target } = evt;
        const targetType = target.get("type");
        const name = target.get("name");

        // 增加元素
        if (targetType === "marker") {
          const model = item.getModel();
          if (name === "add-item") {
            this.onAddNode(model);
          } else if (name === "remove-item") {
            if (item._cfg.model.projecttype) {
              this.onRemoveProJect(model);
            } else {
              this.onRemoveNode(model);
            }
            //   graph.removeChild(model.id);
          }
        }
      });
      window.onresize = () => {
        if (!this.graph || this.graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        this.graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
    });
  },
  methods: {
    //
    onProcessTimeChange(e) {
      this.editform.starttime = e[0];
      this.editform.endtime = e[1];
    },

    onAddNode(node) {
      this.form.id = node.id;
      this.activedNode = node;
      this.addDialogFormVisible = true;
      this.$forceUpdate();
    },

    onEditProcess(node) {
      this.editform = {
        id: node.id,
        priority: node.priority,
        starttime: node.starttime,
        endtime: node.endtime,
        name: node.name,
        schedule: parseInt(node.schedule),
      };
      console.log(this.activedParentNode, "activedParentNodeonEditProcess");
      console.log(node, "onEditProcess");
      this.activedNode = node;
      this.processTime = [node.starttime, node.endtime];
      // console.log(this.processTime)
      this.editDialogFormVisible = true;
    },

    async onconfirmEditProcess() {
      let data = {
        id: this.editform.id,
        priority: this.editform.priority,
        starttime: this.editform.starttime,
        endtime: this.editform.endtime,
        name: this.editform.name,
        schedule: `${this.editform.schedule}%`,
      };
  
      try {
        const res = await axios({
          url: "http://114.115.152.241:18080/flow/update",
          method: "POST",
          data: data,
        });

        let activedNode = this.activedNode;
        let activedParentNode = this.activedParentNode;

        for (let key in this.editform) {
          activedNode[key] = this.editform[key];
        }
        activedNode.label = activedNode.name;

        console.log(this.activedParentNode, "this.activedParentNode");
        this.graph.updateChildren(
          this.activedParentNode.children,
          this.activedParentNode.id
        );
        this.graph.render();
        this.graph.fitView();
        this.editDialogFormVisible = false;
        this.$message.success("修改成功！");
      } catch (e) {
        console.log(e);
        this.$message.error("修改失败！");
      }
    },

    onConfrimAddNode() {
      this.$refs.ruleForm.validate((valid, fields) => {
        if (valid) {
          this.onAdd();
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },

    async onAdd() {
      const url = this.activedNode.projecttype
        ? "http://114.115.152.241:18080/flow/addflow"
        : "http://114.115.152.241:18080/flow/subflow";
      try {
        const res = await axios({
          url,
          method: "POST",
          params: this.form,
        });
        const activedNode = this.activedNode;
        // console.log(activedNode, "activedNode");
        activedNode.children.push({
          id: res.data.data.id ? res.data.data.id : res.data.data,
          label: this.form.name,
          name: this.form.name,
          leftIcon: {
            style: {
              fill: "#e6fffb",
              stroke: "#e6fffb",
            },
            img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
          },
        });

        this.addDialogFormVisible = false;
        this.$message.success("添加成功！");
        // 更新父级

        // console.log(activedNode, "activedNode");
        this.graph.updateChild(activedNode, activedNode.id);
        this.graph.fitView();
      } catch (e) {
        this.$message.success("添加失败！");
      }
    },

    // 点击删除图标触发删除确认框
    onRemoveNode(node) {
      ElMessageBox.confirm(`确定删除该流程(${node.label})?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.onConfirmRemoveNode(node);
      });
    },

    // 点击删除图标触发删除确认框
    onRemoveProJect(node) {
      ElMessageBox.confirm(`确定删除该项目吗(${node.label})?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.onConfirmRemoveProject(node);
      });
    },

    async onConfirmRemoveProject(node) {
      try {
        const res = await axios({
          url: "http://114.115.152.241:18080/project/project",
          method: "DELETE",
          params: {
            id: node.id,
          },
        });
        this.$message.success("删除成功！");
        this.graph.removeChild(node.id);
      } catch (e) {
        this.$message.error(e);
      }
      console.log(node);
    },

    // 确定删除节点
    async onConfirmRemoveNode(node) {
      try {
        const res = await axios({
          url: "http://114.115.152.241:18080/flow/deleteflow",
          method: "DELETE",
          params: {
            id: node.id,
          },
        });
        this.$message.success("删除成功！");
        this.graph.removeChild(node.id);
      } catch (e) {
        this.$message.error(e);
      }
      console.log(node);
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: 80%;
  width: 100%;
}
/deep/ .g6-component-contextmenu {
  padding: 0;
  display: block;
  .menu {
    display: block !important;
  }
}
.menu {
  padding: 10px 0;
  display: none;
  .item {
    padding: 0 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 1px soild #eee;
    &:hover {
      background: #158aaf;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>