<template>
  <div class="">
    <el-card shadow="never">
      <div slot="header">
        <span>申请趋势图</span>
      </div>
      <div>
        <v-chart
          ref="myChart"
          :options="options"
          class="myChart"
        ></v-chart>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    chartData: {
      type: Object,
      default: () => { }
    },
  },
  data () {
    return {
      options: null,
      vData: null
    }
  },
  watch: {
    chartData (value) {
      this.vData = value.applyList
      this.initCharts()
    }
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    initCharts () {
      this.options = {
        color: ['green', 'orange', 'purple', 'red'],
        tooltip: {
          trigger: 'axis',
          padding: [10, 20, 10, 20]
        },
        legend: {
          data: ['申请次数', '授信次数', '放款次数', '拒绝次数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _.map(this.vData, 'tradeMonth'),
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        series: [{
          name: '申请次数',
          type: 'line',
          symbol: 'rect',
          smooth: true,
          data: _.map(this.vData, 'applyPerson')
        },
        {
          name: '授信次数',
          type: 'line',
          symbol: 'rect',
          smooth: true,
          data: _.map(this.vData, 'creditPerson')
        },
        {
          name: '放款次数',
          type: 'line',
          symbol: 'rect',
          smooth: true,
          data: _.map(this.vData, 'signPerson')
        },
        {
          name: '拒绝次数',
          type: 'line',
          symbol: 'rect',
          smooth: true,
          data: _.map(this.vData, 'rejectPerson')
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.myChart {
  width: 100%;
  height: 480px;
}
</style>
