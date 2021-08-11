<template>
  <div class="x-breadcrumb">
    <i class="el-icon-location"></i>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="d-inline-block">
      <el-breadcrumb-item>{{ firstBreadcrumb }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        secondBreadcrumb | dictFormat(clientDs)
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    firstBreadcrumb: {
      type: String,
      default: "",
    },
    secondBreadcrumb: {
      type: String,
      default: "",
    },
  },
  computed: {
    clientDs() {
      return [
        {
          name: "PC客户端",
          code: "PC",
        },
        {
          name: "PAD移动营销",
          code: "PAD",
        },
        {
          name: "PORTAL门户",
          code: "PORTAL",
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.x-breadcrumb {
  padding: 10px 20px 0;
  i {
    font-size: 18px;
  }
}
</style>
