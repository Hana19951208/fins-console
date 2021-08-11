<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div v-if="!isCollapse" class="menu-title">
      <span>普惠金融云平台</span>
    </div>
    <el-menu
      style="margin-top: 63px"
      :default-active="activePath"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routers"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapGetters(["permission_routers", "sidebar", "topMenuIndex"]),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    menus() {
      const menus = this.permission_routers.filter((item) => {
        return item.hidden !== true && item.path;
      });
      return menus[this.topMenuIndex].children;
    },
    activePath() {
      const constantPath = "/org,/orgExtra,/cooperationOrg";
      if (constantPath.indexOf(this.$route.path) !== -1) {
        return "/redirect" + this.$route.path;
      }
      return this.$route.path;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
  },
};
</script>
<style lang="scss" scoped>
.turn-icon {
}
</style>
