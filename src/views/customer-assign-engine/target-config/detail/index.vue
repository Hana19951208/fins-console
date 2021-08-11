<template>
  <div>
    <el-card class="body-2" shadow="never">
      <div slot="header">
        <a @click="goBack" class="black--text">
          <i class="el-icon-arrow-left" />
          <span>指标详情</span>
        </a>
      </div>
      <div>
        <el-form
          ref="addForm"
          :model="form"
          label-width="120px"
          :status-icon="false"
        >
          <p class="main-header">基本信息</p>
          <div class="main-body">
            <el-row :gutter="24">
              <el-col :span="24" class="mb-2">
                <span>指标名称：</span>
                <span class="grey--text">{{ form.kpiName || "--" }}</span>
              </el-col>
              <el-col :span="24" class="mb-2">
                <span>指标编码：</span>
                <span class="grey--text">{{ form.kpiCode || "--" }}</span>
              </el-col>
              <el-col :span="24">
                <span>备注：</span>
                <span class="grey--text" style="word-break: break-all">{{
                  form.kpiRemark || "--"
                }}</span>
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
                  <el-input
                    ref="sqlInput"
                    class="mt-2"
                    v-model="form.kpiValue"
                    :rows="7"
                    :maxlength="5000"
                    readonly
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
                      v-model="param.value"
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
          <el-button @click="goBack">
            <span class="mx-2">返回</span>
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from "@/utils";

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
      sqlParamList: [],
      tagParamList: [],
      oldKpiSql: null,
      SqlResult: null,
      isView: false,
    };
  },
  mounted() {
    const kpiId = this.$route.query.id;
    this.$api.targetConfig.findById({ kpiId }).then((res) => {
      this.form.kpiId = kpiId;
      this.form.kpiName = res.kpiName;
      this.form.kpiCode = res.kpiCode;
      this.form.kpiRemark = res.kpiRemark;
      this.form.kpiValue = res.kpiValue;
      this.mapInputByWord();
    });
  },
  methods: {
    testSQL() {
      this.testLoading = true;
      let sourceStr = this.form.kpiValue;
      this.sqlParamList.forEach((item) => {
        sourceStr = sourceStr.replace(item.param, item.value);
      });
      sourceStr = sourceStr.replace(/[\r\n]/g, " ");
      this.$api.common
        .runSql({ sql: sourceStr })
        .then((res) => {
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
    mapInputByWord() {
      const sourceStr = this.form.kpiValue;
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
