<template>
  <div class="business-information"
       v-cloak>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never"
                 class="body-2">
          <div class="apply-information">
            <p class="subheading font-weight-bold">申请信息</p>
            <el-row>
              <el-col :span="8"
                      class="ellipsis">
                <span>申请金额(万元)：</span>
                <span class="grey--text">{{ applyInfo.applyAmount }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>申请期限(月)：</span>
                <span class="grey--text">{{ applyInfo.applyTerm }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>贷款用途：</span>
                <span class="grey--text">
                  {{ applyInfo.loanUse | dictFormat(loanUseDs) }}
                </span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>担保方式：</span>
                <span class="grey--text">{{ applyInfo.assureType }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>担保机构：</span>
                <span class="grey--text">{{ applyInfo.assureOrg }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>申请日期：</span>
                <span class="grey--text">{{ applyInfo.applyTime }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>贷款联系人：</span>
                <span class="grey--text">{{ applyInfo.contactMan }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>联系电话：</span>
                <span class="grey--text">{{ applyInfo.contactPhone }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>联系地址：</span>
                <span class="grey--text">{{ applyInfo.contactAddress }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>申请产品：</span>
                <span class="grey--text">{{ applyInfo.applyProduct }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>所属机构：</span>
                <span class="grey--text">{{ applyInfo.orgName }}</span>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <div class="apply-person-information">
            <p class="subheading font-weight-bold">申请人信息</p>
            <el-row>
              <el-col :span="8"
                      class="ellipsis">
                <span>用户姓名：</span>
                <span class="grey--text">{{ applyInfo.name }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>身份证号：</span>
                <span class="grey--text">{{ applyInfo.idCard }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>联系电话：</span>
                <span class="grey--text">{{ applyInfo.cellphone }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>性别：</span>
                <span class="grey--text">{{ applyInfo.sex }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>出生日期：</span>
                <span class="grey--text">{{ applyInfo.birthday }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>户籍地址：</span>
                <span class="grey--text"
                      :title="applyInfo.residence">{{ applyInfo.residence }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>婚姻状况：</span>
                <span class="grey--text">{{ applyInfo.maritalStatus }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>社保缴存单位：</span>
                <span class="grey--text"
                      :title="applyInfo.company">{{ applyInfo.company }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>最新缴存月份：</span>
                <span class="grey--text">{{ applyInfo.newDepositMonth }}</span>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <div class="apply-qy-information">
            <p class="subheading font-weight-bold">申请企业信息</p>
            <el-row>
              <el-col :span="8"
                      class="ellipsis">
                <span>申请单位：</span>
                <span class="grey--text"
                      :title="companyInfo.companyName">{{ companyInfo.companyName }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>统一社会信用代码：</span>
                <span class="grey--text"
                      :title="companyInfo.companyCode">{{ companyInfo.companyCode }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>法人姓名：</span>
                <span class="grey--text">{{ companyInfo.legalName }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>企业类型：</span>
                <span class="grey--text">{{ companyInfo.companyType }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>注册日期：</span>
                <span class="grey--text">{{ companyInfo.registerTime }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>营业期限：</span>
                <span class="grey--text"
                      :title="companyInfo.operationTerm">{{ companyInfo.operationTerm }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>注册资本：</span>
                <span class="grey--text">{{ companyInfo.registerCapital }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>经营状态：</span>
                <span class="grey--text">{{ companyInfo.companyStatus }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>注册地址：</span>
                <span class="grey--text"
                      :title="companyInfo.registerAddress">{{ companyInfo.registerAddress }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="24">
                <span>经营范围：</span>
                <span class="grey--text">{{ companyInfo.busiScope }}</span>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <div class="mt-3">
            <p class="subheading font-weight-bold">股权结构</p>
            <el-row>
              <el-col :span="24"
                      class="ellipsis">
                <el-table :data="companyInfo.gdList"
                          border
                          style="width: 100%">
                  <el-table-column label="序号"
                                   type="index"
                                   align="center"
                                   width="45" />
                  <el-table-column prop="gdName"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="股东" />
                  <el-table-column :show-overflow-tooltip="true"
                                   align='center'
                                   label="出资比例">
                    <template slot-scope="scope">
                      {{scope.row.gdConprop}}<span v-if="scope.row.gdConprop">%</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="gdSubconam"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="认缴金额(万元)" />
                  <el-table-column prop="gdCondate"
                                   :show-overflow-tooltip="true"
                                   align='center'
                                   label="出资日期" />
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
    information: {
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
      applyInfo: {},
      companyInfo: {},
      baseInfo: {},
      enterpriseInfo: {},
      orgName: null,
      rate: null,
      fx: '',
      fxNum: '0',
      sexDs: [{
        code: 1,
        name: '男'
      }, {
        code: 2,
        name: '女'
      }],
    }
  },
  computed: {
    loanUseDs() {
      return getDictEntrysByCode('QY.BACK.LOAN.USAGE')
    },
    assureTypeDs() {
      return getDictEntrysByCode('FINS_GUARANTEE_TYPE')
    }
  },
  watch: {
    information: {
      handler() {
        this.data = this.information
        if (this.data) {
          this.initData(this.data)
        }
      }
    }
  },
  methods: {
    // 数据初始化
    initData(data) {
      this.getQyApplyBasicInfo(data.applyId, data.custType)
      this.getQyApplyBusinessInfo(data.applyId)
    },
    // 获取申请信息
    getQyApplyBasicInfo(applyId, custType) {
      this.$api.common.getQyApplyBasicInfo({ applyId: applyId, custType: custType }).then(res => {
        this.applyInfo = res.body
      })
    },
    // 获取工商信息
    getQyApplyBusinessInfo(applyId) {
      this.$api.common.getQyApplyBusinessInfo({ applyId: applyId }).then(res => {
        this.companyInfo = res.body
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