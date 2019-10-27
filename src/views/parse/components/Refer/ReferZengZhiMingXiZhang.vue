<template>
  <div class="ReferZengZhiMingXiZhang">
    <div class="title">
      <span>应交税费 -- {{ title }}</span>
      <span class="page font-12">第 <span class="dis-inline w-60 normal">{{ initData.page }}</span> 页</span>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <!--年月日-->
        <div class="w-70 flex flex-column">
          <div class="h-30 line-height-30 border-right-bottom-grey flex flex-justify-space-between pl-10 pr-10">
            <span class="dis-inline w-50">{{ initData.year }}</span>
            <span>年</span>
          </div>
          <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">月</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">日</span></div>
        </div>
        <!--凭证字号-->
        <div class="w-70 flex flex-column">
          <div class="h-30 line-height-30 border-right-bottom-grey text-center">凭证</div>
          <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">字</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">号</span></div>
        </div>
        <!--摘要-->
        <div class="w-96 flex flex-align-center flex-justify-center border-right-bottom-grey">摘要</div>
        <!--选择-->
        <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">选择</div>
        <!--借方金额-->
        <div class="flex-1 flex flex-column border-right-bottom-grey">
          <div class="h-30 line-height-30 border-bottom-grey text-center">借方金额</div>
          <div class="flex-1 flex">
            <span class="flex-1 flex flex-align-center flex-justify-center border-right-grey">进项税额</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">已交税金</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">减免税额</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey font-12 text-center">出口抵减内销产品应纳税额</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey font-12 text-center">转出未交增值税</span>
            <span class="flex-1 flex flex-justify-center flex-align-center">合计</span>
          </div>
        </div>
        <!--贷方金额-->
        <div class="flex-1 flex flex-column border-right-bottom-grey">
          <div class="h-30 line-height-30 border-bottom-grey text-center">贷方金额</div>
          <div class="flex-1 flex">
            <span class="flex-1 flex flex-align-center flex-justify-center border-right-grey">销项税额</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">出口退税</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">进项额转出</span>
            <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">转出多交增值税</span>
            <span class="flex-1 flex flex-justify-center flex-align-center">合计</span>
          </div>
        </div>
        <!--借或贷-->
        <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">借或贷</div>
        <!--余额-->
        <div class="w-70 flex flex-align-center flex-justify-center border-bottom-grey">余额</div>
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
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">{{ item.hao }}</div>
          </div>
          <!--摘要-->
          <div class="w-96 flex flex-align-center flex-justify-center border-right-bottom-grey">{{ item.zhai_yao }}</div>
          <!--选择-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-checkbox v-model="item.state" :true-label="1" :false-label="0" size="medium" disabled/>
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-column border-right-bottom-grey">
            <div class="flex-1 flex">
              <span class="flex-1 flex flex-align-center flex-justify-center border-right-grey">{{ item.jie_jin_xiang }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">{{ item.jie_yi_jiao }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">{{ item.jie_jian_mian }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey font-12">{{ item.jie_chu_di }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey font-12">{{ item.jie_zhuan_wei }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center">{{ item.jie_he }}</span>
            </div>
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-column border-right-bottom-grey">
            <div class="flex-1 flex">
              <span class="flex-1 flex flex-align-center flex-justify-center border-right-grey">{{ item.dai_xiao_xiang }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey">{{ item.dai_chu_tui }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey font-12">{{ item.dai_jin_zhuan }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center border-right-grey font-12">{{ item.dai_zhuan_duo }}</span>
              <span class="flex-1 flex flex-justify-center flex-align-center">{{ item.dai_he }}</span>
            </div>
          </div>
          <!--借或贷-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey center">{{ item.jie_huo_dai }}</div>
          <!--余额-->
          <div class="w-70 flex flex-align-center flex-justify-center border-bottom-grey">{{ item.yu_e }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParseReferZengZhiMingXiZhang',
  data () {
    return {
      initData: {
        page: '',
        year: '',
        table: [
          { month: '', day: '', zi: '', hao: '', zhai_yao: '', state: 0, jie_jin_xiang: '', jie_yi_jiao: '', jie_jian_mian: '', jie_chu_di: '', jie_zhuan_wei: '', jie_he: '', dai_xiao_xiang: '', dai_chu_tui: '', dai_jin_zhuan: '', dai_zhuan_duo: '', dai_he: '', jie_huo_dai: '', yu_e: '' }
        ]
      },
      active: 0
    }
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    index: {
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
  watch: {
    index () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 初始数据
      let answer = {}
      if (this.type === 1) {
        answer = this.$store.state.record['minXiZhang'][this.index]
      } else {
        answer = this.$store.state.answer['minXiZhang'][this.index]
      }
      if (answer['answer']['table'].length > 0) {
        this.initData = answer['answer']
      } else {
        this.initData = {
          page: '',
          year: '',
          table: []
        }
      }
    }
  }
}
</script>
<style>
  .dis-inline{
    display: inline-block;
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
  .ReferZengZhiMingXiZhang{
    width: 100%;
    min-width: 1420px;
    color: #333333;
    padding: 20px 0;
    .title{
      font-size: 15px;
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
      margin-top: 35px;
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
