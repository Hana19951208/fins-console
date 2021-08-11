<template>
  <div class="org-page" v-loading="loading">
    <div class="layui-side text-center">
      <el-button v-if="!dicts || dicts.length == 0" @click="addDict(1)" type="primary" class="x-button">
        <i class="el-icon-plus"></i>
        新增字典
      </el-button>
      <div v-else>
        <el-input placeholder="请输入字典名称或编码" clearable v-model="filterText" @keyup.enter.native="filterTree" @change="filterTree">
          <el-button slot="append" icon="el-icon-search" @click="filterTree" />
        </el-input>
        <el-tree
          class="mt-3"
          ref="dictTree"
          highlight-current
          empty-text=""
          node-key="dictId"
          :data="dicts"
          :props="defaultProps"
          :expand-on-click-node="false"
          :current-node-key="keyTree"
          :filter-node-method="filterNode"
          @node-click="nodeClickHandle"
          @node-contextmenu="contextmenuHandle"
        />
      </div>
    </div>
    <div class="layui-body overflow-x-hidden">
      <dict-detail v-if="rightBoxType == 1" :selection="selection" />
      <dict-add v-else-if="rightBoxType == 2" :selection="selection" @refreshTreeNode="refreshTreeNode" @reset-view-type="resetViewType" />
    </div>
    <el-popover ref="popRef" v-model="contextmenuShow" popper-class="menu-pop" placement="top-start">
      <ul>
        <li v-has="'btn-add-peer'" @click="addDict(1)"><i class="el-icon-circle-plus" />新增同级字典</li>
        <li v-has="'btn-add-child'" @click="addDict(2)"><i class="el-icon-circle-plus" />新增子级字典</li>
        <li v-has="'btn-edit'" @click="editDict"><i class="el-icon-edit" />编辑字典</li>
        <li v-has="'btn-del'" @click="deleteDict"><i class="el-icon-delete" />删除字典</li>
      </ul>
    </el-popover>
  </div>
</template>

<script>
import ISearchElTable from '@/components/ISearchElTable'
import { mappingData, GLOBAL, getDictEntrysByCode } from '@/utils'
import { on, off } from 'element-ui/src/utils/dom'
import DictAdd from './add'
import DictDetail from './detail'
export default {
  name: 'Organization',
  components: {
    ISearchElTable,
    DictAdd,
    DictDetail,
  },
  data() {
    return {
      loading: false,
      filterText: '',
      dicts: [],
      keyTree: '',
      defaultProps: {
        label: 'dictName',
        children: 'children',
        isLeaf: function (val) {
          return val.dictIsleaf == '1'
        },
      },
      contextmenuShow: false,
      popData: null, // 选中节点数据
      selection: null,
      isEdit: true,
      rightBoxType: 1,
    }
  },
  mounted() {
    this.getDictTree()
  },
  methods: {
    getDictTree() {
      this.loading = true
      this.$api.dict.getDictTree().then((res) => {
        this.loading = false
        this.dicts = res || []
        if (this.dicts.length > 0) {
          this.selection = this.dicts[0]
          this.keyTree = this.dicts[0].dictId
          this.$nextTick(() => {
            this.$refs.dictTree.setCurrentKey(this.keyTree)
          })
        } else {
          this.selection = {}
          this.keyTree = ''
        }
      })
    },
    filterTree() {
      this.$refs.dictTree.filter(this.filterText)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.dictName.indexOf(value) !== -1 || data.dictCode.indexOf(value) !== -1
    },
    addDict(dictType) {
      this.selection = {
        isAdd: 1,
        dictParId: dictType == 1 ? this.popData.dictParId : this.popData.dictId,
      }
      this.rightBoxType = 2
    },
    editDict() {
      this.selection = this.popData
      this.rightBoxType = 2
    },
    deleteDict() {
      this.$confirm(`确认要删除该字典（${this.popData.dictName}）吗？`, {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning',
        title: '操作提示',
      }).then(() => {
        this.$api.dict.deleteDict({ dictId: this.popData.dictId }).then((res) => {
          this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          this.getDictTree()
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
      this.keyTree = data.dictId
      this.$nextTick(() => {
        this.$refs.dictTree.setCurrentKey(this.keyTree)
      })
      on(document, 'click', this.handleDocumentClick)
    },
    // 编辑、新增后刷新节点
    refreshTreeNode(curNode, isEdit) {
      if (isEdit) {
        const node = this.$refs.dictTree.getNode(curNode.dictId)
        Object.assign(node.data, this.mappingNodeData(curNode, node.data))
        this.updateNodeStatus(curNode)
      } else {
        const parentNode = this.$refs.dictTree ? this.$refs.dictTree.getNode(curNode.dictParId) : null
        console.log(parentNode)
        // 根节点
        if (!parentNode) {
          this.$api.dict.getDictTree().then((res) => {
            this.dicts = res
            this.updateNodeStatus(curNode)
          })
        } else if (!parentNode.loaded) {
          parentNode.expanded = true
          parentNode.isLeaf = false
          parentNode.isLeafByUser = false
          this.updateNodeStatus(curNode, true)
        }
      }
    },
    // 更新节点选中状态及详情数据
    updateNodeStatus(curNode, needAppend = false) {
      this.$nextTick(() => {
        if (needAppend) {
          this.$refs.dictTree.append(curNode, this.selection.dictParId)
        }
        this.keyTree = curNode.dictId
        this.$refs.dictTree.setCurrentKey(this.keyTree)
        this.selection = curNode
        this.rightBoxType = 1
      })
    },
    handleDocumentClick(event) {
      this.contextmenuShow = false
    },
    mappingNodeData(source, target) {
      const obj = {}
      for (const key in target) {
        if (!!source[key]) {
          obj[key] = source[key]
        }
      }
      return obj
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
