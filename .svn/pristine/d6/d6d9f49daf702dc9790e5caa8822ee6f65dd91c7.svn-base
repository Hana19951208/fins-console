<template>
  <div class="btn-upload">
    <el-button @click="handleClick" :loading="btnLoading">
      <slot />
    </el-button>
    <input
      ref="attachMentFile"
      class="file-picker"
      type="file"
      @change="upload"
    />
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      @closed="handleClose"
      title="导入提示"
      width="680px"
    >
      <h3 class="subheading black--text mb-0">导入完成！</h3>
      <p>
        成功数：<span class="success">{{ successNum }}</span>
      </p>
      <p>
        失败数：<span class="warning">{{ failNum }}</span>
      </p>
      <p v-if="existNum">
        重复条数：<span class="warning">{{ existNum }}</span>
      </p>
      <p v-if="existTips">
        重复数据：<span class="warning">{{ existTips }}</span>
      </p>
      <p>
        <span class="success">{{ message }}</span>
      </p>
      <h5
        v-if="errorMsg && errorMsg.length > 0"
        class="subheading black--text mb-0"
      >
        导入结果信息：
      </h5>
      <div v-if="errorMsg && errorMsg.length > 0">
        <p v-for="(item, index) in errorMsg" :key="index">{{ item }}</p>
      </div>
      <div
        v-if="dupMsg && dupMsg.length > 0"
        style="border: 1px dashed #eee; padding: 20px"
      >
        <p>提示：</p>

        <div v-for="(item, index) in dupMsg" :key="index">
          <div v-if="item.pList && item.pList.length">
            <span
              >{{ index + 1 }}.{{ item.nickName }}共{{ item.number }}人,为</span
            >
            <span v-for="(items, indexs) in item.pList" :key="indexs">
              {{ items.name }}({{ items.phone }})<i
                v-if="indexs != item.pList.length - 1"
                >、</i
              >
            </span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">
          <span class="mx-2">确定</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/**
 *按钮-导入文件功能
 * 1、属性
 * props: {
 *     url: 上附件后台地址
 *     formParam: 传递后台额外参数
 * }
 * 2、事件
 * events：{
 *     uploaded：接口请求成功后的回调事件
 * }
 *
 */
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  name: "IBtnUpload",
  props: {
    url: {
      type: String,
      default: "",
    },
    formParam: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      btnLoading: false,
      dialogVisible: false,
      failNum: 0,
      successNum: 0,
      errorMsg: [],
      message: "",
      existNum: "",
      existTips: "",
      dupMsg: [],
    };
  },
  methods: {
    handleClick() {
      this.$refs.attachMentFile.value = null;
      this.$refs.attachMentFile.click();
    },
    upload() {
      this.btnLoading = true;
      const formData = new window.FormData();
      const files = this.$refs.attachMentFile.files[0];
      formData.append("attachMentFile", files);
      formData.append("IFLYTEK_CSRFTOKEN", getToken());
      // 添加表单自定义属性
      if (this.formParam && Object.keys(this.formParam).length !== 0) {
        Object.keys(this.formParam).forEach((field) => {
          formData.append(field, this.formParam[field]);
        });
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: getToken(),
        },
      };
      axios
        .post(process.env.PREFIX_URL + "/" + this.url, formData, config)
        .then((res) => {
          this.btnLoading = false;
          if (res.data && res.data.errCode == -1) {
            const result = res.data;
            if (typeof result.data === "object") {
              this.dialogVisible = true;
              this.successNum = result.data.insertNum;
              this.failNum = result.data.failNum;
              this.errorMsg = result.data.errorMessage || [];
              this.message = result.data.message || "";
              this.existNum = result.data.existNum || "";
              this.existTips = result.data.existTips || "";
              this.dupMsg = result.data.dupMsg || [];
              console.log(this.dupMsg);
            } else {
              this.$message({
                message: "导入成功！",
                type: "success",
              });
              this.$emit("uploaded");
            }
          } else {
            this.$message({
              message: res.data.errMsg || "上传失败！",
              type: "error",
            });
          }
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("uploaded");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-upload {
  display: inline-block;
  // padding: 0 10px;
  .file-picker {
    display: none;
  }
  /deep/ .el-icon-loading {
    line-height: 0;
  }
}
</style>
