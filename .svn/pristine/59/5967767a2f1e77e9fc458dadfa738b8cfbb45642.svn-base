<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      width="750px"
      :title="title"
      @closed="dialogShowChg"
    >
      <el-form
        ref="addform"
        :model="queryForm"
        :rules="rules"
        status-icon
        class="pad-min"
        v-show="showQuery"
      >
        <el-row :gutter="0">
          <el-col :span="6" :offset="2">
            <el-form-item>
              <el-select
                class="filter-item"
                v-model="queryForm.type"
                size="medium"
              >
                <el-option
                  v-for="item in typeDs"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="value">
              <el-input
                size="medium"
                v-model="queryForm.value"
                :maxlength="50"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 5px">
            <el-button size="medium" type="primary" @click="submit('addform')"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <i-search-el-table
        v-show="!showQuery"
        ref="table"
        :query-form="queryForm"
        :columns="columns"
        :data="data"
        :noQuery="true"
        :showPageTitle="false"
        :hasCheckBox="false"
        :loading="loading"
        empty-text="没有找到您要搜索的客户，请核对搜索信息"
      >
      </i-search-el-table>
    </el-dialog>
  </div>
</template>
<script>
import { GLOBAL, mappingData, getDictEntrysByCode } from "@/utils";
import ISearchElTable from "@/components/ISearchElTable";
export default {
  name: "Add",
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
      showQuery: true,
      loading: false,
      queryForm: {
        pageNum: 1,
        pageSize: 5,
        type: "1",
        value: null,
      },
      data: {},
      typeDs: [
        { name: "身份证", code: "1" },
        { name: "姓名", code: "2" },
        { name: "手机", code: "3" },
      ],
      rules: {
        value: [{ required: true, message: "请输入搜索条件", trigger: "blur" }],
      },
      columns: [
        { label: "姓名", key: "name", align: "center" },
        { label: "身份证号", key: "idCard", align: "center", width: "180" },
        { label: "手机", key: "phone", align: "center", width: "150" },
        { label: "产品", key: "productCode", align: "center" },
        { label: "状态", key: "applyStatus", align: "center", width: "120" },
      ],
    };
  },
  mounted() {},
  computed: {
    title() {
      return this.showQuery ? "客户搜索" : "搜索结果";
    },
  },
  watch: {
    value(value) {
      this.show = value;
      this.showQuery = true;
      this.queryForm.pageNum = 1;
      this.queryForm.type = "1";
      this.queryForm.value = "";
    },
  },
  methods: {
    initTable() {
      let data = {
        pageNum: 1,
        pageSize: 10,
      };
      if (this.queryForm.type == "1") {
        data.idCard = this.queryForm.value;
      } else if (this.queryForm.type == "2") {
        data.name = this.queryForm.value;
      } else if (this.queryForm.type == "3") {
        data.phone = this.queryForm.value;
      } else {
        return;
      }
      this.showQuery = false;
      this.loading = true;
      this.$api.dashboard.getSearch(data).then((res) => {
        this.loading = false;
        this.data = res;
      });
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.initTable();
        } else {
          return false;
        }
      });
    },
    closed() {
      this.dialogShowChg();
    },
    dialogShowChg() {
      this.$emit("show");
    },
  },
};
</script>
<style scoped lang="scss">
.pad-min {
  padding: 75px 0;
}
</style>
