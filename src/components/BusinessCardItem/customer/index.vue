<template>
  <div class="customer-info-page">
    <div>
      <el-row>
        <el-col :span="8">
          <span>姓名：</span>
          <span class="grey--text">{{ applyBasicInfo.name }}</span>
        </el-col>
        <el-col :span="8">
          <span>身份证号：</span>
          <span class="grey--text">{{ applyBasicInfo.idCard }}</span>
        </el-col>
        <el-col :span="8">
          <span>借款用途：</span>
          <span class="grey--text">{{applyBasicInfo.loanUsage | dictFormats(loanUsageDs)}}</span>
        </el-col>
      </el-row>
      <el-row class="mt-4">
        <el-col :span="8">
          <span>申请编号：</span>
          <span class="grey--text">{{ applyBasicInfo.applyId }}</span>
        </el-col>
        <el-col :span="8">
          <span>申请时间：</span>
          <span class="grey--text">{{ applyBasicInfo.applyTime }}</span>
        </el-col>
        <el-col :span="8">
          <span>手机号：</span>
          <span class="grey--text">{{ applyBasicInfo.cellphone }}</span>
        </el-col>
      </el-row>
      <el-row class="mt-4">
        <el-col :span="8">
          <span>所属客户群体：</span>
          <span class="grey--text">{{ applyBasicInfo.customerGroup }}</span>
        </el-col>
        <el-col :span="8">
          <span>性别：</span>
          <span class="grey--text">{{ applyBasicInfo.sex }}</span>
        </el-col>
        <el-col :span="8">
          <span>婚姻状态：</span>
          <span class="grey--text">{{ applyBasicInfo.maritalStatus | dictFormats(maritalStatusDs) }}</span>
        </el-col>
      </el-row>
      <el-row class="mt-4">
        <el-col :span="8">
          <span>学历：</span>
          <span class="grey--text">{{ applyBasicInfo.highestEducation }}</span>
        </el-col>
        <el-col :span="8">
          <span>紧急联系人：</span>
          <span class="grey--text">{{ applyBasicInfo.iceName }}</span>
        </el-col>
        <el-col :span="8">
          <span>紧急联系人手机号：</span>
          <span class="grey--text">{{ applyBasicInfo.icePhone }}</span>
        </el-col>
      </el-row>
      <el-row class="mt-4">
        <el-col :span="24">
          <span>居住地址：</span>
          <span class="grey--text">{{ applyBasicInfo.address }}</span>
        </el-col>
      </el-row>

      <el-row class="mt-4">
        <el-col :span="24">
          <span>工作单位：</span>
          <span class="grey--text">{{ applyBasicInfo.company }}</span>
        </el-col>
      </el-row>

      <el-row class="mt-4">
        <el-col :span="24">
          <span>企业名称：</span>
          <span class="grey--text">{{ applyBasicInfo.companyName || '无' }}</span>
        </el-col>
      </el-row>

      <el-row class="mt-4">
        <el-col :span="8">
          <span>授信金额(元)：</span>
          <span class="grey--text">{{ applyBasicInfo.loanAmount |formatMoney }}</span>
        </el-col>
        <el-col :span="8">
          <span>参考利率(年)：</span>
          <span class="grey--text">{{ applyBasicInfo.loanRate | limitFormat(4) }}%</span>
        </el-col>
      </el-row>

      <el-row class="mt-4">
        <el-col :span="8">
          <span>营销编号：</span>
          <span class="grey--text">{{ applyBasicInfo.referenceNo || '\\' }}</span>
        </el-col>
        <el-col :span="8">
          <span>营销人姓名：</span>
          <span class="grey--text">{{ applyBasicInfo.referenceUserName || '\\' }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDictEntrysByCode } from '@/utils'
export default {
  props: {
    applyBasicInfo: {
      type: Object,
      default: () => { }
    }
  },
  filters: {
    limitFormat (val, len) {
      if (!val) return ''
      val = Number(val) * 100
      let targets = val.toString().split('.')
      if (targets.length > 1) {
        return targets[0] + "." + targets[1].substr(0, len);
      } else {
        return val
      }

    }
  },
  data () {
    return {}
  },
  computed: {
    loanUsageDs () {
      return getDictEntrysByCode('LOAN.USAGE')
    },
    maritalStatusDs () {
      return getDictEntrysByCode('MARITAL_STATUS')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
