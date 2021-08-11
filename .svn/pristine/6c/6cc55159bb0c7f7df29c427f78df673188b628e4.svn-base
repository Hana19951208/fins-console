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
        <el-form ref="dictForm" :model="form" :rules="rules" label-width="100px" status-icon>
          <div class="px-3">
            <p class="body__header">基础信息</p>
            <div class="body__box">
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-form-item prop="dictName" label="字典名称：">
                    <el-input v-model.trim="form.dictName" placeholder="请输入" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="dictCode" label="字典编码：">
                    <el-input v-model.trim="form.dictCode" @focus="chooseDialog = true" maxlength="50" placeholder="请选择" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="dictType" label="字典类型：">
                    <el-radio-group v-model="form.dictType">
                      <el-radio v-for="item in dictTypeDs" :key="item.code" :label="item.code">{{ item.name }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="dictContent" label="描述信息：">
                    <el-input
                      v-model.trim="form.dictContent"
                      :rows="3"
                      type="textarea"
                      maxlength="200"
                      show-word-limit
                      autosize
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <p class="body__header">字典项配置</p>
            <div class="body__box body__table text-center">
              <el-table :data="form.dictItems" border>
                <template slot="empty">
                  <span>
                    暂无字典项，
                    <el-link @click="addDictItem" type="primary" class="blue--text"> 立即添加 </el-link>
                  </span>
                </template>
                <el-table-column prop="code" label="*名称" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`dictItems.${scope.$index}.dictItemName`"
                      :rules="[
                        {
                          required: true,
                          message: '请输入名称',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        autocomplete="off"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="form.dictItems[scope.$index].dictItemName"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="*编码" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`dictItems.${scope.$index}.dictItemCode`"
                      :rules="[
                        {
                          required: true,
                          message: '请输入编码',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        autocomplete="off"
                        placeholder="请输入"
                        maxlength="200"
                        v-model.trim="form.dictItems[scope.$index].dictItemCode"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="opt" label="操作" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-circle-plus-outline" @click="addDictItem(scope.$index)"></i>
                    <i class="el-icon-remove-outline" @click="removeDictItem(scope.$index)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
        <el-divider></el-divider>
        <el-button class="right" type="primary" @click="submitForm('dictForm')"> 提交 </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from '@/utils'
export default {
  name: 'MenuAdd',
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
        dictCode: '',
        dictParId: '',
        dictContent: '',
        dictName: '',
        dictType: '',
        dictItems: [],
      },
      rules: {
        dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
        dictCode: [
          { required: true, message: '请输入字典编码', trigger: 'change' },
          {
            pattern: /^([a-zA-Z_.]{1,})?$/,
            message: '仅支持输入大小写字母、英文句号、下划线',
            trigger: 'blur',
          },
        ],
        dictType: [{ required: true, message: '请选择字典类型', trigger: 'blur' }],
      },
      dictTypeDs: [
        {
          name: '字符型',
          code: 1,
        },
        {
          name: '数字型',
          code: 2,
        },
      ],
    }
  },
  watch: {
    selection: {
      handler(value) {
        this.$nextTick(() => {
          this.$refs.dictForm.resetFields()
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
        this.cardTitle = '新增字典'
        this.form.dictParId = data.dictParId || -1
      } else {
        this.cardTitle = '编辑字典'
        Object.assign(this.form, mappingData(data, this.form), {
          dictItems: [],
        })
        this.form.dictId = data.dictId
        this.getDictItems(this.form.dictId)
      }
    },
    getDictItems(dictId) {
      this.$api.dict.getDictItems({ dictId }).then((res) => {
        this.form.dictItems = res || []
      })
    },
    addDictItem($index = 0) {
      this.form.dictItems.splice($index + 1, 0, {
        dictItemCode: null,
        dictItemName: null,
      })
    },
    removeDictItem($index) {
      this.form.dictItems.splice($index, 1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selection.isAdd == 1) {
            this.addDictEvt()
          } else {
            this.editDictEvt()
          }
        } else {
          return false
        }
      })
    },
    addDictEvt() {
      this.$api.dict.saveDict(this.form).then((res) => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        this.$emit('refreshTreeNode', res)
      })
    },
    editDictEvt() {
      this.$api.dict.updateDict(this.form).then((res) => {
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