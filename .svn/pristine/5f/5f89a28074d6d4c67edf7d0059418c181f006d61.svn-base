<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="用户详情" width="850px" @closed="closed">
      <el-row>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">姓名</div>
            <div class="col-item__value">{{ detail.userName || '--' }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">营销编号</div>
            <div class="col-item__value">{{ detail.userCode || '--' }}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-item">
            <div class="col-item__key">所属机构</div>
            <div class="col-item__value">{{ detail.orgName || '--' }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">身份证号</div>
            <div class="col-item__value">{{ detail.userIdCard || '--' }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <div class="col-item__key">手机号</div>
            <div class="col-item__value">{{ detail.userPhone || '--' }}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-item">
            <div class="col-item__key" :style="{ lineHeight: detail.userImg ? '78px' : '38px' }">二维码</div>
            <div class="col-item__value" style="padding-top: 6px">
              <template>
                <img v-if="detail.userImg" :src="'data:image/jpeg;base64, ' + detail.userImg" width="64" height="64" alt="" />
                <el-button type="text" class="ml-4" @click="updateQrCode">更新二维码</el-button>
                <el-button v-if="detail.userImg" type="text" @click="downloadQrCode">下载二维码</el-button></template
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { GLOBAL } from '@/utils'
import { getToken } from '@/utils/auth'
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
      detail: {
        userImg: '',
      },
    }
  },
  watch: {
    value(value) {
      this.show = value
      if (value) {
        this.getUserDetail()
      }
    },
  },
  created() {},
  methods: {
    dialogShowChg() {
      this.$emit('show')
    },
    closed() {
      this.dialogShowChg()
    },
    getUserDetail() {
      this.$api.mrkPerson.getMktUserDetail({ userId: this.selection.userId }).then((resp) => {
        this.detail = resp
      })
    },
    updateQrCode() {
      this.$confirm('确认要更新此用户二维码吗？', '操作提示', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning',
      }).then(() => {
        this.$api.mrkPerson.updateImg({ userId: this.detail.userId }).then(() => {
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.getUserDetail()
        })
      })
    },
    downloadQrCode() {
      window.location.href = process.env.PREFIX_URL + '/sysMktUser/exportImg?token=' + getToken() + '&userId=' + this.detail.userId
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
