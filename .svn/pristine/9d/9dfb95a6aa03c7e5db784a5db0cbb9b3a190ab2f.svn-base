<template>
  <div class="add-app">
    <el-card class="body-2" shadow="never">
      <div slot="header">
        <a @click="goBack" class="black--text">
          <i class="el-icon-arrow-left" />
          <span>{{ modTitle }}</span>
        </a>
      </div>
      <div>
        <el-form ref="addForm" :model="form" :rules="rules" label-width="120px" :status-icon="false">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="productName" label="产品名称：" label-width="120px">
                <el-input v-model.trim="form.productName" placeholder="请输入产品名称" maxlength="50" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productCode" label="产品编码：" label-width="120px">
                <el-input :disabled="isEdit" v-model.trim="form.productCode" placeholder="请输入产品编码" maxlength="50" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productAmount" label-width="120px">
                <span slot="label"> <i style="color: #f56c6c; margin-right: 4px">*</i>额度范围： </span>
                <el-input style="width: calc(50% - 18px)" v-model.trim="form.productMinAmount" placeholder="￥" maxlength="50" clearable>
                  <span slot="suffix">万元</span>
                </el-input>
                <span class="mx-2 grey--text">~</span>
                <el-input style="width: calc(50% - 18px)" v-model.trim="form.productMaxAmount" placeholder="￥" maxlength="50" clearable>
                  <span slot="suffix">万元</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productRate" label-width="120px">
                <span slot="label"> <i style="color: #f56c6c; margin-right: 4px">*</i>年利率范围： </span>
                <el-input style="width: calc(50% - 18px)" v-model.trim="form.productMinRate" maxlength="50" clearable>
                  <span slot="suffix">%</span>
                </el-input>
                <span class="mx-2 grey--text">~</span>
                <el-input style="width: calc(50% - 18px)" v-model.trim="form.productMaxRate" maxlength="50" clearable>
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productDeadline" label-width="120px">
                <span slot="label"> <i style="color: #f56c6c; margin-right: 4px">*</i>申请期限： </span>
                <el-input style="width: calc(50% - 18px)" v-model.trim="form.productMinDeadline" maxlength="50" clearable>
                  <span slot="suffix">月</span>
                </el-input>
                <span class="mx-2 grey--text">~</span>
                <el-input style="width: calc(50% - 18px)" v-model.trim="form.productMaxDeadline" maxlength="50" clearable>
                  <span slot="suffix">月</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="productTel" label="客服电话：" label-width="120px">
                <el-input
                  v-model.trim="form.productTel"
                  type="textarea"
                  placeholder="请输入客服电话"
                  maxlength="100"
                  show-word-limit
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="productFeature" label="产品特点：" label-width="120px">
                <el-input
                  v-model.trim="form.productFeature"
                  type="textarea"
                  maxlength="100"
                  show-word-limit
                  placeholder="请输入产品特点"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="productIntroduce" label="产品介绍：" label-width="120px">
                <quill v-model.trim="form.productIntroduce" placeholder="请输入产品介绍" ref="editor" :numberOfWords="4096" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-center mt-4">
          <el-button :loading="loading" @click="submitForm('addForm')" type="primary" id="submit-btn"> 提交 </el-button>
          <el-button id="back-btn" @click="goBack">
            <span class="mx-2">返回</span>
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from '@/utils'
import quill from '@/components/QuillEdit'
export default {
  components: {
    quill,
  },
  data() {
    var validateAmount = (rule, value, callback) => {
      let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
      let [productMinAmount, productMaxAmount] = [this.form.productMinAmount, this.form.productMaxAmount]
      if (!productMinAmount || !productMaxAmount) {
        callback(new Error('请输入额度最小值和最大值'))
      } else if (!reg.test(productMinAmount) || productMinAmount == 0 || !reg.test(productMaxAmount) || productMaxAmount == 0) {
        callback(new Error('请输入正数，且最多保留两位小数'))
      } else if (Number(productMaxAmount) <= Number(productMinAmount)) {
        callback(new Error('最大值必须大于最小值'))
      } else if (Number(productMinAmount) > 50 || Number(productMaxAmount) > 50) {
        callback(new Error('额度不能超过50万元'))
      } else {
        callback()
      }
    }

    var validateRate = (rule, value, callback) => {
      let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/
      let [productMinRate, productMaxRate] = [this.form.productMinRate, this.form.productMaxRate]
      if (!productMinRate || !productMaxRate) {
        callback(new Error('请输入年利率最小值和最大值'))
      } else if (!reg.test(productMinRate) || !reg.test(productMaxRate)) {
        callback(new Error('请输入0或者正数，且最多保留4位小数'))
      } else if (Number(productMaxRate) <= Number(productMinRate)) {
        callback(new Error('最大值必须大于最小值'))
      } else if (Number(productMinRate) > 100 || Number(productMaxRate) > 100) {
        callback(new Error('年利率不能超过100%'))
      } else {
        callback()
      }
    }
    var validateTerm = (rule, value, callback) => {
      let reg = /^([1-9][0-9]*)$/
      let [productMinDeadline, productMaxDeadline] = [this.form.productMinDeadline, this.form.productMaxDeadline]
      if (!productMinDeadline || !productMaxDeadline) {
        callback(new Error('请输入申请期限最小值和最大值'))
      } else if (!reg.test(productMinDeadline) || !reg.test(productMaxDeadline)) {
        callback(new Error('请输入正整数'))
      } else if (Number(productMinDeadline) > 60 || Number(productMaxDeadline) > 60) {
        callback(new Error('申请期限不能超过60个月'))
      } else if (Number(productMaxDeadline) <= Number(productMinDeadline)) {
        callback(new Error('最大值必须大于最小值'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      loading: false,
      isEdit: false,
      form: {
        productName: null,
        productCode: null,
        productMinAmount: null,
        productMaxAmount: null,
        productMinRate: null,
        productMaxRate: null,
        productMinDeadline: null,
        productMaxDeadline: null,
        productTel: null,
        productFeature: null,
        productIntroduce: null,
      },
      rules: {
        productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        productCode: [{ required: true, message: '请输入产品编码', trigger: 'blur' }],
        productAmount: [{ validator: validateAmount, trigger: 'blur' }],
        productRate: [{ validator: validateRate, trigger: 'blur' }],
        productDeadline: [{ validator: validateTerm, trigger: 'blur' }],
        productTel: [{ required: true, message: '请输入客服电话', trigger: 'blur' }],
        productFeature: [{ required: true, message: '请输入产品特点', trigger: 'blur' }],
      },
    }
  },
  computed: {
    modTitle() {
      return this.$route.query.id ? '编辑产品' : '新增产品'
    },
  },
  mounted() {
    const productId = this.$route.query.id
    if (productId) {
      this.isEdit = true
      this.$api.product.findById({ productId }).then((res) => {
        Object.assign(this.form, mappingData(res, this.form))
        this.form.productId = productId
      })
    }
  },
  methods: {
    addProduct() {
      this.loading = true
      this.$api.product
        .addProduct(this.form)
        .then(() => {
          this.loading = false
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.goBack()
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateProduct() {
      this.loading = true
      this.$api.product
        .updateProduct(this.form)
        .then(() => {
          this.loading = false
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.goBack()
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.productId) {
            this.updateProduct()
          } else {
            this.addProduct()
          }
        } else {
          return false
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.add-app {
  /deep/.ql-editor.ql-blank::before {
    font-style: normal;
    color: #c0c4cc;
    font-synthesis: 13px;
  }
  /deep/.el-divider--horizontal {
    margin: 12px 0;
  }
  /deep/.el-dialog__headerbtn {
    top: 10px;
  }
  .x-icon {
    cursor: pointer;
  }
}
</style>
