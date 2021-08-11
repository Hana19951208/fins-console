<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      :title="selection.flowId ? '编辑' : '新增'"
      width="50%"
      @closed="closed"
    >
      <el-form ref="addForm" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item
              prop="flowName"
              label="策略名称："
              label-width="100px"
            >
              <el-input
                v-model="form.flowName"
                placeholder="请输入"
                :maxlength="200"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="flowRemark" label="备注：" label-width="100px">
              <el-input
                v-model="form.flowRemark"
                :rows="10"
                :maxlength="500"
                show-word-limit
                placeholder="请输入"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-right">
        <el-button @click="dialogShowChg">
          <span class="mx-2">取消</span>
        </el-button>
        <el-button type="primary" @click="submitForm('addForm')">
          <span class="mx-2">提交</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from "@/utils";
import { mapGetters } from "vuex";

export default {
  components: {},
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    selection: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      form: {
        flowName: null,
        flowRemark: null,
      },
      rules: {
        flowName: [
          { required: true, message: "请输入策略名称", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    value(value) {
      this.show = value;
      if (this.value) {
        this.$nextTick(() => {
          this.$refs.addForm.resetFields();
          this.form = this.$options.data().form;
          if (this.selection.flowId) {
            this.form = this.selection;
          }
        });
      }
    },
  },
  methods: {
    dialogShowChg() {
      this.$emit("show");
    },
    insertStrategy() {
      this.$api.strategyConfig.save(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: "success" });
        this.$emit("refreshTable");
        this.dialogShowChg();
      });
    },
    updateStrategy() {
      this.$api.strategyConfig.update(this.form).then(() => {
        this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: "success" });
        this.$emit("refreshTable");
        this.dialogShowChg();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.flowId) {
            // 编辑
            this.updateStrategy();
          } else {
            // 新增
            this.insertStrategy();
          }
        } else {
          return false;
        }
      });
    },
    closed() {
      this.dialogShowChg();
    },
  },
};
</script>

<style scoped></style>
