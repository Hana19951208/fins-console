<template>
  <div class="dict-detail">
    <div class="dict-detail__box">
      <el-row>
        <el-col :span="24" class="box__item clearfix">
          <span class="box__title left">字典名称：</span>
          <span class="box__text grey--text">{{ detail.dictName | isNullOrEmpty }}</span>
        </el-col>
        <el-col :span="24" class="box__item mt-1 clearfix">
          <span class="box__title left">字典编码：</span>
          <span class="box__text grey--text">{{ detail.dictCode | isNullOrEmpty }}</span>
        </el-col>
        <el-col :span="24" class="box__item mt-1 clearfix">
          <span class="box__title left">维护人员：</span>
          <span class="box__text grey--text">{{ detail.updateUser | isNullOrEmpty }}</span>
        </el-col>
        <el-col :span="24" class="box__item mt-1 clearfix">
          <span class="box__title left">维护时间：</span>
          <span class="box__text grey--text">{{ detail.updateTime | dateFormat('yyyy/MM/dd hh:mm:ss') | isNullOrEmpty }}</span>
        </el-col>
        <el-col :span="24" class="box__item mt-1 clearfix">
          <span class="box__title left">字典类型：</span>
          <span class="box__text grey--text">
            {{ detail.dictType | dictFormat(dictTypeDs) }}
          </span>
        </el-col>
        <el-col :span="24" class="box__item mt-1 clearfix">
          <span class="box__title left">描述信息：</span>
          <span class="box__text grey--text">{{ detail.dictContent | isNullOrEmpty }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="dict-detail__box mt-3">
      <el-table v-loading="loading" :data="dictItems" border style="width: 100%">
        <el-table-column prop="dictItemName" label="名称"> </el-table-column>
        <el-table-column prop="dictItemCode" label="编码"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuDetail',
  props: {
    selection: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      detail: {},
      dictItems: [],
      loading: false,
    }
  },
  computed: {
    dictTypeDs() {
      return [
        {
          name: '字符型',
          code: 1,
        },
        {
          name: '数字型',
          code: 2,
        },
      ]
    },
  },
  watch: {
    selection: {
      handler(value) {
        this.detail = value || {}
        if (value && value.dictId) {
          this.getDictItems(value.dictId)
        } else {
          this.dictItems = []
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getDictItems(dictId) {
      this.loading = true
      this.$api.dict.getDictItems({ dictId }).then((res) => {
        this.loading = false
        this.dictItems = res || []
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.dict-detail {
  padding: 10px;
  &__box {
    border: 1px solid #e6e6e6;
    padding: 24px 16px;
  }
}
.box {
  &__item {
    padding: 8px 12px;
    font-size: 16px;
  }
  &__title {
    display: inline-block;
    width: 80px;
  }
  &__text {
    display: inline-block;
    width: calc(100% - 80px);
    word-break: break-word;
  }
}
</style>