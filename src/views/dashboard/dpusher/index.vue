<template>
  <div class="white pa-4 mt-2">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-radio-group
          class="x-right-btn"
          size="mini"
          v-model="queryForm.type"
          @change="initChartData()"
        >
          <el-radio-button label="1">最近30天</el-radio-button>
          <el-radio-button label="2">
            <span class="mx-2">本月</span>
          </el-radio-button>
        </el-radio-group>
        <el-tabs
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            label="业绩趋势"
            name="first"
          >
            <div class="credit-flow-header">
              <el-row :gutter="24">
                <el-col
                  :span="4"
                  v-for="(item, index) in countItemList"
                  :key="index"
                >
                  <div class="x-count-item px-2">
                    <div class="left-icon">
                      <img :src="item.icon" />
                    </div>
                    <div class="right-content text-center body-2">
                      <p>
                        <span class="font-weight-bold purple--text">{{
                          item.value
                          }}</span>
                        <small class="ml-1">{{ item.unit }}</small>
                      </p>
                      <p class="text-truncate">{{ item.name }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-row
              :gutter="24"
              class="mt-4"
            >
              <el-col :span="12">
                <v-chart
                  ref="firstChart"
                  :options="firstOptions"
                  class="myChart"
                ></v-chart>
              </el-col>
              <el-col :span="12">
                <v-chart
                  ref="secondChart"
                  :options="secondOptions"
                  class="myChart"
                ></v-chart>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data () {
    return {
      activeName: "first",
      queryForm: {
        type: 1
      },
      firstOptions: {},
      secondOptions: {},
      countItemList: []
    };
  },
  mounted () {
    this.initChartData();
  },
  methods: {
    initChartData () {
      this.$api.dashboard.getTrendChart(this.queryForm).then(res => {
        let data = res.body;
        this.initFirstChart(res.body.apply);
        this.initSecondChart(res.body.apply);
        this.countItemList = [
          {
            key: "registerAll",
            name: "注册人数",
            value: data.registerAll,
            icon: require("./images/1007.png")
          },
          {
            key: "applyAll",
            name: "申请人数",
            value: data.applyAll,
            icon: require("./images/1003.png")
          },
          {
            key: "activeAll",
            name: "激活人数",
            value: data.activeAll,
            icon: require("./images/1001.png")
          },
          {
            key: "faceSignAll",
            name: "面签人数",
            value: data.faceSignAll,
            icon: require("./images/1008.png")
          }
        ];
      });
    },
    initFirstChart (vData) {
      this.firstOptions = {
        title: {
          text: "营销趋势图",
          textStyle: {
            fontSize: 14
          }
        },
        legend: {
          data: ["注册户数", "申请户数", "激活户数"]
        },
        color: ["#1E88E5", "#2E7D32", "#E65100"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          padding: [10, 20, 10, 20]
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: _.map(vData, "days"),
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            color: "#666",
            rotate: 60
          }
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            color: "#666"
          }
        },
        series: [
          {
            name: "注册户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "registerAll")
          },
          {
            name: "申请户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "applyAll")
          },
          {
            name: "激活户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "activeAll")
          }
        ]
      };
    },
    initSecondChart (vData) {
      this.secondOptions = {
        title: {
          text: "面签趋势图",
          textStyle: {
            fontSize: 14
          }
        },
        legend: {
          data: ["面签户数"]
        },
        color: ["#1E88E5", "#2E7D32"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          padding: [10, 20, 10, 20]
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: _.map(vData, "days"),
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            color: "#666",
            rotate: 60
          }
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            color: "#666"
          }
        },
        series: [
          {
            name: "面签户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "faceSignAll")
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.x-right-btn {
  z-index: 1;
  position: absolute;
  right: 10px;
}
.myChart {
  width: 100%;
  height: 320px;
}
.x-count-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  .left-icon {
    float: left;
    width: 48px;
    height: 76px;
    position: relative;
    img {
      position: absolute;
      top: 21px;
      left: 8px;
      height: 32px;
      width: 32px;
    }
  }
}
</style>
