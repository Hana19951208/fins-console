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
          :status-icon="false"
        >
          <p class="main-header">基本信息</p>
          <div class="main-body">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item
                  prop="kpiName"
                  label="指标名称："
                  label-width="120px"
                >
                  <el-input
                    v-model.trim="form.kpiName"
                    placeholder="请输入"
                    maxlength="100"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="kpiCode"
                  label="指标编码："
                  label-width="120px"
                >
                  <el-input
                    v-model.trim="form.kpiCode"
                    placeholder="请输入"
                    maxlength="100"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  prop="kpiRemark"
                  label="备注："
                  label-width="120px"
                >
                  <el-input
                    v-model.trim="form.kpiRemark"
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
          <div class="main-body">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="kpiValue"
                  label="自定义SQL："
                  label-width="120px"
                >
                  <div class="target">
                    <div class="target__left">
                      <el-button
                        v-for="(tag, index) in tagList"
                        :key="index"
                        @click="appendWord(tag)"
                        plain
                        class="mt-2"
                        >{{ tag.name }}</el-button
                      >
                    </div>
                    <div class="target__right mt-2">
                      <el-button type="primary" plain @click="queryTemplate"
                        >SELECT查询模板</el-button
                      >
                      <el-button type="danger" plain @click="clearSQL"
                        >清空</el-button
                      >
                    </div>
                  </div>
                  <el-input
                    ref="sqlInput"
                    class="mt-2"
                    v-model.trim="form.kpiValue"
                    :rows="7"
                    :maxlength="5000"
                    show-word-limit
                    placeholder="请输入"
                    type="textarea"
                  />
                </el-form-item>
                <div style="margin-left: 120px">
                  <p>
                    例：select something as sm from whichtable where 1=1 limit
                    1;
                  </p>
                  <el-form-item
                    v-for="(param, index) in sqlParamList"
                    :key="index"
                    :label="`${param.param}:`"
                    label-width="120px"
                  >
                    <el-input
                      v-model.trim="param.value"
                      placeholder="请输入"
                      clearable
                    />
                  </el-form-item>
                  <div class="result">
                    <el-form-item
                      class="result__left"
                      prop="flowName"
                      label="返回结果："
                      label-width="85px"
                    >
                      <span
                        v-html="SqlResult"
                        style="word-break: break-all"
                      ></span>
                    </el-form-item>
                    <el-button
                      @click="testSQL"
                      :loading="testLoading"
                      class="result__right"
                      type="primary"
                      plain
                      >测试</el-button
                    >
                  </div>
                </div>
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
  data() {
    return {
      show: false,
      loading: false,
      testLoading: false,
      form: {
        kpiName: null,
        kpiCode: null,
        kpiRemark: null,
        kpiValue: null,
        kpiType: "1",
      },
      rules: {
        kpiName: [
          { required: true, message: "请输入指标名称", trigger: "blur" },
        ],
        kpiCode: [
          { required: true, message: "请输入指标编码", trigger: "blur" },
          { validator: checkCode, trigger: "blur" },
        ],
        kpiValue: [
          { required: true, message: "请输入自定义SQL", trigger: "blur" },
        ],
      },
      sqlParamList: [],
      tagParamList: [],
      oldKpiSql: null,
      SqlResult: null,
    };
  },
  computed: {
    modTitle() {
      return this.$route.query.id ? "修改指标" : "新增指标";
    },
    tagList() {
      return getDictEntrysByCode("ALLOT_KPI_LABEL");
    },
  },
  watch: {
    "form.kpiValue": {
      handler(val) {
        this.mapInputByWord(val);
      },
    },
  },
  mounted() {
    const kpiId = this.$route.query.id;
    if (kpiId) {
      this.$api.targetConfig.findById({ kpiId }).then((res) => {
        this.form.kpiId = kpiId;
        this.form.kpiName = res.kpiName;
        this.form.kpiCode = res.kpiCode;
        this.form.kpiRemark = res.kpiRemark;
        this.form.kpiValue = res.kpiValue;
      });
    }
  },
  methods: {
    // 新增快捷指标
    appendWord(tag) {
      let sqlInput =
        this.$refs.sqlInput.$el.getElementsByTagName("textarea")[0];
      let curText = this.form.kpiValue || "";
      if (curText.length + tag.name.length > 5000) {
        return;
      }
      let startPos = sqlInput.selectionStart;
      let endPos = sqlInput.selectionEnd;
      if (startPos === undefined || endPos === undefined) return;

      this.$set(
        this.form,
        "kpiValue",
        curText.substring(0, startPos) + tag.name + curText.substring(endPos)
      );
      if (sqlInput.setSelectionRange) {
        sqlInput.focus();
        sqlInput.setSelectionRange(
          startPos + tag.name.length,
          startPos + tag.name.length
        );
      } else if (sqlInput.createTextRange) {
        var range = sqlInput.createTextRange();
        range.collapse(true);
        range.moveEnd("character", startPos + tag.name.length);
        range.moveStart("character", startPos + tag.name.length);
        range.select();
      }
    },
    // 文本域内容改变且失焦后，自动映射#之间的内容为输入框
    mapInputByWord(sourceStr) {
      if (this.oldKpiSql !== sourceStr) {
        this.oldKpiSql = sourceStr;
        this.sqlParamList = [];
        if (sourceStr) {
          let pos = sourceStr.indexOf("#");
          let posArr = [];
          while (pos > -1) {
            posArr.push(pos);
            pos = sourceStr.indexOf("#", pos + 1);
          }
          posArr.forEach((item, index) => {
            if (index % 2 == 0 && index + 1 < posArr.length) {
              this.sqlParamList.push({
                startIndex: posArr[index],
                endIndex: posArr[index + 1],
                param: sourceStr.substring(
                  posArr[index],
                  posArr[index + 1] + 1
                ),
                value: null,
              });
            }
          });
        }
      }
    },
    testSQL() {
      this.testLoading = true;
      let sourceStr = this.form.kpiValue;
      this.sqlParamList.forEach((item) => {
        sourceStr = sourceStr.replace(item.param, `'${item.value}'`);
      });
      sourceStr = sourceStr.replace(/[\r\n]/g, " ");
      this.$api.common
        .runSql({ sql: sourceStr })
        .then((res) => {
          console.log(res);
          this.testLoading = false;
          this.SqlResult = `<span class="green--text">【查询成功】</span>${JSON.stringify(
            res
          )}`;
        })
        .catch((error) => {
          this.testLoading = false;
          this.SqlResult = `<span class="red--text">【查询错误】</span>${error.errMsg}`;
        });
    },
    queryTemplate() {
      this.form.kpiValue =
        "SELECT\n    KEYNAME\n FROM\n    TABLENAME\n WHERE\n    1=1\n LIMIT 1";
      this.sqlParamList = [];
    },
    clearSQL() {
      this.form.kpiValue = null;
      this.sqlParamList = [];
    },
    insertTarget() {
      this.$api.targetConfig.save(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: "success" });
        this.goBack();
      });
    },
    updateTarget() {
      this.$api.targetConfig.update(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: "success" });
        this.goBack();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.kpiId) {
            // 编辑
            this.updateTarget();
          } else {
            // 新增
            this.insertTarget();
          }
        } else {
          return false;
        }
      });
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
.target {
  position: relative;
  min-height: 50px;
  &__left {
    margin-right: 200px;
    /deep/.el-button {
      margin-right: 10px;
    }
    /deep/.el-button + .el-button {
      margin-right: 10px;
      margin-left: 0;
    }
  }
  &__right {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.result {
  position: relative;
  &__left {
    margin-right: 100px;
  }
  &__right {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
