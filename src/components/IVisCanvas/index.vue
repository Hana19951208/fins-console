<template>
  <div class="vis-container">
    <div ref="network" class="network"/>
    <Component
      :is="currentNodeComp"
      v-model="dialog.node.show"
      :data="dialog.node.data"
      :option-type="dialog.node.optionType"
      :business-type="dialog.node.businessType"
      @show="dialog.node.show=false"
      @addNode="addNode"
      @editNode="editNode"/>
    <Component
      :is="currentEdgeComp"
      v-model="dialog.edge.show"
      :data="dialog.edge.data"
      :option-type="dialog.edge.optionType"
      :business-type="dialog.edge.businessType"
      @addEdge="addEdge"
      @editEdge="editEdge"
      @show="dialog.edge.show=false"/>
  </div>
</template>
<script>
var network = null
import DecisionTreeAddEdge from './components/decisionTree/AddEdge'
import DecisionTreeAddNode from './components/decisionTree/AddNode'
import StateMachineAddEdge from './components/stateMachine/AddEdge'
import StateMachineAddNode from './components/stateMachine/AddNode'

import vis from 'vis'
import 'vis/dist/vis-network.min.css'
export default {
  name: 'IVisCanvas',
  components: {
    DecisionTreeAddEdge,
    DecisionTreeAddNode,
    StateMachineAddEdge,
    StateMachineAddNode
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    businessType: { // 业务类型， 1 决策树 2 状态机
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      nodeDs: {},
      edgeDs: {},
      options: {},
      network: {},
      dialog: {
        node: {
          show: false,
          data: {},
          optionType: 1, // 1 新增 2 删除
          callback: null
        },
        edge: {
          show: false,
          data: {},
          optionType: 1, // 1 新增 2 删除
          callback: null
        }
      }
    }
  },
  computed: {
    currentNodeComp () {
      return this.businessType === 1 ? 'DecisionTreeAddNode' : 'StateMachineAddNode'
    },
    currentEdgeComp () {
      return this.businessType === 1 ? 'DecisionTreeAddEdge' : 'StateMachineAddEdge'
    }
  },
  mounted () {
    this.draw()
    this.bindEvent()
  },
  methods: {
    draw () { // 初始化图形组件
      this.destroy()
      this.nodeDs = new vis.DataSet([
      ])
      this.edgeDs = new vis.DataSet([
      ])
      const container = this.$refs.network
      const _self = this
      const data = {
        nodes: this.nodeDs,
        edges: this.edgeDs
      }
      this.options = {
        configure: {
          enabled: true,
          filter: 'physics',
          container: undefined,
          showButton: true
        },
        locale: 'cn',
        locales: {
          cn: {
            edit: '编辑',
            del: '删除当前节点或关系',
            back: '返回',
            addNode: '添加节点',
            addEdge: '添加连线',
            editNode: '编辑节点',
            editEdge: '编辑连线',
            addDescription: '点击空白处可添加节点',
            edgeDescription: '点击某个节点拖拽连线可连接另一个节点',
            editEdgeDescription: '可拖拽连线改变关系',
            createEdgeError: 'Cannot link edges to a cluster.',
            deleteClusterError: 'Clusters cannot be deleted.',
            editClusterError: 'Clusters cannot be edited.'
          }
        },
        nodes: {
          borderWidth: 1,
          fixed: {
            x: false,
            y: false
          }
        },
        edges: {
          font: { align: 'bottom' },
          widthConstraint: { maximum: 150 },
          arrowStrikethrough: false,
          selfReferenceSize: 10,
          length: 300,
          smooth: {
            enabled: false,
            type: 'straightCross',
            roundness: 0
          },
          arrows: {
            to: {
              enabled: true
            }
          }
        },
        physics: false,
        manipulation: {
          enabled: true,
          initiallyActive: true,
          addNode: function (data, callback) {
            data.label = ''
            console.info(data)
            _self.addNodeDialog(data, 1)
            callback()
          },
          editNode: function (data, callback) {
            _self.addNodeDialog(data, 2)
            callback()
          },
          addEdge: function (data, callback) {
            if (data.from === data.to) {
              var r = confirm('是否要链接自己')
              if (r !== true) {
                callback(null)
                return
              }
            }
            _self.edgeDialog(data, 1, callback)
          },
          editEdge: function (data, callback) {
            _self.edgeDialog(data, 2, callback)
          }
        }
      }
      network = new vis.Network(container, data, this.options)
    },
    bindEvent () {
      const _self = this
      // 拖拽结束事件
      network.on('dragEnd', function (params) {
        if (params.nodes && params.nodes.length === 1) {
          _self.nodeDs.update({
            id: params.nodes[0],
            x: params.pointer.canvas.x,
            y: params.pointer.canvas.y
          })
        }
      })
      // 鼠标右键事件
      network.on('oncontext', function (params) {
        console.info(params)
        params.event.preventDefault()
      })
      network.on('doubleClick', function (params) {
        const edges = params.edges
        const nodes = params.nodes
        if (nodes.length === 0) {
          const selectEdges = _self.edgeDs.get(edges[0])
          _self.edgeDialog(selectEdges, 2, null)
        } else {
          const selectNode = _self.nodeDs.get(nodes[0])
          _self.addNodeDialog(selectNode, 2)
        }
      })
    },
    destroy () {
      if (network !== null) {
        network.destroy()
        network = null
      }
    },
    addNodeDialog (data, optionType) { // 打开添加节点弹框
      this.dialog.node.show = true
      this.dialog.node.data = data
      this.dialog.node.optionType = optionType
    },
    addNode (form) { // 添加节点方法
      if (this.businessType === 2) {
        form.label = form.code + '\n' + form.name
      } else {
        form.label = form.name
      }
      this.nodeDs.add(form)
    },
    editNode (data) {
      if (this.businessType === 2) {
        data.label = data.code + '\n' + data.name
      } else {
        data.label = data.name
      }
      this.nodeDs.update(data)
    },
    edgeDialog (data, optionType, callback) {
      this.dialog.edge.show = true
      this.dialog.edge.data = data
      this.dialog.edge.optionType = optionType
      this.dialog.edge.callback = callback
    },
    addEdge (data) {
      if (typeof data.to === 'object') { data.to = data.to.id }
      if (typeof data.from === 'object') { data.from = data.from.id }
      this.edgeDs.add(data)
      // this.dialog.edge.callback(data)
    },
    editEdge (data) {
      console.info(data)
      console.info(this.edgeDs)
      // if (typeof data.to === 'object') { data.to = data.to.id }
      // if (typeof data.from === 'object') { data.from = data.from.id }
      // this.dialog.edge.callback(data)
      this.edgeDs.update(data)
    },
    closed () {

    }
  }
}
</script>

<style lang="scss" scoped>
.vis-container{
  position:relative;
  width: 100%;
  height: calc(100% - 50px);
  .network {
    height: 100%;
    border: 1px solid lightgray;
  }
}
</style>
