<template>
  <div>
    <el-card class="body-2" shadow="never">
      <div slot="header">
        <a @click="goBack" class="black--text">
          <i class="el-icon-arrow-left" />
          <span>{{ modTitle }}</span>
        </a>
      </div>
      <div>
        <el-form
          ref="addForm"
          :model="form"
          :rules="rules"
          label-width="120px"
          status-icon
        >
          <p class="main-header">基本信息</p>
          <div class="main-body">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item
                  prop="actionName"
                  label="动作名称："
                  label-width="120px"
                >
                  <el-input
                    v-model="form.actionName"
                    placeholder="请输入"
                    maxlength="100"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="actionCode"
                  label="动作编码："
                  label-width="120px"
                >
                  <el-input
                    v-model="form.actionCode"
                    placeholder="请输入"
                    maxlength="100"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  prop="actionRemark"
                  label="备注："
                  label-width="120px"
                >
                  <el-input
                    v-model="form.actionRemark"
                    :rows="8"
                    maxlength="500"
                    show-word-limit
                    placeholder="请输入"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <p class="main-header">参数配置</p>
          <div class="main-body" style="padding-top: 5px">
            <el-row>
              <el-col :span="24">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="自定义SQL" name="sql">
                    <my-sql
                      v-if="activeName == 'sql'"
                      ref="testSql"
                      :form-action-value="form.sqlValue"
                      @set-value="setValue"
                    />
                  </el-tab-pane>
                  <el-tab-pane label="自定义接口" name="interface">
                    <my-interface
                      v-if="activeName == 'interface'"
                      :form-action-value="form.interfaceValue"
                      @set-value="setValue"
                    />
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="text-center mt-4">
          <el-button
            :loading="loading"
            @click="submitForm('addForm')"
            type="primary"
            id="submit-btn"
          >
            提交
          </el-button>
          <el-button id="back-btn" @click="goBack">
            <span class="mx-2">返回</span>
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from "@/utils";
import MySql from "./sql";
import MyInterface from "./interface";
var checkCode = (rule, value, callback) => {
  if (!/^([a-zA-Z_$])/.test(value.substring(0, 1))) {
    callback(new Error("请以字母、下划线、或者美元符号($)开头"));
  } else if (!/^([0-9a-zA-Z_$]{1,})$/.test(value)) {
    callback(
      new Error("请输入正确的编码，编码以字母、下划线、美元符号($)、数字组合")
    );
  } else {
    callback();
  }
};
export default {
  components: {
    MySql,
    MyInterface,
  },
  data() {
    return {
      activeName: "sql",
      loading: false,
      form: {
        actionName: null,
        actionCode: null,
        actionRemark: null,
        actionValue: "",
        actionType: "1",
        sqlValue: "",
        interfaceValue: "",
      },
      rules: {
        actionName: [
          { required: true, message: "请输入动作名称", trigger: "blur" },
        ],
        actionCode: [
          { required: true, message: "请输入动作编码", trigger: "blur" },
          { validator: checkCode, trigger: "blur" },
        ],
        sqlValue: [
          { required: false, message: "请输入自定义SQL", trigger: "blur" },
        ],
        interfaceValue: [
          { required: false, message: "请输入自定义接口", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    modTitle() {
      return this.$route.query.id ? "修改动作" : "新增动作";
    },
    tagList() {
      return getDictEntrysByCode("KHFP_KJBQ");
    },
  },
  watch: {
    activeName(val) {
      if (val === "sql") {
        this.form.actionType = "1";
        this.rules.sqlValue[0].required = true;
        this.rules.interfaceValue[0].required = false;
      } else {
        this.form.actionType = "2";
        this.rules.sqlValue[0].required = false;
        this.rules.interfaceValue[0].required = true;
      }
    },
  },
  mounted() {
    const actionId = this.$route.query.id;
    if (actionId) {
      this.$api.actionConfig.findById({ actionId }).then((res) => {
        this.form.actionId = actionId;
        this.form.actionName = res.actionName;
        this.form.actionCode = res.actionCode;
        this.form.actionRemark = res.actionRemark;
        this.activeName = res.actionType == "1" ? "sql" : "interface";
        if (res.actionType == "1") {
          this.activeName = "sql";
          this.form.sqlValue = res.actionValue;
        } else {
          this.activeName = "interface";
          this.form.interfaceValue = res.actionValue;
        }
      });
    }
  },
  methods: {
    insertAction(data) {
      this.$api.actionConfig.save(data).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: "success" });
        this.goBack();
      });
    },
    updateAction(data) {
      this.$api.actionConfig.update(data).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: "success" });
        this.goBack();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.form;
          const data = {
            actionName: form.actionName,
            actionCode: form.actionCode,
            actionRemark: form.actionRemark,
            actionType: form.actionType,
            actionValue:
              form.actionType == "1" ? form.sqlValue : form.interfaceValue,
          };
          if (form.actionType == "1") {
            data.testSql = this.getTestSql(form.sqlValue);
          }
          if (form.actionId) {
            data.actionId = form.actionId;
            // 编辑
            this.updateAction(data);
          } else {
            // 新增
            this.insertAction(data);
          }
        } else {
          return false;
        }
      });
    },
    // 替换sql中的#XXX#
    getTestSql(testSql) {
      const testSqlParamList = this.$refs.testSql.sqlParamList;
      testSqlParamList.forEach((item) => {
        testSql = testSql.replace(item.param, `'${item.value}'`);
      });
      testSql = testSql.replace(/[\r\n]/g, " ");
      return testSql;
    },
    setValue(value) {
      this.form[this.form.actionType == "1" ? "sqlValue" : "interfaceValue"] =
        value;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &-header {
    padding: 4px 8px;
    color: #333;
    font-weight: bold;
    border-left: 5px solid #409eff;
  }

  &-body {
    padding: 24px 16px;
    border-bottom: 1px solid #eee;
  }
}
</style>
