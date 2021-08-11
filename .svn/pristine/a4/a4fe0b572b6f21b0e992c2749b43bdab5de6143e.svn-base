<template>
  <div class>
    <el-card shadow="never">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <a @click="goBack" class="black--text">
              <i class="el-icon-arrow-left" />
              <span>客户详情</span>
            </a>
          </el-col>
        </el-row>
      </div>
      <div class="business-information" v-cloak>
        <el-row>
          <el-col :span="24">
            <el-card class="body-2" shadow="never">
              <div class="apply-information">
                <p class="subheading font-weight-bold titleStyle">基本信息</p>
                <el-row>
                  <el-col :span="4" class="ellipsis">
                    <span>姓名：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.name || "-"
                    }}</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>身份证号：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.idCard || "-"
                    }}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>婚姻状况：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.marriage
                        | dictFormat(marriageDs)
                        | isNullOrEmpty
                    }}</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>学历：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.eduExperience
                        | dictFormat(educationDs)
                        | isNullOrEmpty
                    }}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>职业：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.occupation
                        | dictFormat(occupationDs)
                        | isNullOrEmpty
                    }}</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>职称：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.title
                        | dictFormat(titleDs)
                        | isNullOrEmpty
                    }}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>居住地址：</span>
                  </el-col>
                  <el-col :span="20" class="ellipsis">
                    <span class="grey--text">{{applyInfo.familyAdd| isNullOrEmpty}}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>单位名称：</span>
                  </el-col>
                  <el-col :span="20" class="ellipsis">
                    <span class="grey--text">{{applyInfo.unitName| isNullOrEmpty}}</span>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
              <div class="apply-person-information">
                <p class="subheading font-weight-bold titleStyle">
                  紧急联系人信息
                </p>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>紧急联系人姓名(关系)：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text"
                      v-if="applyInfo.iceName">{{ applyInfo.iceName}}({{applyInfo.iceRelation | dictFormat(iceRelationDs)}})</span>
                    <span v-else>-</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>紧急联系人电话：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{ applyInfo.icePhone | isNullOrEmpty}}</span>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
              <div class="mt-3">
                <p class="subheading font-weight-bold titleStyle">贷款信息</p>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>申请编号：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.applyId || "-"
                    }}</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>申请时间：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.applyTime || "-"
                    }}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>授信时间：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.createTime || "-"
                    }}</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>授信金额(元)：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                     applyInfo.applyAmount|formatMoney|withEmptyTxt
                    }}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>授信有效期至：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.loanTerm | withEmptyTxt
                    }}</span>
                  </el-col>
                  <el-col :span="4" class="ellipsis">
                    <span>综合年费率(%)：</span>
                  </el-col>
                  <el-col :span="8" class="ellipsis">
                    <span class="grey--text">{{
                      applyInfo.loanRate |formatRate(2)|withEmptyTxt
                    }}</span>
                  </el-col>
                </el-row>
                <el-row class="mt-3">
                  <el-col :span="4" class="ellipsis">
                    <span>所属客户群体：</span>
                  </el-col>
                  <el-col :span="20" class="ellipsis">
                    <span class="grey--text">
                      {{ applyInfo.groupCode | dictFormat(customerGroupDs) | isNullOrEmpty }}
                    </span>
                    <template v-if="applyInfo.groupLevel">
                      -
                      <span class="grey--text">
                        {{ applyInfo.groupLevel | dictFormat(groupLevelDs) | isNullOrEmpty }}
                      </span>
                    </template>
                  </el-col>
                </el-row>
              </div>
              <div>
                <div class="mt-3" v-if="applyInfo.reject">
                  <el-divider></el-divider>
                  <p class="subheading font-weight-bold titleStyle">
                    拒绝受理情况
                  </p>
                  <el-row class="mt-3">
                    <el-col :span="4" class="ellipsis">
                      <span>拒绝原因：</span>
                    </el-col>
                    <el-col :span="16">
                      <span class="grey--text">
                        {{ applyInfo.reject | dictFormat(rejectDs) | isNullOrEmpty }}
                      </span>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="text-center" style="margin-top:50px;">
        <el-button @click="goBack">
          <span class="mx-2">返回</span>
        </el-button>
      </div>-->
    </el-card>
  </div>
</template>

<script>
import { getDictEntrysByCode } from "@/utils";
export default {
  name: "PublicDetail",
  data() {
    return {
      infoData: {},
      applyInfo: {},
      idCardAUrl: require("@/assets/images/riskLogo.png"),
      form: {
        applyId: null,
        callResult: "1",
        callCondition: "信息不符",
        remark: null
      },
      nucleus: false,
      nucleusHistory: false,
      loading: false,
      queryRowItem: {}
    };
  },
  computed: {
    // 学历
    educationDs() {
      return getDictEntrysByCode("APPLY_INFO_EDUCATION");
    },
    // 职业
    occupationDs() {
      return getDictEntrysByCode("APPLY_INFO_OCCUPATION");
    },
    // 职称
    titleDs() {
      return getDictEntrysByCode("APPLY_INFO_TITLE");
    },
    // 性别
    sexDs() {
      return getDictEntrysByCode("CORE.GENDER");
    },
    // 婚姻状况
    marriageDs() {
      return getDictEntrysByCode("MARRIAGE_CODE");
    },
    // 居住状况
    familyStatusDs() {
      return getDictEntrysByCode("FAMILY.STATUS");
    },
    // 还款方式
    repayTypeDs() {
      return getDictEntrysByCode("REPAY.TYPE");
    },
    // 借款用途
    useagDs() {
      return getDictEntrysByCode("LOAN.USAGE");
    },
    // 紧急联系人关系
    iceRelationDs() {
      return getDictEntrysByCode("ICE.RELATION");
    },
    customerGroupDs() {
      return getDictEntrysByCode("CUST_GROUP");
    },
    groupLevelDs() {
      return getDictEntrysByCode("GROUP.LEVEL");
    },
    rejectDs() {
      return getDictEntrysByCode("REFUSE_TYPE")
    }
  },
  mounted() {
    this.initData();
    let query = this.$route.query;
    this.form.applyId = query.applyId;
    if (query.nucleus) {
      this.nucleus = query.nucleus;
    } else {
      this.nucleus = false;
    }
    console.log(query.rowItem);
    if (query.nucleusHistory) {
      this.nucleusHistory = query.nucleusHistory;
    } else {
      this.nucleusHistory = false;
    }
    if (query.rowItem) {
      this.queryRowItem = query.rowItem;
    }
  },
  destroyed: function () {
    console.log("我已经离开了！");
    if (this.nucleus) {
      this.destBack();
    }
  },
  methods: {
    destBack() {
      // 电核详情页返回时调接口
      console.log("改变审核状态");
      this.$api.assistCustomerMgr.stopCheck(this.queryForm).then(res => { });
    },
    // 返回
    goBack() {
      if (this.nucleus) {
        // 电核返回
      }
      this.$router.go(-1);
    },
    // 数据初始化
    initData() {
      const data = this.$route.query;
      this.getApplyBasicInfo(data.applyId);
    },
    // 获取客户信息
    getApplyBasicInfo(applyId) {
      this.$api.common.getApplyBasicInfo({ applyId: applyId }).then(res => {
        this.applyInfo = res.body;
      });
    },
    onRadioChange() {
      this.$refs.addForm.clearValidate();
    },
    submitForm(formName) {
      if (this.form.callResult == 0) {
        this.$message({
          message: "请输入备注内容",
          type: "warning"
        });
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$api.assistCustomerMgr
            .callCheck(this.form)
            .then(() => {
              this.loading = false;
              this.$message({
                message: "您已电核成功！",
                type: "success"
              });
              this.goBack();
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bunisess-status {
  position: absolute;
  top: 75px;
  right: 21px;
}
.ellipsis {
  padding: 2px 0px;
}
.demo-image__preview {
  text-align: center;
}
.blue-text {
  color: #429dff;
  cursor: pointer;
}
</style>
