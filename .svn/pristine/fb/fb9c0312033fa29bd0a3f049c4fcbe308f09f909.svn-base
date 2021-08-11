<template>
  <div class="">
    <div class="white pa-4">
      <el-row :gutter="12">
        <el-col :span="10" class="clearfix">
          <el-avatar :size="64" class="left ma-3" :src="avatar"> </el-avatar>
          <div class="grey--text body-2 left pl-3">
            <div class="subheading py-2 black--text">
              尊敬的
              <a
                class="mx-2 blue--text text--darken-3"
                @click="changeUserDetial = true"
              >
                {{ userEntity.userName }} </a
              >，您好！
            </div>
            <div class="py-2">
              所属机构：{{ userEntity.orgName | withEmptyTxt("--") }}
            </div>
            <div class="mt-2">
              手机号码：{{ userEntity.mobilePhone | withEmptyTxt("--") }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <change-pass-word
      v-model="changePasswordShow"
      :selection="selection"
      @show="changePasswordShow = false"
    />
    <user-detial
      v-model="changeUserDetial"
      :selection="userEntity"
      @show="changeUserDetial = false"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import changePassWord from "@/views/system/changePassWord";
import userDetial from "@/views/system/userDetial";
import AdminPanel from "./admin";
import AdminReminder from "./admin/adminReminder";
import AdminRiskPanel from "./adminRiskManage";
import DpusherPanel from "./dpusher";
export default {
  name: "Dashboard",
  components: {
    changePassWord,
    AdminPanel,
    DpusherPanel,
    AdminRiskPanel,
    AdminReminder,
    userDetial,
  },
  data() {
    return {
      parentUrl: "#common/role/button",
      currentNode: "AdminPanel",
      avatar: require("@/assets/images/avatar_businessman.png"),
      changePasswordShow: false,
      changeUserDetial: false,
      selection: {},
      entranceList: [
        {
          key: "distribution",
          name: "已分配",
          value: "",
          to: "/assist-customer-mgr/assigned",
        },
        {
          key: "toDistribution",
          name: "待分配",
          value: "",
          to: "/assist-customer-mgr/awaiting-allocation",
        },
        {
          key: "creditSuccess",
          name: "待激活",
          value: "",
          param: { applyStatus: 5 },
          to: "/assist-customer-mgr/activation-mgr",
        }, // 授信成功
        {
          key: "activeSuccess",
          name: "已激活",
          value: "",
          param: { applyStatus: 7 },
          to: "/assist-customer-mgr/activation-mgr",
        }, // 激活成功
        { key: "afterLoan", name: "贷后风险", value: "", to: "" },
        {
          key: "firstFailure",
          name: "初审拒绝",
          value: "",
          param: { rejectType: 2 },
          to: "/assist-customer-mgr/refuse-transact",
        },
        {
          key: "creditFailure",
          name: "授信拒绝",
          value: "",
          param: { rejectType: 6 },
          to: "/assist-customer-mgr/refuse-transact",
        },
      ],
    };
  },
  computed: {
    isPusherMgr() {
      return (
        this.userEntity.authorities.findIndex(
          (item) => item.code == "ROLE_GROUNDPUSHMGR"
        ) != -1
      );
    },
    userEntity() {
      return typeof this.user === "string" ? JSON.parse(this.user) : this.user;
    },
    ...mapGetters(["user"]),
    isAdmin() {
      return (
        this.userEntity.authorities.findIndex(
          (item) => item.code == "ROLE_ADMIN"
        ) != -1
      );
    },
  },
  mounted() {
    // this.initQuickNavData(); 业务统计数据暂无
    this.initData();
  },
  methods: {
    initData() {
      if (this.userEntity.changeFlag == 1) {
        this.changePwd();
      }
    },
    // 角色判断
    currentNodeHandle() {
      let data = this.userEntity.authorities;
      if (data.findIndex((el) => el.code === "ROLE_RISK_REPORT_ADMIN") !== -1) {
        // 风控报表中心管理员
        this.currentNode = "AdminRiskPanel";
      }
    },
    goToPage(item) {
      this.$router.push({
        path: item.to,
        query: item.param,
      });
    },
    changePwd() {
      this.changePasswordShow = true;
      this.selection = this.userEntity;
    },
    initQuickNavData() {
      this.$api.dashboard.getRemind().then((res) => {
        if (res.body) {
          Object.keys(res.body).forEach((key) => {
            this.entranceList.forEach((item) => {
              if (item.key == key) {
                item.value = res.body[key];
              }
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.block-count-list {
  li {
    list-style: none;
    float: right !important;
    padding: 0 16px;
    border: 1px solid #eee;
    margin-left: 4px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
      border: 1px solid #409eff;
    }
  }
}
</style>
