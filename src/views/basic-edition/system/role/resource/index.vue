<template>
  <el-card class="resource body-2" style="height: 100%" shadow="never">
    <div slot="header">
      <a @click="goBack" class="grey--text">
        <i class="el-icon-arrow-left" />
        <span>返回</span>
        <span class="black--text pl-2">权限管理</span>
      </a>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" class="x-col border">
        <div class="role px-2 py-3 red--text">当前角色：{{ roleName }}</div>
        <left-menu @init-table-data="changeLeftApp" />
      </el-col>
      <el-col v-loading="loading" :span="20" class="x-col">
        <breadcrumb :firstBreadcrumb="firstBreadcrumb" :secondBreadcrumb="secondBreadcrumb" />
        <el-tabs type="border-card" class="mt-3">
          <el-tab-pane label="授权菜单及操作按钮">
            <btn-resource :role-id="roleId" :appInfo="appInfo" />
          </el-tab-pane>
          <el-tab-pane label="数据访问控制">
            <data-resource :role-id="roleId" :appInfo="appInfo" />
          </el-tab-pane>
          <el-tab-pane label="首页模块配置">
            <home-resource :role-id="roleId" :appInfo="appInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import LeftMenu from '../../components/left-menu'
import Breadcrumb from '../../components/breadcrumb'
import BtnResource from './btn'
import DataResource from './data'
import HomeResource from './home'
export default {
  components: {
    LeftMenu,
    Breadcrumb,
    BtnResource,
    DataResource,
    HomeResource,
  },
  data() {
    return {
      loading: false,
      roleId: null,
      roleName: null,
      firstBreadcrumb: null,
      secondBreadcrumb: null,
      treeDs: [],
      appInfo: null,
    }
  },
  mounted() {
    const query = this.$route.query
    this.roleId = query.id
    this.roleName = query.name
  },
  methods: {
    changeLeftApp(appInfo, client) {
      if (appInfo && client) {
        this.firstBreadcrumb = appInfo.appsName
        this.secondBreadcrumb = client
        this.appInfo = {
          roleId: this.roleId,
          appsId: appInfo.appsId,
          roleChannel: client,
        }
      }
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.resource {
  /deep/.el-row,
  /deep/.el-tab-pane {
    height: 100%;
  }
  /deep/.el-card__body {
    height: calc(100% - 53px);
  }
  /deep/.el-tabs--border-card {
    height: calc(100% - 46px);
  }
  /deep/.el-tabs__content {
    height: calc(100% - 39px);
  }
  /deep/.el-menu {
    height: auto;
    border-right: none;
  }
  .x-col {
    height: 100%;
    overflow-y: auto;
  }
  .border {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-right: solid 1px #e6e6e6;
  }
  .role {
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    font-weight: bold;
  }
}
</style>
