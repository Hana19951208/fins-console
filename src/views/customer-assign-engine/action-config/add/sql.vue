<template>
  <div>
    <div class="target">
      <div class="target__left">
        <el-button
          v-for="(tag, index) in tagList"
          :key="index"
          :ref="tag.code"
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
        <el-button type="danger" plain @click="clearSQL">清空</el-button>
      </div>
    </div>
    <el-form-item prop="sqlValue" label-width="0">
      <el-input
        ref="sqlInput"
        class="mt-2"
        v-model="actionValue"
        :rows="7"
        :maxlength="5000"
        show-word-limit
        placeholder="请输入"
        type="textarea"
      />
    </el-form-item>
    <div>
      <p>例：select something as sm from whichtable where 1=1 limit 1;</p>
      <el-form-item
        v-for="(param, index) in sqlParamList"
        :key="index"
        :label="`${param.param}：`"
        label-width="120px"
      >
        <el-input v-model="param.value" placeholder="请输入" clearable />
      </el-form-item>
      <div class="result">
        <el-form-item
          class="result__left"
          prop="flowName"
          label="返回结果："
          label-width="120px"
        >
          <span v-html="SqlResult" style="word-break: break-all"></span>
        </el-form-item>
        <el-button
          :loading="loading"
          @click="testSQL"
          class="result__right"
          type="primary"
          plain
          >测试</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from '@/utils'
export default {
  props: {
    formActionValue: {
      type: String,
      defalut: '',
    },
  },
  data() {
    return {
      loading: false,
      actionValue: null,
      sqlParamList: [],
      tagParamList: [],
      oldActionSql: null,
      SqlResult: null,
    }
  },
  computed: {
    tagList() {
      return getDictEntrysByCode('ALLOT_KPI_LABEL')
    },
  },
  watch: {
    formActionValue: {
      handler(val) {
        this.actionValue = val
        // this.mapInputByWord();
      },
      immediate: true,
    },
    actionValue: {
      handler(val) {
        this.mapInputByWord(val)
      },
    },
  },
  methods: {
    // 新增快捷指标
    appendWord(tag) {
      let sqlInput = this.$refs.sqlInput.$el.getElementsByTagName('textarea')[0]
      let curText = this.actionValue || ''
      if (curText.length + tag.name.length > 5000) {
        return
      }
      let startPos = sqlInput.selectionStart
      let endPos = sqlInput.selectionEnd
      if (startPos === undefined || endPos === undefined) return

      this.actionValue =
        curText.substring(0, startPos) + tag.name + curText.substring(endPos)
      if (sqlInput.setSelectionRange) {
        sqlInput.focus()
        sqlInput.setSelectionRange(
          startPos + tag.name.length,
          startPos + tag.name.length
        )
      } else if (sqlInput.createTextRange) {
        var range = sqlInput.createTextRange()
        range.collapse(true)
        range.moveEnd('character', startPos + tag.name.length)
        range.moveStart('character', startPos + tag.name.length)
        range.select()
      }
    },
    // 文本域内容改变且失焦后，自动映射#之间的内容为输入框
    mapInputByWord(sourceStr) {
      if (this.oldActionSql !== sourceStr) {
        this.oldActionSql = sourceStr
        this.sqlParamList = []
        if (sourceStr) {
          let pos = sourceStr.indexOf('#')
          let posArr = []
          while (pos > -1) {
            posArr.push(pos)
            pos = sourceStr.indexOf('#', pos + 1)
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
                value: '',
              })
            }
          })
        }
      }
      this.$emit('set-value', sourceStr)
    },
    testSQL() {
      this.loading = true
      let sourceStr = this.actionValue
      this.sqlParamList.forEach((item) => {
        sourceStr = sourceStr.replace(item.param, `'${item.value}'`)
      })
      sourceStr = sourceStr.replace(/[\r\n]/g, ' ')
      this.$api.actionConfig
        .runSql({ sql: sourceStr })
        .then((res) => {
          this.loading = false
          this.SqlResult = `<span class="green--text">【查询成功】</span>${JSON.stringify(
            res
          )}`
        })
        .catch((error) => {
          this.loading = false
          this.SqlResult = `<span class="red--text">【查询失败】</span>${error.errMsg}`
        })
    },
    queryTemplate() {
      this.actionValue =
        'SELECT\n    KEYNAME\n FROM\n    TABLENAME\n WHERE\n    1=1\n LIMIT 1'
      this.sqlParamList = []
    },
    clearSQL() {
      this.actionValue = null
      this.sqlParamList = []
    },
  },
}
</script>
<style lang="scss" scoped>
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