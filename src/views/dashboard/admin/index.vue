<template>
  <div class="white pa-4 mt-2">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-radio-group class="x-right-btn" size="mini" v-model="queryForm.type" @change="initChartData()">
          <el-radio-button label="1">最近30天</el-radio-button>
          <el-radio-button label="2">
            <span class="mx-2">本月</span>
          </el-radio-button>
        </el-radio-group>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="授信趋势" name="first">
            <div class="credit-flow-header">
              <el-row :gutter="24">
                <el-col :span="3" v-for="(item, index) in countItemList" :key="index">
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
            <el-row :gutter="24" class="mt-4">
              <el-col :span="12">
                <v-chart ref="firstChart" :options="firstOptions" class="myChart"></v-chart>
              </el-col>
              <el-col :span="12">
                <v-chart ref="secondChart" :options="secondOptions" class="myChart"></v-chart>
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
  data() {
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
  mounted() {
    this.initChartData();
  },
  methods: {
    initChartData() {
      this.$api.dashboard.getTrendChart(this.queryForm).then(res => {
        let data = res.body;
        this.initFirstChart(res.body.countTrendList);
        this.initSecondChart(res.body.amountTrendList);
        this.countItemList = [
          {
            key: "applyCount",
            name: "申请户数",
            value: data.applyCount || 0,
            icon: require("./images/1007.png")
          },
          {
            key: "creditCount",
            name: "授信成功人数",
            value: data.creditCount || 0,
            icon: require("./images/1003.png")
          },
          {
            key: "creditAmount",
            name: "授信金额",
            unit: "万",
            value: data.creditAmount || 0,
            icon: require("./images/004.png")
          },
          {
            key: "loanCount",
            name: "借款户数",
            value: data.loanCount || 0,
            icon: require("./images/1007.png")
          },
          {
            key: "loanAmount",
            name: "借款金额",
            unit: "万",
            value: data.loanAmount || 0,
            icon: require("./images/004.png")
          },
          {
            key: "loanCount",
            name: "代偿户数",
            value: data.loanCount || 0,
            icon: require("./images/1007.png")
          },
          {
            key: "loanAmount",
            name: "代偿金额",
            unit: "万",
            value: data.loanAmount || 0,
            icon: require("./images/004.png")
          }
        ];
      });
    },
    initFirstChart(vData) {
      this.firstOptions = {
        title: {
          text: "客户趋势图",
          textStyle: {
            fontSize: 14
          }
        },
        legend: {
          data: ["申请户数", "授信成功户数", "借款户数", "代偿户数"]
        },
        color: ["#1E88E5", "#2E7D32", "#E65100", "#DF7DFF"],
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
          data: _.map(vData, "date"),
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
            name: "申请户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "apply")
          },
          {
            name: "授信成功户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "credit")
          },
          {
            name: "借款户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "loan")
          },
          {
            name: "代偿户数",
            type: "line",
            smooth: true,
            data: _.map(vData, "loan")
          }
        ]
      };
    },
    initSecondChart(vData) {
      this.secondOptions = {
        title: {
          text: "额度趋势图（万）",
          textStyle: {
            fontSize: 14
          }
        },
        legend: {
          data: ["授信额度", '借款额度', '代偿额度']
        },
        color: ["#1E88E5", "#2E7D32", "#DF7DFF"],
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
          data: _.map(vData, "date"),
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
            name: "授信额度",
            type: "line",
            smooth: true,
            data: _.map(vData, "credit")
          },
          {
            name: "借款额度",
            type: "line",
            smooth: true,
            data: _.map(vData, "loan")
          },
          {
            name: "代偿额度",
            type: "line",
            smooth: true,
            data: _.map(vData, "loan")
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.credit-flow-header {
  /deep/ .el-col-3 {
    width: 14.2%;
  }
}
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
