<template>
  <div class="org-page" v-loading="loading">
    <div class="layui-side text-center">
      <el-tree
        v-if="orgs && orgs.length > 0"
        ref="orgTree"
        class="mt-3"
        default-expand-all
        node-key="orgId"
        highlight-current
        :data="orgs"
        :props="defaultProps"
        :current-node-key="keyTree"
        :expand-on-click-node="false"
        @node-click="nodeClickHandle"
        @node-contextmenu="contextmenuHandle"
      />
      <el-button v-else @click="addOrg(1)" type="primary" class="x-button">
        <i class="el-icon-plus"></i>
        新增机构
      </el-button>
    </div>
    <div class="layui-body overflow-x-hidden">
      <org-detail v-if="rightBoxType == 1" :selection="selection" />
      <org-add v-else-if="rightBoxType == 2" :selection="selection" @refreshTreeNode="refreshTreeNode" @reset-view-type="resetViewType" />
    </div>
    <el-popover ref="popRef" v-model="contextmenuShow" popper-class="menu-pop" placement="top-start">
      <ul>
        <li v-has="'btn-add-child'" @click="addOrg"><i class="el-icon-circle-plus" />增加子机构</li>
        <li v-has="'btn-edit'" @click="editOrg"><i class="el-icon-edit" />修改机构</li>
        <li v-has="'btn-del'" @click="deleteOrg"><i class="el-icon-delete" />删除机构</li>
      </ul>
    </el-popover>
  </div>
</template>

<script>
import ISearchElTable from '@/components/ISearchElTable'
import { mappingData, GLOBAL, getDictEntrysByCode } from '@/utils'
import { on, off } from 'element-ui/src/utils/dom'
import OrgAdd from './add'
import OrgDetail from './detail'
export default {
  name: 'Organization',
  components: {
    ISearchElTable,
    OrgAdd,
    OrgDetail,
  },
  data() {
    return {
      orgs: [],
      loading: false,
      defaultProps: {
        label: 'orgName',
        children: 'children',
        isLeaf: function (val) {
          return val.orgIsleaf == '1'
        },
      },
      contextmenuShow: false,
      popData: null, // 选中节点数据
      selection: null,
      rightBoxType: 1, // 右侧展示的内容：1详情  2新增or编辑
      keyTree: '',
    }
  },
  mounted() {
    this.getOrgTree()
  },
  methods: {
    // 获取机构数据源
    getOrgTree(org) {
      this.loading = true
      this.rightBoxType = 1
      this.$api.mrkOrg.getOrgTree().then((res) => {
        this.loading = false
        if (res) {
          this.orgs = [res]
          if (this.orgs.length > 0) {
            this.$nextTick(() => {
              this.selection = this.orgs[0]
              this.keyTree = this.selection.orgId
              this.$refs.orgTree.setCurrentKey(this.keyTree)
            })
          }
        }
      })
    },
    addOrg(orgType) {
      this.selection = {
        isAdd: 1,
        orgParId: orgType == 1 ? -1 : this.popData.orgId,
        orgName: orgType == 1 ? '' : this.popData.orgName,
      }
      this.rightBoxType = 2
    },
    editOrg() {
      this.selection = this.popData
      this.rightBoxType = 2
    },
    deleteOrg() {
      this.$confirm(`确认要删除该机构（${this.popData.orgName}）吗？`, {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning',
        title: '操作提示',
      }).then(() => {
        this.$api.mrkOrg.deleteOrg({ orgId: this.popData.orgId }).then((res) => {
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.getOrgTree()
        })
      })
    },
    // 节点单击事件
    nodeClickHandle(data) {
      this.contextmenuShow = false
      this.selection = data
      this.popData = data
      this.rightBoxType = 1
    },
    // 鼠标右键事件
    contextmenuHandle(event, data) {
      event.preventDefault()
      this.contextmenuShow = true
      this.$refs.popRef.$refs.popper.style.top = event.clientY - 100 + 'px'
      this.popData = data
      this.selection = data
      this.keyTree = data.orgId
      this.$nextTick(() => {
        this.$refs.orgTree.setCurrentKey(this.keyTree)
      })
      on(document, 'click', this.handleDocumentClick)
    },
    // 编辑、新增后刷新节点
    refreshTreeNode(curNode) {
      this.$api.mrkOrg.getOrgTree().then((res) => {
        this.loading = false
        if (res) {
          this.orgs = [res]
          if (this.orgs.length > 0) {
            this.$nextTick(() => {
              this.selection = curNode
              this.keyTree = curNode.orgId
              this.$refs.orgTree.setCurrentKey(this.keyTree)
              this.rightBoxType = 1
            })
          }
        }
      })
    },
    handleDocumentClick(event) {
      this.contextmenuShow = false
    },
    resetViewType() {
      this.selection = this.popData
      this.rightBoxType = 1
    },
  },
}
</script>

<style lang="scss" scoped>
.org-page {
  height: 100%;
  .layui-side {
    width: 250px;
    .x-button {
      width: 200px;
      margin-top: 50px;
    }
    /deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      color: #409eff;
      font-weight: bold;
    }
    /deep/.el-tree-node__label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .layui-body {
    left: 270px;
  }

  .menu-pop {
    ul {
      padding: 0;
      margin: 0;
      max-height: 400px;
      overflow: auto;
      li {
        list-style: none;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
        i {
          padding-right: 10px;
        }
      }
      li:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
</style>
