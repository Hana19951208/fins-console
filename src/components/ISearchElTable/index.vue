<!--suppress ALL -->
<template>
  <div class="app-container" :class="[tableClass]">
    <div class="my-3 subheading" v-show="showPageTitle">
      {{ $route.meta.title }}
    </div>
    <div class="filter-container i-data-table">
      <div class="search-form" v-show="!noQuery">
        <el-form
          v-if="showSearchForm"
          @submit.native.prevent
          ref="searchForm"
          :inline="true"
          :model="queryForm"
          label-width="140px"
          :label-position="labelPosition"
        >
          <div class="clearfix">
            <slot name="simple-form"> </slot>
            <el-form-item v-if="advanceQuery && advanceQueryButton">
              <el-button type="text" class="blue--text text--darken-2 font-weight-bold" @click="toggleQuery" size="mini">{{
                advanceQueryTxt
              }}</el-button>
            </el-form-item>

            <el-form-item class="right mr-0">
              <slot name="action-button" />
            </el-form-item>
          </div>
          <el-divider v-if="advanceQueryButton && firstGlance"></el-divider>
          <div v-if="firstGlance">
            <slot name="search-form" />
            <div v-if="advanceQueryButton">
              <el-form-item label=" ">
                <el-button type="primary" icon="el-icon-search" style="padding: 8px 16px" @click="handleFilter()">查询 </el-button>
                <el-button style="padding: 8px 16px" icon="el-icon-refresh-right" @click="resetForm()">重置</el-button>
              </el-form-item>

              <el-form-item class="right" v-if="advanceQuery">
                <el-link :underline="false" @click="toggleQuery" type="info" icon="el-icon-arrow-up">
                  <span style="font-size: 12px">收起</span>
                </el-link>
              </el-form-item>
              <el-divider v-if="advanceQueryButton && firstGlance"></el-divider>
            </div>
          </div>
        </el-form>
      </div>
      <div>
        <slot name="extra-header" />
      </div>
      <el-table
        v-loading="loading"
        v-bind="$attrs"
        :data="data.rows"
        border
        style="width: 100%"
        @selection-change="selectionChange"
        v-on="$listeners"
      >
        <el-table-column v-if="isExpand" type="expand" align="center" fixed="left" width="24">
          <template slot-scope="scope">
            <slot :scope="scope" name="expand-column"> </slot>
          </template>
        </el-table-column>
        <el-table-column v-if="hasCheckBox" type="selection" align="center" width="45" />
        <el-table-column v-if="index" label="序号" type="index" align="left" width="50" />
        <el-table-column
          v-for="item in columns"
          :label="item.label"
          :key="item.key"
          :min-width="item['min-width'] ? item['min-width'] : item.width ? item.width : '200'"
          :align="item.align || 'center'"
          :show-overflow-tooltip="true"
          :fixed="item.fixed || false"
          :header-align="item.headerAlign"
        >
          <template slot-scope="scope">
            <slot :scope="scope" :name="item.key">
              {{ scope.row[item.key] | isNullOrEmpty('--') }}
            </slot>
          </template>
          <el-table-column
            v-for="item in item.childrens"
            :label="item.label"
            :key="item.key"
            :min-width="item['min-width'] ? item['min-width'] : item.width ? item.width : '200'"
            :align="item.align || 'center'"
            :show-overflow-tooltip="true"
            :fixed="item.fixed || false"
            :header-align="item.headerAlign"
          >
            <template slot-scope="scope">
              <slot :scope="scope" :name="item.key">
                {{ scope.row[item.key] }}
              </slot>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <pagination
        v-if="total > 0"
        :total="total"
        v-bind="$attrs"
        :page.sync="queryForm.pageNum"
        :limit.sync="queryForm.pageSize"
        :page-sizes="pageSizes"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import dataTableMixin from '@/mixins/dataTableMixin'
import { mappingData } from '@/utils'
import store from '@/store'

export default {
  name: 'ISearchElTable',
  components: {
    Pagination,
  },
  mixins: [dataTableMixin],
  props: {
    tableClass: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    queryForm: {
      type: Object,
      default: () => {},
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    advanceQuery: {
      type: Boolean,
      default: () => false,
    },
    advanceQueryButton: {
      type: Boolean,
      default: () => true,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    index: {
      type: Boolean,
      default: () => false,
    },
    hasCheckBox: {
      type: Boolean,
      default: () => true,
    },
    showSearchForm: {
      type: Boolean,
      default: () => true,
    },
    isPage: {
      type: Boolean,
      default: () => true,
    },
    iswidth: {
      type: Boolean,
      default: () => false,
    },
    isExpand: {
      type: Boolean,
      default: () => false,
    },
    showPageTitle: {
      type: Boolean,
      default: () => true,
    },
    noQuery: {
      type: Boolean,
      default: () => false,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
  },
  data() {
    return {
      advanceQueryTxt: '高级查询',
      toggle: false,
      queryLoading: false,
      clientHeight: document.body.clientHeight,
      showDetail: {
        show: false,
        applyId: null,
        idCard: null,
      },
      // pageSizes: [10, 20, 50, 100],
    }
  },
  computed: {
    total() {
      if (this.isPage) {
        return this.data.total ? parseInt(this.data.total) : 0
      } else {
        return 0
      }
    },
    tableData() {
      return this.data.rows
    },
    firstGlance() {
      return this.advanceQuery ? this.toggle : true
    },
    tableHeight() {
      return this.clientHeight - 320
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize, false)
    this.isColumnInit()
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize, false)
  },
  methods: {
    isColumnInit() {
      let curentUrl = null
      let buttons = null
      let isExist = false
      let isOpt = false
      if (this.$route.meta.url) {
        curentUrl = this.$route.meta.url
        buttons = store.getters.buttons[curentUrl]
        if (buttons === undefined || buttons === null) {
          return false
        }
        if (buttons.findIndex((el) => el == 'btn-opt') !== -1) {
          isExist = true
        }
      }
      this.columns.filter((item) => {
        if (item.label == '操作' && !item.isNoUrl) {
          // isNoUrl 针对不是配置在资源管理的列表资源:为true
          isOpt = true
        }
      })
      if (isOpt && !isExist) {
        var index = _.findIndex(this.columns, { label: '操作' })
        this.columns.splice(index, 1)
      } else {
        this.columns
      }
    },
    onResize() {
      this.clientHeight = document.body.clientHeight
    },
    toggleQuery() {
      this.advanceQueryTxt = this.toggle ? '高级查询' : '基本查询'
      this.toggle = !this.toggle
    },
    pagination() {
      this.$emit('pagination')
    },
    handleFilter() {
      this.queryForm.pageNum = 1
      this.pagination()
    },
    resetForm() {
      if (this.$parent.queryForm) {
        this.queryForm.pageNum = 1
        Object.keys(this.$parent.queryForm).forEach((field) => {
          if (field !== 'pageNum' && field !== 'pageSize') {
            this.$parent.queryForm[field] = null
          }
        })
        this.pagination()
      } else if (this.$parent.$parent.queryForm) {
        this.queryForm.pageNum = 1
        Object.keys(this.$parent.$parent.queryForm).forEach((field) => {
          if (field !== 'pageNum' && field !== 'pageSize') {
            this.$parent.$parent.queryForm[field] = null
          }
        })
        this.pagination()
      } else if (this.$parent.$children && this.$parent.$children[0].queryForm) {
        // 兼容dialog中引用次组件，重置方法失效的问题
        Object.keys(this.$parent.$children[0].queryForm).forEach((field) => {
          if (field !== 'pageNum' && field !== 'pageSize') {
            this.$parent.$children[0].queryForm[field] = null
          }
          this.pagination()
        })
      } else {
        console.warn('数据列表自定义组件，未发现queryForm')
      }
    },
    toDetail(item, data) {
      var dataList = {
        $parent_path: this.$route.path,
      }
      Object.assign(dataList, data, item)
      this.$router.push({
        path: '/components/public-detail',
        query: dataList,
      })
    },
  },
}
</script>
<style lang="scss">
.el-tooltip__popper {
  left: 250px;
  max-width: 400px;
}
</style>
<style scoped lang="scss">
.checked-tips {
  border: 1px solid #1e88e5;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 14px;
  .el-icon-info {
    color: #1e88e5;
    margin-right: 6px;
    font-size: 15px;
  }
  .num {
    color: #1e88e5;
  }
}

.fade-in-active {
  transition: all 1s ease;
}
.fade-in-enter,
.fade-out-active {
  opacity: 0;
}
.app-container {
  min-height: 100%;
  height: auto !important;
  height: 100%;

  /deep/ .pagination-container {
    padding: 8px 12px;
  }
}
</style>
