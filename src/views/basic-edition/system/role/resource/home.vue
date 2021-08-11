<template>
  <div class="btn-resource" v-loading="loading">
    <div v-show="tableData && tableData.length > 0" class="clearfix px-4">
      <el-button type="primary" class="right" @click="saveHomeResource">保存</el-button>
    </div>
    <el-divider v-if="tableData && tableData.length > 0"></el-divider>
    <div class="px-4" style="overflow-y: auto; height: calc(100% - 50px)">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="moduleName" label="模块名称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="moduleCode" label="模块编码" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="colType" label="列类型"> </el-table-column>
        <el-table-column prop="isCheck" label="状态">
          <template slot-scope="scope">
            <el-link style="cursor: default" :underline="false" :type="scope.row.isCheck ? 'success' : 'info'">
              {{ scope.row.isCheck ? '已配置' : '未配置' }}
            </el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="模块描述" show-overflow-tooltip> </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>
<script>
import { GLOBAL } from '@/utils'
export default {
  props: {
    appInfo: {
      type: Object,
      default: null,
    },
    roleId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableData: [],
      chooseAll: false,
      loading: false,
      hasCheckList: [], // 存放已经勾选的数据
      selection: [],
    }
  },
  watch: {
    appInfo: {
      handler(val) {
        if (val) {
          this.initData(val)
        }
      },
      deep: true,
    },
  },
  methods: {
    initData(data) {
      this.loading = true
      this.allNodeIds = []
      let params = {
        appsId: data.appsId,
        moduleChannel: data.roleChannel,
        roleId: data.roleId,
        pageNum: 1,
        pageSize: 10000,
      }
      this.$api.resource
        .findByPageOfHome(params)
        .then((res) => {
          this.tableData = res.rows || []
          res.rows.forEach((item) => {
            if (item.isCheck) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              })
              this.selection.push(item)
              // this.chooseAll = this.tableData.length > 0 && this.tableData.length == this.selection.length
            }
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    saveHomeResource() {
      this.$confirm('确认要保存此次配置吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning',
        title: '操作提示',
      }).then(() => {
        let list = []
        this.selection.forEach((item) => {
          list.push({
            roleId: this.roleId,
            resourceType: 3,
            resourceId: item.moduleId,
          })
        })
        this.$api.role.relSource({ ...this.appInfo, type: 3, list }).then(() => {
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.initData(this.appInfo)
        })
      })
    },
    // 表格勾选切换
    handleSelectionChange(val) {
      this.selection = val
      // this.chooseAll = this.tableData.length > 0 && this.tableData.length == this.selection.length
    },
    handleCheckAllChange(val) {
      this.tableData.forEach((item) => {
        this.hasCheckList.push(item)
        this.$refs.multipleTable.toggleRowSelection(item, val)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-resource {
  height: 100%;
  /deep/.el-divider--horizontal {
    margin: 8px 0;
  }
}
</style>