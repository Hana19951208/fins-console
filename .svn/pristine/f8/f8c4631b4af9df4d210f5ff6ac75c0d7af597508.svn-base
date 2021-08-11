<template>
  <div>
    <div class="rank-btn-group mb-3">
      <el-button-group>
        <el-button :type="tab.selected ? 'primary' : ''"
                   :key="index"
                   @click="getRankData(tab)"
                   v-for="(tab, index) in tabList">
          <span class="mx-2">{{ tab.name }}</span>
        </el-button>
      </el-button-group>
    </div>
    <div class="rank-main">
      <ul class="rank-list">
        <li class="rank-list-item clearfix"
            v-for="(item,index) in bankList"
            :key="index">
          <span class="left">
            <span class="rank-list-item__rank mr-2 text-center"
                  :class="{'red':index===0, 'orange':index===1, 'yellow': index===2}">{{ index + 1 }}</span>
            <span>{{item.bankName}}</span>
          </span>
          <span class="right">{{item.sumMoney}}万</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [{
        selected: true,
        name: '本月',
        code: 1
      }, {
        selected: false,
        name: '全年',
        code: 2
      }, {
        selected: false,
        name: '全部',
        code: 3
      }],
      bankList: [],
    }
  },
  mounted() {
    this.getRankData(this.tabList[0])
  },
  methods: {
    getRankData(tab) {
      this.tabList.map(item => item.selected = false)
      tab.selected = true
      this.$api.dashboard.getQdtFkInfo({ type: tab.code }).then(res => {
        this.bankList = res.body
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.rank-main {
  width: 100%;
  overflow: auto;
  height: 432px;
}
.rank-list {
  width: 100%;
  padding: 0 12px 0 0;
  margin: 0;
}
.rank-list-item {
  font-size: 14px;
  width: 100%;
  height: 36px;
  line-height: 36px;
  list-style: none;
  &__rank {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background-color: grey;
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    vertical-align: middle;
  }
}
.red {
  background-color: red;
}
.orange {
  background-color: orange;
}
.yellow {
  background-color: yellow;
}
</style>