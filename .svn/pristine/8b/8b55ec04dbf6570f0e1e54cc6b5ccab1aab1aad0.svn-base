<template>
  <div class="monitor_report_page"
       id="monitor-report">
    <div v-cloak>
      <el-row>
        <el-col :span="18"
                class="watermark-view">
          <div class="report-head px-4 clearfix">
            <div>
              <img :src="clogo"
                   class="middle left">
              <div class="ml-4 left">
                <p class="subheading-1 font-weight-regular grey--text text--darken-4 pt-2">
                  {{ paramsData.name }}
                </p>
                <p class="body-2 grey--text text--darken-2">报告编号：{{ reportDetail.seqNo }}</p>
              </div>
            </div>
          </div>
          <div class="time-box">
            <div class="border left-box d-inline-block">
              <span class="left">往期报告</span>
              <i class="el-icon-caret-left icon right"
                 :class="{'not-active': !preActive, 'active': preActive}"
                 @click="getPreReport"></i>
            </div>
            <div class="time-line"
                 v-resize="redraw">
              <div class="time-wrap"
                   :style="{'width': wrapWidth + 'px', 'margin-left': wrapLeft + 'px'}">
                <template v-for="(item,index) in reportList">
                  <span class="time-item d-inline-block cursor-pointer ellipsis"
                        :class="{'text-active': index === activePos}"
                        :style="{ 'width': itemWidth + 'px' }"
                        :title="item.riskLevel | dictFormat(riskLevelDs)"
                        :key="index"
                        @click="chooseReport(index, item)">
                    {{item.createTime}} {{item.riskLevel | dictFormat(riskLevelDs) }}
                  </span>
                </template>
              </div>
            </div>
            <div class="border right-box d-inline-block">
              <i class="el-icon-caret-right icon"
                 :class="{'not-active': !nextActive, 'active': nextActive}"
                 @click="getNextReport"></i>
            </div>
          </div>
          <div class="content-body">
            <p class="pb-3 modTitle text-center">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">风险概要</span>
              <img :src="rightIcon">
            </p>
            <section>
              <div>
                <table class="table-style-3"
                       id="e-1">
                  <tbody>
                    <tr>
                      <th>申请人</th>
                      <td>{{ paramsData.name }}</td>
                      <th>当前风险等级</th>
                      <td>{{ paramsData.riskLevel | dictFormat(riskLevelDs) }}</td>
                      <th>当前风险项</th>
                      <td>{{ form.curRiskCount || 0 }}项</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <p class="pb-3 modTitle text-center">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">风险详情</span>
              <img :src="rightIcon">
            </p>
            <section>
              <div>
                <table class="table-style-2"
                       id="e-2">
                  <thead>
                    <tr>
                      <th style="width:12%">序号</th>
                      <th>风险类型</th>
                      <th>上期预警</th>
                      <th>当前预警</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.detail && form.detail.length > 0">
                    <template v-for="(item, index) in form.detail">
                      <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.lastAlerm}}</td>
                        <td>{{item.curAlerm}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="4"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <p class="pb-3 modTitle text-center">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">处理详情</span>
              <img :src="rightIcon">
            </p>
            <section>
              <div>
                <table class="table-style-3"
                       id="e-3">
                  <tbody>
                    <tr>
                      <th>处理人</th>
                      <td>{{ form.dealUser }}</td>
                      <th>处理意见</th>
                      <td>{{ form.dealOption }}</td>
                      <th>处理时间</th>
                      <td>{{ form.dealTime }}</td>
                    </tr>
                    <tr>
                      <th>意见说明</th>
                      <td colspan="5">{{ form.dealRemark }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right-nav white text-left">
            <ul class="nav-level-first"
                :class="navFixed == true ? 'rfNav' : ''">
              <li v-for="(item, index) in catalogue"
                  :key="index">
                <div class="nav-item-header"
                     :class="{nactive: curTarget == item.target}">
                  {{item.title}}
                </div>
                <template v-if="item.children">
                  <ul class="nav-level-2 my-3">
                    <li v-for="(sitem, sindex) in item.children"
                        @click.stop="scrollTo(sitem)"
                        :key="sindex">
                      <div class="nav-item-subheader"
                           :class="{nactive: curTarget == sitem.target}">
                        {{sitem.title}}
                      </div>
                      <template v-if="sitem.children">
                        <ul class="nav-level-3">
                          <li v-for="(ssitem, ssindex) in sitem.children"
                              @click.stop="scrollTo(ssitem)"
                              :key="ssindex">
                            <div class="nav-item-subheader"
                                 :class="{nactive: curTarget == ssitem.target}">
                              {{ssitem.title}}
                            </div>
                            <template v-if="ssitem.children">
                              <ul class="nav-level-4">
                                <li v-for="(sssitem, sssindex) in ssitem.children"
                                    @click.stop="scrollTo(sssitem)"
                                    :key="sssindex">
                                  <div class="nav-item-subheader"
                                       :class="{nactive: curTarget == sssitem.target}">
                                    {{sssitem.title}}
                                  </div>
                                </li>
                              </ul>
                            </template>
                          </li>
                        </ul>
                      </template>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDictEntrysByCode } from '@/utils'
export default {
  name: 'MonitorReport',
  props: {
    monitorReport: {
      default: () => { },
      type: Object
    },
    scrollTopValue: {
      type: Number,
      default: () => 200
    }
  },
  // 监听元素宽度变化的指令
  directives: {
    resize: {
      bind(el, binding) {
        let width = '';
        el.__vueReize__ = setInterval(() => {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width) {
            binding.value({ width });
          }
          width = style.width;
        }, 20);
      },
      unbind(el) {
        clearInterval(el.__vueReize__);
      }
    }
  },
  data() {
    return {
      clogo: require('@/assets/images/elogo.png'),
      leftIcon: require('@/assets/images/blue-left.png'),
      rightIcon: require('@/assets/images/blue-right.png'),
      reportList: [],
      activePos: 0,
      wrapWidth: 0,
      wrapLeft: 0,
      itemWidth: 0,
      itemLen: 0,
      moveFlag: 0,
      preActive: false,
      nextActive: false,
      reportDetail: {},
      form: {
        creditScore: '',
        riskCount: '',
        highRiskCount: '',
        middleRiskCount: '',
        lowRiskCount: '',
        epBaseRiskCount: '',
        operateRiskCount: '',
        legalmanRiskCount: ''
      },
      catalogue: [
        {
          title: '目录',
          target: '',
          children: [
            { title: '风险概要', target: '#e-1' },
            { title: '风险详情', target: '#e-2' },
            { title: '处理详情', target: '#e-3' }
          ]
        }
      ],
      navFixed: false,
      elMainDom: null,
      navLevelDom: null,
      curTarget: null,
      downloading: false,
      paramsData: {}
    }
  },
  computed: {
    riskLevelDs() {
      return getDictEntrysByCode('POSTLOAN.RISKLEVEL')
    }
  },
  watch: {
    monitorReport(val) {
      if (val) {
        this.paramsData = val
        this.getReportList(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.elMainDom = document.querySelector('.el-main')
      this.elMainDom && this.elMainDom.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed() {
    this.elMainDom && this.elMainDom.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop = this.elMainDom.scrollTop
      let nlDom = document.querySelector('.nav-level-first')
      if (nlDom) {
        let offsetTop = nlDom.offsetTop
        scrollTop - this.scrollTopValue > offsetTop ? this.navFixed = true : this.navFixed = false
      }
    },
    // 初始化报告时间轴
    getReportList(query) {
      this.$api.postLoanMonitor.reportListPersonal({
        applyId: query.applyId,
        companyCode: query.companyCode,
        areaCode: query.areaCode
      }).then(res => {
        if (res.body && res.body.length > 0) {
          this.reportList = res.body
          const totalWidth = document.querySelector('.time-line').offsetWidth;
          const len = res.body.length || 0; // 时间item总个数
          this.itemLen = len; // 记录item总数
          this.nextActive = false; // 右移失活
          this.activePos = len - 1; // 当前报告的时间节点index
          this.reportDetail = res.body[len - 1];
          if (len > 4) {
            const width = totalWidth / 4; // 单个时间item的宽度
            this.itemWidth = width; // 单个时间item的宽度
            this.wrapWidth = width * len; // 外层div.itme-wrap的宽度
            this.wrapLeft = -(width * (len - 4)); // 外层div.itme-wrap的marginLeft
            this.preActive = true; // 左移激活
            this.moveFlag = len - 4; // 当前可移动的个数
          } else {
            const width = totalWidth / len; // 单个时间item的宽度
            this.itemWidth = width; // 单个时间item的宽度
            this.wrapWidth = width * len;
            this.wrapLeft = 0;
            this.preActive = false;
            this.moveFlag = 0;
          }

          this.getReportDetail(res.body[len - 1].id); // 获取报告详情
        }
      })
    },
    // 获取报告详情
    getReportDetail(id) {
      this.$api.postLoanMonitor.showReportPersonal({ reportId: id }).then(res => {
        this.form = res.body
      })
    },
    // 页面宽度变化时，重绘时间轴
    redraw() {
      if (this.itemLen > 0) {
        const len = this.itemLen > 4 ? 4 : this.itemLen;
        const width = document.querySelector('.time-line').offsetWidth / len;
        this.itemWidth = width;
        this.wrapWidth = width * this.itemLen;
        this.wrapLeft = -(width * this.moveFlag);
      }
    },
    // 时间轴：向左
    getPreReport() {
      if (this.preActive) {
        this.wrapLeft = this.wrapLeft + this.itemWidth;
        this.moveFlag--;
        this.nextActive = true;
        if (this.moveFlag === 0) {
          this.preActive = false;
        }
      }
    },
    // 时间轴：向右
    getNextReport() {
      if (this.nextActive) {
        this.wrapLeft = this.wrapLeft - this.itemWidth
        this.moveFlag++;
        this.preActive = true;
        if (this.moveFlag === this.reportList.length - 4) {
          this.nextActive = false;
        }
      }
    },
    // 选择查看某个时间点的报告
    chooseReport(index, item) {
      this.activePos = index;
      this.reportDetail = item;
      this.getReportDetail(item.id);
    },
    // 目录滚动
    scrollTo(item) {
      if (item.target) {
        this.$scrollTo(`${item.target}`, 500, {
          easing: 'ease-in'
        })
        this.curTarget = item.target
      }
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.report-head {
  width: 100%;
  height: 110px;
  border: 1px solid #eee;
  background-color: #f7f7f7;
  overflow: hidden;
  position: relative;
  img {
    width: 60px;
    top: 20px;
    position: relative;
  }
}
.time-box {
  width: 100%;
  height: 84px;
  position: relative;
  line-height: 64px;
  border-bottom: 20px solid #eee;
  .right-box {
    width: 8%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    padding-left: 15px;
    text-align: left;
    margin: 0;
    z-index: 99;
  }
  .left-box {
    width: 18%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 15px;
    margin: 0;
    z-index: 99;
  }
  .time-line {
    position: absolute;
    left: 18%;
    top: 0;
    width: 74%;
    height: 65px;
    display: inline-block;
    overflow: hidden;
  }
  .time-wrap {
    height: 100%;
    transition: all linear 0.5s;
  }
  .time-item {
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    text-align: center;
  }
  .time-item:hover {
    color: #38afff;
  }
  .time-item:hover:after {
    display: block;
    content: "";
    width: 90px;
    height: 1px;
    background-color: #38afff;
    margin: 0 auto;
  }
  .border {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .not-active {
    color: #d2d2d2;
    cursor: default;
  }
  .active {
    color: #38afff;
    cursor: pointer;
  }
  .icon {
    line-height: 64px;
  }
  .text-active {
    font-weight: bold;
    color: #38afff;
  }
  .text-active:after {
    display: block;
    content: "";
    width: 90px;
    height: 1px;
    background-color: #38afff;
    margin: 0 auto;
  }
}
.blue-text {
  color: #429dff;
}
.table-style-1 {
  width: 100%;
  th {
    width: 20%;
    background: #f5f6ff;
    padding: 8px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    border: 1px solid #cce5fd;
  }
  td {
    padding: 8px;
    font-size: 15px;
    border: 1px solid #cce5fd;
    width: 30%;
  }
}
.table-style-2 {
  width: 100%;
  thead {
    th {
      width: 20%;
      font-size: 15px;
      color: #333;
      font-weight: 500;
      padding: 8px;
      background: #f5f6ff;
      border: 1px solid #cce5fd;
    }
  }
  tbody {
    td {
      padding: 8px;
      font-size: 15px;
      border: 1px solid #cce5fd;
    }
  }
}
.table-style-3 {
  width: 100%;
  th {
    width: 16.666%;
    background: #f5f6ff;
    padding: 8px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    border: 1px solid #cce5fd;
  }
  td {
    padding: 8px;
    font-size: 15px;
    border: 1px solid #cce5fd;
    width: 16.666%;
  }
}
.col-width-3 {
  thead {
    th {
      width: 33.333333333333%;
    }
  }
}

.col-width-4 {
  thead {
    th {
      width: 25%;
    }
  }
}

.col-width-5 {
  thead {
    th {
      width: 20%;
    }
  }
}

.col-width-6 {
  thead {
    th {
      width: 16.666666666666%;
    }
  }
}

.col-width-7 {
  thead {
    th {
      width: 14.285714285714%;
    }
  }
}

.col-width-8 {
  thead {
    th {
      width: 12.5%;
    }
  }
}

.col-width-9 {
  thead {
    th {
      width: 11.11111111111%;
    }
  }
}

.col-width-13 {
  thead {
    th {
      width: 7.6923076923076%;
    }
  }
}

section {
  margin-bottom: 36px;
}
.modTitle {
  img {
    vertical-align: sub;
  }
}

.right-nav {
  padding: 1px 12px;
  font-size: 14px;
  .nav-level-first {
    border: 1px solid #eee;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }

  .nav-level-2 {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      cursor: pointer;
    }
  }

  .nav-level-3 {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-left: 16px;
      cursor: pointer;
    }
  }

  .nav-level-4 {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-left: 16px;
    }
  }

  .nav-item-header {
    font-size: 14px;
    padding-left: 16px;
    line-height: 38px;
    border-bottom: 1px solid #ddd;
    background-color: #eee;
  }

  .nav-item-subheader {
    margin-left: 16px;
    padding: 8px 0;
  }
}
.rNo {
  color: #333;
  font-size: 16px;
}
.rNo-time {
  position: absolute;
  right: 60px;
  margin: 0;
  top: 20px;
  font-weight: 500;
  font-size: 14px;
}

.rfNav {
  position: fixed;
  z-index: 2;
  top: 120px;
  overflow-y: auto;
  width: calc(25% - 55px);
}
.xyf {
  margin-left: 10px;
  display: inline-block;
  border: 1px solid #cfa972;
  padding: 4px 10px;
  border-radius: 50px;
  background: #cfa972;
  color: #fff;
  font-size: 14px;
}
.xyf-btn {
  margin-left: 10px;
  display: inline-block;
  padding: 2px 10px;
  height: 25px;
  font-size: 14px;
  margin-top: 10px;
}
.img-icon {
  width: 12px;
  height: 12px;
}
.nactive {
  color: #00965e !important;
  font-weight: 600;
}

.down-load-button {
  position: absolute;
  right: 5px;
  top: 40px;
  border: 1px solid #1976d2;
  padding: 6px 18px;
  display: inline-block;
  border-radius: 3px;
  background: #fff;
}
</style>