<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      title="请选择菜单地址"
      width="800px"
      @closed="closed"
    >
      <i-search-el-table
        ref="resourceTable"
        :query-form="queryForm"
        :columns="columns"
        :data="data"
        :show-page-title="false"
        :advanceQueryButton="false"
        :loading="loading"
        :page-sizes="[5, 15, 20]"
        :hasCheckBox="false"
        index
        @pagination="initDataTable"
      >
        <template slot="simple-form">
          <el-form-item @submit.native.prevent>
            <el-input
              v-model.trim="queryForm.moduleName"
              size="small"
              placeholder="请输入资源名称"
              clearable
            >
              <el-button
                slot="append"
                @click="$refs.resourceTable.handleFilter()"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-form-item>
        </template>
        <template slot="opt" slot-scope="{ scope }">
          <el-link
            :underline="false"
            type="primary"
            class="blue--text text--darken-2"
            @click="chooseHandle(scope.row)"
          >
            选择
          </el-link>
        </template>
      </i-search-el-table>
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode } from "@/utils";
import ISearchElTable from "@/components/ISearchElTable/index";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "GrantResource",
  components: {
    ISearchElTable,
  },
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    queryInfo: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      columns: [
        {
          label: "资源名称",
          key: "moduleName",
          align: "left",
          "min-width": 120,
        },
        {
          label: "资源路径",
          key: "reqAddr",
          align: "left",
          "min-width": 200,
        },
        {
          label: "资源描述",
          key: "reqMethod",
          align: "left",
          "min-width": 120,
        },
        { label: "操作", key: "opt", align: "center", "min-width": 100 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 5,
        appsId: null,
        moduleChannel: null,
        moduleName: null,
      },
      data: {},
      loading: false,
    };
  },
  computed: {
    menuTreeDs() {
      return getDictEntrysByCode("CHANNEL");
    },
    productTypeDs() {
      return getDictEntrysByCode("PRODUCT_TYPE");
    },
    channelDs() {
      return getDictEntrysByCode("CHANNEL");
    },
    typeDs() {
      return [
        { name: "未授权", code: 1 },
        { name: "已授权", code: 2 },
        { name: "未知", code: null },
      ];
    },
  },
  watch: {
    value(value) {
      this.show = value;
      if (this.queryInfo) {
        this.$nextTick(() => {
          this.queryForm = this.$options.data().queryForm;
          this.initDataTable();
        });
      }
    },
  },
  methods: {
    initDataTable() {
      this.loading = true;
      this.queryForm.appsId = this.queryInfo.appsId;
      this.queryForm.moduleChannel = this.queryInfo.menuChannel;
      this.$api.resource.findByPageOfHome(this.queryForm).then((res) => {
        this.loading = false;
        this.data = res;
      });
    },
    dialogShowChg() {
      this.$emit("show");
    },
    closed() {
      this.dialogShowChg();
    },
    chooseHandle(row) {
      this.$emit("choose-handle", row.reqAddr);
      this.dialogShowChg();
    },
  },
};
</script>

<style scoped></style>
