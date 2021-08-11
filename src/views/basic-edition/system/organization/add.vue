<template>
  <div class="add">
    <el-card class="body-2" shadow="never">
      <div slot="header">
        <a @click="goBack" class="black--text">
          <i class="el-icon-arrow-left" />
          <span>{{ cardTitle }}</span>
        </a>
      </div>
      <div>
        <el-form ref="orgForm" :model="form" :rules="rules" label-width="150px" status-icon>
          <el-row :gutter="12">
            <el-col :span="24" v-if="parentName">
              <el-form-item label="上级机构：">
                <span>{{ parentName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="orgName" label="机构名称：">
                <el-input v-model.trim="form.orgName" placeholder="请输入" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="orgCode" label="机构编码：">
                <el-input v-model.trim="form.orgCode" maxlength="50" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="iscredit" label="是否办理信贷业务：">
                <el-select style="width: 100%" v-model="form.iscredit" placeholder="请选择">
                  <el-option v-for="item in isCreditDs" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-show="form.iscredit == 1">
              <el-form-item prop="productList" label="信贷业务范围：">
                <el-checkbox-group v-model="form.productList">
                  <el-checkbox v-for="item in productDs" :key="item.productId" :label="item.productId">
                    {{ item.productName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="orgSort" label="排序序号：">
                <el-input v-model.trim="form.orgSort" maxlength="50" placeholder="数字，例如0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="orgPhone" label="机构电话：">
                <el-input v-model.trim="form.orgPhone" maxlength="50" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="orgAddr" label="机构地址：">
                <el-input v-model.trim="form.orgAddr" maxlength="50" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="location" label="地图坐标：">
                <el-input v-model.trim="form.location" maxlength="50" placeholder="经度、纬度">
                  <el-tooltip slot="suffix" effect="dark" content="地图坐标输入格式为经度、纬度" placement="right">
                    <i class="el-icon-question x-icon"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="orgIntro" label="机构简介：">
                <el-input v-model.trim="form.orgIntro" type="textarea" autosize maxlength="200" show-word-limit placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="orgDescn" label="描述信息：">
                <el-input v-model.trim="form.orgDescn" type="textarea" autosize maxlength="200" show-word-limit placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="keyword" label="辖区关键字：">
                <el-input
                  v-model.trim="form.keyword"
                  type="textarea"
                  placeholder="请输入辖区关键字，顿号分隔"
                  maxlength="200"
                  autosize
                  show-word-limit
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider></el-divider>
        <el-button class="right" type="primary" @click="submitForm('orgForm')"> 提交 </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { deepClone, mappingData, GLOBAL } from '@/utils'
export default {
  name: 'OrgAdd',
  props: {
    selection: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      cardTitle: '',
      form: {
        orgCode: '',
        orgName: '',
        orgPhone: '',
        iscredit: '',
        orgParId: '',
        orgSort: '',
        orgAddr: '',
        latitude: '',
        longitude: '',
        orgIntro: '',
        orgDescn: '',
        keyword: '',
        productList: [],
      },
      parentName: null,
      isCreditDs: [
        { name: '是', code: 1 },
        { name: '否', code: 2 },
      ],
      productDs: [],
      rules: {
        orgName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        orgCode: [{ required: true, message: '请输入机构编码', trigger: 'blur' }],
        iscredit: [
          {
            required: true,
            message: '请选择是否办理信贷业务',
            trigger: 'change',
          },
        ],
        productList: [
          {
            required: true,
            message: '请选择信贷业务范围',
            trigger: 'change',
          },
        ],
        orgSort: [
          { required: true, message: '请输入排序序号', trigger: 'blur' },
          {
            pattern: /^(0|\+?[1-9][0-9]{0,2})$/,
            message: '请输入0或正整数，最大不超过999',
            trigger: 'blur',
          },
        ],
        // orgPhone: [
        //   {
        //     pattern: /^[\d{}\-]*$/,
        //     message: "仅支持输入数字、括号{}、中划线",
        //     trigger: "blur",
        //   },
        // ],
        location: [
          {
            pattern: /^((-?(0|[1-9][0-9]*)(\.\d+)?)+、)(-?(0|[1-9][0-9]*)(\.\d+)?)+$/,
            message: '格式错误，请输入“经度、纬度”',
            trigger: 'blur',
          },
        ],
        keyword: [
          {
            pattern: /^(\w|[\u4E00-\u9FFF]){1,}(、(\w|[\u4E00-\u9FFF]){1,})*$/,
            message: '格式错误，请输入以顿号分割的字符串',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {
    selection: {
      handler(value) {
        this.$nextTick(() => {
          this.$refs.orgForm.resetFields()
          this.form = this.$options.data().form
          if (value) {
            this.initData(value)
          }
        })
      },
      immediate: true,
      deep: true,
    },
    'form.iscredit'(value) {
      if (value == 2) {
        this.form.productList = []
      }
      this.rules.productList[0].required = value == 1
    },
  },
  mounted() {
    this.getProductDs()
  },
  methods: {
    initData(data) {
      if (data.isAdd == 1) {
        this.cardTitle = '新增机构'
        this.parentName = data.orgName
        this.form.orgParId = data.orgParId
      } else {
        this.parentName = data.parentName
        this.cardTitle = '编辑机构'
        this.$api.organization.findById({ orgId: data.orgId }).then((res) => {
          Object.assign(this.form, mappingData(res, this.form))
          this.form.productList = []
          if (res.productList) {
            res.productList.forEach((item) => {
              this.form.productList.push(item.productId)
            })
          }
          if (res.latitude && res.longitude) {
            this.form.location = res.latitude + '、' + res.longitude
          }
          this.form.orgId = data.orgId
        })
      }
    },
    getProductDs() {
      let data = {
        pageNum: 1,
        pageSize: 999,
        productStatus: 1,
      }
      this.$api.product.findByPage(data).then((res) => {
        this.productDs = res.rows
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.location) {
            const location = this.form.location.split('、')
            this.form.longitude = location[0]
            this.form.latitude = location[1]
          }
          const data = deepClone(this.form)
          data.productList.forEach((item, index) => {
            data.productList[index] = { productId: item }
          })
          if (this.selection.isAdd == 1) {
            this.addOrgEvt(data)
          } else {
            this.editOrgEvt(data)
          }
        } else {
          return false
        }
      })
    },
    addOrgEvt(data) {
      this.$api.organization.saveOrg(data).then((res) => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.$emit('refreshTreeNode', res)
      })
    },
    editOrgEvt(data) {
      this.$api.organization.updateOrg(data).then((res) => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.$emit('refreshTreeNode', res)
      })
    },
    goBack() {
      this.$emit('reset-view-type', 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.add {
  /deep/.el-card {
    border: none;
  }
  .x-icon {
    margin-top: 6px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: #1e88e5;
    }
  }
}
</style>