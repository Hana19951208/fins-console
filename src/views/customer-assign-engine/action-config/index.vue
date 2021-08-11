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
            v-model.trim="queryForm.actionName"
            :maxlength="50"
            size="small"
            placeholder="请输入动作名称"
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
        <el-form-item label="动作状态：" label-width="100px" prop="releaseFlag">
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
      <template slot="actionName" slot-scope="{ scope }">
        <el-link type="primary" @click="detailHandle(scope.row)">{{
          scope.row.actionName
        }}</el-link>
      </template>
      <template slot="releaseFlag" slot-scope="{ scope }">
        {{ scope.row.releaseFlag | dictFormats(releaseFlagDs) }}
      </template>
      <template slot="action-button">
        <el-button v-has="'btn-add'" @click="addHandle">
          <span>新增</span>
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
import { getDictEntrysByCode, GLOBAL } from "@/utils";
import { mapGetters } from "vuex";
export default {
  components: { ISearchElTable },
  data() {
    return {
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
          "min-width": 100,
        },
        {
          label: "动作状态",
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
          label: "动作说明",
          key: "actionRemark",
          align: "left",
          width: 120,
        },
        { label: "操作", key: "opration", align: "left", "min-width": 130 },
      ],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        actionName: null,
        releaseFlag: null,
      },
      data: {},
      loading: false,
      addDialog: {
        show: false,
      },
      selection: {},
      form: {
        resourceId: null,
        roleId: null,
      },
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
      this.$api.actionConfig.findByPage(this.queryForm).then((res) => {
        this.data = res;
        this.loading = false;
      });
    },
    addHandle() {
      this.$router.push({
        path: "/customer-assign-engine/add-action-config",
        query: {
          $parent_path: this.$route.path,
        },
      });
    },
    editHandle(row) {
      this.$router.push({
        path: "/customer-assign-engine/add-action-config",
        query: {
          id: row.actionId,
          $parent_path: this.$route.path,
        },
      });
    },
    detailHandle(row) {
      this.$router.push({
        path: "/customer-assign-engine/detail-action-config",
        query: {
          id: row.actionId,
          $parent_path: this.$route.path,
        },
      });
    },
    delHandle(row) {
      this.$refs.table
        .delConfirm({
          message: "点击确定后，该动作将被删除。",
          title: "删除提示",
        })
        .then(() => {
          this.$api.actionConfig
            .deleteAction({ actionId: row.actionId })
            .then(() => {
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
          message: "点击确定后，该动作将被发布，无法修改或删除。",
          title: "发布提示",
        })
        .then(() => {
          this.$api.actionConfig
            .pubAllotAction({ actionId: row.actionId })
            .then(() => {
              this.$message({
                message: "发布成功",
                type: "success",
              });
              this.initDataTable();
            });
        });
    },
    offlineHandle(row) {
      this.$api.actionConfig
        .hasAction({ actionName: row.actionName })
        .then((res) => {
          if (res.result == 1) {
            this.$alert(
              "该动作已被应用，请解除相关分配策略的应用后再下线。",
              "无法下线提示",
              {
                confirmButtonText: "我知道了",
              }
            );
          } else {
            this.$refs.table
              .delConfirm({
                message: "点击确定后，该动作将被下线，无法被关联调用。",
                title: "下线提示",
              })
              .then(() => {
                this.$api.actionConfig
                  .undAllotAction({ actionId: row.actionId })
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
