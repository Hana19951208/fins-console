<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="show" :title="title" center append-to-body width="30%"
    @closed="closed">
    <el-form ref="addForm" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item prop="label" label="条件">
        <el-input v-model="form.label" placeholder="请输入连接规则" />
      </el-form-item>
      <el-form-item prop="ruleModel" label="规则项">
        <el-select v-model="form.ruleModel" placeholder="请选择规则项" clearable style="width: 100%" @change="ruleSelect">
          <el-option v-for="item in distributeDs" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item prop="rule" label="规则">
        <el-input v-model="form.rule" :rows="5" type="textarea" placeholder="请输入连接规则" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogShowChg">取 消</el-button>
      <el-button type="primary" @click="submitHandle">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mappingData, getDictEntrysByCode } from '@/utils'
export default {
  name: 'AddEdge',
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    value: {
      type: Boolean,
      default: false
    },
    optionType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      show: false,
      form: {
        id: null,
        rule: null,
        ruleModel: null,
        from: null,
        label: null,
        to: null
      },
      rules: {
        rule: [
          { required: true, message: '请输入连接规则', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title () {
      return this.optionType !== 1 ? '编辑' : '新增' + '连线'
    },
    distributeDs () {
      return getDictEntrysByCode('GRADE.STATE.RULE')
    }
  },
  watch: {
    value (value) {
      this.show = value
      if (value) {
        this.$nextTick(() => {
          if (this.optionType === 1) {
            this.data.id = new Date().getTime()
          }
          this.initEdit(this.data)
        })
      }
    }
  },
  methods: {
    initEdit (data) {
      Object.assign(this.form, mappingData(data, this.form))
    },
    dialogShowChg () {
      this.$emit('show')
    },
    closed () {
      this.dialogShowChg()
    },
    fetchSuggestions (queryString, cb) {
      const results = []
      getDictEntrysByCode('GRADE.STATE.RULE').forEach(item => {
        results.push({ value: item.name, text: item.code })
      })
      cb(results)
    },
    submitHandle () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.optionType === 1) {
            this.$emit('addEdge', this.form)
          } else {
            this.$emit('editEdge', this.form)
          }
          this.dialogShowChg()
        }
      })
    },
    ruleSelect (item) {
      // this.form.rule = this.form.rule + item
      if (this.form.rule) {
        this.form.rule = this.form.rule.replace(/\(\'\S*\'\)/g, '(\'' + item + '\')')
      } else {
        this.form.rule = `${this.form.rule === null ? '' : this.form.rule}context.getValue(${item})`
      }
    }
  }
}
</script>

<style scoped>
</style>
