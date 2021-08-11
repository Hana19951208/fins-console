<template>
  <div class="btn-resource" v-loading="loading">
    <div v-show="data && data.length > 0" class="clearfix px-4">
      <el-checkbox v-model="chooseAll" @change="handleCheckAllChange" class="left">全选</el-checkbox>
      <el-button type="primary" class="right" @click="saveDataResource">保存</el-button>
    </div>
    <el-divider v-if="data && data.length > 0"></el-divider>
    <div class="pl-5" style="overflow-y: auto; height: calc(100% - 50px)">
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        check-strictly
        node-key="resourceId"
        default-expand-all
        :props="defaultProps"
        @check="checkNode"
      >
      </el-tree>
    </div>
  </div>
</template>
<script>
import { GLOBAL, mappingData } from '@/utils'
export default {
  props: {
    appInfo: {
      type: Object,
      default: null,
    },
    roleId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'label',
        isLeaf: function (val) {
          return val.menuIsleaf == '1'
        },
      },
      loading: false,
      chooseAll: false,
      allNodeIds: [], // 存储所有的节点id
    }
  },
  watch: {
    appInfo: {
      handler(val) {
        if (val) {
          this.initData(val)
        }
      },
      deep: true,
    },
  },
  methods: {
    initData(data) {
      this.loading = true
      this.allNodeIds = []
      let params = {
        appsId: data.appsId,
        menuChannel: data.roleChannel,
        roleId: data.roleId,
      }
      this.$api.role
        .getAllResource(params)
        .then((res) => {
          this.loading = false
          this.data = res || []
          this.filterData(this.data)
          this.$nextTick(() => {
            this.renderCheckTree(this.data)
            this.chooseAll = this.allNodeIds.length > 0 && this.$refs.tree.getCheckedKeys().length == this.allNodeIds.length
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 过滤树数组：将按钮buttonList添加进children，同时格式化数据{resourceId, label, resourceType}
    filterData(data) {
      data.forEach((item) => {
        // 保存所有节点id，用于控制全选
        this.allNodeIds.push(item.menuId)
        item.resourceId = item.menuId
        item.label = item.menuName
        item.resourceType = 1
        // 记录真实子节点children长度，用于判断是否需要继续对children遍历
        let length = item.children && item.children.length ? item.children.length : 0
        if (length > 0) {
          item.children.forEach((child) => {
            child.resourceId = child.menuId
            child.label = child.menuName
            child.resourceType = 1
          })
        }
        // 将菜单中的按钮添加到其子节点中
        if (item.buttonList && item.buttonList.length > 0) {
          item.children = item.children || []
          item.buttonList.forEach((btn) => {
            this.allNodeIds.push(btn.buttonId)
            item.children.push({
              resourceId: btn.buttonId,
              label: btn.buttonName,
              isCheck: btn.isCheck,
              resourceType: 2,
            })
          })
        }
        if (length > 0) {
          this.filterData(item.children)
        }
      })
    },
    // 渲染树的checkBox
    renderCheckTree(data) {
      data.forEach((item) => {
        let node = this.$refs.tree.getNode(item.resourceId)
        node.checked = item.isCheck == 1
        if (item.children && item.children.length > 0) {
          this.renderCheckTree(item.children)
        }
      })
    },
    // 保存
    saveDataResource() {
      this.$confirm('确认要保存此次配置吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning',
        title: '操作提示',
      }).then(() => {
        let list = []
        let checkArr = this.$refs.tree.getCheckedKeys()
        checkArr.forEach((item) => {
          let node = this.$refs.tree.getNode(item)
          list.push({
            roleId: this.roleId,
            resourceType: node.data.resourceType,
            resourceId: node.data.resourceId,
          })
        })
        this.$api.role.relSource({ ...this.appInfo, type: 1, list }).then(() => {
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
        })
      })
    },
    // 监听树节点勾选
    checkNode(nodeData) {
      let hasCheck = this.$refs.tree.getCheckedKeys()
      this.chooseAll = hasCheck.length == this.allNodeIds.length
      let curNode = this.$refs.tree.getNode(nodeData)
      this.setNodeParentCheckStatus(curNode)
      this.setNodeChildCheckStatus(curNode)
    },
    // 根据当前节点勾选状态，控制其所有父节点勾选状态
    setNodeParentCheckStatus(node) {
      if (node.parent && node.checked) {
        node.parent.checked = true
        this.setNodeParentCheckStatus(node.parent)
      }
    },
    // 根据当前节点勾选状态，控制其所有子节点勾选状态
    setNodeChildCheckStatus(node) {
      if (node.childNodes && node.childNodes.length > 0) {
        node.childNodes.forEach((item) => {
          item.checked = node.checked
          this.setNodeChildCheckStatus(item)
        })
      }
    },
    // 全选事件
    handleCheckAllChange(val) {
      this.$refs.tree.setCheckedKeys(val ? this.allNodeIds : [])
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-resource {
  height: 100%;
  /deep/.el-divider--horizontal {
    margin: 8px 0;
  }
  /deep/.el-checkbox__input {
    margin-right: 4px;
  }
}
</style>