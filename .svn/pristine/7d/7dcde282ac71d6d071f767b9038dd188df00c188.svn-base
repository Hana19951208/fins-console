<template>
  <div>
    <el-card class="body-2" shadow="never">
      <div slot="header">
        <a @click="goBack" class="black--text">
          <i class="el-icon-arrow-left" />
          <span>动作详情</span>
        </a>
      </div>
      <div>
        <el-form ref="addForm" :model="form" label-width="120px" status-icon>
          <p class="main-header">基本信息</p>
          <div class="main-body">
            <el-row :gutter="24">
              <el-col :span="24" class="mb-2">
                <span>动作名称：</span>
                <span class="grey--text">{{ form.actionName || "--" }}</span>
              </el-col>
              <el-col :span="24" class="mb-2">
                <span>动作编码：</span>
                <span class="grey--text">{{ form.actionCode || "--" }}</span>
              </el-col>
              <el-col :span="24" class="mb-2">
                <span>备注：</span>
                <span class="grey--text" style="word-break: break-all">{{
                  form.actionRemark || "--"
                }}</span>
              </el-col>
            </el-row>
          </div>
          <p class="main-header">参数配置</p>
          <div class="main-body" style="padding-top: 5px">
            <el-row>
              <el-col :span="24" v-if="form.actionType == 1">
                <el-form-item
                  prop="actionValue"
                  label="自定义SQL："
                  label-width="120px"
                >
                  <el-input
                    ref="sqlInput"
                    class="mt-2"
                    v-model="form.actionValue"
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
              <el-col :span="24" class="mb-2" v-else>
                <span>自定义接口：</span>
                <span class="grey--text">{{ form.actionValue || "--" }}</span>
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
      testLoading: false,
      activeName: "sql",
      loading: false,
      sqlParamList: [],
      oldActionSql: null,
      SqlResult: null,
      form: {
        actionName: null,
        actionCode: null,
        actionRemark: null,
        actionValue: "",
        actionType: "",
      },
    };
  },
  mounted() {
    const actionId = this.$route.query.id;
    this.$api.actionConfig.findById({ actionId }).then((res) => {
      this.form = res;
      if (res.actionType == 1) {
        this.mapInputByWord();
      }
    });
  },
  methods: {
    mapInputByWord() {
      const sourceStr = this.form.actionValue;
      if (this.oldActionSql !== sourceStr) {
        this.oldActionSql = sourceStr;
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
                value: "",
              });
            }
          });
        }
      }
    },
    testSQL() {
      this.loading = true;
      let sourceStr = this.form.actionValue;
      this.sqlParamList.forEach((item) => {
        sourceStr = sourceStr.replace(item.param, item.value);
      });
      sourceStr = sourceStr.replace(/[\r\n]/g, " ");
      this.$api.actionConfig
        .runSql({ sql: sourceStr })
        .then((res) => {
          this.loading = false;
          this.SqlResult = `<span class="green--text">【查询成功】</span>${JSON.stringify(
            res
          )}`;
        })
        .catch((error) => {
          this.loading = false;
          this.SqlResult = `<span class="red--text">【查询失败】</span>${error.errMsg}`;
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
