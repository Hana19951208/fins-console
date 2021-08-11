<template>
  <el-form-item prop="interfaceValue" label-width="0">
    <el-input
      ref="sqlInput"
      class="mt-2"
      v-model="actionValue"
      :rows="7"
      :maxlength="5000"
      @input="setValue"
      show-word-limit
      placeholder="请输入"
      type="textarea"
    />
  </el-form-item>
</template>
<script>
export default {
  props: {
    formActionValue: {
      type: String,
      defalut: "",
    },
  },
  data() {
    return {
      actionValue: null,
    };
  },
  watch: {
    formActionValue: {
      handler(val) {
        this.actionValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    setValue() {
      this.$emit("set-value", this.actionValue);
    },
  },
};
</script>