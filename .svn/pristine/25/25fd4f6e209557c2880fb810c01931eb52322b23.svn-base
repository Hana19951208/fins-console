<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="用户详情" width="850px" @closed="closed">
      <el-row>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">姓名</div>
            <div class="col-item__value">{{ detail.userName | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">帐号</div>
            <div class="col-item__value">{{ detail.userCode | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-item">
            <div class="col-item__key">所属机构</div>
            <div class="col-item__value">{{ detail.orgName | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">身份证号</div>
            <div class="col-item__value">{{ detail.userIdCard | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">手机号</div>
            <div class="col-item__value">{{ detail.userPhone | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">性别</div>
            <div class="col-item__value">{{ detail.userSex | dictFormat(sexDs) }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">柜员号</div>
            <div class="col-item__value">{{ detail.userTellerCode | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-item">
            <div class="col-item__key">电子邮箱</div>
            <div class="col-item__value">{{ detail.userEmail | isNullOrEmpty }}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-item">
            <div class="col-item__key">授予角色</div>
            <div class="col-item__value">{{ detail.roleList | roleFormat | isNullOrEmpty }}</div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode } from '@/utils'
export default {
  name: 'detail',
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
      detail: {},
    }
  },
  computed: {
    sexDs() {
      return getDictEntrysByCode('SYS.USER.SEX')
    },
  },
  watch: {
    value(value) {
      this.show = value
      if (value) {
        this.detail = {}
        this.getDetail()
      }
    },
  },
  created() {},
  filters: {
    roleFormat(val) {
      let roles = []
      if (val && val.length > 0) {
        val.forEach((item) => {
          roles.push(item.roleName + (item.appsName ? `(${item.appsName})` : ''))
        })
      }
      return roles.join('；')
    },
  },
  methods: {
    dialogShowChg() {
      this.$emit('show')
    },
    closed() {
      this.dialogShowChg()
    },
    getDetail() {
      this.$api.user.findById({ userId: this.selection.userId }).then((resp) => {
        this.detail = resp
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.col-item {
  display: flex;
  line-height: 38px;
  margin: 2px;
  border: 1px solid #f8f8f8;
  .col-item__key {
    padding-left: 20px;
    flex: 0 0 150px;
    background-color: #f8f8f8;
  }
  .col-item__value {
    flex: 1 1 auto;
    padding-left: 20px;
  }
}
</style>
