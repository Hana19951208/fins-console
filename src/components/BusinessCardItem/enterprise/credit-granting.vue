<template>
  <div class="business-loanInfo"
       v-cloak>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <div class="mt-5">
            <p class="title bold">授信记录</p>
            <el-row>
              <el-col :span="24"
                      class="ellipsis">
                <el-table :data="creditInfo"
                          border
                          style="width: 100%">
                  <el-table-column label="序号"
                                   type="index"
                                   align="center"
                                   width="45" />
                  <el-table-column prop="loanAmount"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="授信金额(万元)" />
                  <el-table-column prop="loanTerm"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="授信期限(月)" />
                  <el-table-column prop="loanRate"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="授信年利率(%)" />
                  <el-table-column :show-overflow-tooltip="true"
                                   align='center'
                                   label="资金用途">
                    <template slot-scope="scope">
                      {{scope.row.loanUse | dictFormat(loanUseDs)}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="loanUser"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="授信人" />
                  <el-table-column prop="loanTime"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="授信日期" />
                  <el-table-column prop="remark"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="备注说明" />
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div class="mt-5">
            <p class="title bold">放款记录</p>
            <el-row>
              <el-col :span="24"
                      class="ellipsis">
                <el-table :data="signInfo"
                          border
                          style="width: 100%">
                  <el-table-column label="序号"
                                   type="index"
                                   align="center"
                                   width="45" />
                  <el-table-column prop="signAmount"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="放款金额(万元)" />
                  <el-table-column prop="signTerm"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="放款期限(月)" />
                  <el-table-column prop="signRate"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="放款年利率(%)" />
                  <el-table-column :show-overflow-tooltip="true"
                                   align='center'
                                   label="资金用途">
                    <template slot-scope="scope">
                      {{scope.row.signUse | dictFormat(loanUseDs)}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="signUser"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="放款人" />
                  <el-table-column prop="signTime"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="放款日期" />
                  <el-table-column prop="remark"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="备注说明" />
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getDictEntrysByCode } from '@/utils'
export default {
  props: {
    loanInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isApplicantShow: true,
      isCompanyShow: true,
      isContactShow: true,
      data: null,
      creditInfo: [],
      signInfo: [],
      orgName: null,
      rate: null,
      fx: '',
      fxNum: '0',
    }
  },
  computed: {
    loanUseDs() {
      return getDictEntrysByCode('QY.BACK.LOAN.USAGE')
    }
  },
  watch: {
    loanInfo: {
      handler() {
        this.data = this.loanInfo
        if (this.data) {
          this.initData(this.data)
        }
      }
    }
  },
  methods: {
    // 数据初始化
    initData(data) {
      this.getLoanInfoList(data.applyId)
      this.getSignInfoList(data.applyId)
    },
    // 授信记录表
    getLoanInfoList(applyId) {
      this.$api.common.getLoanInfoList({ applyId: applyId }).then(res => {
        this.creditInfo = res.body
      })
    },
    // 放款记录表
    getSignInfoList(applyId) {
      this.$api.common.getSignInfoList({ applyId: applyId }).then(res => {
        this.signInfo = res.body
      })
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.bold {
  font-weight: bold;
}
.width-full {
  width: 100%;
}
.info-title {
  display: inline-block;
  width: 80px;
  vertical-align: top;
}
.info-content {
  display: inline-block;
  width: calc(100% - 90px);
  vertical-align: top;
}
</style>