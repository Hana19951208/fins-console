export default {
  data() {
    return {
      selection: [], // 当前选中checkbox的行数据
      pageSelect: false, // 是否支持分页勾选， false 当前页面勾选； true 分页勾选
      key: 'id' // 行数据中具有唯一性的key，用于分页勾选
    }
  },
  methods: {
    isChecked(message) { // 是否选中
      if (this.selection.length === 0) {
        this.$message({
          message: message || '请选择一条记录！',
          type: 'warning'
        })
        return false
      }
      return true
    },
    isCheckedOne(message1, message2) { // 只能选中一条数据
      if (!this.isChecked(message1)) {
        return false
      }
      if (this.selection.length > 1) {
        this.$message({
          message: message2 || '最多可选一条记录！',
          type: 'warning'
        })
        return false
      }
      return true
    },
    selectionChange(selection) {
      if (this.pageSelect) {
        selection.forEach(row => {
          const index = this.selection.findIndex(x => x[this.key] == row[this.key])
          index < 0 && this.selection.push(row)
        })
      } else {
        this.selection = selection
      }
    },
    select(selection, row) {
      let index = selection.findIndex(x => x[this.key] == row[this.key])
      if (index < 0) {
        // 取消选中
        index = this.selection.findIndex(x => x[this.key] == row[this.key])
        index >= 0 && this.selection.splice(index, 1)
      }
    },
    selectAll(selection) {
      if (selection.length == 0) {
        // 取消选中
        this.data.rows.forEach(row => {
          const index = this.selection.findIndex(x => x[this.key] == row[this.key])
          index >= 0 && this.selection.splice(index, 1)
        })
      }
    },
    delConfirm(confirmObj) {
      let [ message, confirmButtonText, cancelButtonText, title ] = [ confirmObj.message, confirmObj.confirmButtonText, confirmObj.cancelButtonText, confirmObj.title ]
      return new Promise((resolve, reject) => {
        this.$confirm(message || '此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: confirmButtonText||'确定',
          cancelButtonText: cancelButtonText||'取消',
          type: 'warning',
          title: title || '系统提示'
        }).then(() => {
          resolve()
        }).catch(() => { // 不需要处理取消按钮事件
          // reject()
        })
      })
    }
  }
}
