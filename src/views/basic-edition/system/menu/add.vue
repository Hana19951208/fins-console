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
        <el-form ref="menuForm" :model="form" :rules="rules" label-width="100px" status-icon>
          <div class="px-3">
            <p class="body__header">基础信息</p>
            <div class="body__box">
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-form-item prop="menuName" label="菜单名称：">
                    <el-input v-model.trim="form.menuName" placeholder="请输入" maxlength="8" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="menuUrl" label="菜单地址：">
                    <el-input v-model.trim="form.menuUrl" maxlength="50" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="menuSort" label="排序序号：">
                    <el-input v-model.trim="form.menuSort" maxlength="50" placeholder="数字，例如0" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="menuIconStyle" label="图标样式：">
                    <el-input v-model.trim="form.menuIconStyle" maxlength="50" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="menuRemark" label="描述信息：">
                    <el-input v-model.trim="form.menuRemark" type="textarea" maxlength="200" show-word-limit placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <p class="body__header">关联按钮配置</p>
            <div class="body__box body__table text-center">
              <el-table :data="form.buttonList" border>
                <template slot="empty">
                  <span>
                    暂无关联按钮，
                    <el-link @click="addBtn" type="primary" class="blue--text"> 立即添加 </el-link>
                  </span>
                </template>
                <el-table-column prop="code" label="*按钮名称" width="250" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`buttonList.${scope.$index}.buttonName`"
                      :rules="[
                        {
                          required: true,
                          message: '请输入按钮名称',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        autocomplete="off"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="form.buttonList[scope.$index].buttonName"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="*按钮编码" width="200" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`buttonList.${scope.$index}.buttonCode`"
                      :rules="[
                        {
                          required: true,
                          message: '请输入按钮编码',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        autocomplete="off"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="form.buttonList[scope.$index].buttonCode"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="columnDesc" label="备注说明" align="center">
                  <template slot-scope="scope">
                    <el-form-item :prop="`buttonList.${scope.$index}.buttonRemark`">
                      <el-input
                        autocomplete="off"
                        placeholder="请输入"
                        maxlength="200"
                        type="textarea"
                        :rows="1"
                        autosize
                        v-model.trim="form.buttonList[scope.$index].buttonRemark"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="opt" label="操作" align="center" width="100">
                  <template slot-scope="scope">
                    <i class="el-icon-circle-plus-outline" @click="addBtn(scope.$index)"></i>
                    <i class="el-icon-remove-outline" @click="removeBtn(scope.$index)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
        <el-divider></el-divider>
        <el-button class="right" type="primary" @click="submitForm('menuForm')"> 提交 </el-button>
      </div>
    </el-card>
    <resource ref="chooseDialog" v-model="chooseDialog" :queryInfo="queryInfo" @choose-handle="chooseHandle" @show="chooseDialog = false" />
  </div>
</template>
<script>
import { mappingData, GLOBAL } from '@/utils'
import Resource from './resource'
export default {
  name: 'MenuAdd',
  components: {
    Resource,
  },
  props: {
    selection: {
      type: Object,
      default: null,
    },
    queryInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cardTitle: '',
      form: {
        appsId: '',
        menuParId: '',
        menuChannel: '',
        menuIconStyle: '',
        menuName: '',
        menuRemark: '',
        menuSort: '',
        menuUrl: '',
        buttonList: [],
      },
      rules: {
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        menuUrl: [{ required: true, message: '请输入菜单地址', trigger: 'blur' }],
        menuSort: [
          { required: true, message: '请输入排序序号', trigger: 'blur' },
          {
            pattern: /^(0|\+?[1-9][0-9]{0,2})$/,
            message: '请输入0或正整数，最大不超过999',
            trigger: 'blur',
          },
        ],
      },
      chooseDialog: false,
    }
  },
  watch: {
    selection: {
      handler(value) {
        this.$nextTick(() => {
          this.$refs.menuForm.resetFields()
          this.form = this.$options.data().form
          this.initData(value)
        })
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initData(data) {
      if (data.isAdd == 1) {
        this.cardTitle = '新增菜单'
        this.form.menuParId = data.menuParId || -1
        Object.assign(this.form, mappingData(this.queryInfo, this.form))
      } else {
        this.cardTitle = '编辑菜单'
        Object.assign(this.form, mappingData(data, this.form), mappingData(this.queryInfo, this.form), { buttonList: [] })
        this.form.menuId = data.menuId
        this.getButtons(this.form.menuId)
      }
    },
    chooseHandle(menuUrl) {
      this.form.menuUrl = menuUrl
    },
    getButtons(menuId) {
      this.$api.menu.getButtons({ menuId }).then((res) => {
        this.form.buttonList = res || []
      })
    },
    addBtn($index = 0) {
      this.form.buttonList.splice($index + 1, 0, {
        buttonCode: null,
        buttonName: null,
        buttonRemark: null,
      })
    },
    removeBtn($index) {
      this.form.buttonList.splice($index, 1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selection.isAdd == 1) {
            this.addMenuEvt()
          } else {
            this.editMenuEvt()
          }
        } else {
          return false
        }
      })
    },
    addMenuEvt() {
      this.$api.menu.saveMenu(this.form).then((res) => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.$emit('refreshTreeNode', res)
      })
    },
    editMenuEvt() {
      this.$api.menu.updateMenu(this.form).then((res) => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.$emit('refreshTreeNode', res, true)
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
  .body {
    &__header {
      padding: 4px 8px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }
    &__box {
      padding: 0 8px;
    }
    &__table {
      /deep/.el-form-item__content {
        margin-left: 0 !important;
      }
      /deep/.el-icon-circle-plus-outline:before,
      /deep/.el-icon-remove-outline:before {
        font-size: 20px;
        cursor: pointer;
      }

      /deep/.el-table td {
        padding: 18px 0 0;
      }
    }
  }
  .x-button {
    width: 200px;
  }
}
</style>