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
                <el-input v-model="form.orgName" placeholder="请输入" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="orgCode" label="机构编码：">
                <el-input v-model="form.orgCode" maxlength="50" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="orgPhone" label="机构电话：">
                <el-input v-model="form.orgPhone" maxlength="50" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="orgSort" label="排序序号：">
                <el-input v-model="form.orgSort" maxlength="50" placeholder="数字，例如0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="location" label="地图坐标：">
                <el-input v-model="form.location" maxlength="50" placeholder="经度、纬度">
                  <el-tooltip slot="suffix" effect="dark" content="地图坐标输入格式为经度、纬度" placement="right">
                    <i class="el-icon-question x-icon"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="orgAddr" label="机构地址：">
                <el-input v-model="form.orgAddr" maxlength="50" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="orgIntro" label="机构简介：">
                <el-input v-model="form.orgIntro" type="textarea" autosize maxlength="200" show-word-limit placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider></el-divider>
        <el-button class="right" type="primary" :loading="loading" @click="submitForm('orgForm')"> 提交 </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from '@/utils'
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
      loading: false,
      form: {
        orgCode: '',
        orgName: '',
        orgPhone: '',
        orgParId: '',
        orgSort: '',
        orgAddr: '',
        latitude: '',
        longitude: '',
        orgIntro: '',
        location: '',
      },
      parentName: null,
      productDs: [],
      rules: {
        orgName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        orgCode: [{ required: true, message: '请输入机构编码', trigger: 'blur' }],
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
        //     message: '仅支持输入数字、括号{}、中划线',
        //     trigger: 'blur',
        //   },
        // ],
        location: [
          {
            pattern: /^((-?(0|[1-9][0-9]*)(\.\d+)?)+、)(-?(0|[1-9][0-9]*)(\.\d+)?)+$/,
            message: '格式错误，请输入“经度、纬度”',
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
        Object.assign(this.form, mappingData(data, this.form))
        this.form.orgId = data.orgId
        if (data.latitude && data.longitude) {
          this.form.location = data.latitude + '、' + data.longitude
        }
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
          if (this.selection.isAdd == 1) {
            this.addOrgEvt()
          } else {
            this.editOrgEvt()
          }
        } else {
          return false
        }
      })
    },
    addOrgEvt() {
      this.loading = true
      this.$api.mrkOrg
        .saveOrg(this.form)
        .then((res) => {
          this.loading = false
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.$emit('refreshTreeNode', res)
        })
        .catch(() => {
          this.loading = false
        })
    },
    editOrgEvt() {
      this.loading = true
      this.$api.mrkOrg
        .updateOrg(this.form)
        .then((res) => {
          this.loading = false
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.$emit('refreshTreeNode', res)
        })
        .catch(() => {
          this.loading = false
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