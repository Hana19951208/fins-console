<template>
  <el-container :class="classObj" class="app-wrapper">
    <el-aside class="sidebar-container" style="height: 100%">
      <sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <div
          v-if="device === 'mobile' && sidebar.opened"
          class="drawer-bg"
          @click="handleClickOutside"
        />
        <navbar />
      </el-header>
      <tags-view />
      <el-main class="main-container">
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  background-color: #f4f4f4;
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.el-header {
  padding: 0;
}
</style>
