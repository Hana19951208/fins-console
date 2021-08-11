<template>
  <div class="white pa-4 mt-2">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-tabs v-model="activeName" type="card">
          <div class="credit-header">
            <p>您好!欢迎进入苏州农村商业银行金融超脑管理平台报表中心。</p>
            <p>{{ time }}</p>
          </div>
          <el-row :gutter="24" class="mt-4">
            <el-col :span="12">
              <v-chart
                ref="firstChart"
                :options="secondOptions"
                class="myChart"
              ></v-chart>
            </el-col>
            <el-col :span="12">
              <v-chart
                ref="secondChart"
                :options="fourOptions"
                class="myChart"
              ></v-chart>
            </el-col>
          </el-row>

          <el-row :gutter="24" class="mt-4">
            <el-col :span="12">
              <v-chart
                ref="firstChart"
                :options="threeOptions"
                class="myChart"
              ></v-chart>
            </el-col>
            <el-col :span="12">
              <v-chart
                ref="secondChart"
                :options="fiveOptions"
                class="myChart"
              ></v-chart>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="mt-4">
            <el-col :span="12">
              <v-chart
                ref="firstChart"
                :options="firstOptions"
                class="myChart"
              ></v-chart>
            </el-col>
            <el-col :span="12">
              <v-chart ref="secondChart" class="myChart"></v-chart>
            </el-col>
          </el-row>
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
      time: "xxxx",
      queryForm: {
        type: 1,
      },
      firstOptions: {},
      secondOptions: {},
      threeOptions: {},
      fourOptions: {},
      fiveOptions: {},
      countItemList: [],
    };
  },
  mounted() {
    this.initChartData();
    this.initChartDataS();
    this.initChartDataSs();
    this.initChartDataYk();
    this.initChartDataHk();
    setInterval(this.NowTime(), 1000);
  },
  methods: {
    NowTime() {
      var myDate = new Date();
      var y = myDate.getFullYear();
      var M = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var d = myDate.getDate(); //获取当前日(1-31)
      var h = myDate.getHours(); //获取当前小时数(0-23)
      var m = myDate.getMinutes(); //获取当前分钟数(0-59)
      //检查是否小于10
      M = this.check(M);
      d = this.check(d);
      h = this.check(h);
      m = this.check(m);
      var timestr = y + "-" + M + "-" + d + " " + h + ":" + m;
      console.log(timestr);
      this.time = timestr;
    },
    check(i) {
      var num = i < 10 ? "0" + i : i;
      return num;
    },
    initChartData() {
      this.$api.riskReport.queryConvertRate({}).then((res) => {
        let data = res.body;
        this.initFirstChart(res.body);
      });
    },
    initChartDataS() {
      console.log("data数据11：");
      this.$api.riskReport.queryRegistrationNumber({}).then((res) => {
        let data = res.body;
        this.initSecondChart(res.body);
      });
    },

    initChartDataYk() {
      console.log("data数据112：");
      this.$api.riskReport.queryLoanAmount({}).then((res) => {
        let data = res.body;
        this.initFourChart(res.body);
      });
    },

    initChartDataHk() {
      console.log("data数据113：");
      this.$api.riskReport.queryRepaymentAmount({}).then((res) => {
        let data = res.body;
        this.initFiveChart(res.body);
      });
    },

    initChartDataSs() {
      this.$api.riskReport.queryApplyCreditSummaryData({}).then((res) => {
        let data = res.body;
        this.initThreeChart(res.body);
      });
    },
    initFirstChart(vData) {
      this.firstOptions = {
        title: {
          text: "转化率",
          left: "center",
          textStyle: {
            fontSize: 14,
          },
        },
        legend: {
          top: 20,
          data: ["申请签约率", "注册申请率", "通过签约率"],
        },
        color: ["#1E88E5", "#2E7D32", "#E65100"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          padding: [10, 20, 10, 20],
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: _.map(vData, "date"),
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
            rotate: 60,
          },
        },
        yAxis: {
          type: "value",
          name: "%",
          nameTextStyle: {
            color: "#333333",
          },
          min: "0",
          max: "100",
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
          },
        },
        series: [
          {
            name: "申请签约率",
            type: "line",
            smooth: true,
            data: _.map(vData, "applySignedRate"),
          },
          {
            name: "注册申请率",
            type: "line",
            smooth: true,
            data: _.map(vData, "regApplyRate"),
          },
          {
            name: "通过签约率",
            type: "line",
            smooth: true,
            data: _.map(vData, "passedSignedRate"),
          },
        ],
      };
    },
    initSecondChart(vData) {
      let str =
        "累计注册总数(人)：{a|" +
        vData.allData +
        "}" +
        "    当月注册总数(人)：{a|" +
        vData.monthSummaryData +
        "}";
      this.secondOptions = {
        title: {
          text: "注册",
          subtext: str,
          left: "center",
          subtextStyle: {
            color: "#333333",
            fontSize: 14,
            rich: {
              a: {
                color: "#b61e33",
                fontSize: 15,
              },
            },
            x: "center",
            y: "center",
          },
          textStyle: {
            fontSize: 14,
          },
        },
        color: ["#1E88E5", "#2E7D32"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          padding: [10, 20, 10, 20],
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: _.map(vData.weekDatas, "date"),
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
            rotate: 60,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
          },
        },
        series: [
          {
            name: "注册人数",
            type: "line",
            smooth: true,
            data: _.map(vData.weekDatas, "regNum"),
          },
        ],
      };
    },
    initThreeChart(vData) {
      this.threeOptions = {
        title: {
          left: "center",
          text: "授信",
          textStyle: {
            fontSize: 14,
          },
        },
        legend: {
          top: 20,
          data: ["申请人数", "有效申请人数", "模型通过率(%)"],
        },
        xAxis: [
          {
            type: "category",
            data: _.map(vData, "date"),
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            type: "value",
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "申请人数",
            type: "bar",
            data: _.map(vData, "applyNum"),
          },
          {
            name: "有效申请人数",
            type: "bar",
            data: _.map(vData, "effectiveApplyNum"),
          },
          {
            name: "模型通过率(%)",
            type: "line",
            data: _.map(vData, "passRate"),
          },
        ],
      };
    },
    initFourChart(vData) {
      let str =
        "累计用信总额(万元)：{a|" +
        vData.allData +
        "}" +
        "    当月用信总额(万元)：{a|" +
        vData.monthSummaryData +
        "}";
      this.fourOptions = {
        title: {
          text: "用信金额",
          subtext: str,
          left: "center",
          subtextStyle: {
            color: "#333333",
            fontSize: 14,
            rich: {
              a: {
                color: "#b61e33",
                fontSize: 15,
              },
            },
            x: "center",
            y: "center",
          },
          textStyle: {
            fontSize: 14,
          },
        },
        color: ["#1E88E5", "#2E7D32"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          padding: [10, 20, 10, 20],
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: _.map(vData.weekDatas, "date"),
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
            rotate: 60,
          },
        },
        yAxis: {
          name: "用信金额(万元)",
          nameTextStyle: {
            color: "#333333",
          },
          nameLocation: "end",
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
          },
        },
        series: [
          {
            name: "用信金额(万元)",
            type: "line",
            smooth: true,
            data: _.map(vData.weekDatas, "loanAmount"),
          },
        ],
      };
    },
    initFiveChart(vData) {
      let str =
        "累计已还金额(万元)：{a|" +
        vData.allData +
        "}" +
        "    当月已还金额(万元)：{a|" +
        vData.monthSummaryData +
        "}";
      this.fiveOptions = {
        title: {
          text: "还款金额",
          left: "center",
          subtext: str,
          subtextStyle: {
            color: "#333333",
            fontSize: 14,
            rich: {
              a: {
                color: "#b61e33",
                fontSize: 15,
              },
            },
            x: "center",
            y: "center",
          },
          textStyle: {
            fontSize: 14,
          },
        },
        color: ["#1E88E5", "#2E7D32"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          padding: [10, 20, 10, 20],
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: _.map(vData.weekDatas, "date"),
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
            rotate: 60,
          },
        },
        yAxis: {
          name: "还款金额(万元)",
          nameTextStyle: {
            color: "#333333",
          },
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#eee",
            },
          },
          axisLabel: {
            color: "#666",
          },
        },
        series: [
          {
            name: "还款金额(万元)",
            type: "line",
            smooth: true,
            data: _.map(vData.weekDatas, "repaymentAmount"),
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-header {
  display: flex;
  justify-content: space-between;
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
