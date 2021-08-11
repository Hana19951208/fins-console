<template>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>您好，您无权限访问此菜单</h2>
        <h6>如有疑问，请联系系统管理员</h6>
        <ul class="list-unstyled">
          <li>或者您可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="400" class="mt-5 pt-5">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.png'

export default {
  name: 'Page401',
  data () {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 100px;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
