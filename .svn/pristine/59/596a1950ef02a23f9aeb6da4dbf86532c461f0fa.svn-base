<template>
  <div class="mb-3">
    <el-card :body-style="{padding:'0 20px 20px 20px'}" class="body-2" shadow="never">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <a @click="goBack" class="black--text">
              <i class="el-icon-arrow-left" />
              <span>客户详情</span>
            </a>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper">
        <p class="wrapper-header">申请人基本信息</p>
        <div class="wrapper-body">
          <customer-info :apply-basic-info="infoData" />
        </div>
        <p class="wrapper-header">推广员信息</p>
        <div class="wrapper-body">
          <el-row v-if="infoData.promoterName">
            <el-col :span="8">
              <span>姓名：</span>
              <span class="grey--text">{{ infoData.promoterName }}</span>
            </el-col>
            <el-col :span="8">
              <span>手机号：</span>
              <span class="grey--text">{{ infoData.promoterPhone }}</span>
            </el-col>
            <el-col :span="8">
              <span>身份：</span>
              <span class="grey--text">{{ infoData.promoterIdentity }}</span>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="24">
              <span>无</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="text-center mt-4">
        <el-button @click="goBack">
          <span class="mx-2">返回</span>
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CustomerInfo from '@/components/BusinessCardItem/customer'
export default {
  components: {
    CustomerInfo
  },
  data() {
    return {
      infoData: {}
    }
  },
  mounted() {
    this.initData(this.$route.query.applyId)
  },
  methods: {
    initData(applyId) {
      this.$api.common.getApplyBasicInfo({ applyId: applyId }).then(res => {
        this.infoData = res.body || {}
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  &-header {
    background: aliceblue;
    padding: 8px 4px;
    color: #000;
    border: 1px solid #eee;
  }

  &-body {
    padding: 24px 16px;
    border: 1px solid #eee;
  }
}
</style>
