<template>
  <div id="container" ref="graph"></div>
  <el-dialog v-if="addDialogFormVisible" v-model="addDialogFormVisible" :width="400" title="添加流程">
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
  fill: "#91d5ff",
  stroke: "#40a9ff",
  radius: 5,
};

const defaultEdgeStyle = {
  stroke: "#91d5ff",
  endArrow: {
    path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
    fill: "#91d5ff",
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
    fill: "#000",
    width: 200,
    fontSize: 12,
  },
};
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import Node from "element-plus/es/components/cascader-panel/src/node";
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
      graph: null,
      addDialogFormVisible: false,
      activedNode: {},
      form: {
        id: "",
        name: "",
      },
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
    };
  },
  created() {
    G6.Util.traverseTree(this.treeData, (d) => {
      d.leftIcon = {
        style: {
          fill: "#e6fffb",
          stroke: "#e6fffb",
        },
        img:
          "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
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
                fill: "#8c8c8c",
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
      console.log(container.scrollWidth, "container");
      const width = container.scrollWidth || container.offsetWidth || 900;
      const height = container.scrollHeight || container.offsetHeight || 500;
      const minimap = new G6.Minimap({
        size: [150, 100],
      });

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        linkCenter: true,
        plugins: [minimap],
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
            // if (!model.children) {
            //   model.children = [];
            // }
            // const id = `n-${Math.random()}`;
            // model.children.push({
            //   id,
            //   label: id.substr(0, 8),
            //   leftIcon: {
            //     style: {
            //       fill: "#e6fffb",
            //       stroke: "#e6fffb",
            //     },
            //     img:
            //       "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
            //   },
            // });
            this.graph.updateChild(model, model.id);
          } else if (name === "remove-item") {
            this.onRemoveNode(model);
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
    onAddNode(node) {
      console.log(node, "node");
      this.form.id = node.id;
      this.activedNode = node;
      this.addDialogFormVisible = true;
      this.$forceUpdate();
      console.log(this.addDialogFormVisible);
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

        this.activedNode.children.push({
          id: res.data,
          label: this.form.name,
          leftIcon: {
            style: {
              fill: "#e6fffb",
              stroke: "#e6fffb",
            },
            img:
              "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
          },
        });
        this.graph.updateChild(this.activedNode, this.activedNode.id);
        this.graph.fitView();
        this.addDialogFormVisible = false;
      } catch (e) {
        this.$message.error(e);
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
</style>