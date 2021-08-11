<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="show" :title="title" center width="30%" append-to-body
    @closed="closed">
    <el-form ref="addForm" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item prop="code" label="节点编码">
        <el-input v-model="form.code" placeholder="请输入节点编码" />
      </el-form-item>
      <el-form-item prop="name" label="节点名称">
        <el-input v-model="form.name" placeholder="请输入节点名称" />
      </el-form-item>
      <el-form-item prop="shape" label="节点类型">
        <el-select v-model="form.shape" style="width: 100%" placeholder="请选择">
          <el-option v-for="item in shapeDs" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item prop="color" label="节点颜色">
        <el-color-picker v-model="form.color" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogShowChg">取 消</el-button>
      <el-button type="primary" @click="addNode">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mappingData } from '@/utils'
export default {
  name: 'AddNode',
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
        code: null,
        name: null,
        label: null,
        color: '#2B7CE9',
        type: null,
        shape: null,
        x: null,
        y: null
      },
      rules: {
        // code: [
        //   { required: true, message: '请输入调查策略编码', trigger: 'blur' }
        // ],
        name: [
          { required: true, message: '请输入调查策略名称', trigger: 'blur' }
        ],
        shape: [
          { required: true, message: '请选择节点形状', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title () {
      return (this.optionType !== 1 ? '编辑' : '新增') + '节点'
    },
    shapeDs () {
      return [
        { name: '条件', code: 'box' },
        { name: '动作', code: 'ellipse' }
        // { name: '椭圆', code: 'ellipse' },
        // { name: '长方形', code: 'box' },
        // { name: '菱形', code: 'diamond' }
      ]
    }
  },
  watch: {
    value (value) {
      this.show = value
      if (value) {
        this.$nextTick(() => {
          this.initEdit(this.data)
        })
      }
    }
  },
  methods: {
    dialogShowChg () {
      this.$emit('show')
    },
    initEdit (data) {
      data.color = data.color && data.color.background ? data.color.background : null
      Object.assign(this.form, mappingData(data, this.form))
    },
    addNode () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.form.type = this.form.shape === 'box' ? 1 : 2
          if (this.optionType === 1) {
            this.$emit('addNode', this.form)
          } else {
            this.$emit('editNode', this.form)
          }
          this.dialogShowChg()
        }
      })
    },
    closed () {
      Object.keys(this.form).forEach(filed => {
        this.form[filed] = null
      })
      this.dialogShowChg()
    }
  }
}
</script>

<style scoped>
</style>
