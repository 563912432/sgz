<template>
  <div class="referSanLanMingXiZhangDetail">
    <div class="title">
      <span>明细账</span>
      <span class="page font-12">
        分页: <span class="w-60 dis-inline normal">{{ initData.page }}</span>
        总页:<span class="w-60 dis-inline normal">{{ initData.pageSum }}</span>
      </span>
    </div>
    <div class="text-left mt-15 font-13 flex flex-align-center">
      <span class="w-50 text-center">{{ initData.number_one }}</span><span class="ml-5 bold">级科目</span><span class="w-160 ml-5 dis-inline text-center">{{ initData.subject_one }}</span>
      <span class="w-50 ml-20 text-center">{{ initData.number_two }}</span><span class="ml-5 bold">级科目</span><span  class="w-160 ml-5 dis-inline text-center">{{ initData.subject_two }}</span>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <!--年月日-->
        <div class="w-70 flex flex-column">
          <div class="h-30 line-height-30 border-right-bottom-grey flex flex-justify-space-between pl-10 pr-10">
            <span class="w-50 dis-inline text-center">{{ initData.year }}</span><span>年</span>
          </div>
          <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">月</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">日</span></div>
        </div>
        <!--凭证字号-->
        <div class="w-70 flex flex-column">
          <div class="h-30 line-height-30 border-right-bottom-grey text-center">凭证</div>
          <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">字</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">号</span></div>
        </div>
        <!--摘要-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">摘要</div>
        <!--选择-->
        <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">选择</div>
        <!--借方金额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
        <!--贷方金额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">贷方金额</div>
        <!--借或贷-->
        <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">借或贷</div>
        <!--余额-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">余额</div>
      </div>
      <!--table-->
      <div class="content-table font-12">
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']">
          <div class="w-70 flex">
            <!--月-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">{{ item.month }}</div>
            <!--日-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">{{ item.day }}</div>
          </div>
          <div class="w-70 flex">
            <!--字-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">{{ item.zi }}</div>
            <!--号-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center"> {{ item.hao }}</div>
          </div>
          <!--摘要-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">{{ item.zhai_yao }}</div>
          <!--选择-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-checkbox v-model="item.state" :true-label="1" :false-label="0" size="medium" disabled/>
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">{{ item.jie_money }}</div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">{{ item.dai_money }}</div>
          <!--借或贷-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey center">{{ item.jie_huo_dai }}</div>
          <!--余额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">{{ item.yu_e }}</div>
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
  name: 'ReferSanLanMingXiZhangDetail',
  data () {
    return {
      initData: {
        page: '',
        pageSum: '',
        number_one: '',
        number_two: '',
        subject_one: '',
        subject_two: '',
        year: '',
        table: [
        ]
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
    index: {
      type: Number,
      required: true,
      defaults: 0
    }
  },
  created () {
    // 初始数据
    const answer = this.$store.state['answer']['minXiZhang'][this.index]['answer']
    if (answer[this.subjectIndex] && answer[this.subjectIndex].info && answer[this.subjectIndex].info.length !== 0) {
      this.initData = answer[this.subjectIndex].info
    } else {
      this.initData = {
        page: '',
        pageSum: '',
        number_one: '',
        number_two: '',
        subject_one: '',
        subject_two: '',
        year: '',
        table: [
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$emit('toggleClick')
    }
  }
}
</script>
<style>
  .dis-inline{
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
.referSanLanMingXiZhangDetail{
  /*min-width: 900px;*/
  width: 100%;
  color: #333333;
  padding: 20px 0;
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
