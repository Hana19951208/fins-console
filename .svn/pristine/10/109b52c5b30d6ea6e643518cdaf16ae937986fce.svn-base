<template>
  <div style="height: 100%">
    <i-search-el-table
      ref="table"
      :query-form="queryForm"
      :columns="columns"
      :data="data"
      :loading="loading"
      :index="true"
      :advanceQueryButton="false"
      advance-query
      :hasCheckBox="false"
      @pagination="initTable"
    >
      <template slot="simple-form">
        <el-form-item @submit.native.prevent>
          <el-input
            v-model.trim="queryForm.appsName"
            :maxlength="100"
            size="small"
            placeholder="请输入应用名称"
            clearable
            @keyup.enter.native="simleQuery"
            @change="simleQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="simleQuery" />
          </el-input>
        </el-form-item>
      </template>
      <template slot="appsStatus" slot-scope="{ scope }">
        <el-link
          :underline="false"
          :type="scope.row.appsStatus == 1 ? 'success' : scope.row.appsStatus == 2 ? 'info' : 'primary'"
          style="cursor: default"
        >
          {{ scope.row.appsStatus | dictFormat(appsStatusDs) }}
        </el-link>
      </template>
      <template slot="action-button">
        <el-button-group>
          <el-button v-has="'btn-add'" @click="addHandle" type="primary">新增</el-button>
        </el-button-group>
      </template>

      <template slot="opt" slot-scope="{ scope }">
        <template v-if="scope.row.appsId != 1 && scope.row.appsStatus == 1">
          <el-link
            v-has="'btn-disable'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="enableHandle(scope.row)"
          >
            停用
          </el-link>
        </template>
        <template v-if="scope.row.appsId != 1 && scope.row.appsStatus == 2">
          <el-link
            v-has="'btn-edit'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="editHandle(scope.row)"
          >
            编辑
          </el-link>
          <el-link
            v-has="'btn-enable'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="enableHandle(scope.row)"
          >
            启用
          </el-link>
        </template>
        <template v-if="scope.row.appsId != 1 && scope.row.appsStatus == 3">
          <el-link v-has="'btn-del'" :underline="false" type="primary" class="mr-3 blue--text text--darken-2" @click="delHandle(scope.row)">
            删除
          </el-link>
          <el-link
            v-has="'btn-enable'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="enableHandle(scope.row)"
          >
            启用
          </el-link>
          <el-link
            v-has="'btn-edit'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="editHandle(scope.row)"
          >
            编辑
          </el-link>
        </template>
        <el-link
          v-has="'btn-detail'"
          :underline="false"
          type="primary"
          class="mr-3 blue--text text--darken-2"
          @click="detailHandle(scope.row)"
        >
          详情
        </el-link>
      </template>
    </i-search-el-table>
  </div>
</template>

<script>
import ISearchElTable from '@/components/ISearchElTable'
import { GLOBAL, getDictEntrysByCode } from '@/utils'
export default {
  name: 'Product',
  components: { ISearchElTable },
  data() {
    return {
      columns: [
        { label: '应用名称', key: 'appsName', align: 'left', 'min-width': 120 },
        { label: 'APPID', key: 'appsAppid', align: 'left', 'min-width': 200 },
        {
          label: '登录回调地址',
          key: 'appsLoginUrl',
          align: 'left',
          'min-width': 200,
        },
        {
          label: '应用状态',
          key: 'appsStatus',
          align: 'left',
          'min-width': 80,
        },
        { label: '操作', key: 'opt', align: 'left', 'min-width': 150 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        appsName: null,
      },
      appsStatusDs: [
        {
          name: '已启用',
          code: 1,
        },
        {
          name: '已停用',
          code: 2,
        },
        {
          name: '未启用',
          code: 3,
        },
      ],
      data: {},
      id: null,
      loading: false,
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      this.loading = true
      this.$api.application.findByPage(this.queryForm).then((res) => {
        this.data = res
        this.loading = false
      })
    },
    simleQuery() {
      this.$refs.table.handleFilter()
    },
    addHandle() {
      this.$router.push({
        path: '/system/application/add',
        query: {
          $parent_path: this.$route.path,
        },
      })
    },
    editHandle(row) {
      this.$router.push({
        path: '/system/application/add',
        query: {
          id: row.appsId,
          $parent_path: this.$route.path,
        },
      })
    },
    detailHandle(row) {
      this.$router.push({
        path: '/system/application/detail',
        query: {
          id: row.appsId,
          $parent_path: this.$route.path,
        },
      })
    },
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要删除该应用（${row.appsName}）吗？删除后部分业务将不能正常使用，请谨慎操作！`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.application.deleteApp({ appsId: row.appsId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.initTable()
          })
        })
    },
    enableHandle(row) {
      let [message, appsStatus] = [
        row.appsStatus == 1
          ? `确认要停用该应用（${row.appsName}）吗？停用后，该应用将无法进行访问！`
          : `确认要启用该应用（${row.appsName}）吗？`,
        row.appsStatus == 1 ? 2 : 1,
      ]
      this.$refs.table
        .delConfirm({
          message,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.application.inUse({ appsId: row.appsId, appsStatus }).then(() => {
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
/deep/ .el-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
  border-left: 1px solid #dcdfe6;
}
</style>
