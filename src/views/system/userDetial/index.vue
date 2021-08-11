<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" center title="个人信息" @closed="dialogShowChg">
      <el-form ref="form" :model="selection" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input v-model="selection.userName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="帐号：">
              <el-input v-model="selection.userCode" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属机构：">
              <el-input v-model="selection.orgName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号：">
              <el-input v-model="selection.idCard" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-input v-model="selection.gender" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：">
              <el-input v-model="selection.mobilePhone" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱：">
              <el-input v-model="selection.email" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期：">
              <el-input v-model="selection.birthday" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mappingData, getInfoByIdCard } from '@/utils'
export default {
  name: 'UserDetial',
  filters: {
    Filtsexy(data) {
      if (data === 'M') {
        return '男'
      } else if (data === 'F') {
        return '女'
      } else {
        return '未知'
      }
    },
  },
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    selection: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  watch: {
    value(value) {
      this.show = value
      if (this.show) {
        this.$nextTick(() => {
          this.selection.gender = this.selection.gender == 'M' ? '男' : this.selection.gender == 'F' ? '女' : '未知'
          this.selection.birthday = getInfoByIdCard(this.selection.idCard, 1)
          this.$forceUpdate()
        })
      }
    },
  },
  methods: {
    dialogShowChg() {
      this.$emit('show')
    },
    initEdit(data) {
      Object.assign(this.form, mappingData(data, this.form))
    },
  },
}
</script>

<style  lang="scss">
.el-input.is-disabled .el-input__inner {
  color: #333 !important;
}
</style>
