<template>
  <div class="resource-page">
    <i-search-el-table
      ref="table"
      :query-form="queryForm"
      :columns="columns"
      :data="data"
      :loading="loading"
      :index="true"
      :has-check-box="false"
      advance-query
      @pagination="initDataTable"
    >
      <template slot="simple-form">
        <el-form-item @submit.native.prevent>
          <el-input
            v-model.trim="queryForm.kpiName"
            :maxlength="20"
            size="small"
            placeholder="请输入指标名称"
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
        <el-form-item label="指标状态：" label-width="100px" prop="releaseFlag">
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
      <template slot="kpiName" slot-scope="{ scope }">
        <el-link type="primary" @click="detailHandle(scope.row)">{{
          scope.row.kpiName
        }}</el-link>
      </template>
      <template slot="releaseFlag" slot-scope="{ scope }">
        {{ scope.row.releaseFlag | dictFormats(releaseFlagDs) }}
      </template>
      <template slot="action-button">
        <el-button @click="addHandle" v-has="'btn-add'">
          <span>新增</span>
        </el-button>
        <i-btn-upload
          v-has="'btn-import'"
          url="/allotKpi/import"
          class="dropdown-upload"
          @uploaded="initDataTable"
        >
          <slot>导入</slot>
        </i-btn-upload>
        <el-button v-has="'btn-export'" @click="exportHandle">
          <span>导出</span>
        </el-button>
      </template>
      <template slot="opration" slot-scope="{ scope }">
        <el-link
          v-has="'btn-edit'"
          :type="scope.row.releaseFlag == '1' ? 'primary' : 'default'"
          :underline="false"
          :disabled="scope.row.releaseFlag != '1'"
          class="body-2"
          @click="editHandle(scope.row)"
        >
          修改
        </el-link>
        <el-link
          v-has="'btn-release'"
          :type="scope.row.releaseFlag == '1' ? 'primary' : 'default'"
          class="ml-3 body-2"
          :underline="false"
          :disabled="scope.row.releaseFlag != '1'"
          @click="releaseHandle(scope.row)"
        >
          发布
        </el-link>
        <el-link
          v-has="'btn-offline'"
          :type="scope.row.releaseFlag == '2' ? 'primary' : 'default'"
          class="ml-3 body-2"
          :underline="false"
          :disabled="scope.row.releaseFlag != '2'"
          @click="offlineHandle(scope.row)"
        >
          下线
        </el-link>
        <el-link
          v-has="'btn-del'"
          :type="scope.row.releaseFlag == '1' ? 'danger' : 'default'"
          class="ml-3 body-2"
          :underline="false"
          :disabled="scope.row.releaseFlag != '1'"
          @click="delHandle(scope.row)"
        >
          删除
        </el-link>
      </template>
    </i-search-el-table>
  </div>
</template>

<script>
import ISearchElTable from "@/components/ISearchElTable";
import IBtnUpload from "@/components/IBtnUpload";
import { download } from "@/utils";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  components: { ISearchElTable, IBtnUpload },
  data() {
    return {
      columns: [
        {
          label: "指标名称",
          key: "kpiName",
          align: "left",
          "min-width": 120,
        },
        { label: "指标编码", key: "kpiCode", align: "left", "min-width": 100 },
        {
          label: "指标状态",
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
          label: "指标说明",
          key: "kpiRemark",
          align: "left",
          "min-width": 120,
        },
        { label: "操作", key: "opration", align: "left", "min-width": 130 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        kpiName: null,
        releaseFlag: null,
      },
      data: {},
      loading: false,
      dialog: {
        add: false,
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
      this.$api.targetConfig.findByPage(this.queryForm).then((res) => {
        this.data = res;
        this.loading = false;
      });
    },
    addHandle() {
      this.$router.push({
        path: "/customer-assign-engine/add-target-config",
        query: {
          $parent_path: this.$route.path,
        },
      });
    },
    editHandle(row) {
      this.$router.push({
        path: "/customer-assign-engine/add-target-config",
        query: {
          id: row.kpiId,
          $parent_path: this.$route.path,
        },
      });
    },
    detailHandle(row) {
      this.$router.push({
        path: "/customer-assign-engine/detail-target-config",
        query: {
          id: row.kpiId,
          $parent_path: this.$route.path,
        },
      });
    },
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          message: "点击确定后，该指标将被删除。",
          title: "删除提示",
        })
        .then(() => {
          this.$api.targetConfig.deleteTarget({ kpiId: row.kpiId }).then(() => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.initDataTable();
          });
        });
    },
    releaseHandle(row) {
      this.$refs.table
        .delConfirm({
          message: "点击确定后，该指标将被发布，无法编辑或删除。",
          title: "发布提示",
        })
        .then(() => {
          this.$api.targetConfig.pubAllotKPI({ kpiId: row.kpiId }).then(() => {
            this.$message({
              message: "发布成功",
              type: "success",
            });
            this.initDataTable();
          });
        });
    },
    offlineHandle(row) {
      this.$api.targetConfig.hasKpi({ kpiName: row.kpiName }).then((res) => {
        if (res.result == 1) {
          this.$alert(
            "该指标已被应用，请解除相关分配策略的应用后再下线。",
            "无法下线提示",
            {
              confirmButtonText: "我知道了",
            }
          );
        } else {
          this.$refs.table
            .delConfirm({
              message: "点击确定后，该指标将被下线，无法被关联调用。",
              title: "下线提示",
            })
            .then(() => {
              this.$api.targetConfig
                .undAllotKPI({ kpiId: row.kpiId })
                .then(() => {
                  this.$message({
                    message: "下线成功",
                    type: "success",
                  });
                  this.initDataTable();
                });
            });
        }
      });
    },
    exportHandle() {
      download(
        `${
          process.env.PREFIX_URL
        }/allotKpi/export?token=${getToken()}&releaseFlag=${
          this.queryForm.releaseFlag || ""
        }&kpiName=${this.queryForm.kpiName || ""}`
      );
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
