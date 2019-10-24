<template>
  <div class="LiRunBiao">
    <div class="title">
      <span>利润表</span>
      <div class="flex flex-justify-space-between font-13 normal mt-20">
        <span class="flex flex-align-center"><span class="w-96">编制单位:</span><el-input v-model="initData.danwei" size="mini" class="w-100p"></el-input></span>
        <span>
          填表日期:
          <el-input v-model="initData.year" size="mini" class="w-70" /> 年
          <el-input v-model="initData.month" size="mini" class="w-50" /> 月
          <el-input v-model="initData.day" size="mini" class="w-50" /> 日
        </span>
        <span>单位:元</span>
      </div>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <!--项目-->
        <div class="flex-2 flex flex-align-center flex-justify-center border-right-bottom-grey">项目</div>
        <!--行次-->
        <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">行次</div>
        <!--本期累计金额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">本期累计金额</div>
        <!--本月金额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">本月金额</div>
      </div>
      <!--table-->
      <div class="content-table font-12 col-3">
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <!--项目-->
          <div class="flex-2 flex flex-align-center border-right-bottom-grey">
            <span :class="item.state === 1?'ml-5': item.state === 2?'ml-25': item.state === 3?'ml-45':'ml-80'">{{ item.xiang_mu }}</span>
          </div>
          <!--行次-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
            {{ item.hang }}
          </div>
          <!--本期累计金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.lei_ji_jin_e" type="text" size="small"/>
          </div>
          <!--本月金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
            <el-input v-model="item.ben_yue_jin_e" type="text" size="small"/>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-15 text-left">
      <el-button type="primary" size="small" @click="saveAnswer">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiRunBiao',
  data () {
    return {
      initData: {},
      active: 0
    }
  },
  props: {
    liRunBiaoAnswer: {
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
      if (JSON.stringify(this.liRunBiaoAnswer) !== '{}') {
        this.initData = this.liRunBiaoAnswer
      } else {
        this.initData = {
          danwei: '',
          year: '',
          month: '',
          day: '',
          table: [
            { xiang_mu: '一、营业收入', state: 1, hang: '1', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '减：营业成本', state: 2, hang: '2', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '税金及附加', state: 3, hang: '3', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '其中：消费税', state: 3, hang: '4', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '城市维护建设税', state: 4, hang: '5', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '资源税', state: 4, hang: '6', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '土地增值税', state: 4, hang: '7', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '城镇土地使用税、房产税、车船税、印花税', state: 4, hang: '8', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '教育费附加、矿产资源、排污费', state: 4, hang: '9', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '', state: 4, hang: '10', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '销售费用', state: 3, hang: '11', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '其中：商品维修费', state: 3, hang: '12', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '广告费和业务宣传费', state: 4, hang: '13', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '管理费用', state: 3, hang: '14', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '其中：开办费', state: 3, hang: '15', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '业务招待费', state: 4, hang: '16', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '研究费用', state: 4, hang: '17', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '财务费用', state: 3, hang: '18', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '其中：利息费用（收入以“-”号填列）', state: 4, hang: '19', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '加：投资收益（损失以“-”号填列）', state: 3, hang: '20', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '二、营业利润（损失以“-”号填列）', state: 1, hang: '21', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '加：营业外收入', state: 2, hang: '22', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '其中：政府补助', state: 3, hang: '23', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '减：营业外支出', state: 2, hang: '24', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '其中：坏账损失', state: 3, hang: '25', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '无法收回的长期证券投资损失', state: 4, hang: '26', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '无法收回的长期股权投资损失', state: 4, hang: '27', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '自然灾害等不可抗力因素造成的损失', state: 4, hang: '28', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '税收滞纳金', state: 4, hang: '29', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '三、利润总额（亏损总额一“-”号填列）', state: 1, hang: '30', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '减：所得税费用', state: 2, hang: '31', lei_ji_jin_e: '', ben_yue_jin_e: '' },
            { xiang_mu: '四、净利润（净亏损以“-”号填列）', state: 1, hang: '32', lei_ji_jin_e: '', ben_yue_jin_e: '' }
          ]
        }
      }
    },
    mouseoverLine (index) {
      this.active = index + 1
    },
    mouseLeaveLine () {
      this.active = 0
    },
    goBack () {
      this.$emit('toggleClick')
    },
    // 保存利润表答案
    saveAnswer () {
      this.$store.commit('SAVE_LI_RUN_ANSWER', this.initData)
      this.$message.success('保存成功')
      console.log(this.$store.state.answer)
    }
  }
}
</script>
<style>
  .pl-10{
    padding-left: 10px;
  }
  .pr-10{
    padding-right: 10px;
  }
  .ml-5 {
    margin-left: 5px;
  }
  .ml-25 {
    margin-left: 25px;
  }
  .ml-45 {
    margin-left: 45px;
  }
  .ml-80 {
    margin-left: 80px;
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
  .bg-grey{
    background-color: #E8E8E8;
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
  .LiRunBiao{
    min-width: 1000px;
    width: 1000px;
    color: #333333;
    padding: 20px;
    margin: 0 auto;
    .title{
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 1px;
      position: relative;
      .page{
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
    .content{
      margin-top: 5px;
      border-style: solid;
      border-color: #E8E8E8;
      border-width: 1px 1px 0 1px;
      .content-header{
        width: 100%;
        height: 40px;
        background: #F3F3F3;
        font-size: 13px;
      }
      .content-table {
        text-align: left;
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
