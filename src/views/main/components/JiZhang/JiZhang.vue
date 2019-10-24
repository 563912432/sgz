<template>
  <div class="jiZhang flex-1 flex flex-column">
<!--    <div class="title">记账凭证</div>-->
    <!--资料-->
    <div class="yewu-parent">
      <div class="yewu-title">{{ title }}</div>
      <div class="yewu-content">
        业务说明：{{ brief }}
      </div>
    </div>
    <div class="line"></div>
    <!--凭证-->
    <div class="content flex-1 flex flex-column">
      <div class="tool flex flex-align-center flex-justify-space-between">
        <div class="flex flex-align-center">
          <span>凭证字：</span>
          <el-select v-model="initData.zi" placeholder="请选择" class="w-106" size="small">
            <el-option label="记" value="记"></el-option>
          </el-select>
          <el-input-number v-model="initData.number" size="small" class="w-106 ml-10" controls-position="right" :min="1" :max="10" />
        </div>
        <div class="flex flex-align-center">
          <span class="ml-10">日期：</span>
          <el-date-picker
            format="yyyy-MM-dd"
            v-model="initData.date"
            size="small"
            style="width: 150px"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="flex flex-align-center">
          <span>附单据：</span>
          <el-input-number v-model="initData.danJu" size="small" class="w-106" controls-position="right" :min="0" :max="10" />
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
        <div v-for="(item, index) in initData.table" :key="index" :class="['table-line', index + 1 === active?'bg-green':'']" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <div class="flex-1 h-50 font-13 bold border-right-bottom-black">
            <el-input v-model="item.zhaiyao" size="large"></el-input>
          </div>
          <div class="flex-1 h-50 font-13 bold border-right-bottom-black">
            <el-autocomplete
              class="inline-input"
              v-model="item.zongzhang"
              :fetch-suggestions="querySearch"
            />
          </div>
          <div class="flex-1 h-50 font-13 bold border-right-bottom-black">
            <el-autocomplete
              class="inline-input"
              v-model="item.mingxi"
              :fetch-suggestions="querySearch"
            />
          </div>
          <!--借方金额-->
          <div class="position-relative flex col-3 font-13" @click="clickJieLine(index, item)">
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
            <div v-show="item.jie_show" class="table-item-input-div">
              <el-input v-model="item.jie_money" ref="jie_input" type="text" maxlength="12" size="large" @input="checkNumJie(index, item.jie_money)" @blur="inputBlurJie(index, item.jie_money)"></el-input>
            </div>
          </div>
          <!--贷-->
          <div class="position-relative flex font-13 col-3" @click="clickDaiLine(index, item)">
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
            <div v-show="item.dai_show" class="table-item-input-div-dai">
              <el-input v-model="item.dai_money" ref="dai_input" type="text" maxlength="11" size="large" @input="checkNumDai(index, item.dai_money)" @blur="inputBlurDai(index, item.dai_money)"></el-input>
            </div>
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
        <div class="sum-div flex">
          <div class="flex-1 line-50 border-right-black text-center">总计</div>
          <!--借总-->
          <div class="position-relative flex font-13 col-3" @click="clickJieSumLine">
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_yi }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_qian_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ initData.sum_jie_bai_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_shi_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ initData.sum_jie_qian }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_bai }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_shi }}</div>
            <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ initData.sum_jie_yuan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_jie_jiao }}</div>
            <div class="w-20 border-right-black flex flex-justify-center flex-align-center">{{ initData.sum_jie_fen }}</div>
            <div v-show="initData.jie_sum_show" class="jie_sum">
              <el-input v-model="initData.sum_jie" type="text" ref="input_jie_sum" maxlength="11" size="large" @input="checkNumJieSum" @blur="inputBlurJieSum(initData.sum_jie)"></el-input>
            </div>
          </div>
          <!--贷总-->
          <div class="position-relative flex font-13 col-3" @click="clickDaiSumLine">
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_yi }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_qian_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ initData.sum_dai_bai_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_shi_wan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_wan }}</div>
            <div class="w-20 border-right-blue flex flex-justify-center flex-align-center">{{ initData.sum_dai_qian }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_bai }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_shi }}</div>
            <div class="w-20 border-right-red flex flex-justify-center flex-align-center">{{ initData.sum_dai_yuan }}</div>
            <div class="w-20 border-right-grey flex flex-justify-center flex-align-center">{{ initData.sum_dai_jiao }}</div>
            <div class="w-20 flex flex-justify-center flex-align-center">{{ initData.sum_dai_fen }}</div>
            <div v-show="initData.dai_sum_show" class="dai_sum">
              <el-input v-model="initData.sum_dai" type="text" ref="input_dai_sum" maxlength="11" size="large" @input="checkNumDaiSum" @blur="inputBlurDaiSum(initData.sum_dai)"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="font-13 text-left mt-15">
        <span>会计主管：</span><el-input v-model="initData.zhuguan" size="small" class="w-96"></el-input>
        <span class="ml-20">记账：</span><el-input v-model="initData.jizhang" size="small" class="w-96"></el-input>
        <span class="ml-20">出纳：</span><el-input v-model="initData.chuna" size="small" class="w-96"></el-input>
        <span class="ml-20">复核：</span><el-input v-model="initData.fuhe" size="small" class="w-96"></el-input>
        <span class="ml-20">制单：</span><el-input v-model="initData.zhidan" size="small" class="w-96"></el-input>
      </div>
      <div class="mt-15 text-left">
        <el-button type="primary" size="small" @click="saveAnswer">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JiZhang',
  data () {
    return {
      restaurants: [],
      initData: {},
      active: 0
    }
  },
  mounted () {
    this.init()
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    brief: {
      type: String,
      required: true,
      default: ''
    },
    index: {
      type: Number,
      required: true,
      default: 0
    },
    pingZhengAnswer: {
      type: Object,
      required: true,
      defaults: {}
    }
  },
  watch: {
    index (value) {
      // this.initData.number = value + 1
      this.initAnswer()
    }
  },
  methods: {
    init () {
      // 取科目
      this.restaurants = this.$store.state.keMuInfo || JSON.parse(sessionStorage.getItem('sgz_info'))['keMuInfo']
      // 取答案
      this.initAnswer()
    },
    initAnswer () {
      if (JSON.stringify(this.pingZhengAnswer) === '{}') {
        this.initData = {
          zi: '记',
          number: 1,
          date: '',
          danJu: 0,
          table: [
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '', jie_show: false, dai_show: false, jie_yi: '', jie_qian_wan: '', jie_bai_wan: '', jie_shi_wan: '', jie_wan: '', jie_qian: '', jie_bai: '', jie_shi: '', jie_yuan: '', jie_jiao: '', jie_fen: '', dai_yi: '', dai_qian_wan: '', dai_bai_wan: '', dai_shi_wan: '', dai_wan: '', dai_qian: '', dai_bai: '', dai_shi: '', dai_yuan: '', dai_jiao: '', dai_fen: '' },
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '', jie_show: false, dai_show: false, jie_yi: '', jie_qian_wan: '', jie_bai_wan: '', jie_shi_wan: '', jie_wan: '', jie_qian: '', jie_bai: '', jie_shi: '', jie_yuan: '', jie_jiao: '', jie_fen: '', dai_yi: '', dai_qian_wan: '', dai_bai_wan: '', dai_shi_wan: '', dai_wan: '', dai_qian: '', dai_bai: '', dai_shi: '', dai_yuan: '', dai_jiao: '', dai_fen: '' },
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '', jie_show: false, dai_show: false, jie_yi: '', jie_qian_wan: '', jie_bai_wan: '', jie_shi_wan: '', jie_wan: '', jie_qian: '', jie_bai: '', jie_shi: '', jie_yuan: '', jie_jiao: '', jie_fen: '', dai_yi: '', dai_qian_wan: '', dai_bai_wan: '', dai_shi_wan: '', dai_wan: '', dai_qian: '', dai_bai: '', dai_shi: '', dai_yuan: '', dai_jiao: '', dai_fen: '' },
            { zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '', jie_show: false, dai_show: false, jie_yi: '', jie_qian_wan: '', jie_bai_wan: '', jie_shi_wan: '', jie_wan: '', jie_qian: '', jie_bai: '', jie_shi: '', jie_yuan: '', jie_jiao: '', jie_fen: '', dai_yi: '', dai_qian_wan: '', dai_bai_wan: '', dai_shi_wan: '', dai_wan: '', dai_qian: '', dai_bai: '', dai_shi: '', dai_yuan: '', dai_jiao: '', dai_fen: '' }
          ],
          sum_jie: '',
          jie_sum_show: false,
          dai_sum_show: false,
          sum_dai: '',
          zhuguan: '',
          sum_jie_yi: '',
          sum_jie_qian_wan: '',
          sum_jie_bai_wan: '',
          sum_jie_shi_wan: '',
          sum_jie_wan: '',
          sum_jie_qian: '',
          sum_jie_bai: '',
          sum_jie_shi: '',
          sum_jie_yuan: '',
          sum_jie_jiao: '',
          sum_jie_fen: '',
          sum_dai_yi: '',
          sum_dai_qian_wan: '',
          sum_dai_bai_wan: '',
          sum_dai_shi_wan: '',
          sum_dai_wan: '',
          sum_dai_qian: '',
          sum_dai_bai: '',
          sum_dai_shi: '',
          sum_dai_yuan: '',
          sum_dai_jiao: '',
          sum_dai_fen: '',
          jizhang: '',
          chuna: '',
          fuhe: '',
          zhidan: ''
        }
      } else {
        this.initData = this.pingZhengAnswer
      }
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    mouseoverLine (index) {
      this.active = index + 1
    },
    mouseLeaveLine () {
      this.active = 0
    },
    // 借方金额点击行
    clickJieLine (index, item) {
      item.jie_show = true
      this.$nextTick(() => {
        this.$refs.jie_input[index].focus()
      })
    },
    // 贷方金额点击行
    clickDaiLine (index, item) {
      item.dai_show = true
      this.$nextTick(() => {
        this.$refs.dai_input[index].focus()
      })
    },
    // 借方总金额点击行
    clickJieSumLine () {
      this.initData.jie_sum_show = true
      this.$nextTick(() => {
        this.$refs.input_jie_sum.focus()
      })
    },
    // 贷方总金额点击行
    clickDaiSumLine () {
      this.initData.dai_sum_show = true
      this.$nextTick(() => {
        this.$refs.input_dai_sum.focus()
      })
    },
    // 数字和两位小数【借】
    checkNumJie (index, value) {
      if (!/^\d+\.?\d{0,2}$/.test(value)) {
        this.initData.table[index].jie_money = this.initData.table[index].jie_money.substring(0, this.initData.table[index].jie_money.length - 1)
      }
    },
    // 数字和两位小数【贷】
    checkNumDai (index, value) {
      if (!/^\d+\.?\d{0,2}$/.test(value)) {
        this.initData.table[index].dai_money = this.initData.table[index].dai_money.substring(0, this.initData.table[index].dai_money.length - 1)
      }
    },
    // 数字和两位小数【借总】
    checkNumJieSum () {
      if (!/^\d+\.?\d{0,2}$/.test(this.initData.sum_jie)) {
        this.initData.sum_jie = this.initData.sum_jie.substring(0, this.initData.sum_jie.length - 1)
      }
    },
    // 数字和两位小数【贷总】
    checkNumDaiSum () {
      if (!/^\d+\.?\d{0,2}$/.test(this.initData.sum_dai)) {
        this.initData.sum_dai = this.initData.sum_dai.substring(0, this.initData.sum_dai.length - 1)
      }
    },
    // 借 input失去焦点【赋值给当前要显示的div；小数点的处理（不输入小数点最后一位就是分）】
    inputBlurJie (index, value) {
      this.handleAllShowToFalse()
      if (value) {
        if (value.indexOf('.') <= -1) {
          // 没有小数点
          if (value.length >= 12) {
            value = value.substring(1, value.length)
          }
          value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2, value.length)
          // 当前行重新赋值
          this.initData.table[index].jie_money = value
        }
        let data = value.split('.')
        // data[0] 整数部分 data[1] 小数部分 var resultStr = name.split('').reverse().join('');
        if (data[0] === '') {
          this.initData.table[index].jie_money = '0.' + data[1]
        }
        if (data[1] === '') {
          this.initData.table[index].jie_money = data[0] + '.00'
        }
        // 整数部分
        let integer = data[0].split('').reverse().join('')
        this.initData.table[index].jie_yuan = integer[0] === '0' ? '0' : integer[0]
        this.initData.table[index].jie_shi = integer[1]
        this.initData.table[index].jie_bai = integer[2]
        this.initData.table[index].jie_qian = integer[3]
        this.initData.table[index].jie_wan = integer[4]
        this.initData.table[index].jie_shi_wan = integer[5]
        this.initData.table[index].jie_bai_wan = integer[6]
        this.initData.table[index].jie_qian_wan = integer[7]
        this.initData.table[index].jie_yi = integer[8]
        // 小数部分
        this.initData.table[index].jie_jiao = data[1][0] ? data[1][0] : '0'
        this.initData.table[index].jie_fen = data[1][1] ? data[1][1] : '0'
        console.log(this.initData.table[index])
      } else {
        // 清空
        this.initData.table[index].jie_yuan = ''
        this.initData.table[index].jie_shi = ''
        this.initData.table[index].jie_bai = ''
        this.initData.table[index].jie_qian = ''
        this.initData.table[index].jie_wan = ''
        this.initData.table[index].jie_shi_wan = ''
        this.initData.table[index].jie_bai_wan = ''
        this.initData.table[index].jie_qian_wan = ''
        this.initData.table[index].jie_yi = ''
        this.initData.table[index].jie_jiao = ''
        this.initData.table[index].jie_fen = ''
      }
    },
    // 贷 input失去焦点【赋值给当前要显示的div；小数点的处理（不输入小数点最后一位就是分）】
    inputBlurDai (index, value) {
      this.handleAllShowToFalse()
      if (value) {
        if (value.indexOf('.') <= -1) {
          // 没有小数点
          if (value.length >= 12) {
            value = value.substring(1, value.length)
          }
          value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2, value.length)
          // 当前行重新赋值
          this.initData.table[index].dai_money = value
        }
        let data = value.split('.')
        // data[0] 整数部分 data[1] 小数部分 var resultStr = name.split('').reverse().join('');
        if (data[0] === '') {
          this.initData.table[index].dai_money = '0.' + data[1]
        }
        if (data[1] === '') {
          this.initData.table[index].dai_money = data[0] + '.00'
        }
        // 整数部分
        let integer = data[0].split('').reverse().join('')
        this.initData.table[index].dai_yuan = integer[0]
        this.initData.table[index].dai_shi = integer[1]
        this.initData.table[index].dai_bai = integer[2]
        this.initData.table[index].dai_qian = integer[3]
        this.initData.table[index].dai_wan = integer[4]
        this.initData.table[index].dai_shi_wan = integer[5]
        this.initData.table[index].dai_bai_wan = integer[6]
        this.initData.table[index].dai_qian_wan = integer[7]
        this.initData.table[index].dai_yi = integer[8]
        // 小数部分
        this.initData.table[index].dai_jiao = data[1][0] ? data[1][0] : '0'
        this.initData.table[index].dai_fen = data[1][1] ? data[1][1] : '0'
      } else {
        // 清空
        this.initData.table[index].dai_yuan = ''
        this.initData.table[index].dai_shi = ''
        this.initData.table[index].dai_bai = ''
        this.initData.table[index].dai_qian = ''
        this.initData.table[index].dai_wan = ''
        this.initData.table[index].dai_shi_wan = ''
        this.initData.table[index].dai_bai_wan = ''
        this.initData.table[index].dai_qian_wan = ''
        this.initData.table[index].dai_yi = ''
        this.initData.table[index].dai_jiao = ''
        this.initData.table[index].dai_fen = ''
      }
    },
    // 借总 input失去焦点【赋值给当前要显示的div；小数点的处理（不输入小数点最后一位就是分）】
    inputBlurJieSum (value) {
      this.handleAllShowToFalse()
      if (value) {
        if (value.indexOf('.') <= -1) {
          // 没有小数点
          if (value.length >= 12) {
            value = value.substring(1, value.length)
          }
          value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2, value.length)
          // 当前行重新赋值
          this.initData.sum_jie = value
        }
        let data = value.split('.')
        // data[0] 整数部分 data[1] 小数部分 var resultStr = name.split('').reverse().join('');
        if (data[0] === '') {
          this.initData.sum_jie = '0.' + data[1]
        }
        if (data[1] === '') {
          this.initData.sum_dai = data[0] + '.00'
        }
        // 整数部分
        let integer = data[0].split('').reverse().join('')
        this.initData.sum_jie_yuan = integer[0]
        this.initData.sum_jie_shi = integer[1]
        this.initData.sum_jie_bai = integer[2]
        this.initData.sum_jie_qian = integer[3]
        this.initData.sum_jie_wan = integer[4]
        this.initData.sum_jie_shi_wan = integer[5]
        this.initData.sum_jie_bai_wan = integer[6]
        this.initData.sum_jie_qian_wan = integer[7]
        this.initData.sum_jie_yi = integer[8]
        // 小数部分
        this.initData.sum_jie_jiao = data[1][0] ? data[1][0] : '0'
        this.initData.sum_jie_fen = data[1][1] ? data[1][1] : '0'
      } else {
        // 清空
        this.initData.sum_jie_yuan = ''
        this.initData.sum_jie_shi = ''
        this.initData.sum_jie_bai = ''
        this.initData.sum_jie_qian = ''
        this.initData.sum_jie_wan = ''
        this.initData.sum_jie_shi_wan = ''
        this.initData.sum_jie_bai_wan = ''
        this.initData.sum_jie_qian_wan = ''
        this.initData.sum_jie_yi = ''
        this.initData.sum_jie_jiao = ''
        this.initData.sum_jie_fen = ''
      }
    },
    // 贷总 input失去焦点【赋值给当前要显示的div；小数点的处理（不输入小数点最后一位就是分）】
    inputBlurDaiSum (value) {
      this.handleAllShowToFalse()
      if (value) {
        if (value.indexOf('.') <= -1) {
          // 没有小数点
          if (value.length >= 12) {
            value = value.substring(1, value.length)
          }
          value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2, value.length)
          // 当前行重新赋值
          this.initData.sum_dai = value
        }
        let data = value.split('.')
        // data[0] 整数部分 data[1] 小数部分 var resultStr = name.split('').reverse().join('');
        if (data[0] === '') {
          this.initData.sum_dai = '0.' + data[1]
        }
        if (data[1] === '') {
          this.initData.sum_dai = data[0] + '.00'
        }
        // 整数部分
        let integer = data[0].split('').reverse().join('')
        this.initData.sum_dai_yuan = integer[0]
        this.initData.sum_dai_shi = integer[1]
        this.initData.sum_dai_bai = integer[2]
        this.initData.sum_dai_qian = integer[3]
        this.initData.sum_dai_wan = integer[4]
        this.initData.sum_dai_shi_wan = integer[5]
        this.initData.sum_dai_bai_wan = integer[6]
        this.initData.sum_dai_qian_wan = integer[7]
        this.initData.sum_dai_yi = integer[8]
        // 小数部分
        this.initData.sum_dai_jiao = data[1][0] ? data[1][0] : '0'
        this.initData.sum_dai_fen = data[1][1] ? data[1][1] : '0'
      } else {
        // 清空
        this.initData.sum_dai_yuan = ''
        this.initData.sum_dai_shi = ''
        this.initData.sum_dai_bai = ''
        this.initData.sum_dai_qian = ''
        this.initData.sum_dai_wan = ''
        this.initData.sum_dai_shi_wan = ''
        this.initData.sum_dai_bai_wan = ''
        this.initData.sum_dai_qian_wan = ''
        this.initData.sum_dai_yi = ''
        this.initData.sum_dai_jiao = ''
        this.initData.sum_dai_fen = ''
      }
    },
    // 隐藏全部input框
    handleAllShowToFalse () {
      this.initData.table.forEach(v => {
        v.jie_show = false
        v.dai_show = false
      })
      this.initData.jie_sum_show = false
      this.initData.dai_sum_show = false
    },
    // 增行
    addLine () {
      this.initData.table.push({ zhaiyao: '', zongzhang: '', mingxi: '', jie_money: '', dai_money: '', jie_show: false, dai_show: false, jie_yi: '', jie_qian_wan: '', jie_bai_wan: '', jie_shi_wan: '', jie_wan: '', jie_qian: '', jie_bai: '', jie_shi: '', jie_yuan: '', jie_jiao: '', jie_fen: '', dai_yi: '', dai_qian_wan: '', dai_bai_wan: '', dai_shi_wan: '', dai_wan: '', dai_qian: '', dai_bai: '', dai_shi: '', dai_yuan: '', dai_jiao: '', dai_fen: '' })
    },
    // 删行
    removeLine (index) {
      // 有数据清除数据
      if (this.initData.table[index].zhaiyao !== '' || this.initData.table[index].zongzhang !== '' || this.initData.table[index].mingxi !== '' || this.initData.table[index].jie_yi !== '' ||
        this.initData.table[index].jie_qian_wan !== '' || this.initData.table[index].jie_bai_wan !== '' || this.initData.table[index].jie_wan !== '' || this.initData.table[index].jie_qian !== '' ||
        this.initData.table[index].jie_bai !== '' || this.initData.table[index].jie_shi !== '' || this.initData.table[index].jie_yuan !== '' || this.initData.table[index].jie_jiao !== '' ||
        this.initData.table[index].jie_fen !== '' || this.initData.table[index].jie_money !== '' || this.initData.table[index].dai_yi !== '' || this.initData.table[index].dai_qian_wan !== '' ||
        this.initData.table[index].dai_bai_wan !== '' || this.initData.table[index].dai_shi_wan !== '' || this.initData.table[index].dai_wan !== '' || this.initData.table[index].dai_qian !== '' ||
        this.initData.table[index].dai_bai !== '' || this.initData.table[index].dai_shi !== '' || this.initData.table[index].dai_yuan !== '' || this.initData.table[index].dai_jiao !== '' ||
        this.initData.table[index].dai_fen !== '' || this.initData.table[index].dai_money !== '') {
        this.initData.table[index].zhaiyao = ''
        this.initData.table[index].zongzhang = ''
        this.initData.table[index].mingxi = ''
        this.initData.table[index].jie_yi = ''
        this.initData.table[index].jie_qian_wan = ''
        this.initData.table[index].jie_bai_wan = ''
        this.initData.table[index].jie_shi_wan = ''
        this.initData.table[index].jie_wan = ''
        this.initData.table[index].jie_qian = ''
        this.initData.table[index].jie_bai = ''
        this.initData.table[index].jie_shi = ''
        this.initData.table[index].jie_yuan = ''
        this.initData.table[index].jie_jiao = ''
        this.initData.table[index].jie_fen = ''
        this.initData.table[index].jie_money = ''
        this.initData.table[index].dai_yi = ''
        this.initData.table[index].dai_qian_wan = ''
        this.initData.table[index].dai_bai_wan = ''
        this.initData.table[index].dai_shi_wan = ''
        this.initData.table[index].dai_wan = ''
        this.initData.table[index].dai_qian = ''
        this.initData.table[index].dai_bai = ''
        this.initData.table[index].dai_shi = ''
        this.initData.table[index].dai_yuan = ''
        this.initData.table[index].dai_jiao = ''
        this.initData.table[index].dai_fen = ''
        this.initData.table[index].dai_money = ''
      } else if (this.initData.table.length >= 5) {
        this.initData.table.splice(index, 1)
      }
    },
    // 保存答案
    saveAnswer () {
      let jiZhangAnswer = this.$store.state.answer['pingZheng']
      jiZhangAnswer[this.index] = this.initData
      this.$store.commit('SAVE_JI_ZHANG_ANSWER', jiZhangAnswer)
      this.$message.success('保存成功')
    }
  }
}
</script>
<style>
  .table .el-input__inner{
    background-color: transparent;
    border: solid 2px transparent;
    color: #333333;
    border-radius: 0;
    height: 50px;
    font-size: 13px;
  }
  .table .el-input__inner:focus{
    border-color: #409EFF;
  }
  .table .child-header .el-input__inner{
    padding: 0;
    text-align: center;
  }
  .table .table-item-input-div .el-input__inner,
  .table .table-item-input-div-dai .el-input__inner,
  .table .jie_sum .el-input__inner,
  .table .dai_sum .el-input__inner{
    padding: 0 1px 0 0;
    text-align: right;
    background-color: #ffffff;
  }
</style>
<style lang="scss" scoped>
  .jiZhang{
    min-width: 1000px;
    height: 100%;
    text-align: left;
    .yewu-parent{
      width: 100%;
      padding: 20px 45px 0;
      .yewu-title{
        font-size: 24px;
        color: #333333;
      }
      .yewu-content{
        font-size: 14px;
        color: #666666;
        margin-top: 10px;
        height: 50px;
        overflow-y: auto;
      }
    }
    .line{
      width: 100%;
      height: 1px;
     background-color: #F0F2F5;
    }
    .title{
      font-size: 20px;
      height: 46px;
      line-height: 46px;
      font-weight: bold;
      text-align: center;
    }
    .content{
      margin: 0 10px;
      padding: 20px 45px 30px;
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
          top: -1px;
          height: 50px;
          line-height: 50px;
          width: 100%;
        }
        .table-item-input-div-dai{
          position: absolute;
          left: 0;
          top: -1px;
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
            left: 0;
            top: -1px;
            width: 220px;
            height: 50px;
            line-height: 50px;
            background-color: transparent;
            font-size: 13px;
          }
          .dai_sum{
            position: absolute;
            left: 0;
            top: -1px;
            width: 220px;
            height: 50px;
            line-height: 50px;
            background-color: transparent;
            font-size: 13px;
          }
        }
      }
    }
  }
</style>
