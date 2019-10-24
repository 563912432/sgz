<template>
  <div class="tXingZhangDetail">
    <div class="title">
      <el-input v-model="initData.title" size="mini" class="w-160"></el-input>
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
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.jie_ping_zheng" type="text" size="small"/>
          </div>
          <!--借方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.jie_money" type="text" size="small"/>
          </div>
          <!--凭证号-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
            <el-input v-model="item.dai_ping_zheng" type="text" size="small"/>
          </div>
          <!--贷方金额-->
          <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
            <el-input v-model="item.dai_money" type="text" size="small"/>
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
    <div class="mt-15 text-left">
      <el-button type="primary" size="small" @click="saveChildAnswer">保存</el-button>
      <el-button size="small" plain @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TXingZhangDetail',
  data () {
    return {
      initData: {
        title: '',
        table: [
          { jie_ping_zheng: '', jie_money: '', dai_ping_zheng: '', dai_money: '' },
          { jie_ping_zheng: '', jie_money: '', dai_ping_zheng: '', dai_money: '' },
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
        title: '',
        table: [
          { jie_ping_zheng: '', jie_money: '', dai_ping_zheng: '', dai_money: '' }
        ],
        jie_fa_sheng_e: '',
        dai_fa_sheng_e: '',
        qi_mo_yu_e: ''
      }
    }
  },
  methods: {
    // 增行
    addLine () {
      this.initData.table.push({ jie_ping_zheng: '', jie_money: '', dai_ping_zheng: '', dai_money: '' })
    },
    // 删行
    removeLine (index) {
      if (this.initData.table[index].jie_ping_zheng !== '' || this.initData.table[index].jie_money !== '' || this.initData.table[index].dai_ping_zheng !== '' || this.initData.table[index].dai_money !== '') {
        this.initData.table[index].jie_ping_zheng = ''
        this.initData.table[index].jie_money = ''
        this.initData.table[index].dai_ping_zheng = ''
        this.initData.table[index].dai_money = ''
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
    goBack () {
      this.$emit('toggleClick')
    },
    saveChildAnswer () {
      const answer = this.$store.state.answer['TXingZhang']['answer']
      answer[this.subjectIndex]['info'] = this.initData
      this.$store.commit('SAVE_T_XING_ZHANG_ANSWER', answer)
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
.tXingZhangDetail{
  /*min-width: 900px;*/
  width: 1000px;
  color: #333333;
  padding: 20px;
  margin: 0 auto;
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
