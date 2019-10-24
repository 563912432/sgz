<template>
  <div class="referkeMuHuiZong">
    <div class="header flex flex-justify-space-between">
      <div class="flex-1 flex flex-align-center">
        <span class="icon-span"></span>
        <span class="ml-10">科目汇总表</span>
      </div>
      <div class="w-20 flex flex-align-center"><i class="el-icon-circle-close col-9 cursor-pointer" @click="click"></i></div>
    </div>
    <div class="title mt-15">
      <div>科目汇总表</div>
      <div class="font-13 mt-15">
        <span class="w-50 normal">{{ initData.ke_mu_from_year }}</span> 年
        <span class="w-50 normal">{{ initData.ke_mu_from_month }}</span> 月
        <span class="w-50 normal">{{ initData.ke_mu_from_day }}</span> 日至
        <span class="w-50 normal">{{ initData.ke_mu_to_month }}</span> 月
        <span class="w-50 normal">{{ initData.ke_mu_to_day }}</span> 日
      </div>
      <div class="page font-12">
        <div>记账凭证号码 <span class="w-160 dis-inline text-left normal">{{ initData.ji_zhang_number }}</span></div>
        <div style="margin-top: 5px">
          第 <span class="w-50 dis-inline text-center normal">{{ initData.ji_zhang_from }}</span> 号至
          <span class="w-50 dis-inline text-center normal">{{ initData.ji_zhang_to }}</span> 号共
          <span class="w-50 dis-inline text-center normal">{{ initData.ji_zhang_sum }}</span> 张
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
      <div class="content-table font-12 col-6">
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <!--会计科目-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            {{ item.zi_chan_subject }}
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            {{ item.zi_chan_jie_money }}
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            {{ item.zi_chan_dai_money }}
          </div>
          <!--会计科目-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            {{ item.fu_zhai_subject }}
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            {{ item.fu_zhai_jie_money }}
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
            {{ item.fu_zhai_dai_money }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-justify-space-between mt-15 font-13">
      <span class="flex flex-align-center">制表：<span class="">{{ initData.zhi_biao }}</span></span>
      <span class="flex flex-align-center">复核：<span class="">{{ initData.fu_he }}</span></span>
      <span class="flex flex-align-center">记账：<span class="">{{ initData.ji_zhang }}</span></span>
      <span class="flex flex-align-center">主管：<span class="">{{ initData.zhu_guan }}</span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReferkeMuHuiZong',
  data () {
    return {
      initData: {
        ke_mu_from_year: '',
        ke_mu_from_month: '',
        ke_mu_from_day: '',
        ke_mu_to_month: '',
        ke_mu_to_day: '',
        ji_zhang_number: '',
        ji_zhang_from: '',
        ji_zhang_to: '',
        ji_zhang_sum: '',
        table: [
          { zi_chan_subject: '', zi_chan_jie_money: '', zi_chan_dai_money: '', fu_zhai_subject: '', fu_zhai_jie_money: '', fu_zhai_dai_money: '' }
        ],
        zhi_biao: '',
        fu_he: '',
        ji_zhang: '',
        zhu_guan: ''
      },
      active: 0
    }
  },
  created () {
    const answer = this.$store.state['answer']['keMuHuiZong']
    if (answer.ke_mu_from_year) {
      this.initData = answer
    } else {
      this.initData = {
        ke_mu_from_year: '',
        ke_mu_from_month: '',
        ke_mu_from_day: '',
        ke_mu_to_month: '',
        ke_mu_to_day: '',
        ji_zhang_number: '',
        ji_zhang_from: '',
        ji_zhang_to: '',
        ji_zhang_sum: '',
        table: [
          { zi_chan_subject: '', zi_chan_jie_money: '', zi_chan_dai_money: '', fu_zhai_subject: '', fu_zhai_jie_money: '', fu_zhai_dai_money: '' }
        ],
        zhi_biao: '',
        fu_he: '',
        ji_zhang: '',
        zhu_guan: ''
      }
    }
  },
  methods: {
    click () {
      this.$emit('toggleClick')
    },
    mouseoverLine (index) {
      this.active = index + 1
    },
    mouseLeaveLine () {
      this.active = 0
    },
    goBack () {
      this.$emit('toggleClick')
    }
  }
}
</script>
<style>
  .dis-inline {
    display: inline-block;
  }
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
  .content-header .el-input__inner{
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .content-table .el-input__inner{
    padding: 0 5px;
    border: none;
    text-align: right;
    background-color: transparent;
  }
  .content-table .center .el-input__inner{
    text-align: center;
  }
</style>
<style lang="scss" scoped>
  .referkeMuHuiZong{
    min-width: 730px;
    width: 100%;
    color: #333333;
    padding: 20px;
    .header{
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #EBEBEB;
    }
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
