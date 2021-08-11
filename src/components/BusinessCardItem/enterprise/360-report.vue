<template>
  <div class="360_report_page"
       id="pageDom">
    <template v-if="pageLoading">
      <div class="loading">
        <div class="loader loader-7">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
        </div>
      </div>
      <p class="text-center grey--text body-2">
        用户360报告载入中，请稍后。。。
      </p>
    </template>
    <template v-else>
      <div v-if="form"
           v-cloak>
        <el-row>
          <el-col :span="18">
            <el-card shadow="never">
              <div slot="header">
                <el-row>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <div class="text--darken-3"
                             style="border-right: 1px solid #eee; margin-right: 24px;">
                          <img :src="elogo"> <span class=" ml-2 my-3 subheading">{{form.baseInfo.name}}</span>
                          <h4 class="grey--text body-2">注册地址：<span>{{form.baseInfo.regLocation}}</span></h4>
                          <div class="grey--text body-2 pt-3">
                            <span class="mr-4">报告日期：{{ form.baseInfo.reportTime}}</span>
                          </div>
                          <div class="grey--text body-2 pt-3">
                            <span class="mr-4 red--text">本报告数据来源自宜昌政务大数据,仅供银行办理信贷业务作为参考</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <!-- <h4 class="rNo">报告编号： <span>{{form.headMap.reportNumber}}</span>
                      </h4>
                      <h4 class="rNo-time"> <span>{{form.headMap.reportTime | reportFormatTime }}</span>
                      </h4> -->
                        <div>
                          <img :src="riskLogo"
                               class="my-2 pt-4">
                          <div class="py-3 tag-class">
                            <el-tag size="small"
                                    class="mr-2 mb-1 cursor-pointer"
                                    type="info"
                                    :class="[showClass(item.index) ? 'red white--text' : '']"
                                    v-for="item in riskTargets"
                                    :key="item.index">
                              <i :class="[showClass(item.index) ? 'el-icon-circle-check' : 'el-icon-warning-outline']"></i>
                              {{item.name}}
                            </el-tag>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div ref="dyReport">
                <div ref="bgReport"
                     class="body-content">
                  <p class="pb-3 modTitle text-center">
                    <img :src="leftIcon">
                    <span class="mx-2 headline red--text">公司基本情况</span>
                    <img :src="rightIcon">
                  </p>
                  <section>
                    <p id="e_1_1">
                      <i class="el-icon-menu"></i> 1.1 基本信息
                    </p>
                    <div>
                      <table class="table-style-1">
                        <tbody>
                          <tr>
                            <th>企业名称</th>
                            <td>{{form.baseInfo.name}}</td>
                            <th>统一社会信用编码</th>
                            <td>{{form.baseInfo.creditCode}}</td>
                          </tr>
                          <tr>
                            <th>法定代表人</th>
                            <td>{{form.baseInfo.legalPersonName}}</td>
                            <th>注册资本</th>
                            <td>{{form.baseInfo.regCapital}}</td>
                          </tr>
                          <tr>
                            <th>实缴资本</th>
                            <td>{{form.baseInfo.actualCapital}}</td>
                            <th>企业性质</th>
                            <td>{{form.baseInfo.companyOrgType}}</td>
                          </tr>
                          <tr>
                            <th>所属行业</th>
                            <td>{{form.baseInfo.industry}}</td>
                            <th>注册时间</th>
                            <td>{{form.baseInfo.estiblishTime}}</td>
                          </tr>
                          <tr>
                            <th>营业期限(月)</th>
                            <td colspan="3">{{form.baseInfo.yyqx}}</td>
                          </tr>
                          <tr>
                            <th>注册地址</th>
                            <td colspan="3">{{form.baseInfo.regLocation}}</td>
                          </tr>
                          <tr>
                            <th>经营范围</th>
                            <td colspan="3">{{form.baseInfo.businessScope}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_1_2">
                      <i class="el-icon-menu"></i> 1.2 公司工商变更情况
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>序号</th>
                            <th>变更日期</th>
                            <th>变更事项</th>
                            <th>变更前内容</th>
                            <th>变更后内容</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.changeRecord.length > 0">
                          <tr v-for="(item, index) in form.changeRecord"
                              :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{item.changeTime}}</td>
                            <td>{{item.changeItem}}</td>
                            <td>{{item.contentBefore |divText}}</td>
                            <td>{{item.contentAfter|divText}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_1_3">
                      <i class="el-icon-menu"></i> 1.3 股权结构
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>序号</th>
                            <th>股东名称</th>
                            <th>认缴资本</th>
                            <th>股权比例</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.equityratioStructureChildren.length > 0">
                          <tr v-for="(item, index) in form.equityratioStructureChildren"
                              :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{item.pcName}}</td>
                            <td>{{item.amount}}</td>
                            <td>{{item.percent}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_1_4">
                      <i class="el-icon-menu"></i> 1.4 企业图谱
                    </p>
                    <div ref="canvas"
                         v-if="form.nodes.length>0">
                      <img v-show="isshow"
                           :src="image">
                      <v-chart v-show="!isshow"
                               id="dailyCurveCharts"
                               :options="options"
                               class="reportChart"></v-chart>
                    </div>
                    <p id="e_1_4_1">
                      <i class="el-icon-caret-right"></i> 1.4.1 下属企业及分支机构概况
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>企业名称</th>
                            <th>成立时间</th>
                            <th>注册地</th>
                            <th>主营业务</th>
                            <th>是否有重大信用风险</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.xsqyList.length > 0">
                          <tr v-for="(item, index) in form.xsqyList"
                              :key="index">
                            <td>{{item.xsqymc}}</td>
                            <td>{{item.xsqyclsj}}</td>
                            <td>{{item.xsqyzcd}}</td>
                            <td>{{item.xsqyzyyw}}</td>
                            <td>{{item.xszdxyfx}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_1_4_2">
                      <i class="el-icon-caret-right"></i> 1.4.2 关联企业概况
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>企业名称</th>
                            <th>成立时间</th>
                            <th>注册资本</th>
                            <th>状态</th>
                            <th>股权比例</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.rolesHolderlist.length > 0">
                          <tr v-for="(item, index) in form.rolesHolderlist"
                              :key="index">
                            <td>{{item.cname}}</td>
                            <td>{{item.estiblishtime | timeText}}</td>
                            <td>{{item.regcapital}}</td>
                            <td>{{item.regstatus}}</td>
                            <td>{{item.percent}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_1_5">
                      <i class="el-icon-menu"></i> 1.5 行政许可及知识产权
                    </p>
                    <p id="e_1_5_1">
                      <i class="el-icon-caret-right"></i> 1.5.1 行政许可
                    </p>
                    <div>
                      <table class="table-style-2 col-width-4">
                        <thead>
                          <tr>
                            <th>许可证号</th>
                            <th>许可证名称</th>
                            <th>发证机关</th>
                            <th>起始日期</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.license.length > 0">
                          <tr v-for="(item, index) in form.license"
                              :key="index">
                            <td>{{item.licencenumber}}</td>
                            <td>{{item.licencename}}</td>
                            <td>{{item.department}}</td>
                            <td>{{item.fromdate}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_1_5_2">
                      <i class="el-icon-caret-right"></i> 1.5.2 主要证书
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>证书名称</th>
                            <th>证书编号</th>
                            <th>发证日期</th>
                            <th>截至日期</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.certificate.length > 0">
                          <tr v-for="(item, index) in form.certificate"
                              :key="index">
                            <td>{{item.certificateName}}</td>
                            <td>{{item.certNo}}</td>
                            <td>{{item.startDate}}</td>
                            <td>{{item.endDate}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_1_5_3">
                      <i class="el-icon-caret-right"></i> 1.5.3 商标
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>商标名</th>
                            <th>状态</th>
                            <th>申请时间</th>
                            <th>注册号</th>
                            <th>类型</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.tminfo.length > 0">
                          <tr v-for="(item, index) in form.tminfo"
                              :key="index">
                            <td>{{item.tmName}}</td>
                            <td>{{item.category}}</td>
                            <td>{{item.appDate}}</td>
                            <td>{{item.regNo}}</td>
                            <td>{{item.intCls}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_1_5_4">
                      <i class="el-icon-caret-right"></i> 1.5.4 专利
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>专利名称</th>
                            <th>发明人</th>
                            <th>专利号</th>
                            <th>公开公告日</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.patents.length > 0">
                          <tr v-for="(item, index) in form.patents"
                              :key="index">
                            <td>{{item.patentName}}</td>
                            <td>{{item.inventor}}</td>
                            <td>{{item.patentNum}}</td>
                            <td>{{item.pubDate}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_1_5_5">
                      <i class="el-icon-caret-right"></i> 1.5.5 作品著作权及著作权
                    </p>
                    <p class="ml-3"
                       id="e_1_5_5_1">
                      <i class="el-icon-caret-right"></i> 1.5.5.1 作品著作权
                    </p>
                    <div>
                      <table class="table-style-2 col-width-3">
                        <thead>
                          <tr>
                            <th>著作权名称</th>
                            <th>登记号</th>
                            <th>登记日期</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.copyregworks.length > 0">
                          <tr v-for="(item, index) in form.copyregworks"
                              :key="index">
                            <td>{{item.fullname}}</td>
                            <td>{{item.regnum}}</td>
                            <td>{{item.regtime}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="ml-3"
                       id="e_1_5_5_2">
                      <i class="el-icon-caret-right"></i> 1.5.5.2 著作权
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>软件全称</th>
                            <th>著作权人</th>
                            <th>登记日期</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.copyreg.length > 0">
                          <tr v-for="(item, index) in form.copyreg"
                              :key="index">
                            <td>{{item.fullname}}</td>
                            <td>{{item.authorNationality}}</td>
                            <td>{{item.regtime}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_1_5_6">
                      <i class="el-icon-caret-right"></i> 1.5.6 网站备案
                    </p>
                    <div>
                      <table class="table-style-2 col-width-6">
                        <thead>
                          <tr>
                            <th>备案时间</th>
                            <th>网站名称</th>
                            <th>主页网址</th>
                            <th>备案号</th>
                            <th>状态</th>
                            <th>单位性质</th>
                          </tr>
                        </thead>
                        <!-- <tbody v-if="form.patents.length > 0">
                      <tr v-for="(item, index) in form.patents" :key="index">
                        <td>{{item.patentName}}</td>
                        <td>{{item.inventor}}</td>
                        <td>{{item.patentNum}}</td>
                        <td>{{item.pubDate}}</td>
                      </tr>
                    </tbody> -->
                        <tbody>
                          <tr>
                            <td colspan="6"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <p class="pb-3 modTitle text-center">
                    <img :src="leftIcon">
                    <span class="mx-2 headline red--text">公司运营概况</span>
                    <img :src="rightIcon">
                  </p>
                  <section>
                    <p id="e_2_1">
                      <i class="el-icon-menu"></i> 2.1 招投标信息
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>发布日期</th>
                            <th>标题</th>
                            <th>采购人</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.bids.length > 0">
                          <tr v-for="(item, index) in form.bids"
                              :key="index">
                            <td>{{item.publishTime}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.purchaser}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_2">
                      <i class="el-icon-menu"></i> 2.2 产品信息
                    </p>
                    <div>
                      <table class="table-style-2 col-wdith-4">
                        <thead>
                          <tr>
                            <th>产品名称</th>
                            <th>产品分类</th>
                            <th>产品类型</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.appbkInfo.length > 0">
                          <tr v-for="(item, index) in form.appbkInfo"
                              :key="index">
                            <td>{{item.name}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.classes}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_3">
                      <i class="el-icon-menu"></i> 2.3 购地信息
                    </p>
                    <div>
                      <table class="table-style-2 col-width-7">
                        <thead>
                          <tr>
                            <th>土地级别</th>
                            <th>项目位置</th>
                            <th>土地用途</th>
                            <th>土地使用权人</th>
                            <th>成交价格(万元)</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.purchaseland.length > 0">
                          <tr v-for="(item, index) in form.purchaseland"
                              :key="index">
                            <td>{{item.landLevel}}</td>
                            <td>{{item.projectLocation}}</td>
                            <td>{{item.landUseType}}</td>
                            <td>{{item.landUseRightPerson}}</td>
                            <td>{{item.transactionPrice}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_4">
                      <i class="el-icon-menu"></i> 2.4 税务评级
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>年份</th>
                            <th>纳税评级</th>
                            <th>类型</th>
                            <th>纳税人识别号</th>
                            <th>评价单位</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.taxCredit.length > 0">
                          <tr v-for="(item, index) in form.taxCredit"
                              :key="index">
                            <td>{{item.year}}</td>
                            <td>{{item.grade}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.idNumber}}</td>
                            <td>{{item.evalDepartment}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_5">
                      <i class="el-icon-menu"></i> 2.5 动产抵押
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>登记日期</th>
                            <th>被担保债权类型</th>
                            <th>被担保债权数额</th>
                            <th>登记机关</th>
                            <th>状态</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.mortgageinfo&&form.mortgageinfo.length > 0">
                          <tr v-for="(item, index) in form.mortgageinfo"
                              :key="index">
                            <td>{{item.regDate}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.amount}}</td>
                            <td>{{item.regDepartment}}</td>
                            <td>{{item.status}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_6">
                      <i class="el-icon-menu"></i> 2.6 资产概况
                    </p>
                    <p id="e_2_6_1">
                      <i class="el-icon-caret-right"></i> 2.6.1 企业、法人及主要股东（占比34%以上）房产信息
                    </p>
                    <div>
                      <table class="table-style-2 col-width-3">
                        <thead>
                          <tr>
                            <th>房产套数</th>
                            <th>面积合计</th>
                            <th>评估价值</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.fcList.length > 0">
                          <tr v-for="(item, index) in form.fcList"
                              :key="index">
                            <td>{{item.fcts}}</td>
                            <td>{{item.fcmj}}</td>
                            <td>{{item.fcpgjz}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_2_6_2">
                      <i class="el-icon-caret-right"></i> 2.6.2 企业、法人及主要股东车辆信息
                    </p>
                    <div>
                      <table class="table-style-2 col-width-7">
                        <thead>
                          <tr>
                            <th>号牌种类</th>
                            <th>车牌号码</th>
                            <th>中文品牌</th>
                            <th>车辆类型</th>
                            <th>使用年限</th>
                            <th>评估价值</th>
                            <th>报废期止</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.carList.length > 0">
                          <tr v-for="(item, index) in form.carList"
                              :key="index">
                            <td>{{item.hpzl}}</td>
                            <td>{{item.cphm}}</td>
                            <td>{{item.zwpp}}</td>
                            <td>{{item.cllx}}</td>
                            <td>{{item.synx}}</td>
                            <td>{{item.pgjz}}</td>
                            <td>{{item.bfqz}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="7"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_7">
                      <i class="el-icon-menu"></i> 2.7 人力资源概况
                    </p>
                    <p id="e_2_7_1">
                      <i class="el-icon-caret-right"></i> 2.7.1 人力资源结构
                    </p>
                    <div>
                      <table class="table-style-2 col-width-9">
                        <thead>
                          <tr>
                            <th>学历</th>
                            <th>人数</th>
                            <th>占比</th>
                            <th>年龄</th>
                            <th>人数</th>
                            <th>占比</th>
                            <th>在本公司任职年限</th>
                            <th>人数</th>
                            <th>占比</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.rlzyList.length > 0">
                          <tr v-for="(item, index) in form.rlzyList"
                              :key="index">
                            <td>{{item.xl}}</td>
                            <td>{{item.zrs}}</td>
                            <td>{{item.zb | rateText}}</td>
                            <td>{{item.nl}}</td>
                            <td>{{item.nlrs}}</td>
                            <td>{{item.nlzb | rateText}}</td>
                            <td>{{item.nx}}</td>
                            <td>{{item.nxrs}}</td>
                            <td>{{item.nxzb | rateText}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="9"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_8">
                      <i class="el-icon-menu"></i> 2.8 主要上下游客户
                    </p>
                    <p id="e_2_8_1">
                      <i class="el-icon-caret-right"></i> 2.8.1 主要上游客户（前5大客户）
                    </p>
                    <div>
                      <table class="table-style-2 col-width-6">
                        <thead>
                          <tr>
                            <th>企业名称</th>
                            <th>主要产品或服务</th>
                            <th>往来金额</th>
                            <th>占比</th>
                            <th>账期</th>
                            <th>结算方式</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.upkhList.length > 0">
                          <tr v-for="(item, index) in form.upkhList"
                              :key="index">
                            <td>{{item.upMc}}</td>
                            <td>{{item.upFw}}</td>
                            <td>{{item.upWlje}}</td>
                            <td>{{item.upZb | rateText}}</td>
                            <td>{{item.upZq}}</td>
                            <td>{{item.upJsfs}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="6"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_2_8_2">
                      <i class="el-icon-caret-right"></i> 2.8.2 主要下游客户（前5大客户）
                    </p>
                    <div>
                      <table class="table-style-2 col-width-6">
                        <thead>
                          <tr>
                            <th>企业名称</th>
                            <th>主要产品或服务</th>
                            <th>往来金额</th>
                            <th>占比</th>
                            <th>账期</th>
                            <th>结算方式</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.dwkhList.length > 0">
                          <tr v-for="(item, index) in form.dwkhList"
                              :key="index">
                            <td>{{item.dwMc}}</td>
                            <td>{{item.dwFw}}</td>
                            <td>{{item.dwWlje}}</td>
                            <td>{{item.dwZb | rateText}}</td>
                            <td>{{item.dwZq}}</td>
                            <td>{{item.dwJsfs}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="6"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_9">
                      <i class="el-icon-menu"></i> 2.9 用电量概况
                    </p>
                    <div>
                      <table class="table-style-2 col-width-13">
                        <thead>
                          <tr>
                            <th>月份</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.myydList.length > 0">
                          <tr>
                            <td>用电</td>
                            <td>{{form.myydList[0].ydl}}</td>
                            <td>{{form.myydList[1].ydl}}</td>
                            <td>{{form.myydList[2].ydl}}</td>
                            <td>{{form.myydList[3].ydl}}</td>
                            <td>{{form.myydList[4].ydl}}</td>
                            <td>{{form.myydList[5].ydl}}</td>
                            <td>{{form.myydList[6].ydl}}</td>
                            <td>{{form.myydList[7].ydl}}</td>
                            <td>{{form.myydList[8].ydl}}</td>
                            <td>{{form.myydList[9].ydl}}</td>
                            <td>{{form.myydList[10].ydl}}</td>
                            <td>{{form.myydList[11].ydl}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="13"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_2_10">
                      <i class="el-icon-menu"></i> 2.10 产品研发技术概况
                    </p>
                    <div>
                      <table class="table-style-1">
                        <thead>
                          <tr>
                            <th>研发技术人员数量</th>
                            <th>硕士及以上人数</th>
                            <th>上年度研发投入金额</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.cxList.length > 0">
                          <tr v-for="(item, index) in form.cxList"
                              :key="index">
                            <td>{{item.yfjsry}}</td>
                            <td>{{item.ssjys}}</td>
                            <td>{{item.sndyftrje}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <p class="pb-3 modTitle text-center">
                    <img :src="leftIcon">
                    <span class="mx-2 headline red--text">公司风险披露</span>
                    <img :src="rightIcon">
                  </p>

                  <section>
                    <p id="e_3_1">
                      <i class="el-icon-menu"></i> 3.1 公司司法风险披露
                    </p>
                    <p id="e_3_1_1">
                      <i class="el-icon-caret-right"></i> 3.1.1 法律诉讼
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>原告</th>
                            <th>被告</th>
                            <th>案由</th>
                            <th>案件类型</th>
                            <th>案件号</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.lawsuit.length > 0">
                          <tr v-for="(item, index) in form.lawsuit"
                              :key="index">
                            <td>{{item.plaintiffs | divText}}</td>
                            <td>{{item.defendants | divText}}</td>
                            <td>{{item.casereason}}</td>
                            <td>{{item.casetype}}</td>
                            <td>{{item.caseno}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_1_2">
                      <i class="el-icon-caret-right"></i> 3.1.2 法院公告
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>公告日期</th>
                            <th>上诉方</th>
                            <th>被诉方</th>
                            <th>公告内容</th>
                            <th>公告类型</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.courtAnnouncement.length > 0">
                          <tr v-for="(item, index) in form.courtAnnouncement"
                              :key="index">
                            <td>{{item.publishdate}}</td>
                            <td>{{item.party1}}</td>
                            <td>{{item.party2}}</td>
                            <td>{{item.content}}</td>
                            <td>{{item.bltntypename}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_3_1_3">
                      <i class="el-icon-caret-right"></i> 3.1.3 被执行人
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>被执行人名称</th>
                            <th>身份代码</th>
                            <th>执行标的</th>
                            <th>案号</th>
                            <th>执行法院</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.bzxr.length > 0">
                          <tr v-for="(item, index) in form.bzxr"
                              :key="index">
                            <td>{{item.pname}}</td>
                            <td>{{item.partyCardNum}}</td>
                            <td>{{item.execMoney}}</td>
                            <td>{{item.caseCode}}</td>
                            <td>{{item.execCourtName}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_1_4">
                      <i class="el-icon-caret-right"></i> 3.1.4 开庭公告
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>原告/上诉人</th>
                            <th>被告/被诉人</th>
                            <th>开庭时间</th>
                            <th>案由</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.ktannouncement.length > 0">
                          <tr v-for="(item, index) in form.ktannouncement"
                              :key="index">
                            <td>{{item.plaintiff}}</td>
                            <td>{{item.defendant}}</td>
                            <td>{{item.startDate}}</td>
                            <td>{{item.caseReason}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_1_5">
                      <i class="el-icon-caret-right"></i> 3.1.5 司法协助
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>被执行人</th>
                            <th>股权数额</th>
                            <th>执行通知文号</th>
                            <th>类型/状态</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.judicial.length > 0">
                          <tr v-for="(item, index) in form.judicial"
                              :key="index">
                            <td>{{item.executedPerson}}</td>
                            <td>{{item.equityAmount}}</td>
                            <td>{{item.executeNoticeNum}}</td>
                            <td>{{item.typeState}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_1_6">
                      <i class="el-icon-caret-right"></i> 3.1.6 失信人
                    </p>
                    <div>
                      <table class="table-style-2">
                        <thead>
                          <tr>
                            <th>失信人名称</th>
                            <th>立案时间</th>
                            <th>履行情况</th>
                            <th>生效法律文书确定的义务</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.dishonest.length > 0">
                          <tr v-for="(item, index) in form.dishonest"
                              :key="index">
                            <td>{{item.iname}}</td>
                            <td>{{item.regdate}}</td>
                            <td>{{item.performance}}</td>
                            <td>{{item.duty}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <p id="e_3_2">
                      <i class="el-icon-menu"></i> 3.2 公司经营风险披露
                    </p>
                    <p id="e_3_2_1">
                      <i class="el-icon-caret-right"></i> 3.2.1 公告催告
                    </p>
                    <div>
                      <table class="table-style-2 col-width-7">
                        <thead>
                          <tr>
                            <th>票据类型</th>
                            <th>处理类型</th>
                            <th>持票人公司</th>
                            <th>出票人公司</th>
                            <th>票面金额</th>
                            <th>公示催告公司</th>
                            <th>公告日期</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.publicnotice.length > 0">
                          <tr v-for="(item, index) in form.publicnotice"
                              :key="index">
                            <td>{{item.billType}}</td>
                            <td>{{item.exigentType}}</td>
                            <td>{{item.ownerCompanyName}}</td>
                            <td>{{item.drawCompanyName}}</td>
                            <td>{{item.billAmt}}</td>
                            <td>{{item.applyCompanyName}}</td>
                            <td>{{item.publishDt}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="7"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_2_2">
                      <i class="el-icon-caret-right"></i> 3.2.2 经营异常
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>列入日期</th>
                            <th>列入原因</th>
                            <th>决定机关</th>
                            <th>移除日期</th>
                            <th>移除原因</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.abnormal.length > 0">
                          <tr v-for="(item, index) in form.abnormal"
                              :key="index">
                            <td>{{item.putDate}}</td>
                            <td>{{item.putReason}}</td>
                            <td>{{item.putDepartment}}</td>
                            <td>{{item.removeDate}}</td>
                            <td>{{item.removeReason}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p id="e_3_2_3">
                      <i class="el-icon-caret-right"></i> 3.2.3 行政处罚
                    </p>
                    <div>
                      <table class="table-style-2 col-width-5">
                        <thead>
                          <tr>
                            <th>处罚事由</th>
                            <th>处罚状态</th>
                            <th>处罚结果</th>
                            <th>处罚机关</th>
                            <th>决定日期</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.punishmentInfo.length > 0">
                          <tr v-for="(item, index) in form.punishmentInfo"
                              :key="index">
                            <td>{{item.reason}}</td>
                            <td>{{item.punishStatus}}</td>
                            <td>{{item.result}}</td>
                            <td>{{item.departmentName}}</td>
                            <td>{{item.decisionDate | timeText}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="5"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_2_4">
                      <i class="el-icon-caret-right"></i> 3.2.4 严重违法
                    </p>
                    <div>
                      <table class="table-style-2 col-width-3">
                        <thead>
                          <tr>
                            <th>列入日期</th>
                            <th>列入原因</th>
                            <th>决定机关</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.illegalinfo.length > 0">
                          <tr v-for="(item, index) in form.illegalinfo"
                              :key="index">
                            <td>{{item.putDate | timeText}}</td>
                            <td>{{item.putReason}}</td>
                            <td>{{item.putDepartment}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_2_5">
                      <i class="el-icon-caret-right"></i> 3.2.5 欠税公告
                    </p>
                    <div>
                      <table class="table-style-2 col-width-3">
                        <thead>
                          <tr>
                            <th>欠税税种</th>
                            <th>当前发生的欠税额</th>
                            <th>欠税余额</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.owntax.length > 0">
                          <tr v-for="(item, index) in form.owntax"
                              :key="index">
                            <td>{{item.taxCategory}}</td>
                            <td>{{item.newOwnTaxBalance}}</td>
                            <td>{{item.ownTaxBalance}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="3"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p id="e_3_2_6">
                      <i class="el-icon-caret-right"></i> 3.2.6 司法拍卖
                    </p>
                    <div>
                      <table class="table-style-2 col-width-3">
                        <thead>
                          <tr>
                            <th>公告日期</th>
                            <th>执行法院</th>
                            <th>拍卖标的</th>
                          </tr>
                        </thead>
                        <tbody v-if="form.judicialsale.length > 0">
                          <tr v-for="(item, index) in form.judicialsale"
                              :key="index">
                            <td>{{item.pubTime}}</td>
                            <td>{{item.court}}</td>
                            <td>{{item.title}}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4"
                                class="text-center grey--text body-2">
                              无
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <div class="right-nav white">
              <ul class="nav-level-1"
                  :class="navFixed == true ? 'rfNav' : ''">
                <li v-for="(item, index) in catalogue"
                    :key="index">
                  <div class="nav-item-header"
                       :class="{nactive: curTarget== item.target}">
                    {{item.title}}
                  </div>
                  <template v-if="item.children">
                    <ul class="nav-level-2">
                      <li v-for="(sitem, sindex) in item.children"
                          @click.stop="scrollTo(sitem)"
                          :key="sindex">
                        <div class="nav-item-subheader"
                             :class="{nactive: curTarget== sitem.target}">
                          {{sitem.title}}
                        </div>
                        <template v-if="sitem.children">
                          <ul class="nav-level-3">
                            <li v-for="(ssitem, ssindex) in sitem.children"
                                @click.stop="scrollTo(ssitem)"
                                :key="ssindex">
                              <div class="nav-item-subheader"
                                   :class="{nactive: curTarget== ssitem.target}">
                                {{ssitem.title}}
                              </div>
                              <template v-if="ssitem.children">
                                <ul class="nav-level-4">
                                  <li v-for="(sssitem, sssindex) in ssitem.children"
                                      @click.stop="scrollTo(sssitem)"
                                      :key="sssindex">
                                    <div class="nav-item-subheader"
                                         :class="{nactive: curTarget== sssitem.target}">
                                      {{sssitem.title}}
                                    </div>
                                  </li>
                                </ul>
                              </template>
                            </li>
                          </ul>
                        </template>
                      </li>
                    </ul>
                  </template>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import dataTableMixin from '@/mixins/dataTableMixin'
import * as utils from '@/utils'
const echarts = require('echarts');
export default {
  name: 'CreditReport',
  mixins: [
    dataTableMixin
  ],
  props: {
    report: {
      default: () => { },
      type: Object
    },
    scrollTopValue: {
      type: Number,
      default: () => 45
    }
  },
  filters: {
    rateText(rate) {
      if (rate) {
        return (rate * 100).toFixed(0) + '%';
      }
    },
    timeText(date) {
      if (date) {
        return utils.transformTime(parseInt(date))
      } else {
        return ''
      }
    },
    divText(item) {
      if (item) {
        return item.replace(/<[^>]+>/g, "")
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      pageLoading: true,
      isRepair360: false,
      isRepairUnNo: null,
      image: null,
      isshow: false,
      dialog: {
        show: false
      },
      historyDialog: {
        show: false
      },
      elogo: require('@/assets/images/dlogo.png'),
      riskLogo: require('@/assets/images/riskLogo.png'),
      leftIcon: require('@/assets/images/left.png'),
      rightIcon: require('@/assets/images/right.png'),
      riskTargets: [
        { index: '1', name: '严重违法', target: '#e_3_4', danger: true },
        { index: '3', name: '失信人', target: '#e_3_1_1' },
        { index: '5', name: '被执行人', target: '#e_3_1_2' },
        { index: '6', name: '行政处罚', target: '#e_3_2_1' },
        { index: '7', name: '经营异常', target: '#e_3_2_5' },
        { index: '8', name: '法律诉讼', target: '#e_3_1_6' },
        { index: '9', name: '股权出质', target: '#e_3_1_3' },
        { index: '10', name: '动产抵押', target: '#e_3_1_5' },
        { index: '11', name: '欠税公告', target: '#e_3_2_6' },
        // { index: '12', name: '名称变更', target: '#e_3_2_2' },
        // { index: '13', name: '开庭公告', target: '#e_3_2_3' },
        { index: '14', name: '法院公告', target: '#e_3_2_4' },
        // { index: '15', name: '法人变更', target: '#e_3_2_4' },
        // { index: '16', name: '投资人变更', target: '#e_3_2_4' },
        // { index: '17', name: '主要人员变更', target: '#e_3_2_4' },
        // { index: '18', name: '注册资本变更', target: '#e_3_2_4' },
        // { index: '19', name: '注册地址变更', target: '#e_3_2_4' },
        // { index: '20', name: '出资情况变更', target: '#e_3_2_4' },
        // { index: '21', name: '司法协助', target: '#e_3_2_4' },
        // { index: '22', name: '清算信息', target: '#e_3_2_4' },
        // { index: '23', name: '知识产权出质', target: '#e_3_2_4' },
      ],
      catalogue: [
        {
          title: '公司基本概况',
          target: '',
          children: [
            { title: '1.1 基本信息', target: '#e_1_1' },
            { title: '1.2	公司工商变更情况', target: '#e_1_2' },
            {
              title: '1.3	股权结构',
              target: '#e_1_3'
            },
            {
              title: '1.4	企业图谱',
              target: '#e_1_4',
              children: [
                { title: '1.4.1 下属企业及分支机构概况', target: '#e_1_4_1' },
                { title: '1.4.2 关联企业概况', target: '#e_1_4_2' },
              ]
            },
            {
              title: '1.5	行政许可及知识产权 ',
              target: '#e_1_5',
              children: [
                { title: '1.5.1	行政许可', target: '#e_1_5_1' },
                { title: '1.5.2	主要证书', target: '#e_1_5_2' },
                { title: '1.5.3	商标', target: '#e_1_5_3' },
                { title: '1.5.4	专利', target: '#e_1_5_4' },
                {
                  title: '1.5.5	作品著作权及著作权',
                  target: '#e_1_5_5',
                  children: [
                    { title: '1.5.5.1	作品著作权', target: '#e_1_5_5_1' },
                    { title: '1.5.5.2	著作权', target: '#e_1_5_5_2' },
                  ]
                },
                { title: '1.5.6	网站备案', target: '#e_1_5_6' },
              ]
            },
          ]
        },
        {
          title: '公司运营概况',
          target: '',
          children: [
            { title: '2.1	招投标信息', target: '#e_2_1' },
            { title: '2.2	产品信息', target: '#e_2_2' },
            { title: '2.3	购地信息', target: '#e_2_3' },
            { title: '2.4	税务评级', target: '#e_2_4' },
            { title: '2.5	动产抵押', target: '#e_2_5' },
            {
              title: '2.6	资产概况',
              target: '#e_2_6',
              children: [
                { title: '2.6.1	企业、法人及主要股东（占比34%以上）房产信息', target: '#e_2_6_1' },
                { title: '2.6.2	企业、法人及主要股东车辆信息', target: '#e_2_6_2' },
              ]
            },
            {
              title: '2.7	人力资源概况',
              target: '#e_2_7',
              children: [
                { title: '2.7.1	人力资源结构', target: '#e_2_7_1' },
              ]
            },
            {
              title: '2.8	主要上下游客户',
              target: '#e_2_8',
              children: [
                { title: '2.8.1	主要上游客户(前5大客户)', target: '#e_2_8_1' },
                { title: '2.8.2	主要下游客户(前5大客户)', target: '#e_2_8_2' },
              ]
            },
            { title: '2.9	用电量概况', target: '#e_2_9' },
            { title: '2.10	产品研发技术概况', target: '#e_2_10' },
          ]
        },
        {
          title: '公司风险披露',
          target: '',
          children: [
            {
              title: '3.1 公司司法风险披露',
              target: '#e_3_1',
              children: [
                { title: '3.1.1 法律诉讼', target: '#e_3_1_1' },
                { title: '3.1.2 法院公告', target: '#e_3_1_2' },
                { title: '3.1.3 被执行人', target: '#e_3_1_3' },
                { title: '3.1.4 开庭公告', target: '#e_3_1_4' },
                { title: '3.1.5 司法协助', target: '#e_3_1_5' },
                { title: '3.1.6 失信人', target: '#e_3_1_6' },
              ]
            },
            {
              title: '3.2 公司经营风险披露',
              target: '#e_3_2',
              children: [
                { title: '3.2.1 公告催告', target: '#e_3_2_1' },
                { title: '3.2.2 经营异常', target: '#e_3_2_2' },
                { title: '3.2.3 行政处罚', target: '#e_3_2_3' },
                { title: '3.2.4 严重违法', target: '#e_3_2_4' },
                { title: '3.2.5 欠税公告', target: '#e_3_2_5' },
                { title: '3.2.6 司法拍卖', target: '#e_3_2_6' },
              ]
            }
          ]
        }
      ],
      form: null,
      data: null,
      navFixed: false,
      options: null,
      elMainDom: null,
      navLevelDom: null,
      curTarget: null
    }
  },
  watch: {
    report: {
      handler() {
        this.data = this.report
        if (this.data) {
          this.get360ViewData(this.data)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.elMainDom = document.querySelector('.el-main')
      this.elMainDom && this.elMainDom.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed() {
    this.elMainDom && this.elMainDom.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    initEchart(chartData, chartLink) {
      this.options = {
        tooltip: {
          show: false
        },
        series: [
          {
            edgeLabel: {
              normal: {
                formatter: "{c}",
                show: true
              }
            },
            edgeSymbol: ['circle', 'arrow'],
            force: {
              repulsion: 1000
            },
            layout: 'force',
            focusNodeAdjacency: true,
            roam: true,
            itemStyle: {
              normal: {
                color: '#4592FF'
              },
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
              }
            },
            symbolSize: 50,
            type: 'graph',
            links: chartLink,
            data: chartData
          }
        ]
      }
      setTimeout(() => {
        let mycanvas = document.getElementsByTagName('canvas')[0]
        this.image = mycanvas.toDataURL({ backgroundColor: '#fff' });
      }, 2000)
    },
    showClass(index) {
      if (this.form.riskPoint && this.form.riskPoint.length > 0) {
        const v = this.form.riskPoint.findIndex(el => el == index) !== -1
        return v;
      }
    },
    handleScroll() {
      let scrollTop = this.elMainDom.scrollTop
      let nlDom = document.querySelector('.nav-level-1')
      if (nlDom) {
        let offsetTop = nlDom.offsetTop
        scrollTop - this.scrollTopValue > offsetTop ? this.navFixed = true : this.navFixed = false
      }
    },
    get360ViewData(data) {
      this.$api.common.get360ViewData({ applyId: data.applyId }).then(res => {
        let respData = JSON.stringify(res.body)
        respData = JSON.parse(respData)
        var _keys = Object.keys(respData);
        let basicInfo = {}
        for (let i = 0; i < _keys.length; i++) {
          this.$set(basicInfo, _keys[i], JSON.parse(respData[_keys[i]]))
        }
        this.form = basicInfo
        this.form.myydList = this.form.myydList.sort(this.compare('yf'))
        if (this.form.links && this.form.links.length > 0) {
          this.form.links.forEach((item, index) => {
            item.value = item.name
          })
        }
        this.initEchart(this.form.nodes, this.form.links)
        setTimeout(() => {
          if (this.form.baseInfo.managerName) {
            this.addWaterMarker(this.form.baseInfo.managerName)
          }
        }, 1000)
      }).then(() => {
        this.pageLoading = false
      })
    },
    /**
    * 为网页添加文字水印
    * @param {String} str 要添加的字符串
    */
    addWaterMarker(str) {
      const can = document.createElement('canvas')
      const content = this.$refs.bgReport
      content.appendChild(can)
      can.width = 200
      can.height = 200
      var cans = can.getContext('2d')
      cans.rotate(-20 * Math.PI / 180)
      cans.font = "16px Microsoft JhengHei"
      cans.fillStyle = "rgba(17, 17, 17, 0.50)"
      cans.textAlign = 'left'
      cans.textBaseline = 'Middle'
      cans.fillText(str, can.width / 3, can.height / 2)
      content.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")"
    },
    compare: function (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    scrollTo(item) {
      if (item.target) {
        this.$scrollTo(`${item.target}`, 500, {
          easing: 'ease-in'
        })
        this.curTarget = item.target
      }
    }
  }
}
</script>
<style>
@media print {
  .body-content {
    -webkit-print-color-adjust: exact;
    -moz-print-color-adjust: exact;
    -ms-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.isRadiueSpan {
  display: inline-block;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #1f98ec;
  color: #fff;
  margin-left: 5px;
}
.tag-class {
  /deep/.el-tag + .el-tag {
    margin-left: 0;
  }
}
.table-style-1 {
  width: 100%;
  th {
    width: 20%;
    background: #fdf7f7;
    text-align: left;
    padding: 8px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
  }
  td {
    padding: 8px;
    font-size: 15px;
    border: 1px solid #eee;
    width: 30%;
  }
}
.table-style-2 {
  width: 100%;
  thead {
    th {
      width: 20%;
      font-size: 15px;
      color: #333;
      font-weight: 500;
      padding: 8px;
      background: #fdf7f7;
      text-align: left;
    }
  }
  tbody {
    td {
      padding: 8px;
      font-size: 15px;
      border: 1px solid #eee;
    }
  }
}

.col-width-3 {
  thead {
    th {
      width: 33.333333333333%;
    }
  }
}

.col-width-4 {
  thead {
    th {
      width: 25%;
    }
  }
}

.col-width-5 {
  thead {
    th {
      width: 20%;
    }
  }
}

.col-width-6 {
  thead {
    th {
      width: 16.666666666666%;
    }
  }
}

.col-width-7 {
  thead {
    th {
      width: 14.285714285714%;
    }
  }
}

.col-width-8 {
  thead {
    th {
      width: 12.5%;
    }
  }
}

.col-width-9 {
  thead {
    th {
      width: 11.11111111111%;
    }
  }
}

.col-width-13 {
  thead {
    th {
      width: 7.6923076923076%;
    }
  }
}

section {
  margin-bottom: 36px;
}

.cursor-pointer {
  cursor: pointer;
  min-width: 83px;
}

.modTitle {
  img {
    vertical-align: sub;
  }
}

.right-nav {
  padding: 1px 12px;
  font-size: 14px;
  .nav-level-1 {
    border: 1px solid #eee;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }

  .nav-level-2 {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      cursor: pointer;
    }
  }

  .nav-level-3 {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-left: 16px;
      cursor: pointer;
    }
  }

  .nav-level-4 {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-left: 16px;
    }
  }

  .nav-item-header {
    font-size: 14px;
    padding-left: 16px;
    line-height: 38px;
    background-color: #eee;
  }

  .nav-item-subheader {
    margin-left: 16px;
    padding: 6px 0;
  }
}

.sys-notice {
  background: peachpuff;
  // line-height: 32px;
  padding: 2px 12px;
  border: 1px solid peachpuff;
  margin-bottom: 162px;
  a {
    color: red;
    text-decoration: underline;
    margin: 0 5px;
  }
}

.rNo {
  position: absolute;
  right: 0;
  margin: 0;
  font-weight: bold;
  font-size: 16px;
}
.rNo-time {
  position: absolute;
  right: 60px;
  margin: 0;
  top: 20px;
  font-weight: 500;
  font-size: 14px;
}

.rfNav {
  position: fixed;
  z-index: 2;
  top: 120px;
  bottom: 0;
  overflow-y: auto;
  width: calc(25% - 65px);
}
.xyf {
  margin-left: 10px;
  display: inline-block;
  border: 1px solid #cfa972;
  padding: 4px 10px;
  border-radius: 50px;
  background: #cfa972;
  color: #fff;
  font-size: 14px;
}
.xyf-btn {
  margin-left: 10px;
  display: inline-block;
  padding: 2px 10px;
  height: 25px;
  font-size: 14px;
  margin-top: 10px;
}
.img-icon {
  width: 12px;
  height: 12px;
}
.reportChart {
  width: 794px;
  height: 480px;
}

.loading {
  width: 100%;
  height: 220px;
  .loader-7 .line {
    width: 8px;
    position: absolute;
    border-radius: 5px;
    bottom: 0;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#1ee95d),
      to(#5714ce)
    );
    background: -webkit-linear-gradient(top, #1ee95d, #5714ce);
    background: linear-gradient(to bottom, #1ee95d, #5714ce);
  }
  .loader-7 .line1 {
    left: 0;
    -webkit-animation: line-grow 0.5s ease alternate infinite;
    animation: line-grow 0.5s ease alternate infinite;
  }
  .loader-7 .line2 {
    left: 20px;
    -webkit-animation: line-grow 0.5s 0.2s ease alternate infinite;
    animation: line-grow 0.5s 0.2s ease alternate infinite;
  }
  .loader-7 .line3 {
    left: 40px;
    -webkit-animation: line-grow 0.5s 0.4s ease alternate infinite;
    animation: line-grow 0.5s 0.4s ease alternate infinite;
  }

  .loader {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 75px;
    display: inline-block;
    vertical-align: middle;
    left: 50%;
    margin-left: -30px;
  }
  @-webkit-keyframes line-grow {
    0% {
      height: 0;
    }
    100% {
      height: 75%;
    }
  }
  @keyframes line-grow {
    0% {
      height: 0;
    }
    100% {
      height: 75%;
    }
  }
}

.nactive {
  color: #00965e !important;
  font-weight: 600;
}
</style>