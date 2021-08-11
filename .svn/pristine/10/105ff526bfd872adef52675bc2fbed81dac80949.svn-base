<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show"
      title="测试"
      width="650px"
      @closed="closed"
    >
      <el-form ref="testForm" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item prop="applyId" label="申请ID：" label-width="100px">
              <el-input
                v-model="form.applyId"
                placeholder="请输入"
                maxlength="50"
                clearable
              >
                <el-button
                  slot="append"
                  :loading="loading"
                  @click="submitForm('testForm')"
                  >测试</el-button
                >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="result">
            <el-form-item label="测试结果：" label-width="100px">
              <span>
                {{ result }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-right">
        <el-button @click="dialogShowChg" class="mt-4">
          <span class="mx-2">取消</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDictEntrysByCode, mappingData, GLOBAL } from "@/utils";
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
        applyId: null,
      },
      rules: {
        applyId: [
          { required: true, message: "请输入正确的信息", trigger: "blur" },
        ],
      },
      result: "",
      loading: false,
    };
  },
  watch: {
    value(value) {
      this.show = value;
      if (this.value) {
        this.$nextTick(() => {
          this.result = null;
          this.$refs.testForm.resetFields();
          this.form = this.$options.data().form;
        });
      }
    },
  },
  methods: {
    dialogShowChg() {
      this.$emit("show");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.testEvt();
        } else {
          return false;
        }
      });
    },
    testEvt() {
      this.loading = true;
      this.form.flowId = this.selection.flowId;
      this.$api.strategyConfig
        .testAllotFlow(this.form)
        .then((res) => {
          this.loading = false;
          this.result = res;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    closed() {
      this.dialogShowChg();
    },
  },
};
</script>

<style scoped></style>
