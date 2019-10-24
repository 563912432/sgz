<template>
  <div class="ZiChanFuZhaiBiao">
    <div class="title">
      <span>资产负债表</span>
      <div class="flex flex-justify-space-between font-13 normal mt-20">
        <span class="flex flex-align-center"><span class="w-96">编制单位:</span><el-input v-model="initData.danwei" size="mini" class="w-100p"></el-input></span>
        <span>
          填表日期:
          <el-input v-model="initData.year" size="mini" class="w-70" /> 年
          <el-input v-model="initData.month" size="mini" class="w-50" /> 月
          <el-input v-model="initData.day" size="mini" class="w-50" /> 日
        </span>
        <span class="flex flex-column">
          <span>会小企01表</span>
          <span>单位:元</span>
        </span>
      </div>
    </div>
    <div class="content">
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
        <div v-for="(item, index) in initData.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
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
    <div class="mt-15 text-left">
      <el-button type="primary" size="small" @click="saveAnswer">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZiChanFuZhaiBiao',
  data () {
    return {
      initData: {
        danwei: '',
        year: '',
        month: '',
        day: '',
        table: [
          { zi_chan_title: '流动资产：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '流动负债：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '货币资金', zi_chan_state: 0, zi_chan_hang: '1', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '短期借款', fu_zhai_state: 0, fu_zhai_hang: '68', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '短期投资', zi_chan_state: 0, zi_chan_hang: '2', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付票据', fu_zhai_state: 0, fu_zhai_hang: '69', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '应收票据', zi_chan_state: 0, zi_chan_hang: '3', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付账款', fu_zhai_state: 0, fu_zhai_hang: '70', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '应收股息', zi_chan_state: 0, zi_chan_hang: '4', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付工资', fu_zhai_state: 0, fu_zhai_hang: '72', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '应收账款', zi_chan_state: 0, zi_chan_hang: '6', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付利息', fu_zhai_state: 0, fu_zhai_hang: '73', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '其他应收款', zi_chan_state: 0, zi_chan_hang: '7', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付利润', fu_zhai_state: 0, fu_zhai_hang: '74', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '存货', zi_chan_state: 0, zi_chan_hang: '10', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应交税金', fu_zhai_state: 0, fu_zhai_hang: '76', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '待摊费用', zi_chan_state: 0, zi_chan_hang: '11', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他应交款', fu_zhai_state: 0, fu_zhai_hang: '80', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '一年内到期的长期债券投资', zi_chan_state: 0, zi_chan_hang: '21', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他应付款', fu_zhai_state: 0, fu_zhai_hang: '81', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '其他流动资产', zi_chan_state: 0, zi_chan_hang: '24', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '预提费用', fu_zhai_state: 0, fu_zhai_hang: '82', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '流动资产合计', zi_chan_state: 0, zi_chan_hang: '31', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '一年内到期的长期负债', fu_zhai_state: 0, fu_zhai_hang: '86', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '长期投资：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他流动负债', fu_zhai_state: 0, fu_zhai_hang: '90', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '长期股权投资', zi_chan_state: 0, zi_chan_hang: '32', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '流动负债合计', fu_zhai_state: 0, fu_zhai_hang: '100', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '长期债券投资', zi_chan_state: 0, zi_chan_hang: '34', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期负债：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '长期投资合计', zi_chan_state: 0, zi_chan_hang: '38', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期借款', fu_zhai_state: 0, fu_zhai_hang: '101', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '固定资产：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期应付款', fu_zhai_state: 0, fu_zhai_hang: '103', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '固定资产原价', zi_chan_state: 0, zi_chan_hang: '39', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他长期负债', fu_zhai_state: 0, fu_zhai_hang: '106', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '减：累计折旧', zi_chan_state: 0, zi_chan_hang: '40', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '', fu_zhai_state: 0, fu_zhai_hang: '108', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '固定资产净值', zi_chan_state: 0, zi_chan_hang: '40', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期负债合计', fu_zhai_state: 0, fu_zhai_hang: '110', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '工程物资', zi_chan_state: 0, zi_chan_hang: '44', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '', fu_zhai_state: 0, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '在建工程', zi_chan_state: 0, zi_chan_hang: '45', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '负债合计', fu_zhai_state: 0, fu_zhai_hang: '114', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '固定资产清理', zi_chan_state: 0, zi_chan_hang: '46', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '所有者权益(或股东权益)：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '固定资产合计', zi_chan_state: 0, zi_chan_hang: '50', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '实收资本', fu_zhai_state: 0, fu_zhai_hang: '115', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '无形资产及其他资产：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '资本公积', fu_zhai_state: 0, fu_zhai_hang: '120', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '无形资产', zi_chan_state: 0, zi_chan_hang: '51', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '盈余公积', fu_zhai_state: 0, fu_zhai_hang: '121', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '长期待摊费用', zi_chan_state: 0, zi_chan_hang: '52', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其中：法定公积金', fu_zhai_state: 0, fu_zhai_hang: '122', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '其他长期资产', zi_chan_state: 0, zi_chan_hang: '53', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '未分配利润', fu_zhai_state: 0, fu_zhai_hang: '123', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '非流动资产合计', zi_chan_state: 0, zi_chan_hang: '60', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '所有者权益(或股东权益)合计', fu_zhai_state: 0, fu_zhai_hang: '124', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
          { zi_chan_title: '资产总计', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '负债和所有者权益(或股东权益)总计：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' }
        ]
      },
      active: 0
    }
  },
  props: {
    ziChanFuZhaiBiaoAnswer: {
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
      if (JSON.stringify(this.ziChanFuZhaiBiaoAnswer) !== '{}') {
        this.initData = this.ziChanFuZhaiBiaoAnswer
      } else {
        this.initData = {
          danwei: '',
          year: '',
          month: '',
          day: '',
          table: [
            { zi_chan_title: '流动资产：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '流动负债：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '货币资金', zi_chan_state: 0, zi_chan_hang: '1', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '短期借款', fu_zhai_state: 0, fu_zhai_hang: '68', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '短期投资', zi_chan_state: 0, zi_chan_hang: '2', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付票据', fu_zhai_state: 0, fu_zhai_hang: '69', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '应收票据', zi_chan_state: 0, zi_chan_hang: '3', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付账款', fu_zhai_state: 0, fu_zhai_hang: '70', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '应收股息', zi_chan_state: 0, zi_chan_hang: '4', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付工资', fu_zhai_state: 0, fu_zhai_hang: '72', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '应收账款', zi_chan_state: 0, zi_chan_hang: '6', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付利息', fu_zhai_state: 0, fu_zhai_hang: '73', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '其他应收款', zi_chan_state: 0, zi_chan_hang: '7', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应付利润', fu_zhai_state: 0, fu_zhai_hang: '74', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '存货', zi_chan_state: 0, zi_chan_hang: '10', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '应交税金', fu_zhai_state: 0, fu_zhai_hang: '76', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '待摊费用', zi_chan_state: 0, zi_chan_hang: '11', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他应交款', fu_zhai_state: 0, fu_zhai_hang: '80', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '一年内到期的长期债券投资', zi_chan_state: 0, zi_chan_hang: '21', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他应付款', fu_zhai_state: 0, fu_zhai_hang: '81', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '其他流动资产', zi_chan_state: 0, zi_chan_hang: '24', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '预提费用', fu_zhai_state: 0, fu_zhai_hang: '82', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '流动资产合计', zi_chan_state: 0, zi_chan_hang: '31', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '一年内到期的长期负债', fu_zhai_state: 0, fu_zhai_hang: '86', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '长期投资：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他流动负债', fu_zhai_state: 0, fu_zhai_hang: '90', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '长期股权投资', zi_chan_state: 0, zi_chan_hang: '32', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '流动负债合计', fu_zhai_state: 0, fu_zhai_hang: '100', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '长期债券投资', zi_chan_state: 0, zi_chan_hang: '34', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期负债：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '长期投资合计', zi_chan_state: 0, zi_chan_hang: '38', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期借款', fu_zhai_state: 0, fu_zhai_hang: '101', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '固定资产：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期应付款', fu_zhai_state: 0, fu_zhai_hang: '103', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '固定资产原价', zi_chan_state: 0, zi_chan_hang: '39', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其他长期负债', fu_zhai_state: 0, fu_zhai_hang: '106', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '减：累计折旧', zi_chan_state: 0, zi_chan_hang: '40', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '', fu_zhai_state: 0, fu_zhai_hang: '108', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '固定资产净值', zi_chan_state: 0, zi_chan_hang: '40', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '长期负债合计', fu_zhai_state: 0, fu_zhai_hang: '110', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '工程物资', zi_chan_state: 0, zi_chan_hang: '44', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '', fu_zhai_state: 0, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '在建工程', zi_chan_state: 0, zi_chan_hang: '45', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '负债合计', fu_zhai_state: 0, fu_zhai_hang: '114', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '固定资产清理', zi_chan_state: 0, zi_chan_hang: '46', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '所有者权益(或股东权益)：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '固定资产合计', zi_chan_state: 0, zi_chan_hang: '50', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '实收资本', fu_zhai_state: 0, fu_zhai_hang: '115', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '无形资产及其他资产：', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '资本公积', fu_zhai_state: 0, fu_zhai_hang: '120', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '无形资产', zi_chan_state: 0, zi_chan_hang: '51', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '盈余公积', fu_zhai_state: 0, fu_zhai_hang: '121', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '长期待摊费用', zi_chan_state: 0, zi_chan_hang: '52', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '其中：法定公积金', fu_zhai_state: 0, fu_zhai_hang: '122', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '其他长期资产', zi_chan_state: 0, zi_chan_hang: '53', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '未分配利润', fu_zhai_state: 0, fu_zhai_hang: '123', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '非流动资产合计', zi_chan_state: 0, zi_chan_hang: '60', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '所有者权益(或股东权益)合计', fu_zhai_state: 0, fu_zhai_hang: '124', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' },
            { zi_chan_title: '资产总计', zi_chan_state: 1, zi_chan_hang: '', zi_chan_nian_chu: '', zi_chan_qi_mo: '', fu_zhai_title: '负债和所有者权益(或股东权益)总计：', fu_zhai_state: 1, fu_zhai_hang: '', fu_zhai_nian_chu: '', fu_zhai_qi_mo: '' }
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
    // 保存资产负债表答案
    saveAnswer () {
      this.$store.commit('SAVE_ZI_CHAN_FU_ZHAI_ANSWER', this.initData)
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
  .ZiChanFuZhaiBiao{
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
        height: 50px;
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
