<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      :title="selection.moduleId ? '编辑资源' : '新增资源'"
      width="50%"
      @closed="closed"
    >
      <el-form ref="addForm" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item prop="moduleName" label="模块名称：">
              <el-input v-model.trim="form.moduleName" placeholder="请输入模块名称" maxlength="50" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="moduleCode" label="模块编码：">
              <el-input v-model.trim="form.moduleCode" placeholder="请输入模块编码" maxlength="50" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="colType" label="列类型：">
              <el-select v-model.trim="form.colType" style="width: 100%" placeholder="请选择" clearable>
                <el-option v-for="item in colTypeDs" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="moduleSort" label="排序序号：">
              <el-input v-model.trim="form.moduleSort" placeholder="数字，例如0" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="reqAddr" label="接口服务地址：">
              <el-input v-model.trim="form.reqAddr" placeholder="请输入接口服务地址" maxlength="50" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item prop="reqMethod" label="接口请求方式：">
              <el-select v-model.trim="form.reqMethod" style="width: 100%" placeholder="请选择" clearable>
                <el-option v-for="item in requestType" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-right">
        <!-- <el-button @click="dialogShowChg">
          <span class="mx-2">关闭</span>
        </el-button> -->
        <el-button type="primary" @click="submitForm('addForm')">
          <span class="mx-2">提交</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  components: {},
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
      form: {
        appsId: null,
        colType: null,
        moduleChannel: null,
        moduleCode: null,
        moduleName: null,
        moduleSort: null,
        reqAddr: null,
        reqMethod: null,
      },
      rules: {
        moduleName: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
        moduleCode: [{ required: true, message: '请输入模块编码', trigger: 'blur' }],
        colType: [{ required: true, message: '请选择列类型', trigger: 'change' }],
        moduleSort: [
          { required: true, message: '请输入排序序号', trigger: 'blur' },
          {
            pattern: /^(0|\+?[1-9][0-9]{0,2})$/,
            message: '请输入0或正整数，最大不超过999',
            trigger: 'blur',
          },
        ],
        reqAddr: [{ required: true, message: '请输入接口服务地址', trigger: 'blur' }],
        reqMethod: [{ required: true, message: '请选择接口请求方式', trigger: 'change' }],
      },
    }
  },
  computed: {
    colTypeDs() {
      return [
        {
          name: 'C12',
          code: 'C12',
        },
        {
          name: 'C24',
          code: 'C24',
        },
      ]
    },
    requestType() {
      return [
        {
          name: 'GET',
          code: 'GET',
        },
        {
          name: 'POST',
          code: 'POST',
        },
      ]
    },
  },
  watch: {
    value(value) {
      this.show = value
      if (this.value) {
        this.$nextTick(() => {
          this.$refs.addForm.resetFields()
          this.form = this.$options.data().form
          Object.assign(this.form, mappingData(this.selection, this.form))
          if (this.selection.moduleId) {
            this.form.moduleId = this.selection.moduleId
          }
        })
      }
    },
  },
  methods: {
    dialogShowChg() {
      this.$emit('show')
    },
    insertResource() {
      this.$api.resource.saveHomeResource(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.dialogShowChg()
        this.$emit('refreshTable')
      })
    },
    updateResource() {
      this.$api.resource.updateHomeResource(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.dialogShowChg()
        this.$emit('refreshTable')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.moduleId) {
            this.updateResource()
          } else {
            this.insertResource()
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
