<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      :title="selection && selection.roleId ? '编辑角色' : '新增角色'"
      width="50%"
      @closed="closed"
    >
      <el-form ref="addForm" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="roleName" label="角色名称：">
              <el-input v-model.trim="form.roleName" :maxlength="50" autocomplete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="roleCode" label="角色编码：">
              <el-input v-model.trim="form.roleCode" :maxlength="50" autocomplete="off" placeholder="请以ROLE_开头" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="roleRemark" label="描述信息：">
              <el-input
                v-model.trim="form.roleRemark"
                :maxlength="200"
                :rows="5"
                show-word-limit
                placeholder="请输入"
                autocomplete="off"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer text-right">
        <el-button type="primary" @click="submitForm('addForm')">
          <span class="mx-2">保存</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { GLOBAL, mappingData } from '@/utils'

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
    selection: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      form: {
        roleName: null,
        roleCode: null,
        roleRemark: null,
      },
      options: [],
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          {
            pattern: /^ROLE_.+$/,
            message: '您输入的角色编码格式不正确',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {
    value(value) {
      this.show = value
      if (value) {
        this.$nextTick(() => {
          this.form = this.$options.data().form
          this.$refs.addForm.resetFields()
          if (this.selection) {
            Object.assign(this.form, mappingData(this.selection, this.form))
            this.form.roleId = this.selection.roleId
          }
        })
      }
    },
  },
  methods: {
    dialogShowChg() {
      this.$emit('show')
    },
    getRoleById(id) {
      this.form = this.$options.data().form
      if (this.$refs.addForm) {
        this.$refs.addForm.resetFields()
      }
      if (id) {
        this.$api.role.getRoleById({ id }).then((res) => {
          Object.assign(this.form, mappingData(res, this.form))
        })
      }
    },
    insertRole() {
      this.$api.role.saveRole(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.dialogShowChg()
        this.$emit('refreshTable')
      })
    },
    updateRole() {
      this.$api.role.updateRole(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.dialogShowChg()
        this.$emit('refreshTable')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.roleId) {
            // 编辑
            this.updateRole()
          } else {
            // 新增
            this.insertRole()
          }
        } else {
          return false
        }
      })
    },
    closed() {
      this.dialogShowChg()
    },
  },
}
</script>

<style scoped></style>
