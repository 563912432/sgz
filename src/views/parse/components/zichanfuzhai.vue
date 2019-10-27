<template>
  <div class="Parsezichanfuzhai flex">
    <div v-if="leftShow" class="flex-1" style="overflow-x: auto">
      <div class="mb-12 flex flex-justify-space-between pl-10 pr-10">
        <span>
          <el-button plain size="small" @click="qiChuMyAnswer">期初余额</el-button>
          <el-button plain size="small" @click="mingXiMyAnswer">明细分类账</el-button>
          <el-button plain size="small" @click="zongFenLeiMyAnswer">总分类账</el-button>
        </span>
        <span>
          <el-button v-if="leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-right" circle @click="showLeft"></el-button>
          <el-button v-if="leftShow && !rightShow" type="primary" size="small" icon="el-icon-d-arrow-left" circle @click="rightShow = !rightShow"></el-button>
        </span>
      </div>
      <p class="mb-12">我的答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 850px;overflow-y: auto" class="bg-white">
        <div class="title">
          <span>资产负债表</span>
          <div class="flex flex-justify-space-between font-13 normal mt-20">
            <span class="flex flex-align-center"><span class="w-96">编制单位:</span><el-input v-model="myAnswer.danwei" size="mini" class="w-100p"></el-input></span>
            <span>
          填表日期:
          <el-input v-model="myAnswer.year" size="mini" class="w-70" /> 年
          <el-input v-model="myAnswer.month" size="mini" class="w-50" /> 月
          <el-input v-model="myAnswer.day" size="mini" class="w-50" /> 日
        </span>
            <span class="flex flex-column">
          <span>会小企01表</span>
          <span>单位:元</span>
        </span>
          </div>
        </div>
        <div class="content bg-white">
          <!--头-->
          <div class="content-header flex">
            <!--资产-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">资产</div>
            <!--行次-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">行次</div>
            <!--年初数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">年初数</div>
            <!--期末数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">期末数</div>
            <!--负债和所有者权益-->
            <div class="flex-1 flex flex-column flex-align-center flex-justify-center border-right-bottom-grey">
              <div>负债和所有者权益</div>
              <div>
                (或股东权益)
              </div>
            </div>
            <!--行次-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">行次</div>
            <!--年初数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">年初数</div>
            <!--期末数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">期末数</div>
          </div>
          <!--table-->
          <div class="content-table font-12 col-3">
            <div v-for="(item, index) in myAnswer.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']">
              <!--资产-->
              <div class="flex-1 flex flex-align-center border-right-bottom-grey" :class="item.zi_chan_state?'bg-grey': ''">
                <span :class="item.zi_chan_state?'ml-5':'ml-20'">{{ item.zi_chan_title }}</span>
              </div>
              <!--行次-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
                {{ item.zi_chan_hang }}
              </div>
              <!--年初数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_nian_chu" type="text" size="small"/>
              </div>
              <!--期末数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_qi_mo" type="text" size="small"/>
              </div>
              <!--负债-->
              <div class="flex-1 flex flex-align-center border-right-bottom-grey" :class="item.fu_zhai_state?'bg-grey': ''">
                <span :class="item.fu_zhai_state?'ml-5':'ml-20'">{{ item.fu_zhai_title }}</span>
              </div>
              <!--行次-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
                {{ item.fu_zhai_hang }}
              </div>
              <!--年初数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.fu_zhai_nian_chu" type="text" size="small"/>
              </div>
              <!--期末数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
                <el-input v-model="item.fu_zhai_qi_mo" type="text" size="small"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rightShow" class="flex-1 ml-10" style="overflow-x: auto">
      <div class="mb-12 flex flex-justify-space-between pl-10 pr-10">
        <span>
          <el-button plain size="small" @click="qiChuMyAnswer">期初余额</el-button>
          <el-button plain size="small" @click="mingXiRightAnswer">明细分类账</el-button>
          <el-button plain size="small" @click="zongFenLeiRightAnswer">总分类账</el-button>
        </span>
        <span>
          <el-button v-if="leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-left" circle @click="showRight"></el-button>
          <el-button v-if="!leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-right" circle @click="leftShow = !leftShow"></el-button>
        </span>
      </div>
      <p class="mb-12">正确答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width:850px;overflow-y: auto" class="bg-white">
        <div class="title">
          <span>资产负债表</span>
          <div class="flex flex-justify-space-between font-13 normal mt-20">
            <span class="flex flex-align-center"><span class="w-96">编制单位:</span><el-input v-model="rightAnswer.danwei" size="mini" class="w-100p"></el-input></span>
            <span>
          填表日期:
          <el-input v-model="rightAnswer.year" size="mini" class="w-70" /> 年
          <el-input v-model="rightAnswer.month" size="mini" class="w-50" /> 月
          <el-input v-model="rightAnswer.day" size="mini" class="w-50" /> 日
        </span>
            <span class="flex flex-column">
          <span>会小企01表</span>
          <span>单位:元</span>
        </span>
          </div>
        </div>
        <div class="content bg-white">
          <!--头-->
          <div class="content-header flex">
            <!--资产-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">资产</div>
            <!--行次-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">行次</div>
            <!--年初数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">年初数</div>
            <!--期末数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">期末数</div>
            <!--负债和所有者权益-->
            <div class="flex-1 flex flex-column flex-align-center flex-justify-center border-right-bottom-grey">
              <div>负债和所有者权益</div>
              <div>
                (或股东权益)
              </div>
            </div>
            <!--行次-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">行次</div>
            <!--年初数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">年初数</div>
            <!--期末数-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">期末数</div>
          </div>
          <!--table-->
          <div class="content-table font-12 col-3">
            <div v-for="(item, index) in rightAnswer.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']">
              <!--资产-->
              <div class="flex-1 flex flex-align-center border-right-bottom-grey" :class="item.zi_chan_state?'bg-grey': ''">
                <span :class="item.zi_chan_state?'ml-5':'ml-20'">{{ item.zi_chan_title }}</span>
              </div>
              <!--行次-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
                {{ item.zi_chan_hang }}
              </div>
              <!--年初数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_nian_chu" type="text" size="small"/>
              </div>
              <!--期末数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zi_chan_qi_mo" type="text" size="small"/>
              </div>
              <!--负债-->
              <div class="flex-1 flex flex-align-center border-right-bottom-grey" :class="item.fu_zhai_state?'bg-grey': ''">
                <span :class="item.fu_zhai_state?'ml-5':'ml-20'">{{ item.fu_zhai_title }}</span>
              </div>
              <!--行次-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
                {{ item.fu_zhai_hang }}
              </div>
              <!--年初数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.fu_zhai_nian_chu" type="text" size="small"/>
              </div>
              <!--期末数-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
                <el-input v-model="item.fu_zhai_qi_mo" type="text" size="small"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Parsezichanfuzhai',
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
    qiChuMyAnswer () {
      this.$emit('clickQiChuMyAnswer')
    },
    mingXiMyAnswer () {
      this.$emit('clickMingXiMyAnswer')
    },
    mingXiRightAnswer () {
      this.$emit('clickMingXiRightAnswer')
    },
    zongFenLeiMyAnswer () {
      this.$emit('clickZongFenLeiMyAnswer')
    },
    zongFenLeiRightAnswer () {
      this.$emit('clickZongFenLeiRightAnswer')
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
  .Parsezichanfuzhai .content-header .el-input__inner{
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .Parsezichanfuzhai .content-table .el-input__inner{
    padding: 0 5px;
    border: none;
    text-align: right;
    background-color: transparent;
  }
  .Parsezichanfuzhai .content-table .center .el-input__inner{
    text-align: center;
  }
</style>
<style lang="scss" scoped>
.Parsezichanfuzhai{
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
