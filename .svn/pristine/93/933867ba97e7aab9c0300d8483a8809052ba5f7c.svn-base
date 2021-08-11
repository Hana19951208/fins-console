<template>
  <div class="navbar">
    <div class="left-title">
      <!-- <img :src="logo"> -->
      <div class="menu-title">
        <svg-icon color="#595959" :icon-class="isCollapse ? 'turn-off' : 'turn-on'" @click="toggleSideBar" />
      </div>
    </div>
    <div class="right-menu">
      <span class="body-2 ml-3">
        <el-avatar :src="avatarLogo" style="vertical-align: bottom" :size="24"></el-avatar>
        {{ typeof user === 'string' ? JSON.parse(user).userName : user.userName }}&nbsp;&nbsp;
      </span>
      <template v-if="roleList && roleList.length > 1">
        <a @click="changeRoleFn" class="body-2 blue--text text--darken-3">切换角色</a>
        <el-divider direction="vertical"></el-divider>
      </template>

      <a @click="changePasswordFn" class="body-2 blue--text text--darken-3">修改密码</a>
      <el-divider direction="vertical"></el-divider>
      <a @click="logout" class="mr-4 body-2 blue--text text--darken-3">退出登录</a>
    </div>
    <user-detial v-model="userdetialShow" :selection="selection" @show="userdetialShow = false" />
    <change-pass-word v-model="changePasswordShow" :selection="selection" @show="changePasswordShow = false" />
    <change-role v-model="changeRoleShow" :cur-role="curRole" @show="changeRoleShow = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userDetial from '@/views/system/userDetial/index'
import changePassWord from '@/views/system/changePassWord'
import changeRole from '@/views/system/changeRole'
export default {
  components: {
    userDetial,
    changePassWord,
    changeRole,
  },
  data() {
    return {
      activeIndex: 0,
      logo: require('@/assets/images/logo.png'),
      avatarLogo: require('@/assets/images/avatar.png'),
      userdetialShow: false,
      changePasswordShow: false,
      changeRoleShow: false,
      selection: {},
      userInfo: this.$store.getters.user,
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'device', 'permission_routers', 'user', 'roles']),
    isCollapse() {
      return this.sidebar.opened
    },
    menus() {
      const menus = this.permission_routers.filter((item) => {
        return item.hidden !== true && item.path
      })
      return menus
    },
    roleList() {
      return typeof this.roles === 'string' ? JSON.parse(this.roles) : this.roles || []
    },
    curRole() {
      let user = typeof this.user === 'string' ? JSON.parse(this.user) : this.user || {}
      return user.roleId
    },
  },
  created() {},
  methods: {
    // 个人信息
    viewUserInfoFn() {
      this.userdetialShow = true
      this.selection = this.userInfo
    },
    // 修改密码
    changePasswordFn() {
      this.changePasswordShow = true
      this.selection = this.userInfo
    },
    changeRoleFn() {
      this.changeRoleShow = true
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    // 退出系统
    logout() {
      this.$confirm('确认退出系统吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        center: false,
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload()
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    topMenuSelect(index) {
      alert(index)
      this.activeIndex = index
      this.$store.commit('SET_TOP_MENU_INDEX', index)
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/variables.scss';
.navbar {
  height: $headerWidth;
  overflow: hidden;
  background-color: #fff;
  color: #595959;
  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-title {
    width: $sideBarWidth;
    height: $headerWidth;
    line-height: $headerWidth;
    font-size: 20px;
    color: #ffffff;
    float: left;
    padding-left: 20px;
    font-weight: 600;
    img {
      vertical-align: middle;
      margin: 0 20px;
    }
    span {
      padding-top: 5px;
    }
  }
  .left-button {
    float: left;
    text-align: center;
    line-height: $headerWidth;
    height: $headerWidth;
    .left-button-item {
      display: inline-block;
      width: 88px;
      font-size: 16px;
      color: #ffffff;
      &.active {
        background-color: #097ce3;
      }
    }
  }
  .center-menu {
    float: left;
    height: 100%;
    width: calc(100% - 120px - 200px - 130px);
    .center-menu-item {
      height: 80px;
      padding: 0 30px;
      float: left;
      text-align: center;
      color: #95b3db;
      cursor: pointer;
      .center-menu-item-svg {
        margin-top: 10px;
        font-size: 36px;
      }
      p {
        margin: 0;
      }
    }
    .center-menu-item:hover {
      color: #fff;
    }
    .active {
      color: #fff;
    }
  }
  .right-menu {
    float: right;
    margin-top: 18px;
    &:focus {
      outline: none;
    }
    .search {
      padding: 6px;
    }
    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #595959;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        /*&:hover {*/
        /*background: rgba(0, 0, 0, 0.025);*/
        /*}*/
      }
    }
    .quick-search {
      display: inline-block;
      margin-right: 50px;
      .el-input__inner {
        background-color: #097ce3;
        border: none;
        color: #ffffff !important;
      }
      i {
        color: #ffffff;
      }
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #ffffff;
      }

      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #ffffff;
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #ffffff;
      }
    }
    .avatar-container {
      margin-right: 30px;
      display: inline-block;
      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

