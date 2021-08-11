<template>
  <div class="business-status">
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <el-form label-width="130px">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="企业名称:">
                  {{ statusInfo.qyName }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24"
                    v-if="rejectCont">
              <el-col :span="24">
                <el-form-item label="未通过原因:">
                  {{ rejectCont }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="22"
                      :offset="2">
                <el-steps direction="vertical"
                          :active="progressList.length - 1"
                          finish-status="success"
                          class="my-steps">
                  <el-step v-for="(item,index) in progressList"
                           :key="index">
                    <div slot="title">
                      <span class="body-3 teal--text">{{item.findings | dictFormat(applyFindingsDs)}}</span>
                    </div>
                    <template slot="description">
                      <div>
                        <p class="grey--text body-2"
                           v-if="item.orgName">机构：{{ item.orgName }}</p>
                        <p class="grey--text body-2"
                           v-if="item.managerName">操作人：{{ item.managerName }}</p>
                        <p class="grey--text body-2">操作时间：{{ item.createTime }}</p>
                        <p class="grey--text body-2">操作内容：{{ item.options }}</p>
                      </div>
                    </template>
                  </el-step>
                </el-steps>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getDictEntrysByCode } from '@/utils'
export default {
  props: {
    statusInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      data: null,
      progressList: [],
      rejectCont: null
    }
  },
  computed: {
    applyFindingsDs() {
      return getDictEntrysByCode('APPLY_FINDINGS')
    }
  },
  watch: {
    statusInfo: {
      handler() {
        this.data = this.statusInfo
        if (this.data) {
          this.initData(this.data)
        }
      }
    }
  },
  methods: {
    // 数据初始化
    initData(data) {
      this.loading = true
      const queryParams = {
        applyId: data.applyId
      }
      this.$api.common.getApplyProgress(queryParams).then(res => {
        this.progressList = res.body
        this.loading = false
      })
      // 获取申请信息
      this.$api.common.getQyApplyBasicInfo({ applyId: data.applyId, custType: data.custType }).then(res => {
        this.rejectCont = res.body.rejectCont
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.my-steps {
  /deep/.el-step__head.is-success {
    color: #0d8bfb;
    border-color: #0d8bfb;
  }
  /deep/.el-step__title.is-success {
    color: #9e9e9e;
  }
  /deep/.is-process {
    .el-step__icon.is-text {
      background-color: #0d8bfb;
    }
    .el-step__icon-inner {
      color: #fff;
    }
  }
  /deep/.el-step__head.is-process {
    color: #303133;
    border-color: #0d8bfb;
  }
}
</style>