<template>
  <div style="height: 100%">
    <i-search-el-table
      ref="table"
      :query-form="queryForm"
      :columns="columns"
      :data="data"
      :loading="loading"
      :index="true"
      :hasCheckBox="false"
      :advanceQueryButton="false"
      advance-query
      @pagination="initTable"
    >
      <template slot="simple-form">
        <el-form-item @submit.native.prevent>
          <el-input
            v-model.trim="queryForm.nameOrCode"
            :maxlength="100"
            size="small"
            placeholder="请输入角色名称或编码"
            clearable
            @keyup.enter.native="simpleQuery"
            @change="simpleQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="simpleQuery" />
          </el-input>
        </el-form-item>
      </template>

      <template slot="roleStatus" slot-scope="{ scope }">
        <el-link
          style="cursor: default"
          :underline="false"
          :type="scope.row.roleStatus == 1 ? 'success' : scope.row.roleStatus == 2 ? 'warning' : 'info'"
        >
          {{ scope.row.roleStatus | dictFormat(roleDs) }}
        </el-link>
      </template>
      <template slot="action-button">
        <el-button-group>
          <el-button v-has="'btn-add'" @click="addHandle">新增</el-button>
        </el-button-group>
      </template>

      <template slot="opt" slot-scope="{ scope }">
        <template v-if="scope.row.roleStatus == 1">
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
        <template v-if="scope.row.roleStatus != 1">
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
        <template v-if="scope.row.roleStatus == 3">
          <el-link
            v-has="'btn-edit'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="editHandle(scope.row)"
          >
            编辑
          </el-link>
          <el-link v-has="'btn-del'" :underline="false" type="primary" class="mr-3 blue--text text--darken-2" @click="delHandle(scope.row)">
            删除
          </el-link>
        </template>
        <el-link
          v-has="'btn-authority'"
          :underline="false"
          type="primary"
          class="mr-3 blue--text text--darken-2"
          @click="resourceHandle(scope.row)"
        >
          权限管理
        </el-link>
      </template>
    </i-search-el-table>
    <add ref="addDialog" v-model="addDialog.show" :selection="selection" @show="addDialog.show = false" @refreshTable="initTable" />
  </div>
</template>

<script>
import ISearchElTable from '@/components/ISearchElTable'
import Add from './add'
import { GLOBAL, getDictEntrysByCode } from '@/utils'
export default {
  name: 'Role',
  components: { ISearchElTable, Add },
  data() {
    return {
      columns: [
        { label: '角色名称', key: 'roleName', align: 'left', 'min-width': 150 },
        { label: '角色编码', key: 'roleCode', align: 'left', 'min-width': 150 },
        {
          label: '角色状态',
          key: 'roleStatus',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '描述信息',
          key: 'roleRemark',
          align: 'left',
          'min-width': 250,
        },
        { label: '操作', key: 'opt', align: 'left', 'min-width': 200 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        nameOrCode: null,
      },
      data: {},
      id: null,
      loading: false,
      addDialog: {
        show: false,
      },
      resourceDialog: {
        show: false,
      },
      selection: null,
    }
  },
  computed: {
    roleDs() {
      return [
        {
          name: '已启用',
          code: 1,
        },
        {
          name: '已停用',
          code: 2,
        },
        {
          name: '待启用',
          code: 3,
        },
      ]
    },
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      this.loading = true
      this.$api.role.findByPage(this.queryForm).then((res) => {
        this.data = res
        this.loading = false
      })
    },
    simpleQuery() {
      this.$refs.table.handleFilter()
    },
    addHandle() {
      this.selection = null
      this.addDialog.show = true
    },
    editHandle(row) {
      this.selection = row
      this.addDialog.show = true
    },
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要删除该角色（${row.roleName}）吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.role.deleteRole({ roleId: row.roleId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.initTable()
          })
        })
    },
    enableHandle(row) {
      let [roleStatus, message] = [
        row.roleStatus == 1 ? 2 : 1,
        row.roleStatus == 1 ? `确认要停用该角色（${row.roleName}）吗？` : `确认要启用该角色（${row.roleName}）吗？`,
      ]
      this.$refs.table
        .delConfirm({
          message: message,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.role.inUse({ roleId: row.roleId, roleStatus }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.initTable()
          })
        })
    },
    resourceHandle(row) {
      this.$router.push({
        path: '/system/role/resource',
        query: {
          $parent_path: this.$route.path,
          id: row.roleId,
          name: row.roleName,
        },
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
