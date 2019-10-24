<template>
  <div class="keMuHuiZongBiao">
    <div class="title">
      <div>科目汇总表</div>
      <div class="font-13 mt-15">
        <el-input v-model="initData.ke_mu_from_year" size="mini" class="w-60" /> 年
        <el-input v-model="initData.ke_mu_from_month" size="mini" class="w-50" type="text" maxlength="2" /> 月
        <el-input v-model="initData.ke_mu_from_day" size="mini" class="w-50" type="text" maxlength="2" /> 日至
        <el-input v-model="initData.ke_mu_to_month" size="mini" class="w-50" type="text" maxlength="2" /> 月
        <el-input v-model="initData.ke_mu_to_day" size="mini" class="w-50" type="text" maxlength="2" /> 日
      </div>
      <div class="page font-12">
        <div>记账凭证号码 <el-input v-model="initData.ji_zhang_number" size="mini" class="w-160"></el-input></div>
        <div style="margin-top: 5px">
          第 <el-input v-model="initData.ji_zhang_from" size="mini" class="w-50" /> 号至
          <el-input v-model="initData.ji_zhang_to" size="mini" class="w-50" /> 号共
          <el-input v-model="initData.ji_zhang_sum" size="mini" class="w-50" /> 张
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
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <!--会计科目-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.zi_chan_subject" type="text" size="small"/>
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.zi_chan_jie_money" type="text" size="small"/>
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.zi_chan_dai_money" type="text" size="small"/>
          </div>
          <!--会计科目-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.fu_zhai_subject" type="text" size="small"/>
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.fu_zhai_jie_money" type="text" size="small"/>
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
            <el-input v-model="item.fu_zhai_dai_money" type="text" size="small"/>
          </div>
          <!--增行按钮-->
          <div v-show="index + 1 === active" class="add-line-icon-div">
            <i class="el-icon-circle-plus-outline add-line-icon" @click="addLine"></i>
          </div>
          <!--减少按钮-->
          <div v-show="index + 1 === active" class="remove-line-icon-div">
            <i class="el-icon-remove-outline remove-line-icon" @click="removeLine(index)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-justify-space-between mt-15 font-13">
      <span class="flex flex-align-center">制表：<el-input v-model="initData.zhi_biao" class="w-160" type="text" size="mini"/></span>
      <span class="flex flex-align-center">复核：<el-input v-model="initData.fu_he" class="w-160" type="text" size="mini"/></span>
      <span class="flex flex-align-center">记账：<el-input v-model="initData.ji_zhang" class="w-160" type="text" size="mini"/></span>
      <span class="flex flex-align-center">主管：<el-input v-model="initData.zhu_guan" class="w-160" type="text" size="mini"/></span>
    </div>
    <div class="mt-15 text-left">
      <el-button type="primary" size="small" @click="saveAnswer">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeMuHuiZongBiao',
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
  props: {
    keMuHuiZongBiaoAnswer: {
      type: Object,
      required: true,
      defaults: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (JSON.stringify(this.keMuHuiZongBiaoAnswer) === '{}') {
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
      } else {
        this.initData = this.keMuHuiZongBiaoAnswer
      }
    },
    // 增行
    addLine () {
      this.initData.table.push({ zi_chan_subject: '', zi_chan_jie_money: '', zi_chan_dai_money: '', fu_zhai_subject: '', fu_zhai_jie_money: '', fu_zhai_dai_money: '' })
    },
    // 删行
    removeLine (index) {
      if (this.initData.table[index].zi_chan_subject !== '' || this.initData.table[index].zi_chan_jie_money !== '' || this.initData.table[index].zi_chan_dai_money !== '' || this.initData.table[index].fu_zhai_subject !== '' || this.initData.table[index].fu_zhai_jie_money !== '' || this.initData.table[index].fu_zhai_dai_money !== '') {
        this.initData.table[index].zi_chan_subject = ''
        this.initData.table[index].zi_chan_jie_money = ''
        this.initData.table[index].zi_chan_dai_money = ''
        this.initData.table[index].fu_zhai_subject = ''
        this.initData.table[index].fu_zhai_jie_money = ''
        this.initData.table[index].fu_zhai_dai_money = ''
      } else if (this.initData.table.length >= 2) {
        this.initData.table.splice(index, 1)
      }
    },
    mouseoverLine (index) {
      this.active = index + 1
    },
    mouseLeaveLine () {
      this.active = 0
    },
    // 保存科目汇总表答案
    saveAnswer () {
      this.$store.commit('SAVE_KE_MU_HUI_ZONG_ANSWER', this.initData)
      this.$message.success('保存成功')
      console.log(this.$store.state.answer)
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
  .keMuHuiZongBiao{
    min-width: 1000px;
    width: 1000px;
    margin: 0 auto;
    color: #333333;
    padding: 20px;
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
