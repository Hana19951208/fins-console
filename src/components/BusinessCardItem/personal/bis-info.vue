<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never"
                 class="body-2">
          <div>
            <p class="subheading font-weight-bold">申请人信息</p>
            <el-row>
              <el-col :span="8"
                      class="ellipsis">
                <span>用户姓名：</span>
                <span class="grey--text">{{ applyBasicInfo.name }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>身份证号：</span>
                <span class="grey--text">{{ applyBasicInfo.idCard }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>联系电话：</span>
                <span class="grey--text">{{applyBasicInfo.cellphone}}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>性别：</span>
                <span class="grey--text">{{ applyBasicInfo.sex }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>出生日期：</span>
                <span class="grey--text">{{ applyBasicInfo.birthday }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>户籍地址：</span>
                <span class="grey--text"
                      :title="applyBasicInfo.residence">{{ applyBasicInfo.residence }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>婚姻状况：</span>
                <span class="grey--text">{{ applyBasicInfo.maritalStatus }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>社保缴存单位：</span>
                <span class="grey--text">{{ applyBasicInfo.company }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>最新缴存月份：</span>
                <span class="grey--text">{{ applyBasicInfo.newDepositMonth }}</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>申请日期：</span>
                <span class="grey--text">{{ applyBasicInfo.applyTime }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>授信额度(元)：</span>
                <span class="grey--text">{{ applyBasicInfo.creditAmount }}</span>
              </el-col>
              <el-col :span="8"
                      class="ellipsis">
                <span>授信利率：</span>
                <span class="grey--text">{{ applyBasicInfo.creditRate }}</span>
                <span v-if="applyBasicInfo.creditRate"
                      class="grey--text">%</span>
              </el-col>
            </el-row>
            <el-row class="mt-3">
              <el-col :span="8"
                      class="ellipsis">
                <span>授信日期：</span>
                <span class="grey--text">{{ applyBasicInfo.creditTime }}</span>
              </el-col>
            </el-row>
          </div>
          <template v-if="assureBasicInfo.idCard">
            <el-divider></el-divider>
            <div>
              <p class="subheading font-weight-bold">申请人配偶信息</p>
              <el-row>
                <el-col :span="8"
                        class="ellipsis">
                  <span>用户姓名：</span>
                  <span class="grey--text">{{ assureBasicInfo.name }}</span>
                </el-col>
                <el-col :span="8"
                        class="ellipsis">
                  <span>身份证号：</span>
                  <span class="grey--text">{{ assureBasicInfo.idCard }}</span>
                </el-col>
                <el-col :span="8"
                        class="ellipsis">
                  <span>联系电话：</span>
                  <span class="grey--text">{{ assureBasicInfo.cellphone }}</span>
                </el-col>
              </el-row>
              <el-row class="mt-3">
                <el-col :span="8"
                        class="ellipsis">
                  <span>性别：</span>
                  <span class="grey--text">{{ assureBasicInfo.sex }}</span>
                </el-col>
                <el-col :span="8"
                        class="ellipsis">
                  <span>出生日期：</span>
                  <span class="grey--text">{{ assureBasicInfo.birthday }}</span>
                </el-col>
                <el-col :span="8"
                        class="ellipsis">
                  <span>户籍地址：</span>
                  <span class="grey--text"
                        :title="assureBasicInfo.residence">{{ assureBasicInfo.residence }}</span>
                </el-col>
              </el-row>
            </div>
          </template>
          <template v-if="applyBasicInfo.idCardAUrl || applyBasicInfo.idCardBUrl || applyBasicInfo.faceUrl">
            <el-divider></el-divider>
            <div>
              <p class="subheading font-weight-bold">影像资料</p>
              <el-row>
                <el-col :span="8"
                        v-if="applyBasicInfo.idCardAUrl">
                  <div class="block">
                    <el-image style="width:300px;height:200px;"
                              :preview-src-list="srcList"
                              fit="contain"
                              :src="applyBasicInfo.idCardAUrl">
                      <div slot="error"
                           class="image-slot el-image__error"
                           style="font-size: 30px;">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <span class="stration">身份证人像面</span>
                  </div>
                </el-col>
                <el-col :span="8"
                        v-if="applyBasicInfo.idCardBUrl">
                  <div class="block">
                    <el-image style="width:300px;height:200px;"
                              :preview-src-list="srcList"
                              fit="contain"
                              :src="applyBasicInfo.idCardBUrl">
                      <div slot="error"
                           class="image-slot el-image__error"
                           style="font-size: 30px;">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <span class="stration">身份证国徽面</span>
                  </div>
                </el-col>
                <el-col :span="8"
                        v-if="applyBasicInfo.faceUrl">
                  <div class="block">
                    <el-image style="width:300px;height:200px;"
                              :preview-src-list="srcList"
                              fit="contain"
                              :src="applyBasicInfo.faceUrl">
                      <div slot="error"
                           class="image-slot el-image__error"
                           style="font-size: 30px;">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <span class="stration">人脸识别</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    paramsData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      data: {},
      applyBasicInfo: {},
      assureBasicInfo: {},
      srcList: []
    }
  },
  watch: {
    paramsData: {
      handler() {
        this.data = this.paramsData
        if (this.data) {
          this.initData(this.data)
        }
      }
    }
  },
  methods: {
    initData(data) {
      if (data.applyId) {
        this.getApplyBasicInfo(data.applyId)
        this.getAssureBasicInfo(data.applyId)
      }
    },
    getApplyBasicInfo(applyId) {
      this.$api.ecc.getApplyBasicInfo({ applyId: applyId }).then(res => {
        this.applyBasicInfo = res.body
        this.srcList = []
        this.applyBasicInfo.idCardAUrl && this.srcList.push(this.applyBasicInfo.idCardAUrl)
        this.applyBasicInfo.idCardBUrl && this.srcList.push(this.applyBasicInfo.idCardBUrl)
        this.applyBasicInfo.faceUrl && this.srcList.push(this.applyBasicInfo.faceUrl)
      })

    },
    getAssureBasicInfo(applyId) {
      this.$api.ecc.getAssureBasicInfo({ applyId: applyId }).then(res => {
        this.assureBasicInfo = res.body
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.block {
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  border-radius: 5px;
  .stration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin: 20px 0;
  }
}
</style>
