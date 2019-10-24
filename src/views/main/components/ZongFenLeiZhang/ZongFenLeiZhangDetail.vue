<template>
  <div class="zongFenLeiZhangDetail">
    <div class="title">
      <span>总分类账</span>
      <span class="page font-12">
        分页：<el-input v-model="initData.page" size="mini" class="w-60"></el-input>
        总页：<el-input v-model="initData.pageAll" size="mini" class="w-60"></el-input>
      </span>
    </div>
    <div class="text-left mt-15 font-13 flex flex-align-center">
      <span>科目：</span><el-input v-model="initData.subject_name" size="mini" class="w-160"></el-input>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <!--年月日-->
        <div class="w-70 flex flex-column">
          <div class="h-30 line-height-30 border-right-bottom-grey flex flex-justify-space-between pl-10 pr-10">
            <el-input v-model="initData.year" size="mini" class="w-50" style="background-color: transparent"></el-input> <span>年</span>
          </div>
          <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">月</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">日</span></div>
        </div>
        <!--凭证字号-->
        <div class="w-70 flex flex-column">
          <div class="h-30 line-height-30 border-right-bottom-grey">凭证</div>
          <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">字</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">号</span></div>
        </div>
        <!--摘要-->
        <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">摘要</div>
        <!--选择-->
        <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">√</div>
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
      <div class="content-table">
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <div class="w-70 flex">
            <!--月-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
              <el-input v-model="item.year" type="text" maxlength="2" size="small" style="text-align: center"/>
            </div>
            <!--日-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
              <el-input v-model="item.day" type="text" maxlength="2" size="small"/>
            </div>
          </div>
          <div class="w-70 flex">
            <!--字-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
              <el-input v-model="item.zi" type="text" maxlength="1" size="small"/>
            </div>
            <!--号-->
            <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
              <el-input v-model="item.hao" type="text" maxlength="3" size="small"/>
            </div>
          </div>
          <!--摘要-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.zhai_yao" type="text" size="small"/>
          </div>
          <!--选择-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-checkbox v-model="item.state" :true-label="1" :false-label="0" size="medium "/>
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.jie_money" type="text" size="small"/>
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.dai_money" type="text" size="small"/>
          </div>
          <!--借或贷-->
          <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey center">
            <el-input v-model="item.jie_huo_dai" type="text" maxlength="3" size="small"/>
          </div>
          <!--余额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
            <el-input v-model="item.yu_e" type="text" maxlength="11" size="small"/>
          </div>
          <!--增行按钮-->
          <div v-show="index + 1 === active" class="add-line-icon-div">
            <i class="el-icon-circle-plus-outline add-line-icon" @click="addLine"></i>
          </div>
          <!--减少按钮-->
          <div v-show="index + 1 === active" class="remove-line-icon-div">
            <i class="el-icon-remove-outline remove-line-icon" @click="removeLine"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-15 text-left">
      <el-button type="primary" size="small" @click="saveChildAnswer">保存</el-button>
      <el-button size="small" plain @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZongFenLeiZhangDetail',
  data () {
    return {
      initData: {
        page: '',
        pageAll: '',
        subject_name: '',
        year: '',
        table: [
          { month: '', day: '', zi: '', hao: '', zhai_yao: '', state: 0, jie_money: '', dai_money: '', jie_huo_dai: '', yu_e: '' }
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
    answer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  created () {
    // 初始数据
    if (this.answer[this.subjectIndex] && this.answer[this.subjectIndex].info && this.answer[this.subjectIndex].info.length !== 0) {
      this.initData = this.answer[this.subjectIndex].info
    } else {
      this.initData = {
        page: '',
        pageAll: '',
        subject_name: '',
        year: '',
        table: [
          { month: '', day: '', zi: '', hao: '', zhai_yao: '', state: 0, jie_money: '', dai_money: '', jie_huo_dai: '', yu_e: '' }
        ]
      }
    }
  },
  methods: {
    // 增行
    addLine () {
      this.initData.table.push({ month: '', day: '', zi: '', hao: '', zhai_yao: '', state: 0, jie_money: '', dai_money: '', jie_huo_dai: '', yu_e: '' })
    },
    // 删行
    removeLine () {
      if (this.initData.table.length >= 4) {
        this.initData.table.splice(this.initData.table.length - 1, 1)
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
    saveChildAnswer () {
      const answer = this.$store.state.answer['zongFenLeiZhang']['answer']
      answer[this.subjectIndex]['info'] = this.initData
      this.$store.commit('SAVE_ZONG_FEN_LEI_ZHANG_ANSWER', answer)
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
  .zongFenLeiZhangDetail{
    /*min-width: 900px;*/
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
