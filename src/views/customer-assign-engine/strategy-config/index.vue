<template>
  <div class="resource-page">
    <i-search-el-table
      ref="table"
      :query-form="queryForm"
      :columns="columns"
      :data="data"
      :loading="loading"
      :has-check-box="true"
      advance-query
      @pagination="initDataTable"
    >
      <template slot="simple-form">
        <el-form-item @submit.native.prevent>
          <el-input
            v-model.trim="queryForm.flowName"
            :maxlength="50"
            size="small"
            placeholder="请输入策略名称"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="$refs.table.handleFilter()"
            />
          </el-input>
        </el-form-item>
      </template>
      <template slot="search-form">
        <el-form-item label="策略状态：" label-width="100px" prop="releaseFlag">
          <el-select
            v-model="queryForm.releaseFlag"
            placeholder="全部"
            clearable
          >
            <el-option
              v-for="item in releaseFlagDs"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </template>
      <template slot="flowName" slot-scope="{ scope }">
        <el-link type="primary" @click="lookDiagramHandle(scope.row)">{{
          scope.row.flowName
        }}</el-link>
      </template>
      <template slot="releaseFlag" slot-scope="{ scope }">
        {{ scope.row.releaseFlag | dictFormats(releaseFlagDs) }}
      </template>
      <template slot="action-button">
        <el-button v-has="'btn-add'" @click="addHandle">
          <span>新增</span>
        </el-button>
        <el-button v-has="'btn-edit'" @click="editHandle">
          <span>修改</span>
        </el-button>
        <el-button v-has="'btn-release'" @click="releaseHandle">
          <span>发布</span>
        </el-button>
        <el-button v-has="'btn-offline'" @click="offlineHandle">
          <span>下线</span>
        </el-button>
        <el-button v-has="'btn-del'" @click="delHandle">
          <span>删除</span>
        </el-button>
      </template>
      <template slot="opration" slot-scope="{ scope }">
        <el-link
          v-has="'btn-test'"
          :type="scope.row.releaseFlag != '3' ? 'primary' : 'default'"
          :underline="false"
          :disabled="scope.row.releaseFlag == '3'"
          class="body-2"
          @click="testHandle(scope.row)"
        >
          测试
        </el-link>
        <el-link
          v-has="'btn-diagram-config'"
          :type="scope.row.releaseFlag == '1' ? 'primary' : 'default'"
          class="ml-3 body-2"
          :underline="false"
          :disabled="scope.row.releaseFlag != '1'"
          @click="editDiagramHandle(scope.row)"
        >
          配置图
        </el-link>
      </template>
    </i-search-el-table>
    <test
      ref="testDialog"
      v-model="dialog.test"
      :selection="selection"
      @show="dialog.test = false"
    />
    <add
      ref="addDialog"
      :selection="selection"
      @refreshTable="initDataTable"
      v-model="dialog.add"
      @show="dialog.add = false"
    />
  </div>
</template>

<script>
import ISearchElTable from "@/components/ISearchElTable";
import { getDictEntrysByCode, GLOBAL } from "@/utils";
import { mapGetters } from "vuex";
import Test from "./test";
import Add from "./add";
export default {
  components: { ISearchElTable, Test, Add },
  data() {
    return {
      columns: [
        {
          label: "策略名称",
          key: "flowName",
          align: "left",
          "min-width": 120,
        },
        {
          label: "策略状态",
          key: "releaseFlag",
          align: "left",
          "min-width": 80,
        },
        {
          label: "创建人",
          key: "createUser",
          align: "left",
          "min-width": 100,
        },
        {
          label: "更新时间",
          key: "updateTime",
          align: "left",
          "min-width": 120,
        },
        {
          label: "策略说明",
          key: "flowRemark",
          align: "left",
          "min-width": 120,
        },
        { label: "操作", key: "opration", align: "left", "min-width": 80 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        flowName: null,
        releaseFlag: null,
      },
      data: {},
      loading: false,
      dialog: {
        add: false,
        test: false,
      },
      selection: {},
    };
  },
  computed: {
    releaseFlagDs() {
      return [
        {
          name: "已发布",
          code: "2",
        },
        {
          name: "待发布",
          code: "1",
        },
        {
          name: "已删除",
          code: "3",
        },
      ];
    },
    ...mapGetters(["user"]),
  },
  mounted() {
    this.initDataTable();
  },
  methods: {
    initDataTable() {
      this.loading = true;
      this.$api.strategyConfig.findByPage(this.queryForm).then((res) => {
        this.data = res;
        this.loading = false;
      });
    },
    addHandle() {
      this.selection = {};
      this.dialog.add = true;
    },
    editHandle() {
      if (this.$refs.table.isChecked()) {
        const selections = this.$refs.table.selection;
        if (selections.length > 1) {
          this.$message({
            message: "一次只能修改一条策略",
            type: "warning",
          });
        } else if (selections[0].releaseFlag != "1") {
          this.$message({
            message: "该策略不可修改",
            type: "warning",
          });
        } else {
          this.selection = {
            flowId: selections[0].flowId,
            flowName: selections[0].flowName,
            flowRemark: selections[0].flowRemark,
          };
          this.dialog.add = true;
        }
      }
    },
    delHandle() {
      if (this.$refs.table.isChecked()) {
        const selections = this.$refs.table.selection;
        const hasDelArr = selections.filter(
          (item) => item.releaseFlag == "2" || item.releaseFlag == "3"
        );
        if (hasDelArr.length > 0) {
          this.$message({
            message: "有不可删除数据，请取消后再删除",
            type: "warning",
          });
        } else {
          let ids = [];
          selections.forEach((item) => {
            ids.push({ flowId: item.flowId });
          });
          this.$refs.table
            .delConfirm({
              message: "点击确定后，该策略将被删除。",
              title: "删除提示",
            })
            .then(() => {
              this.$api.strategyConfig.deleteStrategy(ids).then(() => {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.initDataTable();
              });
            });
        }
      }
    },
    releaseHandle() {
      if (this.$refs.table.isChecked()) {
        const selections = this.$refs.table.selection;
        if (selections.length > 1) {
          this.$message({
            message: "一次只能发布一条策略",
            type: "warning",
          });
        } else if (selections[0].releaseFlag != "1") {
          this.$message({
            message: "该策略不可发布",
            type: "warning",
          });
        } else {
          this.$refs.table
            .delConfirm({
              message: "点击确定后，该策略将被发布，可被关联。",
              title: "发布提示",
            })
            .then(() => {
              this.$api.strategyConfig
                .pubAllotFlow({ flowId: selections[0].flowId })
                .then(() => {
                  this.$message({
                    message: "发布成功",
                    type: "success",
                  });
                  this.initDataTable();
                });
            });
        }
      }
    },
    offlineHandle() {
      if (this.$refs.table.isChecked()) {
        const selections = this.$refs.table.selection;
        if (selections.length > 1) {
          this.$message({
            message: "一次只能下线一条策略",
            type: "warning",
          });
        } else if (selections[0].releaseFlag != "2") {
          this.$message({
            message: "只能下线已上线的数据",
            type: "warning",
          });
        } else {
          // this.$api.strategyConfig.hasKpi().then((res) => {
          //   if (res.result == 1) {
          //     this.$message({
          //       message: "该策略已被关联，请解除关联后再下线。",
          //       type: "warning",
          //       showCancelButton: false,
          //       confirmButtonText: "我知道了",
          //     });
          //   } else {
          this.$refs.table
            .delConfirm({
              message: "点击确定后，该策略将被下线，无法被关联。",
              title: "下线提示",
            })
            .then(() => {
              this.$api.strategyConfig
                .undAllotFlow({ flowId: selections[0].flowId })
                .then(() => {
                  this.$message({
                    message: "下线成功",
                    type: "success",
                  });
                  this.initDataTable();
                });
            });
          // }
          // });
        }
      }
    },
    testHandle(row) {
      this.selection = row;
      this.dialog.test = true;
    },
    editDiagramHandle(row) {
      this.$router.push({
        path: "/customer-assign-engine/flow-chart",
        query: {
          id: row.flowId,
          flowName: row.flowName,
        },
      });
    },
    lookDiagramHandle(row) {
      this.$router.push({
        path: "/customer-assign-engine/flow-chart",
        query: {
          isView: 1,
          id: row.flowId,
          flowName: row.flowName,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.resource-page {
  position: relative;
  height: 100%;
  .layui-side {
    width: 200px;
    /deep/ .el-tree-node {
      margin: 12px 6px;
      border: 1px solid #eee;
    }
    /deep/ .el-tree-node.is-current {
      border-left-color: purple;
    }
  }
  .layui-body {
    left: 220px;
  }
}
</style>
