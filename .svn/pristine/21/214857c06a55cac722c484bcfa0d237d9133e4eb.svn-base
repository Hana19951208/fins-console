<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="授予角色" width="800px" @closed="closed">
      <i-search-el-table
        ref="userRoleTable"
        :query-form="queryForm"
        :columns="columns"
        index
        :data="data"
        :show-page-title="false"
        :advanceQueryButton="false"
        :page-sizes="[5, 15, 20]"
        @pagination="initDataTable"
      >
        <template slot="simple-form">
          <el-form-item @submit.native.prevent>
            <el-input
              v-model.trim="queryForm.roleName"
              size="small"
              placeholder="请输入角色名称"
              @keyup.enter.native="simpleQuery"
              @change="simpleQuery"
              clearable
            >
              <el-button slot="append" @click="simpleQuery" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </template>
        <template slot="isCheck" slot-scope="{ scope }">
          <el-link :underline="false" :type="scope.row.isCheck == 1 ? 'success' : 'info'" style="cursor: default">
            {{ scope.row.isCheck == 1 ? '已授权' : '未授权' }}
          </el-link>
        </template>
        <template slot="action-button">
          <el-button v-has:parentUrl="'btn-grant'" type="primary" @click="roleHandle(1)">授权</el-button>
          <el-button v-has:parentUrl="'btn-grant-cancle'" type="danger" @click="roleHandle(2)">取消授权</el-button>
        </template>
      </i-search-el-table>
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode } from '@/utils'
import ISearchElTable from '@/components/ISearchElTable/index'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as utils from '@/utils'
export default {
  name: 'Add',
  components: {
    ISearchElTable,
    Treeselect,
  },
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    userId: {
      default: null,
      type: String,
    },
    userName: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      parentUrl: '#system-manage/user/list',
      show: false,
      columns: [
        { label: '角色名称', key: 'roleName', align: 'left', 'min-width': 150 },
        {
          label: '角色编码',
          key: 'roleCode',
          align: 'left',
          'min-width': 150,
        },
        { label: '授权状态', key: 'isCheck', align: 'left', 'min-width': 150 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 5,
        roleName: null,
        userId: null,
        roleStatus: 1,
      },
      data: {},
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.childrens,
        }
      },
      areaCodeDs: [],
    }
  },
  computed: {
    statusColor() {
      return function (value) {
        if (value === 1) {
          return '#FF0000'
        } else if (value === 2) {
          return '#009900'
        } else {
          return ''
        }
      }
    },
    statusDs() {
      return [
        { name: '未授权', code: 1 },
        { name: '已授权', code: 2 },
      ]
    },
    productTypeDs() {
      return getDictEntrysByCode('PRODUCT_TYPE')
    },
  },
  watch: {
    value(value) {
      this.show = value
      if (this.userId) {
        this.queryForm = this.$options.data().queryForm
        this.initDataTable()
      }
    },
  },
  methods: {
    initDataTable() {
      this.loading = true
      this.queryForm.userId = this.userId
      this.$api.user.userRole(this.queryForm).then((res) => {
        this.loading = false
        this.data = res
      })
    },
    simpleQuery() {
      this.$refs.userRoleTable.handleFilter()
    },
    dialogShowChg() {
      this.$emit('show')
    },
    closed() {
      this.dialogShowChg()
    },
    roleHandle(grantType) {
      if (this.$refs.userRoleTable.isChecked()) {
        let [roleList, list] = [this.$refs.userRoleTable.selection, []]
        roleList.forEach((item) => {
          list.push({
            grantType,
            userId: this.userId,
            roleId: item.roleId,
          })
        })
        this.$api.user.grantRole(list).then(() => {
          this.$message({
            message: grantType == 1 ? '授权成功' : '取消授权成功',
            type: 'success',
          })
          this.$emit('refreshTable')
          this.dialogShowChg()
        })
      }
    },
  },
}
</script>

<style scoped>
.status-info {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin: 0 5px;
  border-radius: 50%;
}
</style>
