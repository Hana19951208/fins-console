<template>
  <div class="detail-page">
    <el-card class="body-2" shadow="never">
      <div slot="header">
        <a @click="goBack" class="black--text">
          <i class="el-icon-arrow-left" />
          <span>应用详情</span>
        </a>
      </div>
      <div>
        <el-row>
          <el-col :span="24" class="mb-4">
            <i-cell title="应用名称：" :value="detail.appsName || '--'" />
          </el-col>
          <el-col :span="24" class="mb-4">
            <i-cell title="应用描述：" :value="detail.appsRemark || '--'" />
          </el-col>
          <el-col :span="24" class="mb-4">
            <i-cell title="登录回调地址：" :value="detail.appsLoginUrl || '--'" />
          </el-col>
          <el-col :span="24" class="mb-4">
            <i-cell title="登出回调地址：" :value="detail.appsLogoutUrl || '--'" />
          </el-col>
          <el-col :span="24" class="mb-4 x-cell">
            <i-cell title="APPID：">
              <span slot="value">
                <el-input style="width: 300px" v-model="appsAppid" readonly> </el-input>
                <i v-if="appsAppid" class="el-input__icon el-icon-view x-icon" @click="encryptToggle"></i>
              </span>
            </i-cell>
          </el-col>
          <el-col :span="24" class="mb-4">
            <i-cell title="应用图标：">
              <span slot="value">
                <img :src="detail.appsIconUrl" class="x-img" width="150px" @click="previewImg" />
              </span>
            </i-cell>
          </el-col>
          <el-col :span="24" class="mb-4">
            <i-cell title="客户端配置：">
              <span slot="value">
                <span>{{ detail.appsClientType | dictFormats(clientDs, '、') }}</span>
              </span>
            </i-cell>
          </el-col>
        </el-row>
        <div class="text-center mt-4">
          <el-button @click="goBack">
            <span class="mx-2">返回</span>
          </el-button>
        </div>
      </div>
    </el-card>
    <el-dialog width="600px" class="text-center" :visible.sync="preview">
      <img width="100%" :src="detail.appsIconUrl" />
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode } from '@/utils'
import ICell from '@/components/ICell'
export default {
  components: {
    ICell,
  },
  data() {
    return {
      detail: {},
      encrypt: true,
      appsAppid: null,
      preview: false,
    }
  },
  computed: {
    clientDs() {
      return getDictEntrysByCode('SYS.COM.CLIENT.TYPE')
    },
  },
  mounted() {
    const appsId = this.$route.query.id
    this.$api.application.findById({ appsId }).then((res) => {
      this.detail = res
      this.appsAppid = res.appsAppid || ''
      this.encryptToggle()
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    encryptToggle() {
      let appsAppid = this.detail.appsAppid
      if (this.encrypt) {
        this.appsAppid = appsAppid.replace(appsAppid.substring(8, 28), '****************')
      } else {
        this.appsAppid = appsAppid
      }
      this.encrypt = !this.encrypt
    },
    previewImg() {
      this.preview = true
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-page {
  /deep/.el-divider--horizontal {
    margin: 12px 0;
  }
  /deep/.el-dialog__headerbtn {
    top: 10px;
  }
  .x-cell {
    /deep/.i-cell__title {
      line-height: 40px;
    }
  }
  .x-icon,
  .x-img {
    cursor: pointer;
  }
}
</style>
