<template>
  <div class="monitor_report_page"
       id="monitor-report">
    <div v-cloak>
      <el-row>
        <el-col :span="18"
                class="watermark-view">
          <div class="report-head px-4 clearfix">
            <div>
              <img :src="clogo"
                   class="middle left">
              <div class="ml-4 left">
                <p class="subheading-1 font-weight-regular grey--text text--darken-4 pt-2">{{ reportDetail.enterpriseName }}</p>
                <p class="body-2 grey--text text--darken-2">报告编号：{{ reportDetail.seqNo }}</p>
              </div>
            </div>
            <el-button @click="downLoadHandle()"
                       type="primary"
                       :loading="downloading"
                       class="down-load-button body-2 blue--text text--darken-2">下载报告</el-button>
          </div>
          <div class="time-box">
            <div class="border left-box d-inline-block">
              <span class="left">往期报告</span>
              <i class="el-icon-caret-left icon right"
                 :class="{'not-active': !preActive, 'active': preActive}"
                 @click="getPreReport"></i>
            </div>
            <div class="time-line"
                 v-resize="redraw">
              <div class="time-wrap"
                   :style="{'width': wrapWidth + 'px', 'margin-left': wrapLeft + 'px'}">
                <template v-for="(item,index) in reportList">
                  <span class="time-item d-inline-block cursor-pointer ellipsis"
                        :class="{'text-active': index === activePos}"
                        :style="{ 'width': itemWidth + 'px' }"
                        :title="item.riskLevel | dictFormat(riskLevelDs)"
                        :key="index"
                        @click="chooseReport(index, item)">
                    {{item.createTime}} {{item.riskLevel | dictFormat(riskLevelDs) }}
                  </span>
                </template>
              </div>
            </div>
            <div class="border right-box d-inline-block">
              <i class="el-icon-caret-right icon"
                 :class="{'not-active': !nextActive, 'active': nextActive}"
                 @click="getNextReport"></i>
            </div>
          </div>
          <div class="content-body">
            <p class="pb-3 modTitle text-center"
               id="e-1">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">风险概要</span>
              <img :src="rightIcon">
            </p>
            <section>
              <div>
                <table class="table-style-3">
                  <tbody>
                    <tr>
                      <th>信用评分</th>
                      <td colspan="2">{{form.creditScore||0}}</td>
                      <th>贷后风险预警</th>
                      <td colspan="2">{{form.riskCount||0}}项</td>
                    </tr>
                    <tr>
                      <th>高风险</th>
                      <td>{{form.highRiskCount||0}}项</td>
                      <th>中等风险</th>
                      <td>{{form.middleRiskCount||0}}项</td>
                      <th>低风险</th>
                      <td>{{form.lowRiskCount||0}}项</td>
                    </tr>
                    <tr>
                      <th colspan="1">企业基本信息风险预警</th>
                      <td colspan="5">{{form.epBaseRiskCount||0}}项</td>
                    </tr>
                    <tr>
                      <th>经营风险预警</th>
                      <td colspan="2">{{form.operateRiskCount||0}}项</td>
                      <th>法人代表风险</th>
                      <td colspan="2">{{form.legalmanRiskCount||0}}项</td>
                    </tr>
                    <template v-if="reportDetail.dealStatus == 1">
                      <tr>
                        <th>处理意见</th>
                        <td>{{reportDetail.dealOption}}</td>
                        <th>处理人</th>
                        <td>{{reportDetail.dealUser}}</td>
                        <th>处理时间</th>
                        <td>{{reportDetail.dealTime}}</td>
                      </tr>
                      <tr>
                        <th>意见说明</th>
                        <td colspan="5">{{reportDetail.dealRemark}}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </section>
            <p class="pb-3 modTitle text-center">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">基本信息</span>
              <img :src="rightIcon">
            </p>
            <section>
              <p id="e-2-1"
                 class="text-left">
                <i class="el-icon-menu"></i> 2.1 注册资本
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.regCapitalRslt && form.regCapitalRslt.list && form.regCapitalRslt.list.length > 0">
                    <tr>
                      <td>{{form.regCapitalRslt.list[0].itemQuotaName}}</td>
                      <td>{{form.regCapitalRslt.list[0].lastValue}}</td>
                      <td>{{form.regCapitalRslt.list[0].curValue}}</td>
                      <td>{{form.regCapitalRslt.list[0].changeDesc}}</td>
                      <td>{{form.regCapitalRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-2-2"
                 class="text-left">
                <i class="el-icon-menu"></i> 2.2 法人代表
              </p>
              <div>
                <table class="table-style-2 col-width-6">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>关联关系</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.legalManRslt && form.legalManRslt.list && form.legalManRslt.list.length > 0">
                    <template v-for="(llItem, llIndex) in form.legalManRslt.list">
                      <tr>
                        <td>{{llItem.itemQuotaName}}</td>
                        <td>{{llItem.lastValue}}</td>
                        <td>{{llItem.curValue}}</td>
                        <td>{{llItem.changeDesc}}</td>
                        <td>{{llItem.relation}}</td>
                        <td v-if="llIndex === 0"
                            :rowspan="form.legalManRslt.list.length">{{form.legalManRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="6"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-2-3"
                 class="text-left">
                <i class="el-icon-menu"></i> 2.3 股权变更
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th rowspan="2">股东姓名</th>
                      <th colspan="3"
                          style="text-align: center;">持股比例</th>
                      <th rowspan="2">风险预警等级</th>
                    </tr>
                    <tr>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.equityChangeRslt && form.equityChangeRslt.list && form.equityChangeRslt.list.length > 0">
                    <template v-for="(ecItem, ecIndex) in form.equityChangeRslt.list">
                      <tr>
                        <td>{{ecItem.itemQuotaName}}</td>
                        <td>{{ecItem.lastValue}}</td>
                        <td>{{ecItem.curValue}}</td>
                        <td>{{ecItem.changeDesc}}</td>
                        <td v-if="ecIndex === 0"
                            :rowspan="form.equityChangeRslt.list.length">{{form.equityChangeRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-2-4"
                 class="text-left">
                <i class="el-icon-menu"></i> 2.4 股权出质
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.equityQualityRslt && form.equityQualityRslt.length > 0">
                    <template v-for="(eqItem, eqIndex) in form.equityQualityRslt">
                      <template v-if="eqItem.list && eqItem.list.length > 0">
                        <template v-for="(eqListItem, eqListIndex) in eqItem.list">
                          <tr>
                            <td>{{eqListItem.itemQuotaName}}</td>
                            <td>{{eqListItem.lastValue}}</td>
                            <td>{{eqListItem.curValue}}</td>
                            <td>{{eqListItem.changeDesc}}</td>
                            <td v-if="eqListIndex === 0"
                                :rowspan="eqItem.list.length">{{eqItem.riskLevel | dictFormat(riskLevelDs)}}</td>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section class="text-left">
              <p id="e-2-5">
                <i class="el-icon-menu"></i> 2.5 固定资产
              </p>
              <p id="e-2-5-1">
                <i class="el-icon-caret-right"></i> 2.5.1 房产
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.houseRslt && form.houseRslt.list && form.houseRslt.list.length > 0">
                    <template v-for="(hItem, hIndex) in form.houseRslt.list">
                      <tr>
                        <td>{{hItem.itemQuotaName}}</td>
                        <td>{{hItem.lastValue}}</td>
                        <td>{{hItem.curValue}}</td>
                        <td>{{hItem.changeDesc}}</td>
                        <td v-if="hIndex === 0"
                            :rowspan="form.houseRslt.list.length">{{form.houseRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p id="e-2-5-2">
                <i class="el-icon-caret-right"></i> 2.5.2 土地
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.landRslt && form.landRslt.list && form.landRslt.list.length > 0">
                    <template v-for="(lItem, lIndex) in form.landRslt.list">
                      <tr>
                        <td>{{lItem.itemQuotaName}}</td>
                        <td>{{lItem.lastValue}}</td>
                        <td>{{lItem.curValue}}</td>
                        <td>{{lItem.changeDesc}}</td>
                        <td v-if="lIndex === 0"
                            :rowspan="form.landRslt.list.length">{{form.landRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p id="e-2-5-3">
                <i class="el-icon-caret-right"></i> 2.5.3 车辆及运输工具
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.vehicleRslt && form.vehicleRslt.list && form.vehicleRslt.list.length > 0">
                    <template v-for="(vItem, vIndex) in form.vehicleRslt.list">
                      <tr>
                        <td>{{vItem.itemQuotaName}}</td>
                        <td>{{vItem.lastValue}}</td>
                        <td>{{vItem.curValue}}</td>
                        <td>{{vItem.changeDesc}}</td>
                        <td v-if="vIndex === 0"
                            :rowspan="form.vehicleRslt.list.length">{{form.vehicleRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <p id="e-2-5-4">
                <i class="el-icon-caret-right"></i> 2.5.4 生产设备
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.facilityRslt && form.facilityRslt.list && form.facilityRslt.list.length > 0">
                    <template v-for="(fItem, fIndex) in form.facilityRslt.list">
                      <tr>
                        <td>{{fItem.itemQuotaName}}</td>
                        <td>{{fItem.lastValue}}</td>
                        <td>{{fItem.curValue}}</td>
                        <td>{{fItem.changeDesc}}</td>
                        <td v-if="fIndex === 0"
                            :rowspan="form.facilityRslt.list.length">{{form.facilityRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
            </section>
            <section>
              <p id="e-2-6"
                 class="text-left">
                <i class="el-icon-menu"></i> 2.6 知识产权
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>类型</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.knowledgePropRslt && form.knowledgePropRslt.list && form.knowledgePropRslt.list.length > 0">
                    <template v-for="(kItem, kIndex) in form.knowledgePropRslt.list">
                      <tr>
                        <td>{{kItem.itemQuotaName}}</td>
                        <td>{{kItem.lastValue}}</td>
                        <td>{{kItem.curValue}}</td>
                        <td>{{kItem.changeDesc}}</td>
                        <td v-if="kIndex === 0"
                            :rowspan="form.knowledgePropRslt.list.length">{{form.knowledgePropRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <p class="pb-3 modTitle text-center">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">经营信息</span>
              <img :src="rightIcon">
            </p>
            <!-- <section>
              <p id="e-3-1"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.1 纳税金额
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>月份</th>
                      <th>近13-24个月同期纳税金额（元）</th>
                      <th>近12个月纳税金额（元）</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.taxAmtRslt && form.taxAmtRslt.list && form.taxAmtRslt.list.length > 0">
                    <template v-for="(taItem, taIndex) in form.taxAmtRslt.list">
                      <tr>
                        <td>{{taItem.itemQuotaName}}</td>
                        <td>{{taItem.lastValue}}</td>
                        <td>{{taItem.curValue}}</td>
                        <td>{{taItem.changeDesc}}</td>
                        <td v-if="taIndex === 0"
                            :rowspan="form.taxAmtRslt.list.length">{{form.taxAmtRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section> -->
            <section>
              <p id="e-3-1"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.1 税务评级
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.taxLevelRslt && form.taxLevelRslt.list && form.taxLevelRslt.list.length > 0">
                    <template v-for="(tlItem, tlIndex) in form.taxLevelRslt.list">
                      <tr>
                        <td>{{tlItem.itemQuotaName}}</td>
                        <td>{{tlItem.lastValue}}</td>
                        <td>{{tlItem.curValue}}</td>
                        <td>{{tlItem.changeDesc}}</td>
                        <td v-if="tlIndex === 0"
                            :rowspan="form.taxLevelRslt.list.length">{{form.taxLevelRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <!-- <section>
              <p id="e-3-3"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.3 销售收入
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>月份</th>
                      <th>近13-24个月同期销售收入（元）</th>
                      <th>近12个月销售收入（元）</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.saleIncomeRslt && form.saleIncomeRslt.list && form.saleIncomeRslt.list.length > 0">
                    <template v-for="(siItem, siIndex) in form.saleIncomeRslt.list">
                      <tr>
                        <td>{{siItem.itemQuotaName}}</td>
                        <td>{{siItem.lastValue}}</td>
                        <td>{{siItem.curValue}}</td>
                        <td>{{siItem.changeDesc}}</td>
                        <td v-if="siIndex === 0"
                            :rowspan="form.saleIncomeRslt.list.length">{{form.saleIncomeRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-3-4"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.4 水费
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>月份</th>
                      <th>近13-24个月同期水费（元）</th>
                      <th>近12个月水费（元）</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.waterFeeRslt && form.waterFeeRslt.list && form.waterFeeRslt.list.length > 0">
                    <template v-for="(wfItem, wfIndex) in form.waterFeeRslt.list">
                      <tr>
                        <td>{{wfItem.itemQuotaName}}</td>
                        <td>{{wfItem.lastValue}}</td>
                        <td>{{wfItem.curValue}}</td>
                        <td>{{wfItem.changeDesc}}</td>
                        <td v-if="wfIndex === 0"
                            :rowspan="form.waterFeeRslt.list.length">{{form.waterFeeRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-3-5"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.5 电费
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>月份</th>
                      <th>近13-24个月同期电费（元）</th>
                      <th>近12个月电费（元）</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.electFeeRslt && form.electFeeRslt.list && form.electFeeRslt.list.length > 0">
                    <template v-for="(efItem, efIndex) in form.electFeeRslt.list">
                      <tr>
                        <td>{{efItem.itemQuotaName}}</td>
                        <td>{{efItem.lastValue}}</td>
                        <td>{{efItem.curValue}}</td>
                        <td>{{efItem.changeDesc}}</td>
                        <td v-if="efIndex === 0"
                            :rowspan="form.electFeeRslt.list.length">{{form.electFeeRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section> -->
            <section>
              <p id="e-3-2"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.2 运营风险
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>风险种类</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.operateRiskRslt && form.operateRiskRslt.list && form.operateRiskRslt.list.length > 0">
                    <template v-for="(orItem, orIndex) in form.operateRiskRslt.list">
                      <tr>
                        <td>{{orItem.itemQuotaName}}</td>
                        <td>{{orItem.lastValue}}</td>
                        <td>{{orItem.curValue}}</td>
                        <td>{{orItem.changeDesc}}</td>
                        <td v-if="orIndex === 0"
                            :rowspan="form.operateRiskRslt.list.length">{{form.operateRiskRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-3-3"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.3 司法风险
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>风险种类</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.epJudiRiskRslt && form.epJudiRiskRslt.list && form.epJudiRiskRslt.list.length > 0">
                    <template v-for="(erItem, erIndex) in form.epJudiRiskRslt.list">
                      <tr>
                        <td>{{erItem.itemQuotaName}}</td>
                        <td>{{erItem.lastValue}}</td>
                        <td>{{erItem.curValue}}</td>
                        <td>{{erItem.changeDesc}}</td>
                        <td v-if="erIndex === 0"
                            :rowspan="form.epJudiRiskRslt.list.length">{{form.epJudiRiskRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <!-- <section>
              <p id="e-3-8"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.8 黑名单
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>黑名单类型</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.blackListRslt && form.blackListRslt.list && form.blackListRslt.list.length > 0">
                    <template v-for="(brItem, brIndex) in form.blackListRslt.list">
                      <tr>
                        <td>{{brItem.itemQuotaName}}</td>
                        <td>{{brItem.lastValue}}</td>
                        <td>{{brItem.curValue}}</td>
                        <td>{{brItem.changeDesc}}</td>
                        <td v-if="brIndex === 0"
                            :rowspan="form.blackListRslt.list.length">{{form.blackListRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section> -->
            <section>
              <p id="e-3-4"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.4 关联企业风险
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>风险种类</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.assoEpRiskRslt && form.assoEpRiskRslt.list && form.assoEpRiskRslt.list.length > 0">
                    <template v-for="(aerItem, aerIndex) in form.assoEpRiskRslt.list">
                      <tr>
                        <td>{{aerItem.itemQuotaName}}</td>
                        <td>{{aerItem.lastValue}}</td>
                        <td>{{aerItem.curValue}}</td>
                        <td>{{aerItem.changeDesc}}</td>
                        <td v-if="aerIndex === 0"
                            :rowspan="form.assoEpRiskRslt.list.length">{{form.assoEpRiskRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <!-- <section>
              <p id="e-3-10"
                 class="text-left">
                <i class="el-icon-menu"></i> 3.10 上下游企业风险
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>风险种类</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.upDownEpRiskRslt && form.upDownEpRiskRslt.list && form.upDownEpRiskRslt.list.length > 0">
                    <template v-for="(udrItem, udrIndex) in form.upDownEpRiskRslt.list">
                      <tr>
                        <td>{{udrItem.itemQuotaName}}</td>
                        <td>{{udrItem.lastValue}}</td>
                        <td>{{udrItem.curValue}}</td>
                        <td>{{udrItem.changeDesc}}</td>
                        <td v-if="udrIndex === 0"
                            :rowspan="form.upDownEpRiskRslt.list.length">{{form.upDownEpRiskRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section> -->
            <p class="pb-3 modTitle text-center">
              <img :src="leftIcon">
              <span class="mx-2 headline blue-text">法人代表信息</span>
              <img :src="rightIcon">
            </p>
            <section>
              <p id="e-4-1"
                 class="text-left">
                <i class="el-icon-menu"></i> 4.1 婚姻状况
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th rowspan="2">法人代表姓名</th>
                      <th colspan="3"
                          style="text-align: center;">婚姻状况</th>
                      <th rowspan="2">风险预警等级</th>
                    </tr>
                    <tr>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.maritalStatusRslt && form.maritalStatusRslt.list && form.maritalStatusRslt.list.length > 0">
                    <template v-for="(msItem, msIndex) in form.maritalStatusRslt.list">
                      <tr>
                        <td>{{msItem.itemQuotaName}}</td>
                        <td>{{msItem.lastValue}}</td>
                        <td>{{msItem.curValue}}</td>
                        <td>{{msItem.changeDesc}}</td>
                        <td v-if="msIndex === 0"
                            :rowspan="form.maritalStatusRslt.list.length">{{form.maritalStatusRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-4-2"
                 class="text-left">
                <i class="el-icon-menu"></i> 4.2 司法风险
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th>风险种类</th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.manJudiRiskRslt && form.manJudiRiskRslt.list && form.manJudiRiskRslt.list.length > 0">
                    <template v-for="(mjrItem, mjrIndex) in form.manJudiRiskRslt.list">
                      <tr>
                        <td>{{mjrItem.itemQuotaName}}</td>
                        <td>{{mjrItem.lastValue}}</td>
                        <td>{{mjrItem.curValue}}</td>
                        <td>{{mjrItem.changeDesc}}</td>
                        <td v-if="mjrIndex === 0"
                            :rowspan="form.manJudiRiskRslt.list.length">{{form.manJudiRiskRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <p id="e-4-3"
                 class="text-left">
                <i class="el-icon-menu"></i> 4.3 健康状况
              </p>
              <div>
                <table class="table-style-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>上期结果</th>
                      <th>本期结果</th>
                      <th>变化情况</th>
                      <th>风险预警等级</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.healthStatusRslt && form.healthStatusRslt.list && form.healthStatusRslt.list.length > 0">
                    <template v-for="(mjrItem, mjrIndex) in form.healthStatusRslt.list">
                      <tr>
                        <td>{{mjrItem.itemQuotaName}}</td>
                        <td>{{mjrItem.lastValue}}</td>
                        <td>{{mjrItem.curValue}}</td>
                        <td>{{mjrItem.changeDesc}}</td>
                        <td v-if="mjrIndex === 0"
                            :rowspan="form.healthStatusRslt.list.length">{{form.healthStatusRslt.riskLevel | dictFormat(riskLevelDs)}}</td>
                      </tr>
                    </template>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5"
                          class="text-center grey--text body-2">
                        没有查询到相关记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right-nav white text-left">
            <ul class="nav-level-first"
                :class="navFixed == true ? 'rfNav' : ''">
              <li v-for="(item, index) in catalogue"
                  :key="index">
                <div class="nav-item-header"
                     :class="{nactive: curTarget == item.target}">
                  {{item.title}}
                </div>
                <template v-if="item.children">
                  <ul class="nav-level-2">
                    <li v-for="(sitem, sindex) in item.children"
                        @click.stop="scrollTo(sitem)"
                        :key="sindex">
                      <div class="nav-item-subheader"
                           :class="{nactive: curTarget == sitem.target}">
                        {{sitem.title}}
                      </div>
                      <template v-if="sitem.children">
                        <ul class="nav-level-3">
                          <li v-for="(ssitem, ssindex) in sitem.children"
                              @click.stop="scrollTo(ssitem)"
                              :key="ssindex">
                            <div class="nav-item-subheader"
                                 :class="{nactive: curTarget == ssitem.target}">
                              {{ssitem.title}}
                            </div>
                            <template v-if="ssitem.children">
                              <ul class="nav-level-4">
                                <li v-for="(sssitem, sssindex) in ssitem.children"
                                    @click.stop="scrollTo(sssitem)"
                                    :key="sssindex">
                                  <div class="nav-item-subheader"
                                       :class="{nactive: curTarget == sssitem.target}">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDictEntrysByCode } from '@/utils'
export default {
  name: 'MonitorReport',
  props: {
    monitorReport: {
      default: () => { },
      type: Object
    },
    scrollTopValue: {
      type: Number,
      default: () => 200
    }
  },
  // 监听元素宽度变化的指令
  directives: {
    resize: {
      bind(el, binding) {
        let width = '';
        el.__vueReize__ = setInterval(() => {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width) {
            binding.value({ width });
          }
          width = style.width;
        }, 20);
      },
      unbind(el) {
        clearInterval(el.__vueReize__);
      }
    }
  },
  data() {
    return {
      clogo: require('@/assets/images/dlogo.png'),
      leftIcon: require('@/assets/images/blue-left.png'),
      rightIcon: require('@/assets/images/blue-right.png'),
      reportList: [],
      activePos: 0,
      wrapWidth: 0,
      wrapLeft: 0,
      itemWidth: 0,
      itemLen: 0,
      moveFlag: 0,
      preActive: false,
      nextActive: false,
      reportDetail: {},
      form: {
        creditScore: '',
        riskCount: '',
        highRiskCount: '',
        middleRiskCount: '',
        lowRiskCount: '',
        epBaseRiskCount: '',
        operateRiskCount: '',
        legalmanRiskCount: ''
      },
      catalogue: [
        {
          title: '风险概要',
          target: '#e-1',
          children: []
        },
        {
          title: '基本信息',
          target: '',
          children: [
            { title: '2.1	注册资本', target: '#e-2-1' },
            { title: '2.2	法人代表', target: '#e-2-2' },
            { title: '2.3	股权变更', target: '#e-2-3' },
            { title: '2.4	股权出质', target: '#e-2-4' },
            {
              title: '2.5	固定资产',
              target: '#e-2-5',
              children: [
                { title: '2.5.1	房产', target: '#e-2-5-1' },
                { title: '2.5.2	土地', target: '#e-2-5-2' },
                { title: '2.5.3	车辆及运输工具', target: '#e-2-5-3' },
                // { title: '2.5.4	生产设备', target: '#e-2-5-4' },
              ]
            },
            {
              title: '2.6	知识产权',
              target: '#e-2-6'
            }
          ]
        },
        {
          title: '经营信息',
          target: '',
          children: [
            // { title: '3.1 纳税金额', target: '#e-3-1' },
            { title: '3.1 税务评级', target: '#e-3-1' },
            // { title: '3.3 销售收入', target: '#e-3-3' },
            // { title: '3.4 水费', target: '#e-3-4' },
            // { title: '3.5 电费', target: '#e-3-5' },
            { title: '3.2 运营风险', target: '#e-3-2' },
            { title: '3.3 司法风险', target: '#e-3-3' },
            // { title: '3.8 黑名单', target: '#e-3-8' },
            { title: '3.4 关联企业风险', target: '#e-3-4' },
            // { title: '3.10 上下游企业风险', target: '#e-3-10' },
          ]
        },
        {
          title: '法人代表信息',
          target: '',
          children: [
            { title: '4.1 婚姻状况', target: '#e-4-1' },
            { title: '4.2 司法风险', target: '#e-4-2' },
            { title: '4.3 健康状况', target: '#e-4-3' }
          ]
        }
      ],
      navFixed: false,
      elMainDom: null,
      navLevelDom: null,
      curTarget: null,
      downloading: false
    }
  },
  computed: {
    riskLevelDs() {
      return getDictEntrysByCode('POSTLOAN.RISKLEVEL')
    },
    userEntity() {
      return typeof this.user === 'string' ? JSON.parse(this.user) : this.user
    },
    ...mapGetters([
      'user',
    ])
  },
  watch: {
    monitorReport(val) {
      if (val) {
        this.reportDetail.enterpriseName = val.qyName
        this.getReportList(val)
        this.$nextTick(() => {
          this.addWaterMarker(this.userEntity.userName)
        })
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
    handleScroll() {
      let scrollTop = this.elMainDom.scrollTop
      let nlDom = document.querySelector('.nav-level-first')
      if (nlDom) {
        let offsetTop = nlDom.offsetTop
        scrollTop - this.scrollTopValue > offsetTop ? this.navFixed = true : this.navFixed = false
      }
    },
    // 初始化报告时间轴
    getReportList(query) {
      this.$api.postLoanMonitor.reportList({
        applyId: query.applyId,
        companyCode: query.companyCode,
        areaCode: query.areaCode
      }).then(res => {
        if (res.body && res.body.length > 0) {
          this.reportList = res.body
          const totalWidth = document.querySelector('.time-line').offsetWidth;
          const len = res.body.length || 0; // 时间item总个数
          this.itemLen = len; // 记录item总数
          this.nextActive = false; // 右移失活
          this.activePos = len - 1; // 当前报告的时间节点index
          this.reportDetail = res.body[len - 1];
          if (len > 4) {
            const width = totalWidth / 4; // 单个时间item的宽度
            this.itemWidth = width; // 单个时间item的宽度
            this.wrapWidth = width * len; // 外层div.itme-wrap的宽度
            this.wrapLeft = -(width * (len - 4)); // 外层div.itme-wrap的marginLeft
            this.preActive = true; // 左移激活
            this.moveFlag = len - 4; // 当前可移动的个数
          } else {
            const width = totalWidth / len; // 单个时间item的宽度
            this.itemWidth = width; // 单个时间item的宽度
            this.wrapWidth = width * len;
            this.wrapLeft = 0;
            this.preActive = false;
            this.moveFlag = 0;
          }

          this.getReportDetail(res.body[len - 1].id); // 获取报告详情
        }
      })
    },
    // 获取报告详情
    getReportDetail(id) {
      this.$api.postLoanMonitor.showReport({ reportId: id }).then(res => {
        this.form = res.body
      })
    },
    // 页面宽度变化时，重绘时间轴
    redraw() {
      if (this.itemLen > 0) {
        const len = this.itemLen > 4 ? 4 : this.itemLen;
        const width = document.querySelector('.time-line').offsetWidth / len;
        this.itemWidth = width;
        this.wrapWidth = width * this.itemLen;
        this.wrapLeft = -(width * this.moveFlag);
      }
    },
    // 时间轴：向左
    getPreReport() {
      if (this.preActive) {
        this.wrapLeft = this.wrapLeft + this.itemWidth;
        this.moveFlag--;
        this.nextActive = true;
        if (this.moveFlag === 0) {
          this.preActive = false;
        }
      }
    },
    // 时间轴：向右
    getNextReport() {
      if (this.nextActive) {
        this.wrapLeft = this.wrapLeft - this.itemWidth
        this.moveFlag++;
        this.preActive = true;
        if (this.moveFlag === this.reportList.length - 4) {
          this.nextActive = false;
        }
      }
    },
    // 选择查看某个时间点的报告
    chooseReport(index, item) {
      this.activePos = index;
      this.reportDetail = item;
      this.getReportDetail(item.id);
    },
    // 目录滚动
    scrollTo(item) {
      if (item.target) {
        this.$scrollTo(`${item.target}`, 500, {
          easing: 'ease-in'
        })
        this.curTarget = item.target
      }
    },
    downLoadHandle() {
      if (this.reportDetail.id) {
        window.location.href = process.env.PREFIX_URL
          + '/qyRiskAfterLoan/reportDownload.do?reportId=' + this.reportDetail.id
          + '&applyId=' + this.reportDetail.applyId
      }
    },
    addWaterMarker(waterMarkerTxt) {
      const canvas = document.createElement('canvas')
      const watermarkView = document.querySelector('.watermark-view')
      watermarkView.appendChild(canvas)
      canvas.width = 300
      canvas.height = 300
      var context = canvas.getContext('2d')
      context.rotate(-20 * Math.PI / 180)
      context.font = "16px Microsoft JhengHei"
      context.fillStyle = "rgba(17, 17, 17, 0.50)"
      context.textAlign = 'left'
      context.textBaseline = 'Middle'
      context.fillText(waterMarkerTxt, canvas.width / 3, canvas.height / 2)
      watermarkView.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")"
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.report-head {
  width: 100%;
  height: 110px;
  border: 1px solid #eee;
  background-color: #f7f7f7;
  overflow: hidden;
  position: relative;
  img {
    width: 60px;
    top: 20px;
    position: relative;
  }
}
.time-box {
  width: 100%;
  height: 84px;
  position: relative;
  line-height: 64px;
  border-bottom: 20px solid #eee;
  .right-box {
    width: 8%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    padding-left: 15px;
    text-align: left;
    margin: 0;
    z-index: 99;
  }
  .left-box {
    width: 18%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 15px;
    margin: 0;
    z-index: 99;
  }
  .time-line {
    position: absolute;
    left: 18%;
    top: 0;
    width: 74%;
    height: 65px;
    display: inline-block;
    overflow: hidden;
  }
  .time-wrap {
    height: 100%;
    transition: all linear 0.5s;
  }
  .time-item {
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    text-align: center;
  }
  .time-item:hover {
    color: #38afff;
  }
  .time-item:hover:after {
    display: block;
    content: "";
    width: 90px;
    height: 1px;
    background-color: #38afff;
    margin: 0 auto;
  }
  .border {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .not-active {
    color: #d2d2d2;
    cursor: default;
  }
  .active {
    color: #38afff;
    cursor: pointer;
  }
  .icon {
    line-height: 64px;
  }
  .text-active {
    font-weight: bold;
    color: #38afff;
  }
  .text-active:after {
    display: block;
    content: "";
    width: 90px;
    height: 1px;
    background-color: #38afff;
    margin: 0 auto;
  }
}
.blue-text {
  color: #429dff;
}
.table-style-1 {
  width: 100%;
  th {
    width: 20%;
    background: #f5f6ff;
    padding: 8px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    border: 1px solid #cce5fd;
  }
  td {
    padding: 8px;
    font-size: 15px;
    border: 1px solid #cce5fd;
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
      background: #f5f6ff;
      border: 1px solid #cce5fd;
    }
  }
  tbody {
    td {
      padding: 8px;
      font-size: 15px;
      border: 1px solid #cce5fd;
    }
  }
}
.table-style-3 {
  width: 100%;
  th {
    width: 16.666%;
    background: #f5f6ff;
    padding: 8px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    border: 1px solid #cce5fd;
  }
  td {
    padding: 8px;
    font-size: 15px;
    border: 1px solid #cce5fd;
    width: 16.666%;
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
.modTitle {
  img {
    vertical-align: sub;
  }
}

.right-nav {
  padding: 1px 12px;
  font-size: 14px;
  .nav-level-first {
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
    border-bottom: 1px solid #ddd;
    background-color: #eee;
  }

  .nav-item-subheader {
    margin-left: 16px;
    padding: 6px 0;
  }
}
.rNo {
  color: #333;
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
  width: calc(25% - 55px);
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
.nactive {
  color: #00965e !important;
  font-weight: 600;
}

.down-load-button {
  position: absolute;
  right: 5px;
  top: 40px;
  border: 1px solid #1976d2;
  padding: 6px 18px;
  display: inline-block;
  border-radius: 3px;
  background: #fff;
}
</style>