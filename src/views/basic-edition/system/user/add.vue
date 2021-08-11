<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" :title="userId ? '编辑用户' : '新增用户'" width="850px" @closed="closed">
      <el-form ref="form" :model="form" :rules="rules" status-icon v-loading="queryLoading">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="120px" prop="userName" label="姓名：">
              <el-input v-model.trim="form.userName" :maxlength="50" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="120px" prop="userCode" label="帐号：">
              <el-input
                v-model.trim="form.userCode"
                :maxlength="50"
                placeholder="请输入账号"
                :disabled="userId ? true : false"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="mb-1">
            <el-form-item class="x-tree" label-width="120px" prop="orgCode" label="所属机构：">
              <treeselect
                ref="orgText1"
                :options="options"
                v-model="form.orgCode"
                :normalizer="normalizer"
                style="height: 28px"
                no-results-text="暂无数据"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="120px" prop="userIdCard" label="身份证号：">
              <el-input v-model.trim="form.userIdCard" :maxlength="18" autocomplete="off" placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="120px" prop="userPhone" label="手机号：">
              <el-input clearable v-model.trim="form.userPhone" :maxlength="11" placeholder="请输入手机号" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="120px" prop="userTellerCode" label="柜员号：">
              <el-input v-model.trim="form.userTellerCode" :maxlength="50" placeholder="请输入柜员号" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="120px" prop="userEmail" label="电子邮箱：">
              <el-input v-model.trim="form.userEmail" :maxlength="18" placeholder="请输入电子邮箱" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="text-right">
        <el-button type="primary" :loading="loading" @click="submitForm('form')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getInfoByIdCard, commonRegex, mappingData, GLOBAL } from '@/utils'
export default {
  name: 'Add',
  components: {
    Treeselect,
  },
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    userId: {
      default: null,
      type: String,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
      queryLoading: false,
      loading: false,
      form: {
        userName: null,
        userCode: null,
        orgCode: null,
        userTellerCode: null,
        userIdCard: null,
        userPhone: null,
        userEmail: null,
        userSex: null,
      },
      options: [],
      rules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        userCode: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/,
            message: '5-20位数字+字母组合，不限制大小写！',
            trigger: 'blur',
          },
        ],
        orgCode: [{ required: true, message: '请选择所属机构', trigger: 'blur' }],
        userIdCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            pattern:
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号格式有误！',
            trigger: 'blur',
          },
        ],
        userTellerCode: [{ required: true, message: '请输入柜员号', trigger: 'blur' }],
        userPhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            pattern: commonRegex('phone'),
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        userEmail: [
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '邮箱格式有误',
            trigger: 'blur',
          },
        ],
      },
      normalizer(node) {
        return {
          id: node.orgCode,
          label: node.orgName,
          children: node.children,
        }
      },
    }
  },
  watch: {
    value(value) {
      this.show = value
      if (this.show) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
        if (this.userId) {
          this.getDetail()
        }
      }
    },
  },
  created() {
    this.getOrganizationTree()
  },
  methods: {
    getOrganizationTree() {
      this.$api.organization.getOrgTree().then((res) => {
        this.options = res ? [res] : []
      })
    },
    getDetail() {
      this.queryLoading = true
      this.$api.user.findById({ userId: this.userId }).then((res) => {
        this.queryLoading = false
        Object.assign(this.form, mappingData(res, this.form))
        this.form.userId = res.userId

        this.$nextTick(() => {
          const strText = this.$refs.orgText1.selectedNodes[0].label
          if (strText.indexOf('unknown') != -1) {
            this.form.orgCode = null
          }
        })
      })
    },
    insertUser() {
      this.loading = true
      this.$api.user
        .insertUser(this.form)
        .then(() => {
          this.loading = false
          this.$message({
            message: GLOBAL.OPERATE_SUCCESS,
            type: 'success',
          })
          this.dialogShowChg()
          this.$emit('refreshTable')
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateUser() {
      this.loading = true
      this.$api.user
        .updateUser(this.form)
        .then(() => {
          this.loading = false
          this.$message({
            message: GLOBAL.OPERATE_SUCCESS,
            type: 'success',
          })
          this.dialogShowChg()
          this.$emit('refreshTable')
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.userSex = getInfoByIdCard(this.form.userIdCard, 2)
          if (this.userId) {
            // 编辑
            this.updateUser()
          } else {
            // 新增
            this.insertUser()
          }
        } else {
          return false
        }
      })
    },
    dialogShowChg() {
      this.$emit('show')
    },
    closed() {
      this.dialogShowChg()
      this.$refs.form.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.x-tree {
  /deep/.vue-treeselect__control {
    height: 28px;
  }
  /deep/.el-form-item__error {
    padding-top: 5px;
  }
}
</style>
