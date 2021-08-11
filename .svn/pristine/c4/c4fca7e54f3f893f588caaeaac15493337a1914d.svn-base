<template>
  <el-container class="startUp">
    <el-header class="startUp__header clearfix">
      <span class="header__title left">用户统一认证中心</span>
      <span class="header__subtitle right" @click="logout">退出登录</span>
    </el-header>
    <el-main class="startUp__main">
      <div v-for="item in appList" :key="item.appsId" @click="enterApp(item)" class="startUp__item">
        <el-image :src="item.appsIconUrl" fit="fill" class="item__img"></el-image>
        <span class="mt-3 text-center">{{ item.appsName }}</span>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['apps']),
    appList() {
      return typeof this.apps === 'string' ? JSON.parse(this.apps) : this.apps || []
    },
  },
  methods: {
    enterApp(app) {
      this.$store.dispatch('GetRoleInfoByAppId', { appsId: app.appsId, channel: 'PC' }).then(() => {
        window.location.href = app.appsLoginUrl
      })
    },
    logout() {
      this.$confirm('确认退出系统吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        center: false,
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.startUp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background: url(../../assets/images/bg3.png) center center / cover no-repeat;
  background-size: cover;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header {
    width: 100%;
    line-height: 60px;
    background-color: rgba(172, 212, 247, 0.6);
  }
  &__main {
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
}
.header {
  &__title {
    font-size: 24px;
    font-weight: bold;
    color: #162b75;
  }
  &__subtitle {
    font-size: 14px;
    color: #676262;
    cursor: pointer;
  }
}
.item {
  &__img {
    width: 98px;
    height: 98px;
    border-radius: 50%;
  }
  &__title {
  }
}
</style>