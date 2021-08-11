<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      title="选择动作"
      width="850px"
      @closed="closed"
    >
      <i-search-el-table
        ref="customActionTable"
        :query-form="queryForm"
        :columns="columns"
        :data="data"
        :show-page-title="false"
        :advanceQueryButton="false"
        :loading="loading"
        :page-sizes="[5, 15, 20]"
        :label-position="'left'"
        @pagination="initDataTable"
        @row-dblclick="rowDblclickHandle"
      >
        <template slot="simple-form">
          <el-form-item label="动作名称:" label-width="80px">
            <el-input
              v-model.trim="queryForm.actionName"
              size="small"
              placeholder="请输入"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item class="ml-2" label="指标编码:" label-width="80px">
            <el-input
              v-model.trim="queryForm.actionCode"
              size="small"
              placeholder="请输入"
              clearable
            >
            </el-input>
          </el-form-item>
        </template>
        <template slot="action-button">
          <el-button type="primary" plain @click="initDataTable"
            >查询</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </template>
        <template slot="extra-header">
          <div class="mt-2 mb-2 clearfix">
            <span class="left">*双击可带入</span>
            <el-button class="right" type="primary" @click="rowClickHandle"
              >带入</el-button
            >
          </div>
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
  name: "ChooseTarget",
  components: {
    ISearchElTable,
  },
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
      columns: [
        {
          label: "动作名称",
          key: "actionName",
          align: "left",
          "min-width": 120,
        },
        {
          label: "动作编码",
          key: "actionCode",
          align: "left",
          "min-width": 120,
        },
        {
          label: "动作说明",
          key: "actionRemark",
          align: "left",
          "min-width": 200,
        },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 5,
        releaseFlag: "2",
        actionName: null,
        actionCode: null,
      },
      data: {},
      loading: false,
    };
  },
  watch: {
    value(value) {
      this.show = value;
      this.$nextTick(() => {
        this.queryForm = this.$options.data().queryForm;
        this.initDataTable();
      });
    },
  },
  methods: {
    initDataTable() {
      this.loading = true;
      this.$api.actionConfig.findByPage(this.queryForm).then((res) => {
        this.loading = false;
        this.data = res;
      });
    },
    resetForm() {
      this.queryForm.pageNum = 1;
      this.queryForm.actionName = null;
      this.queryForm.actionCode = null;
      this.initDataTable();
    },
    dialogShowChg() {
      this.$emit("show");
    },
    closed() {
      this.dialogShowChg();
    },
    rowClickHandle() {
      if (this.$refs.customActionTable.isCheckedOne("请选择动作")) {
        const row = this.$refs.customActionTable.selection[0];
        this.$emit("choose-action-handle", row.actionName);
        this.dialogShowChg();
      }
    },
    rowDblclickHandle(row) {
      this.$emit("choose-action-handle", row.actionName);
      this.dialogShowChg();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
