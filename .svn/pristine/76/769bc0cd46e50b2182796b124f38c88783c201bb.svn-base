<template>
  <div class="i-cell clearfix">
    <span
      :class="['i-cell__title', 'left', 'pr-2', titleClass]"
      :style="{ width: lableWidth, 'text-align': titleAlign }"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </span>
    <span
      :class="['i-cell__value', 'left', valueClass]"
      :style="{ 'text-align': valueAlign, width: `calc(100% - ${lableWidth})` }"
    >
      <slot name="value">
        {{ value }}
      </slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String | Number | Boolean,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    lableWidth: {
      type: String,
      default: "120px",
    },
    titleAlign: {
      type: String,
      default: "right",
    },
    valueAlign: {
      type: String,
      default: "left",
    },
    titleClass: {
      type: String,
      default: "",
    },
    valueClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imageList: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.i-cell {
  width: 100%;
  &__title {
    color: #333;
  }
  &__value {
    color: #9e9e9e;
    caret-color: #9e9e9e;
    word-break: break-all;
  }
}
</style>