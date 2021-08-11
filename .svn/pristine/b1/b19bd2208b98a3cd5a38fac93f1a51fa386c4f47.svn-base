<template>
  <div class="wyd-container">
    <div class="swiper-div">
      <div class="login-div">
        <img :src="loginIMg" />
      </div>
    </div>
    <div class="login-wrapper">
      <div class="pos-right">
        <div class="login-content">
          <p>用户登录</p>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <el-input
                clearable
                v-model="loginForm.username"
                size="medium"
                placeholder="帐号"
                prefix-icon="el-icon-user"
                name="username"
                type="text"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password" class="pt-2 x-input">
              <el-input
                clearable
                v-model="loginForm.password"
                size="medium"
                prefix-icon="el-icon-lock"
                :type="passwordType"
                placeholder="密码"
                name="password"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              size="medium"
              style="width: 100%; margin-top: 16px"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginIMg: require('../../assets/images/ad.png'),
      loginForm: {
        username: '',
        password: '',
        channel: 'PC',
      },
      disabled: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      dataSourceDs: [],
    }
  },
  computed: {
    ...mapGetters(['apps']),
    appList() {
      return typeof this.apps === 'string' ? JSON.parse(this.apps) : this.apps || []
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  created() {},
  destroyed() {},
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              if (this.appList.length > 1) {
                this.$router.push({ path: '/startUp' })
              } else {
                this.$store.dispatch('GetRoleInfoByAppId', { appsId: this.appList[0].appsId, channel: 'PC' }).then(() => {
                  window.location.href = this.appList[0].appsLoginUrl
                })
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;

.wyd-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background: url(../../assets/images/bg22.jpg) center center / cover no-repeat;
  background-size: cover;
  text-align: center;
}
.login-form {
  width: 76%;
  margin: 0 auto;
  .el-select {
    width: 100% !important;
  }
}

.show-pwd {
  position: absolute;
  right: 32px;
  top: 3px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.swiper-div {
  position: absolute;
  width: 400px;
  height: 240px;
  left: 15%;
  top: 50%;
  margin-left: -110px;
  margin-top: -120px;
  text-align: left;
  color: #fff;
  .login-div {
    position: absolute;
    width: 700px;
    height: 300px;
    img {
      width: 90%;
    }
    .swiper-p {
      font-size: 18px;
      letter-spacing: 6px;
    }
  }
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
input:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}

body {
  background-size: cover;
}

.login-wrapper {
  width: 425px;
  height: 580px;
  margin: 0 auto;
  top: 50%;
  right: 25%;
  position: absolute;
  margin-top: -190px;
  margin-right: -208px;
  animation: secondfirst 3s;
  .pos-right {
    position: absolute;
    width: 360px;
    height: 360px;
    right: -70px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 28px;
    border-radius: 5px;
    .login-header {
      img {
        height: 50px;
      }
    }
    .login-content {
      .x-code {
        vertical-align: middle;
        height: 32px;
      }
      .login-span {
        border-left: 3px solid #cccccc;
        padding-left: 10px;
        margin-left: 10px;
        color: #cccccc;
      }
      p {
        font-size: 22px;
        padding: 16px 0;
        color: #333;
      }
      .form-item {
        width: 320px;
        height: 50px;
        line-height: 50px;
        margin: auto;
        margin-top: 24px;
        padding-left: 10px;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        input {
          font-size: 16px;
          font-family: '微软雅黑';
          padding-left: 10px;
          border: none;
          color: #7a808f;
          width: 300px;
          &::-webkit-input-placeholder {
            font-size: 16px;
            color: #888;
          }
        }
        label {
          padding-bottom: 10px;
          line-height: 45px;
          width: 32px;
          display: inline-block;
          text-align: center;
          i {
            font-size: 22px;
            font-weight: 700;
            color: #3973b7;
          }
        }
      }
      .form-item-submit {
        padding-top: 45px;
        button {
          display: inline-block;
          box-sizing: border-box;
          margin-bottom: 0;
          font-weight: normal;
          text-align: center;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          background-image: none;
          border: 1px solid transparent;
          white-space: nowrap;
          padding: 5px 10px;
          font-size: 12px;
          line-height: 1.5;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          height: 42px;
          width: 320px;
          font-size: 16px;
          letter-spacing: 15px;
          color: #fff;
          background-color: #478de4;
          font-size: 18px;
          border-radius: 5px;
        }
      }
    }
  }
}
.x-input {
  /deep/input[type='password' i]::-ms-reveal {
    display: none !important;
  }
}
</style>
