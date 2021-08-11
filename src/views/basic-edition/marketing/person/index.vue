<template>
  <div style="height: 100%">
    <i-search-el-table-check
      ref="table"
      :query-form="queryForm"
      :columns="columns"
      :data="data"
      :loading="loading"
      :can-page-select="true"
      row-key="userId"
      advance-query
      @pagination="initTable"
    >
      <template slot="simple-form">
        <el-form-item @submit.native.prevent>
          <el-input
            style="width: 260px"
            v-model.trim="queryForm.userName"
            :maxlength="100"
            size="small"
            placeholder="请输入姓名"
            clearable
            @keyup.enter.native="simleQuery"
            @change="simleQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="simleQuery" />
          </el-input>
        </el-form-item>
      </template>
      <template slot="search-form">
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
      <template slot="userName" slot-scope="{ scope }">
        <el-link type="primary" class="text-truncate x-link blue--text text--darken-2" @click="detailHandle(scope.row)">
          {{ scope.row.userName }}
        </el-link>
      </template>
      <template slot="action-button">
        <el-link v-has="'btn-download'" @click="downloadTemplate" :underline="false" class="mr-2" type="primary">导入模板下载</el-link>
        <el-button v-has="'btn-import'" @click="importTemplate">导入</el-button>
        <el-button v-has="'btn-export'" @click="exportHandle">导出</el-button>
        <el-button v-has="'btn-update-code'" @click="updateQrCode">更新二维码</el-button>
        <el-button v-has="'btn-export-code'" @click="downloadQrCode">导出二维码</el-button>
        <el-button v-has="'btn-add'" @click="addHandle" type="primary">新增</el-button>
      </template>
      <template slot="opt" slot-scope="{ scope }">
        <el-link v-has="'btn-edit'" :underline="false" type="primary" class="mr-3 blue--text text--darken-2" @click="editHandle(scope.row)">
          编辑
        </el-link>
        <el-link v-has="'btn-del'" :underline="false" type="primary" class="mr-3 blue--text text--darken-2" @click="delHandle(scope.row)">
          删除
        </el-link>
      </template>
    </i-search-el-table-check>
    <add ref="formDialog" v-model="dialog.add" :selection="selection" @show="dialog.add = false" @refreshTable="initTable" />
    <detail ref="detailDialog" v-model="dialog.detail" :selection="selection" @show="dialog.detail = false" />
    <import-user v-model="dialog.import" @success="importSuccess" @show="dialog.import = false" />
  </div>
</template>

<script>
import ISearchElTableCheck from '@/components/ISearchElTableCheck'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import axios from 'axios'
import { GLOBAL, getDictEntrysByCode, download } from '@/utils'
import { getToken } from '@/utils/auth'
import Add from './add'
import Detail from './detail'
import ImportUser from './import'
export default {
  name: 'Product',
  components: {
    Treeselect,
    ISearchElTableCheck,
    Add,
    Detail,
    ImportUser,
  },
  data() {
    return {
      columns: [
        { label: '姓名', key: 'userName', align: 'left', 'min-width': 150 },
        { label: '所属机构', key: 'orgName', align: 'left', 'min-width': 150 },
        {
          label: '身份证号',
          key: 'userIdCard',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '手机号',
          key: 'userPhone',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '营销编号',
          key: 'userCode',
          align: 'left',
          'min-width': 150,
        },
        { label: '操作', key: 'opt', align: 'left', 'min-width': 120, isNoUrl: true },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        orgCode: null,
        userIdCard: null,
        userName: null,
        userPhone: null,
      },
      data: {},
      loading: false,
      options: [],
      normalizer(node) {
        return {
          id: node.orgCode,
          label: node.orgName,
          children: node.children,
        }
      },
      dialog: {
        add: false,
        detail: false,
        import: false,
      },
      selection: null,
    }
  },
  computed: {
    productStatusDs() {
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
          name: '未启用',
          code: 3,
        },
      ]
    },
  },
  mounted() {
    this.initTable()
    this.getOrganizationTree()
  },
  methods: {
    initTable() {
      this.loading = true
      this.$api.mrkPerson.findByPage(this.queryForm).then((res) => {
        this.data = res
        this.loading = false
        // setTimeout(() => {
        //   this.$refs.table.setSelectRow()
        // }, 20)
      })
    },
    getOrganizationTree() {
      this.$api.mrkOrg.getOrgTree().then((res) => {
        this.options = res ? [res] : []
      })
    },
    simleQuery() {
      this.$refs.table.handleFilter()
    },
    addHandle() {
      this.selection = null
      this.dialog.add = true
      // 重置子组件form表单
      if (this.$refs.formDialog.$refs.form) {
        this.$refs.formDialog.$refs.form.resetFields()
      }
    },
    // 编辑
    editHandle(row) {
      this.selection = Object.assign({}, row)
      this.dialog.add = true
      // 重置子组件form表单
      if (this.$refs.formDialog.$refs.form) {
        this.$refs.formDialog.$refs.form.resetFields()
      }
    },
    // 查看
    detailHandle(row) {
      this.selection = row
      this.dialog.detail = true
    },
    // 删除
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要删除该用户吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.mrkPerson.deleteMktUser({ userId: row.userId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.$refs.table.$refs.table.clearSelection()
            this.$refs.table.selection = []
            this.queryForm.pageNum = 1
            this.initTable()
          })
        })
    },
    // 更新二维码
    updateQrCode() {
      if (this.$refs.table.isChecked()) {
        const selection = this.$refs.table.selection
        const userIds = selection.map((row) => {
          return row.userId
        })
        this.$refs.table
          .delConfirm({
            message: '确认要批量更新选中的用户二维码吗？',
            confirmButtonText: '确认',
            cancelButtonText: '返回',
            type: 'warning',
            title: '操作提示',
          })
          .then(() => {
            this.$api.mrkPerson.updateImg({ userId: userIds.join(',') }).then(() => {
              this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
              this.$refs.table.clearSelection()
              this.initTable()
            })
          })
      }
    },
    // 导出二维码
    downloadQrCode() {
      if (this.$refs.table.isChecked()) {
        const selection = this.$refs.table.selection
        const userIds = selection.map((row) => {
          return row.userId
        })
        this.$refs.table
          .delConfirm({
            message: '确认要批量导出选中的用户二维码吗？',
            confirmButtonText: '确认',
            cancelButtonText: '返回',
            type: 'warning',
            title: '操作提示',
          })
          .then(() => {
            download(`${process.env.PREFIX_URL}/sysMktUser/exportImg?token=${getToken()}&ids=${userIds.join(',')}`)
          })
      }
    },
    // 导出用户
    exportHandle() {
      if (this.$refs.table.isChecked()) {
        const selection = this.$refs.table.selection
        const userIds = selection.map((row) => {
          return row.userId
        })
        this.$refs.table
          .delConfirm({
            message: '确认要批量导出选中的用户吗？',
            confirmButtonText: '确认',
            cancelButtonText: '返回',
            type: 'warning',
            title: '操作提示',
          })
          .then(() => {
            download(`${process.env.PREFIX_URL}/sysMktUser/export?token=${getToken()}&userId=${userIds.join(',')}`)
          })
      }
    },
    importTemplate() {
      this.dialog.import = true
    },
    // 导入用户成功
    importSuccess() {
      this.queryForm.pageNum = 1
      this.initTable()
    },
    downloadTemplate() {
      download(`${process.env.PREFIX_URL}/sysMktUser/exportTemplete?token=${getToken()}`)
    },
    downloadFile(data, mime) {
      const contentDisposition = data.headers['content-disposition']
      const contents = contentDisposition.split(';')
      const index = contents.findIndex((x) => x.startsWith('filename=') == true)
      let fileName = (fileName = contents[index].substring(9, contents[index].lastIndexOf('.')))
      const extensionName = contents[index].substring(contents[index].lastIndexOf('.'), contents[index].length)
      fileName = decodeURI(fileName) + extensionName
      const blob = new Blob([data.data], { type: mime })
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
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
.x-link {
  display: inline-block;
  max-width: 100%;
}
</style>
