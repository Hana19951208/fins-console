<template>
  <div>
    <i-search-el-table
      ref="table"
      :query-form="queryForm"
      :columns="columns"
      :data="tableData"
      :advance-query="true"
      :loading="queryLoading"
      :index="false"
      :has-check-box="false"
      @pagination="initTable"
    >
      <template slot="simple-form">
        <el-form-item @submit.native.prevent>
          <el-input v-model.trim="queryForm.userName" :maxlength="50" size="small" placeholder="请输入姓名" clearable>
            <el-button slot="append" icon="el-icon-search" @click="initTable" />
          </el-input>
        </el-form-item>
      </template>
      <template slot="search-form">
        <el-form-item label="帐号：" prop="userCode">
          <el-input v-model.trim="queryForm.userCode" :maxlength="30" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="用户状态：" prop="userStatus">
          <el-select v-model="queryForm.userStatus" placeholder="全部" clearable class="filter-item">
            <el-option v-for="item in userStatusDs" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号：" prop="userIdCard">
          <el-input v-model.trim="queryForm.userIdCard" :maxlength="30" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="手机号：" prop="userPhone">
          <el-input v-model.trim="queryForm.userPhone" :maxlength="30" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="所属机构：" prop="orgCode">
          <treeselect
            :options="options"
            v-model="queryForm.orgCode"
            :normalizer="normalizer"
            no-results-text="暂无数据"
            style="width: 200px"
            placeholder="全部"
          />
        </el-form-item>
      </template>

      <template slot="action-button">
        <el-button-group>
          <el-button v-has="'btn-add'" @click="addHandle()" type="primary"> 新增 </el-button>
        </el-button-group>
      </template>
      <template slot="userName" slot-scope="{ scope }">
        <el-link type="primary" class="text-truncate x-link blue--text text--darken-2" @click="detailHandle(scope.row)">
          {{ scope.row.userName }}
        </el-link>
      </template>
      <template slot="userStatus" slot-scope="{ scope }">
        <span>{{ scope.row.userStatus | dictFormat(userStatusDs) }}</span>
      </template>

      <template slot="opt" slot-scope="{ scope }">
        <template v-if="scope.row.userStatus === 1">
          <el-link
            v-has="'btn-reset'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="resetPwdHandle(scope.row)"
          >
            密码重置
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
          <el-link
            v-has="'btn-cancel'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="cacelHandle(scope.row)"
          >
            注销
          </el-link>
          <el-link
            v-has="'btn-role'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="roleHandle(scope.row)"
          >
            授予角色
          </el-link>
        </template>
        <template v-if="scope.row.userStatus === 2">
          <el-link
            v-has="'btn-unlock'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="unLockHandle(scope.row)"
          >
            解锁
          </el-link>
        </template>
        <template v-if="scope.row.userStatus === 3">
          <span>--</span>
        </template>
      </template>
    </i-search-el-table>
    <add
      ref="formDialog"
      v-model="dialog.show"
      :userId="selectionId"
      :data="dialog.data"
      @show="dialog.show = false"
      @refreshTable="handleFilter"
    />
    <role
      ref="roleDialog"
      v-model="roleDialog.show"
      :user-id="selectionUserId"
      :user-name="selectionUserName"
      @show="roleDialog.show = false"
      @refreshTable="handleFilter"
    />
    <detail v-model="detailDialog.show" :selection="detailDialog.data" @show="detailDialog.show = false" />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Pagination from '@/components/Pagination'
import Add from './add'
import Role from './role'
import Detail from './detail'
import { GLOBAL } from '@/utils'
import ISearchElTable from '@/components/ISearchElTable'
export default {
  name: 'User',
  components: {
    Treeselect,
    Pagination,
    Add,
    Role,
    ISearchElTable,
    Detail,
  },
  data() {
    return {
      columns: [
        {
          label: '姓名',
          key: 'userName',
          align: 'left',
          'min-width': 140,
        },
        {
          label: '帐号',
          key: 'userCode',
          align: 'left',
          'min-width': 120,
        },

        {
          label: '所属机构',
          key: 'orgName',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '身份证号',
          key: 'userIdCard',
          align: 'left',
          'min-width': 170,
        },
        {
          label: '手机号',
          key: 'userPhone',
          align: 'left',
          'min-width': 120,
        },
        {
          label: '用户状态',
          key: 'userStatus',
          align: 'left',
          'min-width': 120,
        },
        {
          label: '操作',
          key: 'opt',
          align: 'left',
          'min-width': 260,
        },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        userName: null,
        userCode: null,
        userStatus: null,
        userIdCard: null,
        userPhone: null,
        orgCode: null,
      },
      total: 0,
      queryLoading: true,
      value: null,
      options: [],
      roleDs: [],
      selectionId: null,
      selectionUserId: null,
      selectionUserName: null,
      normalizer(node) {
        return {
          id: node.orgCode,
          label: node.orgName,
          children: node.children,
        }
      },
      userStatusDs: [
        { name: '正常', code: 1 },
        { name: '已锁定', code: 2 },
        { name: '已注销', code: 3 },
      ],
      tableData: {},
      dialog: {
        show: false,
        data: {},
      },
      roleDialog: {
        show: false,
      },
      detailDialog: {
        show: false,
        data: {},
      },
    }
  },
  created() {
    this.initTable()
    this.getOrganizationTree()
  },
  methods: {
    initTable() {
      this.queryLoading = true
      this.$api.user.findByPage(this.queryForm).then((res) => {
        this.tableData = res
        this.queryLoading = false
      })
    },
    getOrganizationTree() {
      this.$api.organization.getOrgTree().then((res) => {
        this.options = res ? [res] : []
      })
    },
    handleFilter() {
      this.queryForm.pageNum = 1
      this.initTable()
    },
    addHandle() {
      this.selectionId = null
      this.dialog.show = true
      // 重置子组件form表单
      if (this.$refs.formDialog.$refs.form) {
        this.$refs.formDialog.$refs.form.resetFields()
      }
    },
    editHandle(row) {
      this.selectionId = row.userId
      this.dialog.show = true
      this.dialog.data = Object.assign({}, row)
    },
    cacelHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要注销该用户（${row.userName}）吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.user.updateCancel({ userId: row.userId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.handleFilter()
          })
        })
    },
    roleHandle(row) {
      this.selectionUserId = row.userId
      this.selectionUserName = row.userName
      this.roleDialog.show = true
    },
    resetPwdHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要重置该用户（${row.userName}）的密码吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.user.resetPwd({ userId: row.userId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.handleFilter()
          })
        })
    },
    unLockHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要解锁该用户（${row.userName}）吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.user.unlock({ userId: row.userId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.handleFilter()
          })
        })
    },
    detailHandle(row) {
      this.detailDialog.show = true
      this.detailDialog.data = row
    },
  },
}
</script>
<style lang="scss" scoped>
.status-info {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin: 0 5px;
  border-radius: 50%;
}
/deep/ .el-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
  border-left: 1px solid #dcdfe6;
}
.x-link {
  display: inline-block;
  max-width: 100%;
}
</style>
