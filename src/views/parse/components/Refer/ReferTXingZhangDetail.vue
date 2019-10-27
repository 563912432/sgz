<template>
  <div class="ParseReferTXingZhangDetail">
    <div class="title-p flex flex-align-center">
      <span class="icon-span"></span>
      <span class="ml-10">T型账 - 账目详情</span>
    </div>
    <div class="title">
      {{ initData.title }}
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <!--凭证号-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">凭证号</div>
        <!--借方金额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
        <!--凭证号-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">凭证号</div>
        <!--贷方金额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">贷方金额</div>
      </div>
      <!--table-->
      <div class="content-table">
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <!--凭证号-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey font-12">
            {{ item.jie_ping_zheng }}
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey font-12">
            {{ item.jie_money }}
          </div>
          <!--凭证号-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey font-12">
            {{ item.dai_ping_zheng }}
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey font-12">
            {{ item.dai_money }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-15 text-left">
      <el-button size="small" plain @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParseReferTXingZhangDetail',
  data () {
    return {
      initData: {
        title: '',
        table: [
          { jie_ping_zheng: '', jie_money: '', dai_ping_zheng: '', dai_money: '' }
        ],
        jie_fa_sheng_e: '',
        dai_fa_sheng_e: '',
        qi_mo_yu_e: ''
      },
      active: 0
    }
  },
  props: {
    subjectIndex: {
      type: Number,
      required: true,
      defaults: 0
    },
    type: {
      type: Number,
      required: true,
      defaults: 1
    }
  },
  created () {
    // 初始数据
    let answer = {}
    if (this.type === 1) {
      answer = this.$store.state['record']['TXingZhang']['answer']
    } else {
      answer = this.$store.state['answer']['TXingZhang']['answer']
    }
    if (answer[this.subjectIndex] && answer[this.subjectIndex].info && answer[this.subjectIndex].info.length !== 0) {
      this.initData = answer[this.subjectIndex].info
    } else {
      this.initData = {
        title: '',
        table: [{ jie_ping_zheng: '', jie_money: '', dai_ping_zheng: '', dai_money: '' }],
        jie_fa_sheng_e: '',
        dai_fa_sheng_e: '',
        qi_mo_yu_e: ''
      }
    }
  },
  methods: {
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
.ParseReferTXingZhangDetail{
  /*min-width: 900px;*/
  width: 100%;
  color: #333333;
  padding: 20px;
  .title-p{
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #EBEBEB;
    text-align: center;
    letter-spacing: 1px;
    position: relative;
    margin-bottom: 15px;
  }
  .title{
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    position: relative;
  }
  .content{
    margin-top: 15px;
    border-style: solid;
    border-color: #E8E8E8;
    border-width: 1px 1px 0 1px;
    .content-header{
      width: 100%;
      height: 50px;
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
