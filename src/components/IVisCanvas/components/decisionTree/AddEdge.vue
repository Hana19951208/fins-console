<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="show" :title="title" center append-to-body width="30%"
    @closed="closed">
    <el-form ref="addForm" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item prop="label" label="条件名称">
        <el-autocomplete v-model="form.label" :fetch-suggestions="fetchSuggestions" style="width: 100%"
          placeholder="请输入内容" @select="autocompleteChange" />
      </el-form-item>
      <el-form-item prop="rule" label="规则">
        <el-input v-model="form.rule" placeholder="请输入连接规则" />
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
      return this.optionType !== 1 ? '决策树' + '编辑' : '新增' + '连线'
    },
    distributeDs () {
      return getDictEntrysByCode('GRADE.DISTRIBUTE.VARIABLE')
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
    autocompleteChange (e) {
      this.form.rule = e.code
    },
    fetchSuggestions (queryString, cb) {
      console.info(queryString)
      const results = []
      getDictEntrysByCode('GRADE.DISTRIBUTE.VARIABLE').forEach(item => {
        console.info(item)
        results.push({ code: item.code, value: item.name })
      })
      console.info(results)
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
    }
  }
}
</script>

<style scoped>
</style>
