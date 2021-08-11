<template>
  <div class="home-source app-container">
    <el-row>
      <el-col :span="4" class="x-col">
        <left-menu @init-table-data="changeLeftApp" />
      </el-col>
      <el-col :span="20" class="x-col">
        <breadcrumb :firstBreadcrumb="firstBreadcrumb" :secondBreadcrumb="secondBreadcrumb" />
        <i-search-el-table
          ref="table"
          advance-query
          :query-form="queryForm"
          :columns="columns"
          :data="data"
          :loading="loading"
          :index="true"
          :advanceQueryButton="false"
          :showPageTitle="false"
          :hasCheckBox="false"
          @pagination="initTable"
        >
          <template slot="simple-form">
            <el-form-item @submit.native.prevent>
              <el-input
                v-model.trim="queryForm.moduleName"
                :maxlength="20"
                size="small"
                placeholder="模块名称"
                clearable
                @keyup.enter.native="simleQuery"
              />
            </el-form-item>
            <el-form-item @submit.native.prevent>
              <el-input
                v-model.trim="queryForm.reqAddr"
                :maxlength="20"
                size="small"
                placeholder="接口服务地址"
                clearable
                @keyup.enter.native="simleQuery"
              />
            </el-form-item>
            <el-form-item label=" " label-width="0">
              <el-button type="primary" icon="el-icon-search" style="padding: 8px 16px" @click="simleQuery">查询 </el-button>
              <el-button style="padding: 8px 16px" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
            </el-form-item>
          </template>
          <template slot="action-button">
            <el-button-group>
              <el-button v-has="'btn-add'" type="primary" icon="el-icon-plus" @click="addHandle">新增</el-button>
            </el-button-group>
          </template>
          <template slot="opt" slot-scope="{ scope }">
            <el-link v-has="'btn-edit'" :underline="false" type="primary" class="blue--text text--darken-2" @click="editHandle(scope.row)">
              编辑
            </el-link>
            <el-link
              v-has="'btn-del'"
              :underline="false"
              type="primary"
              class="ml-3 blue--text text--darken-2"
              @click="delHandle(scope.row)"
            >
              删除
            </el-link>
          </template>
        </i-search-el-table>
      </el-col>
    </el-row>
    <add ref="addDialog" v-model="dialog.add" :selection="selection" @show="dialog.add = false" @refreshTable="initTable" />
  </div>
</template>
<script>
import LeftMenu from '../components/left-menu'
import Breadcrumb from '../components/breadcrumb'
import ISearchElTable from '@/components/ISearchElTable'
import Add from './add'
import { GLOBAL } from '@/utils'
export default {
  components: {
    LeftMenu,
    Breadcrumb,
    ISearchElTable,
    Add,
  },
  data() {
    return {
      columns: [
        {
          label: '模块名称',
          key: 'moduleName',
          align: 'left',
          'min-width': 100,
        },
        {
          label: '模块编码',
          key: 'moduleCode',
          align: 'left',
          'min-width': 100,
        },
        {
          label: '列类型',
          key: 'colType',
          align: 'left',
          'min-width': 100,
        },
        {
          label: '接口服务地址',
          key: 'reqAddr',
          align: 'left',
          'min-width': 120,
        },
        {
          label: '接口请求方式',
          key: 'reqMethod',
          align: 'left',
          'min-width': 100,
        },
        { label: '操作', key: 'opt', align: 'left', 'min-width': 100 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        appsId: null,
        moduleChannel: null,
        moduleName: null,
        reqAddr: null,
      },
      data: {},
      id: null,
      loading: false,
      firstBreadcrumb: '',
      secondBreadcrumb: '',
      dialog: {
        add: false,
      },
      selection: {},
    }
  },
  methods: {
    initTable() {
      this.loading = true
      this.$api.resource.findByPageOfHome(this.queryForm).then((res) => {
        this.data = res
        this.loading = false
      })
    },
    simleQuery() {
      this.$refs.table.handleFilter()
    },
    resetForm() {
      this.queryForm.pageNum = 1
      this.queryForm.moduleName = null
      this.queryForm.reqAddr = null
      this.initTable()
    },
    changeLeftApp(appInfo, client) {
      this.pageLoading = true
      this.queryForm = {
        pageNum: 1,
        pageSize: 10,
        moduleName: null,
        reqAddr: null,
        appsId: appInfo.appsId,
        moduleChannel: client,
      }
      this.firstBreadcrumb = appInfo.appsName
      this.secondBreadcrumb = client
      this.initTable()
    },
    addHandle() {
      this.selection = {
        appsId: this.queryForm.appsId,
        moduleChannel: this.queryForm.moduleChannel,
      }
      this.dialog.add = true
    },
    editHandle(row) {
      this.selection = row
      this.selection.appsId = this.queryForm.appsId
      this.selection.moduleChannel = this.queryForm.moduleChannel
      this.dialog.add = true
    },
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          title: '操作提示',
          message: `确认要删除该资源（${row.moduleName}）吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
        })
        .then(() => {
          this.$api.resource.deleteHomeResource({ moduleId: row.moduleId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.initTable()
          })
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.home-source {
  height: 100%;
  &__header {
    padding: 10px 20px 0;
    i {
      font-size: 18px;
    }
  }
  /deep/.el-row {
    height: 100%;
  }
  .x-col {
    height: 100%;
    overflow: auto;
    /deep/.app-container {
      min-height: auto;
      height: auto;
    }
  }
}
</style>