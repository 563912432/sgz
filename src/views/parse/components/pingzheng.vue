<template>
  <div class="certificate">
    <el-container style="height: 100%;">
      <el-container class="flex flex-column">
        <el-header>
          <div class="business">
            <div class="font-14">业务说明</div>
            <div class="font-13" style="padding-top: 2px;height: 40px;overflow-y: auto">{{ business['content'] }}</div>
          </div>
        </el-header>
        <el-main class="flex-1 flex flex-column">
          <p>我的答案：</p>
          <div class="my-answer flex-1">
            <!--凭证内容-->
            <div class="content flex-1 flex flex-column">
              <div class="tool flex flex-align-center flex-justify-space-between">
                <div class="flex flex-align-center">
                  <span>凭证字：</span>
                  <el-select v-model="myAnswer.zi" placeholder="请选择" class="w-106" size="small" disabled>
                    <el-option label="记" value="记"></el-option>
                  </el-select>
                  <el-input-number v-model="myAnswer.number" size="small" class="w-106 ml-10" disabled controls-position="right" :min="1" :max="10" />
                </div>
                <div class="flex flex-align-center">
                  <span class="ml-10">日期：</span>
                  <el-date-picker
                    v-model="myAnswer.date"
                    size="small"
                    style="width: 150px"
                    type="date"
                    disabled
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="flex flex-align-center">
                  <span>附单据：</span>
                  <el-input-number v-model="myAnswer.danJu" disabled size="small" class="w-106" controls-position="right" :min="0" :max="10" />
                  <span class="ml-10">张</span>
                </div>
              </div>
              <div class="table flex flex-column">
                <div class="flex">
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black text-center">摘要</div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black text-center">总账科目</div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black text-center">明细科目</div>
                  <div class="flex flex-column h-50">
                    <div class="flex-1 font-13 col-3 bold border-right-bottom-black flex flex-justify-center flex-align-center">借方金额</div>
                    <div class="flex-1 flex border-bottom-black">
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">亿</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">万</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-red flex flex-justify-center flex-align-center">元</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">角</div>
                      <div class="w-20 font-12 col-6 bold border-right-black flex flex-justify-center flex-align-center">分</div>
                    </div>
                  </div>
                  <div class="flex flex-column h-50">
                    <div class="flex-1 font-13 col-3 bold border-bottom-black flex flex-justify-center flex-align-center">贷方金额</div>
                    <div class="flex-1 flex border-bottom-black">
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">亿</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">万</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-red flex flex-justify-center flex-align-center">元</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">角</div>
                      <div class="w-20 font-12 col-6 bold flex flex-justify-center flex-align-center">分</div>
                    </div>
                  </div>
                </div>
                <div v-for="(item, index) in myAnswer.table" :key="index" class="table-line">
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black">
                    <el-input v-model="item.zhaiyao" size="large" disabled></el-input>
                  </div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black">
                    <el-input v-model="item.zongzhang" size="large" disabled></el-input>
                    <!--            <el-autocomplete-->
                    <!--              class="inline-input"-->
                    <!--              v-model="item.zongzhang"-->
                    <!--              :fetch-suggestions="querySearch"-->
                    <!--            />-->
                  </div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black">
                    <el-input v-model="item.mingxi" size="large" disabled></el-input>
                    <!--            <el-autocomplete-->
                    <!--              class="inline-input"-->
                    <!--              v-model="item.mingxi"-->
                    <!--              :fetch-suggestions="querySearch"-->
                    <!--            />-->
                  </div>
                  <div class="position-relative flex">
                    <!--借方金额-亿-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_yi }}</div>
                    <!--借方金额-千万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_qian_wan }}</div>
                    <!--借方金额-百万-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_bai_wan }}</div>
                    <!--借方金额-十万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_shi_wan }}</div>
                    <!--借方金额-万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_wan }}</div>
                    <!--借方金额-千-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_qian }}</div>
                    <!--借方金额-百-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_bai }}</div>
                    <!--借方金额-十-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_shi }}</div>
                    <!--借方金额-元-->
                    <div class="w-20 border-right-red border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_yuan }}</div>
                    <!--借方金额-角-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_jiao }}</div>
                    <!--借方金额-分-->
                    <div class="w-20 border-right-black border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_fen }}</div>
                  </div>
                  <!--贷-->
                  <div class="position-relative flex font-13 col-3">
                    <!--贷方金额-亿-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_yi }}</div>
                    <!--贷方金额-千万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_qian_wan }}</div>
                    <!--贷方金额-百万-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_bai_wan }}</div>
                    <!--贷方金额-十万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_shi_wan }}</div>
                    <!--贷方金额-万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_wan }}</div>
                    <!--贷方金额-千-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_qian }}</div>
                    <!--贷方金额-百-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_bai }}</div>
                    <!--贷方金额-十-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_shi }}</div>
                    <!--贷方金额-元-->
                    <div class="w-20 border-right-red border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_yuan }}</div>
                    <!--贷方金额-角-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_jiao }}</div>
                    <!--贷方金额-分-->
                    <div class="w-20 border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_fen }}</div>
                  </div>
                </div>
                <div class="sum-div flex">
                  <div class="flex-1 line-50 border-right-black text-center">总计</div>
                  <!--借总-->
                  <div class="position-relative flex font-13 col-3">
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_yi }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_qian_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_bai_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_shi_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_qian }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_bai }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_shi }}</div>
                    <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_yuan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_jiao }}</div>
                    <div class="w-20 border-right-black flex flex-justify-center flex-align-center">{{ myAnswer.sum_jie_fen }}</div>
                  </div>
                  <!--贷总-->
                  <div class="position-relative flex font-13 col-3">
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_yi }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_qian_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_bai_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_shi_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_qian }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_bai }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_shi }}</div>
                    <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_yuan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_jiao }}</div>
                    <div class="w-20 flex flex-justify-center flex-align-center">{{ myAnswer.sum_dai_fen }}</div>
                  </div>
                </div>
              </div>
              <div class="font-13 mt-15 flex flex-justify-space-between flex-align-center">
                <span><span>会计主管：</span><el-input v-model="myAnswer.zhuguan" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">记账：</span><el-input v-model="myAnswer.jizhang" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">出纳：</span><el-input v-model="myAnswer.chuna" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">复核：</span><el-input v-model="myAnswer.fuhe" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">制单：</span><el-input v-model="myAnswer.zhidan" disabled size="small" class="w-96"></el-input></span>
              </div>
            </div>
          </div>
          <p>正确答案：</p>
          <div class="answer flex-1">
            <!--凭证内容-->
            <div class="content flex-1 flex flex-column">
              <div class="tool flex flex-align-center flex-justify-space-between">
                <div class="flex flex-align-center">
                  <span>凭证字：</span>
                  <el-select v-model="rightAnswer.zi" placeholder="请选择" class="w-106" size="small" disabled>
                    <el-option label="记" value="记"></el-option>
                  </el-select>
                  <el-input-number v-model="rightAnswer.number" size="small" class="w-106 ml-10" disabled controls-position="right" :min="1" :max="10" />
                </div>
                <div class="flex flex-align-center">
                  <span class="ml-10">日期：</span>
                  <el-date-picker
                    v-model="rightAnswer.date"
                    size="small"
                    style="width: 150px"
                    type="date"
                    disabled
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="flex flex-align-center">
                  <span>附单据：</span>
                  <el-input-number v-model="rightAnswer.danJu" disabled size="small" class="w-106" controls-position="right" :min="0" :max="10" />
                  <span class="ml-10">张</span>
                </div>
              </div>
              <div class="table flex flex-column">
                <div class="flex">
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black text-center">摘要</div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black text-center">总账科目</div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black text-center">明细科目</div>
                  <div class="flex flex-column h-50">
                    <div class="flex-1 font-13 col-3 bold border-right-bottom-black flex flex-justify-center flex-align-center">借方金额</div>
                    <div class="flex-1 flex border-bottom-black">
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">亿</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">万</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-red flex flex-justify-center flex-align-center">元</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">角</div>
                      <div class="w-20 font-12 col-6 bold border-right-black flex flex-justify-center flex-align-center">分</div>
                    </div>
                  </div>
                  <div class="flex flex-column h-50">
                    <div class="flex-1 font-13 col-3 bold border-bottom-black flex flex-justify-center flex-align-center">贷方金额</div>
                    <div class="flex-1 flex border-bottom-black">
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">亿</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">万</div>
                      <div class="w-20 font-12 col-6 bold border-right-blue flex flex-justify-center flex-align-center">千</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">百</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">十</div>
                      <div class="w-20 font-12 col-6 bold border-right-red flex flex-justify-center flex-align-center">元</div>
                      <div class="w-20 font-12 col-6 bold border-right-grey flex flex-justify-center flex-align-center">角</div>
                      <div class="w-20 font-12 col-6 bold flex flex-justify-center flex-align-center">分</div>
                    </div>
                  </div>
                </div>
                <div v-for="(item, index) in rightAnswer.table" :key="index" class="table-line">
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black">
                    <el-input v-model="item.zhaiyao" size="large" disabled></el-input>
                  </div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black">
                    <el-input v-model="item.zongzhang" size="large" disabled></el-input>
                    <!--            <el-autocomplete-->
                    <!--              class="inline-input"-->
                    <!--              v-model="item.zongzhang"-->
                    <!--              :fetch-suggestions="querySearch"-->
                    <!--            />-->
                  </div>
                  <div class="flex-1 h-50 line-50 font-13 bold border-right-bottom-black">
                    <el-input v-model="item.mingxi" size="large" disabled></el-input>
                    <!--            <el-autocomplete-->
                    <!--              class="inline-input"-->
                    <!--              v-model="item.mingxi"-->
                    <!--              :fetch-suggestions="querySearch"-->
                    <!--            />-->
                  </div>
                  <div class="position-relative flex">
                    <!--借方金额-亿-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_yi }}</div>
                    <!--借方金额-千万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_qian_wan }}</div>
                    <!--借方金额-百万-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_bai_wan }}</div>
                    <!--借方金额-十万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_shi_wan }}</div>
                    <!--借方金额-万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_wan }}</div>
                    <!--借方金额-千-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_qian }}</div>
                    <!--借方金额-百-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_bai }}</div>
                    <!--借方金额-十-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_shi }}</div>
                    <!--借方金额-元-->
                    <div class="w-20 border-right-red border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_yuan }}</div>
                    <!--借方金额-角-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_jiao }}</div>
                    <!--借方金额-分-->
                    <div class="w-20 border-right-black border-bottom-black flex flex-justify-center flex-align-center">{{ item.jie_fen }}</div>
                  </div>
                  <!--贷-->
                  <div class="position-relative flex font-13 col-3">
                    <!--贷方金额-亿-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_yi }}</div>
                    <!--贷方金额-千万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_qian_wan }}</div>
                    <!--贷方金额-百万-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_bai_wan }}</div>
                    <!--贷方金额-十万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_shi_wan }}</div>
                    <!--贷方金额-万-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_wan }}</div>
                    <!--贷方金额-千-->
                    <div class="w-20 border-right-blue border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_qian }}</div>
                    <!--贷方金额-百-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_bai }}</div>
                    <!--贷方金额-十-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_shi }}</div>
                    <!--贷方金额-元-->
                    <div class="w-20 border-right-red border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_yuan }}</div>
                    <!--贷方金额-角-->
                    <div class="w-20 border-right-grey border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_jiao }}</div>
                    <!--贷方金额-分-->
                    <div class="w-20 border-bottom-black flex flex-justify-center flex-align-center">{{ item.dai_fen }}</div>
                  </div>
                </div>
                <div class="sum-div flex">
                  <div class="flex-1 line-50 border-right-black text-center">总计</div>
                  <!--借总-->
                  <div class="position-relative flex font-13 col-3">
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_yi }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_qian_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_bai_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_shi_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_qian }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_bai }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_shi }}</div>
                    <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_yuan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_jiao }}</div>
                    <div class="w-20 border-right-black flex flex-justify-center flex-align-center">{{ rightAnswer.sum_jie_fen }}</div>
                  </div>
                  <!--贷总-->
                  <div class="position-relative flex font-13 col-3">
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_yi }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_qian_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_bai_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_shi_wan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_wan }}</div>
                    <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_qian }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_bai }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_shi }}</div>
                    <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_yuan }}</div>
                    <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_jiao }}</div>
                    <div class="w-20 flex flex-justify-center flex-align-center">{{ rightAnswer.sum_dai_fen }}</div>
                  </div>
                </div>
              </div>
              <div class="font-13 mt-15 flex flex-justify-space-between flex-align-center">
                <span><span>会计主管：</span><el-input v-model="rightAnswer.zhuguan" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">记账：</span><el-input v-model="rightAnswer.jizhang" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">出纳：</span><el-input v-model="rightAnswer.chuna" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">复核：</span><el-input v-model="rightAnswer.fuhe" disabled size="small" class="w-96"></el-input></span>
                <span><span class="ml-20">制单：</span><el-input v-model="rightAnswer.zhidan" disabled size="small" class="w-96"></el-input></span>
              </div>
            </div>
          </div>
          <div class="h-30 bg-white" style="padding: 10px">
            <div class="font-13">文字解析：{{ business['text_parse'] }}</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ParsePingzheng',
  props: {
    business: {
      type: Object,
      required: true,
      defaults: {}
    },
    myAnswer: {
      type: Object,
      required: true,
      defaults: {}
    },
    rightAnswer: {
      type: Object,
      required: true,
      defaults: {}
    }
  }
}
</script>

<style>
  .certificate .answer .el-input.is-disabled .el-input__inner,
  .certificate .my-answer .el-input.is-disabled .el-input__inner{
    background-color: transparent;
    border-color: #E4E7ED;
    color: #C0C4CC;
  }
  .certificate .answer .table .el-input.is-disabled .el-input__inner,
  .certificate .my-answer .table .el-input.is-disabled .el-input__inner{
    background-color: transparent;
    border: none;
    /*border-color: #E4E7ED;*/
    /*color: #C0C4CC;*/
  }
</style>
<style lang="scss" scoped>
  .certificate{
    height: calc(100vh - 120px);
    min-width: 1000px;
    overflow-x: auto;
    .business{
      padding: 5px 20px;
      width: 100%;
      height: 68px;
      background-color: #ffffff;
      border-left: 4px solid #3A81D6;
    }
    .el-header{
      padding: 0;
      height: 70px !important;
      color: #333;
      border: 1px solid #E8E8E8;
    }

    .el-aside {
      padding: 15px;
      background-color: #ffffff;
      color: #333;
      p {
        margin-top: 0;
        font-weight: 600;
      }
      .data-list{
        margin-top: 10px;
        width: 100%;
        height: 105px;
        background-color: #f2f2f2;
        cursor: pointer;
      }
    }
    .el-main {
      padding: 0;
      color: #333;
      p{
        font-size: 14px;
        line-height: 30px;
        padding-left: 5px;
      }
      .my-answer,.answer{
        /*height: 320px;*/
        border: 1px solid #E8E8E8;
        background-color: #ffffff;
      }
      .my-answer,.answer {
        padding: 10px;
        .content{
          margin: 15px 10px;
          .tool{
            font-size: 14px;
          }
          .table{
            width: 100%;
            margin-top: 15px;
            border: solid 1px #999999;
            position: relative;
            .bg-green{
              background-color: #E5F7D6;
            }
            .table-line{
              position: relative;
              display: flex;
              cursor: default;
            }
            .add-line-icon-div{
              position: absolute;
              height: 50px;
              line-height: 50px;
              width: 30px;
              left: -30px;
              text-align: center;
              top: 0;
            }
            .add-line-icon{
              font-size: 20px;
              color: #6DC3EA;
              cursor: pointer;
            }
            .remove-line-icon-div{
              position: absolute;
              height: 50px;
              line-height: 50px;
              text-align: center;
              width: 30px;
              right: -30px;
              top: 0;
            }
            .remove-line-icon{
              font-size: 20px;
              color: #F74C23;
              cursor: pointer;
            }
            .table-item-input-div{
              position: absolute;
              left: 0;
              top: 0;
              height: 50px;
              line-height: 50px;
              width: 100%;
            }
            .table-item-input-div-dai{
              position: absolute;
              left: 220px;
              top: 0;
              height: 50px;
              line-height: 50px;
              width: 100%;
            }
            .sum-div{
              width: 100%;
              height: 50px;
              position: relative;
              .border-grey{
                border-left: solid 1px #E1E1E1;
              }
              .border-blue{
                border-left: solid 1px #B1DDF6;
              }
              .border-red{
                border-left: solid 1px #F2D0D0;
              }
              .border-black{
                border-left: solid 1px #999999;
              }
              .jie_sum{
                position: absolute;
                right: 220px;
                width: 220px;
                height: 50px;
                line-height: 50px;
                background-color: transparent;
                font-size: 13px;
                letter-spacing: 12.6px;
                padding-left: 8px;
              }
              .dai_sum{
                position: absolute;
                right: 0;
                width: 220px;
                height: 50px;
                line-height: 50px;
                background-color: transparent;
                font-size: 13px;
                letter-spacing: 12.6px;
                padding-left: 8px;
              }
            }
          }
        }
      }
    }
  }
</style>
