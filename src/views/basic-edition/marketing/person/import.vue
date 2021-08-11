<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="导入" width="850px" @closed="closed">
      <div>
        <div class="text-right mb-3">
          <el-button type="text" @click="download">下载导入模板</el-button>
        </div>
        <div style="margin-left: 200px">
          <el-upload
            class="upload-demo"
            action=""
            accept=".xls,.xlsx,.XLSX"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false"
            :on-change="changeFile"
            :on-remove="removeFile"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>点击或将文件拖拽到这里上传</span>
              <p class="grey--text">仅支持excel文件导入，文件扩展名：.xls，.xlsx</p>
            </div>
          </el-upload>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="submit" :disabled="!attachMentFile">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import axios from 'axios'
export default {
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
      fileList: [],
      attachMentFile: {}, // 文件对象
    }
  },
  watch: {
    value(val) {
      this.show = val
      if (val) {
        this.attachMentFile = null
        this.fileList = []
      }
    },
  },
  created() {},
  methods: {
    closed() {
      this.$emit('show')
    },
    submit() {
      const form = new FormData()
      form.append('attachMentFile', this.attachMentFile)
      axios
        .post(`${process.env.PREFIX_URL}/sysMktUser/import`, form, {
          headers: { 'Content-Type': 'multipart/form-data', token: getToken() },
        })
        .then((resp) => {
          if (resp.data.errCode != '-1') {
            this.$message({ type: 'error', message: resp.data.errMsg })
          } else {
            this.$message({ type: 'success', message: '操作成功！' })
            this.closed()
            this.$emit('success')
          }
        })
    },
    changeFile(file) {
      const allowExtension = ['xls', 'xlsx']
      const fileName = file.name
      const extension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
      if (!allowExtension.includes(extension.toLowerCase())) {
        this.$message({ type: 'warning', message: '仅支持excel文件导入' })
        this.fileList = []
        return false
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('文件大小不能超过5MB，请重新上传！')
        this.fileList = []
        return false
      }
      this.attachMentFile = file.raw
    },
    removeFile() {
      this.attachMentFile = null
    },
    download() {
      window.location.href = process.env.PREFIX_URL + '/sysMktUser/exportTemplete?token=' + getToken()
    },
  },
}
</script>

<style>
</style>