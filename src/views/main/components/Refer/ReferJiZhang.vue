<template>
  <div class="referJiZhang flex flex-column">
    <div class="title flex flex-justify-space-between">
      <div class="flex-1 flex flex-align-center">
        <span class="icon-span"></span>
        <span class="ml-10">记账凭证</span>
      </div>
      <div class="w-20 flex flex-align-center"><i class="el-icon-circle-close col-9 cursor-pointer" @click="click"></i></div>
    </div>
    <div class="filter h-50 flex flex-align-center flex-justify-space-between">
      <div class="flex flex-align-center">
        <span class="font-12">业务：</span>
        <el-select v-model="yeWuIndex" placeholder="请选择" size="mini">
          <el-option v-for="(item, index) in initData['business']" :key="index" :label="item['abstract']" :value="index"></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" size="small" @click="prevTi">上一题</el-button>
        <el-button type="primary" size="small" @click="nextTi">下一题</el-button>
      </div>
    </div>
    <!--凭证内容-->
    <div class="content flex-1 flex flex-column">
      <div class="tool flex flex-align-center flex-justify-space-between">
        <div class="flex flex-align-center">
          <span>凭证字：</span>
          <el-select v-model="tableAnswer.zi" placeholder="请选择" class="w-106" size="small" disabled>
            <el-option label="记" value="记"></el-option>
          </el-select>
          <el-input-number v-model="tableAnswer.number" size="small" class="w-106 ml-10" disabled controls-position="right" :min="1" :max="10" />
        </div>
        <div class="flex flex-align-center">
          <span class="ml-10">日期：</span>
          <el-date-picker
            v-model="tableAnswer.date"
            size="small"
            style="width: 150px"
            type="date"
            disabled
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="flex flex-align-center">
          <span>附单据：</span>
          <el-input-number v-model="tableAnswer.danJu" disabled size="small" class="w-106" controls-position="right" :min="0" :max="10" />
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
        <div v-for="(item, index) in tableAnswer.table" :key="index" class="table-line">
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
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_yi }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_qian_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_bai_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_shi_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_qian }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_bai }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_shi }}</div>
            <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_yuan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_jiao }}</div>
            <div class="w-20 border-right-black flex flex-justify-center flex-align-center">{{ tableAnswer.sum_jie_fen }}</div>
          </div>
          <!--贷总-->
          <div class="position-relative flex font-13 col-3">
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_yi }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_qian_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_bai_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_shi_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_qian }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_bai }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_shi }}</div>
            <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_yuan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_jiao }}</div>
            <div class="w-20 flex flex-justify-center flex-align-center">{{ tableAnswer.sum_dai_fen }}</div>
          </div>
        </div>
      </div>
      <div class="font-13 mt-15 flex flex-justify-space-between flex-align-center">
        <span><span>会计主管：</span><el-input v-model="tableAnswer.zhuguan" disabled size="small" class="w-96"></el-input></span>
        <span><span class="ml-20">记账：</span><el-input v-model="tableAnswer.jizhang" disabled size="small" class="w-96"></el-input></span>
        <span><span class="ml-20">出纳：</span><el-input v-model="tableAnswer.chuna" disabled size="small" class="w-96"></el-input></span>
        <span><span class="ml-20">复核：</span><el-input v-model="tableAnswer.fuhe" disabled size="small" class="w-96"></el-input></span>
        <span><span class="ml-20">制单：</span><el-input v-model="tableAnswer.zhidan" disabled size="small" class="w-96"></el-input></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReferJiZhang',
  data () {
    return {
      initData: [],
      yeWuIndex: 0,
      tableAnswer: {
        zi: '记',
        number: 0,
        date: '',
        danJu: 0,
        table: [
          { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '' }
        ],
        sum_jie: '',
        sum_dai: '',
        zhuguan: '',
        jizhang: '',
        chuna: '',
        fuhe: '',
        zhidan: ''
      }
    }
  },
  computed: {
    jiZhangAnswer () {
      return this.$store.state.answer['pingZheng']
    }
  },
  watch: {
    yeWuIndex (value) {
      this.initAnswer()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 业务
      this.initData = this.$store.state.companyInfo
      this.initAnswer()
    },
    initAnswer () {
      // 答案
      if (this.jiZhangAnswer[this.yeWuIndex]) {
        this.tableAnswer = this.jiZhangAnswer[this.yeWuIndex]
      } else {
        this.tableAnswer = {
          zi: '记',
          number: 0,
          date: '',
          danJu: 0,
          table: [
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '' },
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '' },
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '' },
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '' }
          ],
          sum_jie: '',
          sum_dai: '',
          zhuguan: '',
          jizhang: '',
          chuna: '',
          fuhe: '',
          zhidan: ''
        }
      }
    },
    click () {
      this.$emit('toggleClick')
    },
    prevTi () {
      if (this.yeWuIndex > 0) {
        this.yeWuIndex--
      }
    },
    nextTi () {
      if (this.yeWuIndex < this.initData['business'].length - 1) {
        this.yeWuIndex++
      }
    }
  }
}
</script>

<style>
  .referJiZhang .el-input.is-disabled .el-input__inner{
    background-color: transparent;
    border-color: #E4E7ED;
    color: #C0C4CC;
  }
  .referJiZhang .table .el-input.is-disabled .el-input__inner{
    background-color: transparent;
    border: none;
    /*border-color: #E4E7ED;*/
    /*color: #C0C4CC;*/
  }
</style>
<style lang="scss" scoped>
.referJiZhang{
  min-width: 850px;
  width: 100%;
  color: #333333;
  padding: 20px;
  .title{
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #EBEBEB;
  }
  .filter{
    border-bottom: 1px solid #EBEBEB;
  }
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
</style>
