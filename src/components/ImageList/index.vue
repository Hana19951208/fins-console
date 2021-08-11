<template>
  <div>
    <el-row class="pb-3">
      <el-col :span="8" v-for="(item, index) in imageList" :key="index">
        <div class="block">
          <el-image
            style="width: 200px"
            fit="contain"
            :src="item"
            :preview-src-list="imageList"
          >
            <div
              slot="error"
              class="image-slot el-image__error"
              style="font-size: 30px"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    imageUrls: {
      type: String,
    },
  },
  data() {
    return {
      imageList: [],
    };
  },
  watch: {
    imageUrls: {
      handler(value) {
        this.imageList = value.split(",");
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>