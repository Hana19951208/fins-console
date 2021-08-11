<template>
  <el-menu class="left-menu" :default-active="defaultActive" :default-openeds="defaultOpeneds" :unique-opened="true">
    <el-submenu v-for="item in menuData" :key="item.appsId" :index="item.appsId">
      <template slot="title">
        <span>{{ item.appsName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="client in item.appsClientType"
          :key="client"
          :index="`${item.appsId}-${client}`"
          @click="changeClient(item, client)"
          >{{ client | dictFormat(clientDs) }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { getDictEntrysByCode } from '@/utils'
export default {
  data() {
    return {
      menuData: [],
      defaultActive: '',
      defaultOpeneds: [],
      queryForm: {
        pageSize: 9999,
        pageNum: 1,
        appsStatus: 1,
      },
    }
  },
  computed: {
    clientDs() {
      return getDictEntrysByCode('SYS.COM.CLIENT.TYPE')
    },
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.$api.application.findByPage(this.queryForm).then((res) => {
        if (res.rows) {
          res.rows.map((item) => (item.appsClientType = item.appsClientType.split(',')))
          const pos = res.rows.findIndex((item) => item.appsId == '1')
          res.rows.unshift(res.rows[pos])
          res.rows.splice(pos + 1, 1)
        }
        this.menuData = res.rows || []
        if (this.menuData && this.menuData.length > 0) {
          // 默认展示第一个应用的第一个客户端
          this.defaultOpeneds = [this.menuData[0].appsId]
          this.defaultActive = this.menuData[0].appsId + '-' + this.menuData[0].appsClientType[0]
          // 更新右侧列表数据
          this.changeClient(this.menuData[0], this.menuData[0].appsClientType[0])
        }
      })
    },
    changeClient(item, client) {
      this.$emit('init-table-data', item, client)
    },
  },
}
</script>
<style lang="scss" scoped>
.left-menu {
  height: 100%;
  /deep/.is-active > .el-submenu__title i {
    color: #409eff;
  }
  /deep/.is-active > .el-submenu__title {
    color: #409eff;
    font-weight: bold;
  }
  /deep/.el-submenu .el-menu-item {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 31px;
  }
  /deep/.el-submenu__title span {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 20px;
  }
}
</style>