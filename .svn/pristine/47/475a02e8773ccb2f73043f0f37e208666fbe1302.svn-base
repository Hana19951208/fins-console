<template>
  <div class="white pa-4 mt-2">
    <el-row :gutter="12">
      <el-col class="mw-4">
        <div class="box" @click="toPage('/exception-mgr/realtime-credit-repair')">
          <p class="num">{{ creditExcepCount }}</p>
          <p class="link">
            <span>数据采集异常</span><i class="el-icon-arrow-right right"></i>
          </p>
        </div>
      </el-col>
      <el-col class="mw-4">
        <div class="box" @click="toPage('/image-upload-repair')">
          <p class="num">{{ custInfoExcepCount }}</p>
          <p class="link">
            <span>资料上传异常</span><i class="el-icon-arrow-right right"></i>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: "first",
      queryForm: {
        type: 1
      },
      firstOptions: {},
      secondOptions: {},
      countItemList: [],
      custInfoExcepCount: 0,
      creditExcepCount: 0
    };
  },
  mounted () {
    this.initQuickNavData();
  },
  methods: {
    initQuickNavData () {
      this.$api.dashboard.getRemind().then(res => {
        // 资料上传异常
        this.custInfoExcepCount = res.body.custInfoExcepCount || 0;
        // 数据采集异常
        this.creditExcepCount = res.body.creditExcepCount || 0;
      });
    },
    toPage (url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="scss" scoped>
.mw-4 {
  width: 160px;
}
.box {
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  p {
    padding: 0 12px;
  }
  .num {
    font-size: 20px;
    text-align: center;
    color: #9c27b0;
    margin: 12px 0;
  }
  .link {
    margin: 0;
    padding: 6px 12px;
    font-size: 14px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
}
</style>
