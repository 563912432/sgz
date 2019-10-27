<template>
  <div class="Parsekemuhuizong flex">
    <div v-if="leftShow" class="flex-1" style="overflow-x: auto">
      <div class="mb-12 flex flex-justify-space-between pl-10 pr-10">
        <span>
          <el-button plain size="small" @click="jiZhangMyAnswer">记账凭证</el-button>
          <el-button plain size="small" @click="tXingZhangMyAnswer">T型账</el-button>
        </span>
        <span>
          <el-button v-if="leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-right" circle @click="showLeft"></el-button>
          <el-button v-if="leftShow && !rightShow" type="primary" size="small" icon="el-icon-d-arrow-left" circle @click="rightShow = !rightShow"></el-button>
        </span>
      </div>
      <p class="mb-12">我的答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 1000px" class="bg-white">
        <div class="title">
          <div>科目汇总表</div>
          <div class="font-13 mt-15">
            <el-input v-model="myAnswer.ke_mu_from_year" readonly size="mini" class="w-60" /> 年
            <el-input v-model="myAnswer.ke_mu_from_month" readonly size="mini" class="w-50" type="text" maxlength="2" /> 月
            <el-input v-model="myAnswer.ke_mu_from_day" readonly size="mini" class="w-50" type="text" maxlength="2" /> 日至
            <el-input v-model="myAnswer.ke_mu_to_month" readonly size="mini" class="w-50" type="text" maxlength="2" /> 月
            <el-input v-model="myAnswer.ke_mu_to_day" readonly size="mini" class="w-50" type="text" maxlength="2" /> 日
          </div>
          <div class="page font-12">
            <div>记账凭证号码 <el-input v-model="myAnswer.ji_zhang_number" readonly size="mini" class="w-160"></el-input></div>
            <div style="margin-top: 5px">
              第 <el-input v-model="myAnswer.ji_zhang_from" readonly size="mini" class="w-50" /> 号至
              <el-input v-model="myAnswer.ji_zhang_to" readonly size="mini" class="w-50" /> 号共
              <el-input v-model="myAnswer.ji_zhang_sum" readonly size="mini" class="w-50" /> 张
            </div>
          </div>
        </div>
        <div class="content">
          <!--头-->
          <div class="content-header flex">
            <!--会计科目-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">会计科目</div>
            <!--借方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
            <!--贷方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">贷方金额</div>
            <!--会计科目-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">会计科目</div>
            <!--借方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
            <!--贷方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center">贷方金额</div>
          </div>
          <!--table-->
          <div class="content-table">
            <div v-for="(item, index) in myAnswer.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']">
              <!--会计科目-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_subject" readonly type="text" size="small"/>
              </div>
              <!--借方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_jie_money" readonly type="text" size="small"/>
              </div>
              <!--贷方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_dai_money" readonly type="text" size="small"/>
              </div>
              <!--会计科目-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.fu_zhai_subject" readonly type="text" size="small"/>
              </div>
              <!--借方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.fu_zhai_jie_money" readonly type="text" size="small"/>
              </div>
              <!--贷方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
                <el-input v-model="item.fu_zhai_dai_money" readonly type="text" size="small"/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-justify-space-between mt-15 font-13">
          <span class="flex flex-align-center">制表：<el-input v-model="myAnswer.zhi_biao" readonly class="w-160" type="text" size="mini"/></span>
          <span class="flex flex-align-center">复核：<el-input v-model="myAnswer.fu_he" readonly class="w-160" type="text" size="mini"/></span>
          <span class="flex flex-align-center">记账：<el-input v-model="myAnswer.ji_zhang" readonly class="w-160" type="text" size="mini"/></span>
          <span class="flex flex-align-center">主管：<el-input v-model="myAnswer.zhu_guan" readonly class="w-160" type="text" size="mini"/></span>
        </div>
      </div>
    </div>
    <div v-if="rightShow" class="flex-1 ml-10" style="overflow-x: auto">
      <div class="mb-12 flex flex-justify-space-between pl-10 pr-10">
        <span>
          <el-button plain size="small" @click="jiZhangRightAnswer">记账凭证</el-button>
          <el-button plain size="small" @click="tXingZhangRightAnswer">T型账</el-button>
        </span>
        <span>
          <el-button v-if="leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-left" circle @click="showRight"></el-button>
          <el-button v-if="!leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-right" circle @click="leftShow = !leftShow"></el-button>
        </span>
      </div>
      <p class="mb-12">正确答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 1000px" class="bg-white">
        <div class="title">
          <div>科目汇总表</div>
          <div class="font-13 mt-15">
            <el-input v-model="rightAnswer.ke_mu_from_year" readonly size="mini" class="w-60" /> 年
            <el-input v-model="rightAnswer.ke_mu_from_month" readonly size="mini" class="w-50" type="text" maxlength="2" /> 月
            <el-input v-model="rightAnswer.ke_mu_from_day" readonly size="mini" class="w-50" type="text" maxlength="2" /> 日至
            <el-input v-model="rightAnswer.ke_mu_to_month" readonly size="mini" class="w-50" type="text" maxlength="2" /> 月
            <el-input v-model="rightAnswer.ke_mu_to_day" readonly size="mini" class="w-50" type="text" maxlength="2" /> 日
          </div>
          <div class="page font-12">
            <div>记账凭证号码 <el-input v-model="rightAnswer.ji_zhang_number" readonly size="mini" class="w-160"></el-input></div>
            <div style="margin-top: 5px">
              第 <el-input v-model="rightAnswer.ji_zhang_from" readonly size="mini" class="w-50" /> 号至
              <el-input v-model="rightAnswer.ji_zhang_to" readonly size="mini" class="w-50" /> 号共
              <el-input v-model="rightAnswer.ji_zhang_sum" readonly size="mini" class="w-50" /> 张
            </div>
          </div>
        </div>
        <div class="content">
          <!--头-->
          <div class="content-header flex">
            <!--会计科目-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">会计科目</div>
            <!--借方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
            <!--贷方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">贷方金额</div>
            <!--会计科目-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">会计科目</div>
            <!--借方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
            <!--贷方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center">贷方金额</div>
          </div>
          <!--table-->
          <div class="content-table">
            <div v-for="(item, index) in rightAnswer.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']">
              <!--会计科目-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_subject" readonly type="text" size="small"/>
              </div>
              <!--借方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_jie_money" readonly type="text" size="small"/>
              </div>
              <!--贷方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_dai_money" readonly type="text" size="small"/>
              </div>
              <!--会计科目-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.fu_zhai_subject" readonly type="text" size="small"/>
              </div>
              <!--借方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.fu_zhai_jie_money" readonly type="text" size="small"/>
              </div>
              <!--贷方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
                <el-input v-model="item.fu_zhai_dai_money" readonly type="text" size="small"/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-justify-space-between mt-15 font-13">
          <span class="flex flex-align-center">制表：<el-input v-model="rightAnswer.zhi_biao" readonly class="w-160" type="text" size="mini"/></span>
          <span class="flex flex-align-center">复核：<el-input v-model="rightAnswer.fu_he" readonly class="w-160" type="text" size="mini"/></span>
          <span class="flex flex-align-center">记账：<el-input v-model="rightAnswer.ji_zhang" readonly class="w-160" type="text" size="mini"/></span>
          <span class="flex flex-align-center">主管：<el-input v-model="rightAnswer.zhu_guan" readonly class="w-160" type="text" size="mini"/></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Parsekemuhuizong',
  props: {
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
  },
  data () {
    return {
      active: 0,
      leftShow: true,
      rightShow: true
    }
  },
  methods: {
    showLeft () {
      this.rightShow = false
      this.leftShow = true
    },
    showRight () {
      this.rightShow = true
      this.leftShow = false
    },
    jiZhangMyAnswer () {
      this.$emit('clickJiZhangMyAnswer')
    },
    jiZhangRightAnswer () {
      this.$emit('clickJiZhangRightAnswer')
    },
    tXingZhangMyAnswer () {
      this.$emit('clickTXingZhangMyAnswer')
    },
    tXingZhangRightAnswer () {
      this.$emit('clickTXingZhangRightAnswer')
    }
  }
}
</script>
<style>
  .ml-5 {
    margin-left: 5px;
  }
  .pl-10{
    padding-left: 10px;
  }
  .pr-10{
    padding-right: 10px;
  }
  .w-50 {
    width: 50px;
  }
  .w-60 {
    width: 60px;
  }
  .w-70 {
    width: 70px;
  }
  .w-160 {
    width: 160px;
  }
  .h-36 {
    height: 36px;
  }
  .h-30 {
    height: 30px;
  }
  .line-height-30 {
    line-height: 30px;
  }
  .Parsekemuhuizong .content-header .el-input__inner{
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .Parsekemuhuizong .content-table .el-input__inner{
    padding: 0 5px;
    border: none;
    text-align: right;
    background-color: transparent;
  }
  .Parsekemuhuizong .content-table .center .el-input__inner{
    text-align: center;
  }
</style>
<style lang="scss" scoped>
.Parsekemuhuizong{
  position: relative;
  .title{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    position: relative;
    .page{
      position: absolute;
      right: 0;
      top: 12px;
    }
  }
  .content{
    margin-top: 15px;
    border-style: solid;
    border-color: #E8E8E8;
    border-width: 1px 1px 0 1px;
    .content-header{
      width: 100%;
      height: 65px;
      background: #F3F3F3;
      font-size: 13px;
    }
    .content-table {
      .bg-green{
        background-color: #E5F7D6;
      }
      .add-line-icon-div{
        position: absolute;
        height: 36px;
        line-height: 36px;
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
        height: 36px;
        line-height: 36px;
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
    }
  }
}
</style>
