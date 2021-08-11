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
            style="width: 260px"
            v-model.trim="queryForm.productName"
            :maxlength="100"
            size="small"
            placeholder="请输入产品名称或产品编码"
            clearable
            @keyup.enter.native="simpleQuery"
            @change="simpleQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="simpleQuery" />
          </el-input>
        </el-form-item>
      </template>
      <template slot="productName" slot-scope="{ scope }">
        <el-link type="primary" class="text-truncate blue--text text--darken-2 x-link" @click="detailHandle(scope.row)">
          {{ scope.row.productName }}
        </el-link>
      </template>
      <template slot="productAmount" slot-scope="{ scope }">
        <span v-if="scope.row.productMinAmount && scope.row.productMaxAmount">
          {{ scope.row.productMinAmount | formatMoney(2) }} ~
          {{ scope.row.productMaxAmount | formatMoney(2) }}
        </span>
        <span v-else>--</span>
      </template>
      <template slot="productRate" slot-scope="{ scope }">
        <span v-if="scope.row.productMinRate && scope.row.productMaxRate">
          {{ scope.row.productMinRate | formatMoney(4) }} ~
          {{ scope.row.productMaxRate | formatMoney(4) }}
        </span>
        <span v-else>--</span>
      </template>
      <template slot="productDeadline" slot-scope="{ scope }">
        <span v-if="scope.row.productMinDeadline && scope.row.productMaxDeadline">
          {{ scope.row.productMinDeadline }} ~
          {{ scope.row.productMaxDeadline }}
        </span>
        <span v-else>--</span>
      </template>
      <template slot="productStatus" slot-scope="{ scope }">
        <el-link
          :underline="false"
          :type="scope.row.productStatus == 1 ? 'success' : scope.row.productStatus == 2 ? 'info' : 'primary'"
          style="cursor: default"
        >
          {{ scope.row.productStatus | dictFormat(productStatusDs) }}
        </el-link>
        <!-- {{ scope.row.productStatus | dictFormat(productStatusDs) }} -->
      </template>
      <template slot="action-button">
        <el-button-group>
          <el-button v-has="'btn-add'" @click="addHandle" type="primary">新增</el-button>
        </el-button-group>
      </template>

      <template slot="opt" slot-scope="{ scope }">
        <template v-if="scope.row.productStatus == 1">
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
            v-has="'btn-disable'"
            :underline="false"
            type="primary"
            class="mr-3 blue--text text--darken-2"
            @click="disableHandle(scope.row)"
          >
            停用
          </el-link>
        </template>
        <template v-if="scope.row.productStatus == 2">
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
        <template v-if="scope.row.productStatus == 3">
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
        { label: '名称', key: 'productName', align: 'left', 'min-width': 150 },
        { label: '编码', key: 'productCode', align: 'left', 'min-width': 150 },
        {
          label: '额度(万元)',
          key: 'productAmount',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '年利率(%)',
          key: 'productRate',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '期限(月)',
          key: 'productDeadline',
          align: 'left',
          'min-width': 150,
        },
        {
          label: '状态',
          key: 'productStatus',
          align: 'left',
          'min-width': 150,
        },
        { label: '操作', key: 'opt', align: 'left', 'min-width': 200 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        productName: null,
      },
      data: {},
      id: null,
      loading: false,
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
  },
  methods: {
    initTable() {
      this.loading = true
      this.$api.product.findByPage(this.queryForm).then((res) => {
        this.data = res
        this.loading = false
      })
    },
    simpleQuery() {
      this.$refs.table.handleFilter()
    },
    // 新增
    addHandle() {
      this.$router.push({
        path: '/system/product/add',
        query: {
          $parent_path: this.$route.path,
        },
      })
    },
    // 编辑
    editHandle(row) {
      this.$router.push({
        path: '/system/product/add',
        query: {
          $parent_path: this.$route.path,
          id: row.productId,
        },
      })
    },
    // 查看
    detailHandle(row) {
      this.$router.push({
        path: '/system/product/detail',
        query: {
          $parent_path: this.$route.path,
          id: row.productId,
        },
      })
    },
    // 删除
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要删除该产品（${row.productName}）吗？删除后部分业务将不能正常使用，请谨慎操作！`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.product.deleteProduct({ productId: row.productId }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.initTable()
          })
        })
    },
    // 启用
    enableHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要启用该产品（${row.productName}）吗？`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.product.inUse({ productId: row.productId, productStatus: 1 }).then(() => {
            this.$message({
              message: GLOBAL.OPERATE_SUCCESS,
              type: 'success',
            })
            this.initTable()
          })
        })
    },
    // 停用
    disableHandle(row) {
      this.$refs.table
        .delConfirm({
          message: `确认要停用该产品（${row.productName}）吗？停用后部分业务将不能正常使用，请谨慎操作！`,
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning',
          title: '操作提示',
        })
        .then(() => {
          this.$api.product.inUse({ productId: row.productId, productStatus: 2 }).then(() => {
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
.x-link {
  display: inline-block;
  max-width: 100%;
}
</style>
