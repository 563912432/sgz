<template>
  <div class="main"
       v-loading="loading"
       element-loading-text="交卷中，请稍后">
    <!--分三块 左边流程图，中间业务切换菜单，右边操作业务界面-->
    <split-pane split="vertical" :min-percent='0' :default-percent='0'>
      <template slot="paneL">
        <div class="left-container">
          <!--有左边流程图显示-->
          <Flowchart v-if="leftPanel === leftPanelType.Liu_Cheng_Tu"/>
          <ReferQiChu v-if="leftPanel === leftPanelType.Qi_Chu" @toggleClick="closeRefer"/>
          <ReferJiZhang v-if="leftPanel === leftPanelType.Ji_Zhang" @toggleClick="closeRefer"/>
          <ReferTXingZhang v-if="leftPanel === leftPanelType.T_Xing_Zhang" @backClick="closeRefer"/>
          <ReferKeMuHuiZong v-if="leftPanel === leftPanelType.Ke_Mu_Hui_Zong" @toggleClick="closeRefer"/>
          <ReferMingXiFenLeiZhang v-if="leftPanel === leftPanelType.Ming_Xi_Fen_Lei" @toggleClick="closeRefer"/>
          <ReferZongFenLeiZhang v-if="leftPanel === leftPanelType.Zong_Fen_Lei" @toggleClick="closeRefer"/>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container flex">
          <!--业务切换菜单【如果有】-->
          <div v-if="leftMenuShow" v-show="isActive" class="menu-content">
            <div class="menu-content-header">
              <span>业务摘要</span>
            </div>
            <!--菜单栏-->
            <div class="menu-content-wrap">
              <div :class="['item', i === index?'active':'']" v-for="(item, i) in handleData['content']" :key="i" @click="handleChangeData(i)">
                {{i + 1}}. {{ item['abstract']?item['abstract']:'' }}
              </div>
            </div>
          </div>
          <!--操作业务界面-->
          <div class="wrap flex-1 flex flex-column">
            <!--顶栏-->
            <div class="wrap-header flex flex-align-center flex-justify-space-between">
              <div class="flex flex-align-center">
                <Hamburger v-if="leftMenuShow" :is-active="isActive" style="cursor: pointer;margin-left: 20px" @toggleClick="isActive = !isActive"/>
                <span class="ml-20">手工全盘账 - {{ handleData.title }}</span>
              </div>
              <div class="flex flex-align-center">
                <span><el-button class="col-blue" plain size="small" @click="handleSubmit">交卷</el-button></span>
                <div class="col-blue back flex flex-align-center ml-15" @click="handleBack"><i class="el-icon-back" style="font-size: 20px"></i><span class="ml-5">返回</span></div>
              </div>
            </div>
            <!--操作栏-->
            <div class="wrap-handle">
              <!--日记账-->
              <div v-if="systemType === 'ri-ji-zhang'" class="fl">
                <el-radio-group v-model="riJiPosition" size="small" style="margin-left: 10px">
                  <el-radio-button label="first">账簿启用及交接表</el-radio-button>
                  <el-radio-button label="second">账页目录表</el-radio-button>
                </el-radio-group>
              </div>
              <!--明细分类账-->
              <div v-if="systemType === 'ming-xi-zhang'" class="fl">
                <el-radio-group v-model="mingXiPosition" size="small" style="margin-left: 10px">
                  <el-radio-button label="first">账簿启用及交接表</el-radio-button>
                  <el-radio-button label="second">账页目录表</el-radio-button>
                </el-radio-group>
              </div>
              <!--T型账-->
              <div v-if="systemType === 't-xing-zhang'" class="fl">
                <el-radio-group v-model="tXingZhangPosition" size="small" style="margin-left: 10px">
                  <el-radio-button label="first">账页目录表</el-radio-button>
                </el-radio-group>
              </div>
              <!--总分类账-->
              <div v-if="systemType === 'zong-fen-lei-zhang'" class="fl">
                <el-radio-group v-model="zongFenLeiZhangPosition" size="small" style="margin-left: 10px">
                  <el-radio-button label="first">账簿启用及交接表</el-radio-button>
                  <el-radio-button label="second">账页目录表</el-radio-button>
                </el-radio-group>
              </div>
              <el-button plain size="small" @click="handleFlowchart">流程图</el-button>
              <!--期初余额参考-->
              <el-button v-if="systemType === 'ri-ji-zhang' || systemType === 'ming-xi-zhang' || systemType === 't-xing-zhang' || systemType === 'zong-fen-lei-zhang'|| systemType === 'zi-chan-fu-zhai-biao'|| systemType === 'li-run-biao'" plain size="small" @click="handleQiChu">期初余额</el-button>
              <!--记账凭证参考-->
              <el-button v-if="systemType === 'ri-ji-zhang' || systemType === 'ming-xi-zhang' ||systemType === 't-xing-zhang' || systemType === 'ke-mu-hui-zong'" plain size="small" @click="handleJiZhang">记账凭证</el-button>
              <!--T型账-->
              <el-button v-if="systemType === 'ke-mu-hui-zong'" plain size="small" @click="handleTXingZhang">T型账</el-button>
              <!--科目汇总表-->
              <el-button v-if="systemType === 'zong-fen-lei-zhang'" plain size="small" @click="handleKeMuHuiZong">科目汇总表</el-button>
              <!--明细分类账-->
              <el-button v-if="systemType === 'zi-chan-fu-zhai-biao' || systemType === 'li-run-biao'" plain size="small" @click="handleMingXiFenLeiZhang">明细分类账</el-button>
              <!--总分类账-->
              <el-button v-if="systemType === 'zi-chan-fu-zhai-biao' || systemType === 'li-run-biao'" plain size="small" @click="handleZongFenLeiZhang">总分类账</el-button>
              <!--如果有业务、并且不是日记账-->
              <el-button v-if="leftMenuShow && systemType !== 'ri-ji-zhang' && systemType !== 'ming-xi-zhang'" type="primary" size="small" @click="prevData">上一题</el-button>
              <el-button v-if="leftMenuShow && systemType !== 'ri-ji-zhang' && systemType !== 'ming-xi-zhang'" type="primary" size="small" @click="nextData">下一题</el-button>
              <el-button v-if="rightMaterialShow" plain size="small" @click="isRightActive = !isRightActive">资料</el-button>
            </div>
            <!--内容显示区域-->
            <div class=" flex-1 flex" style="overflow: auto">
              <div class="wrap-content-parent flex-1">
                <!--基本信息-->
                <div v-if="systemType === 'basic-info'" class="wrap-content flex-1" v-html="currentData" style="min-width: 1000px"></div>
                <!--期初余额-->
                <div v-if="systemType ===  'qi-chu'" class="wrap-content flex-1" style="min-width: 1000px">
                  <img v-for="(item, index) in currentData" :key="index" :src="'http://www.wenyunjy.com:8081' + item"/>
                </div>
                <!--记账凭证-->
                <div v-if="systemType === 'ji-zhang'" class="wrap-content flex-1">
                  <JiZhang :title="currentData?currentData.abstract?currentData.abstract:'':''" :brief="currentData?currentData.content?currentData.content:'':''" :ping-zheng-answer="pingZhengAnswer" :index="index" />
                </div>
                <!--日记账-->
                <div v-if="systemType === 'ri-ji-zhang'" class="wrap-content flex-1 flex">
                  <!--扉页 现金日记账和银行存款日记账 todo 删除封皮-->
                  <!--<div v-if="riJiPosition === ''" class="flex-1 flex flex-justify-center flex-align-center" style="min-width: 900px">
                    <img src="http://www.wenyunjy.com/Uploads/manualAccounts/20170808/59890e9e55b66.jpg" alt="">
                  </div>-->
                  <!--账簿启用及交接表 现金日记账和银行存款日记账-->
                  <div v-if="riJiPosition === 'first'" class="flex-1 flex flex-justify-center flex-align-center" style="min-width: 900px">
                    <!--todo 暂时先放图片 后面要写dom-->
                    <img src="http://www.wenyunjy.com/Uploads/manualAccounts/20170808/59890ea852829.jpg" alt="">
                  </div>
                  <!--账页目录表 现金日记账和银行存款日记账-->
                  <div v-if="currentData.type === tiMuType.Cao_Zuo && riJiPosition === 'second'" class="flex-1">
                    <RiJiZhang :ri-ji-zhang-answer="riJiZhangAnswer"/>
                  </div>
                  <div v-if="currentData.type === tiMuType.KeMu_CaoZuo && riJiPosition === 'second'" class="flex-1">
                    <YinHangRiJiZhang :ri-ji-zhang-answer="yinHangRiJiZhangAnswer"/>
                  </div>
                </div>
                <!--明细分类账-->
                <div v-if="systemType === 'ming-xi-zhang'" class="wrap-content flex-1 flex">
                  <!--扉页 三栏、增值税、金额式 删除封皮-->
                  <!--<div v-if="mingXiPosition === ''" class="flex-1 flex flex-justify-center flex-align-center" style="min-width: 900px">
                    <img :src="currentData.material[0].content" alt="">
                  </div>-->
                  <!--账簿启用及交接表 三栏、增值税、金额式-->
                  <div v-if="mingXiPosition === 'first'" class="flex-1 flex flex-justify-center flex-align-center" style="min-width: 900px">
                    <img src="http://www.wenyunjy.com/Uploads/manualAccounts/20190529/5cee423d001ea.jpg" alt="">
                  </div>
                  <!--账页目录表 三栏、增值税、金额式-->
                  <div v-if="currentData.type === tiMuType.Cao_Zuo && mingXiPosition === 'second'" class="flex-1">
                    <ZengZhiMingXiZhang :zeng-zhi-shui-answer="zengZhiShuiAnswer"/>
                  </div>
                  <div v-if="currentData.type === tiMuType.KeMu_CaoZuo && mingXiPosition === 'second'" class="flex-1">
                    <SanLanMingXiZhang :index="index" :san-lan-shu-liang-answer="sanLanShuLiangAnswer" />
                  </div>
                </div>
                <!--T型账-->
                <div v-if="systemType === 't-xing-zhang'" class="wrap-content flex-1 flex">
                  <!--账页目录表-->
                  <div v-if="currentData.type === tiMuType.KeMu_CaoZuo && tXingZhangPosition === 'first'" class="flex-1">
                    <TXingZhang :TXingZhangAnswer="TXingZhangAnswer"/>
                  </div>
                </div>
                <!--科目汇总表-->
                <div v-if="systemType === 'ke-mu-hui-zong'" class="wrap-content flex-1 flex">
                  <!--区分是科目页面还是详情页面-->
                  <KeMuHuiZongBiao :keMuHuiZongBiaoAnswer="keMuHuiZongBiaoAnswer"/>
                </div>
                <!--总分类账-->
                <div v-if="systemType === 'zong-fen-lei-zhang'" class="wrap-content flex-1 flex">
                  <!--扉页-->
                  <!--<div v-if="zongFenLeiZhangPosition === ''" class="flex-1 flex flex-justify-center flex-align-center" style="min-width: 900px">
                    <img :src="currentData.material[0].content" alt="">
                  </div>-->
                  <!--账簿启用及交接表-->
                  <div v-if="zongFenLeiZhangPosition === 'first'" class="flex-1 flex flex-justify-center flex-align-center" style="min-width: 900px">
                    <img src="http://www.wenyunjy.com/Uploads/manualAccounts/20190529/5cee42ece2592.jpg" alt="">
                  </div>
                  <!--账页目录表-->
                  <div v-if="currentData.type === tiMuType.KeMu_CaoZuo && zongFenLeiZhangPosition === 'second'" class="flex-1">
                    <ZongFenLeiZhang :zongFenLeiZhangAnswer="zongFenLeiZhangAnswer"/>
                  </div>
                </div>
                <!--资产负债表-->
                <div v-if="systemType === 'zi-chan-fu-zhai-biao'" class="wrap-content flex-1 flex">
                  <!--区分是科目页面还是详情页面-->
                  <ZiChanFuZhaiBiao :ziChanFuZhaiBiaoAnswer="ziChanFuZhaiBiaoAnswer"/>
                </div>
                <!--利润表-->
                <div v-if="systemType === 'li-run-biao'" class="wrap-content flex-1 flex">
                  <!--区分是科目页面还是详情页面-->
                  <LiRunBiao :liRunBiaoAnswer="liRunBiaoAnswer"/>
                </div>
                <!--右边原始资料栏目-->
              </div>
              <div v-if="rightMaterialShow" v-show="isRightActive" class="material-parent">
                <Material :material-data="currentData?currentData.resource!==''?JSON.parse(currentData.resource):[]:[]" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </split-pane>
    <!--交卷成功-->
    <el-dialog
      class="dialog-submit"
      title=""
      :visible.sync="submitDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="305px"
      center>
      <div class="position-relative">
        <div class="dialog-content"><i class="el-icon-check" style="font-size: 50px;color: #ffffff;"></i></div>
        <div class="text-center mt-15 font-20 col-3 bold letter-space">交卷成功！</div>
        <div class="mt-15 font-14 col-6 letter-space" style="padding: 0 20px">
          <div class="">本次得分：<span style="font-size: 20px;color: #F63A3A;font-weight: bold"> {{ resultData['score'] }}</span> 分/满分100分</div>
          <div class="mt-5">开始时间：{{ resultData['duration'] }}</div>
<!--          <div class="mt-5">用时：{{ resultData['duration'] }}</div>-->
          <div class="mt-5" v-for="(item, index) in resultData['result']" :key="index">
            {{ error_message(item) }}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
<!--        <el-button size="small" type="primary" @click="goParse">查看解析</el-button>-->
        <el-button size="small" @click="closeDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import Flowchart from './components/Flowchart/Flowchart'
import Hamburger from './components/Hamburger/Hamburger'
import Material from './components/Material/Material'
import JiZhang from './components/JiZhang/JiZhang'
import RiJiZhang from './components/RiJiZhang/RiJiZhang'
import ReferQiChu from './components/Refer/ReferQiChu'
import ReferJiZhang from './components/Refer/ReferJiZhang'
import ReferTXingZhang from './components/Refer/ReferTXingZhang'
import ReferKeMuHuiZong from './components/Refer/ReferKeMuHuiZong'
import ReferMingXiFenLeiZhang from './components/Refer/ReferMingXiFenLeiZhang'
import ReferZongFenLeiZhang from './components/Refer/ReferZongFenLeiZhang'
import YinHangRiJiZhang from './components/RiJiZhang/YinHangRiJiZhang'
import SanLanMingXiZhang from './components/MingXiZhang/SanLanMingXiZhang'
import ZengZhiMingXiZhang from './components/MingXiZhang/ZengZhiMingXiZhang'
import TXingZhang from './components/TXingZhang/TXingZhang'
import KeMuHuiZongBiao from './components/KeMuHuiZongBiao/KeMuHuiZongBiao'
import ZongFenLeiZhang from './components/ZongFenLeiZhang/ZongFenLeiZhang'
import ZiChanFuZhaiBiao from './components/ZiChanFuZhaiBiao/ZiChanFuZhaiBiao'
import LiRunBiao from './components/LiRunBiao/LiRunBiao'
export default {
  name: 'Main',
  components: { ReferQiChu, ReferJiZhang, ReferTXingZhang, ReferKeMuHuiZong, ReferMingXiFenLeiZhang, ReferZongFenLeiZhang, splitPane, Flowchart, Hamburger, Material, JiZhang, RiJiZhang, YinHangRiJiZhang, SanLanMingXiZhang, ZengZhiMingXiZhang, TXingZhang, KeMuHuiZongBiao, ZongFenLeiZhang, ZiChanFuZhaiBiao, LiRunBiao },
  computed: {
    title () {
      return this.$route.meta.title
    },
    // 左侧收缩栏类型
    leftPanelType () {
      return this.$store.state.leftPanelType
    },
    // 组件页面标识
    tiMuType () {
      return this.$store.state.tiMuType
    }
  },
  data () {
    return {
      isActive: true,
      isRightActive: true,
      handleData: [],
      index: 0,
      currentData: {},
      leftMenuShow: true,
      rightMaterialShow: true,
      systemType: '',
      riJiPosition: 'first',
      mingXiPosition: 'first',
      leftPanel: 1, // 1：流程图 2：期初余额 3：记账凭证
      leftPanelShow: false,
      tXingZhangPosition: 'first',
      zongFenLeiZhangPosition: 'first',
      submitDialogVisible: false,
      loading: false,
      pingZhengAnswer: {}, // 记账凭证答案
      riJiZhangAnswer: {}, // 现金日记账答案
      yinHangRiJiZhangAnswer: [], // 银行日记账答案
      sanLanShuLiangAnswer: [], // 三栏明细账或数量金额式明细账答案
      zengZhiShuiAnswer: {}, // 应交增值税明细账答案
      TXingZhangAnswer: [], // T型账答案
      keMuHuiZongBiaoAnswer: {}, // 科目汇总表答案
      zongFenLeiZhangAnswer: [], // 总分类账答案
      ziChanFuZhaiBiaoAnswer: {}, // 资产负债表表答案
      liRunBiaoAnswer: {}, // 利润表表答案
      resultData: {} // 返回结果
    }
  },
  created () {
    this.initData()
  },
  watch: {
    '$route' (to, from) {
      this.initData()
    },
    // index变化当前数据变化
    index (value) {
      let params = this.$route.params.type
      switch (params) {
        case 'ji-zhang':
          if (!this.$store.state.companyInfo.business) {
            this.$message.warning('未获取到业务信息')
            setTimeout(() => {
              if (sessionStorage.getItem('role') === 'teacher') {
                this.$router.push(`/home/${sessionStorage.getItem('sgz_company_id')}/teacher`)
              } else {
                this.$router.push(`/home/student`)
              }
            }, 1000)
          }
          // 记账凭证答案
          if (this.$store.state.answer['pingZheng'] && this.$store.state.answer['pingZheng'][this.index]) {
            this.pingZhengAnswer = this.$store.state.answer['pingZheng'][this.index]
          } else {
            this.pingZhengAnswer = {}
          }
          this.currentData = this.handleData.content[value]
          break
        case 'ri-ji-zhang':
          if (value === 0) {
            let answer = this.$store.state.answer['riJiZhang']
            if (answer && answer[this.index]) {
              // index=0是现金日记账 index=1是银行日记账
              this.riJiZhangAnswer = this.$store.state.answer['riJiZhang'][this.index]['answer']
            } else {
              this.riJiZhangAnswer = {}
            }
          } else {
            if (this.$store.state.answer['riJiZhang'] && this.$store.state.answer['riJiZhang'][this.index]) {
              // index=0是现金日记账 index=1是银行日记账
              this.yinHangRiJiZhangAnswer = this.$store.state.answer['riJiZhang'][this.index]['answer']
            } else {
              this.yinHangRiJiZhangAnswer = []
            }
          }
          this.currentData = this.handleData.content[value]
          break
        case 'ming-xi-zhang':
          if (value === 0 || value === 2) {
            // 三栏明细账或数量金额式明细账答案
            if (this.$store.state.answer['minXiZhang'] && this.$store.state.answer['minXiZhang'][this.index]) {
              this.sanLanShuLiangAnswer = this.$store.state.answer['minXiZhang'][this.index]['answer']
            } else {
              this.sanLanShuLiangAnswer = []
            }
          } else {
            // 应交增值税明细账
            let answer = this.$store.state.answer['minXiZhang']
            if (answer && answer[this.index]) {
              this.zengZhiShuiAnswer = answer[this.index]['answer']
            } else {
              this.zengZhiShuiAnswer = {}
            }
          }
          this.currentData = this.handleData.content[value]
          break
        case 't-xing-zhang':
          if (this.$store.state.answer['TXingZhang']) {
            this.TXingZhangAnswer = this.$store.state.answer['TXingZhang']['answer']
          } else {
            this.TXingZhangAnswer = []
          }
          this.currentData = this.handleData.content
          break
        case 'ke-mu-hui-zong':
          if (this.$store.state.answer['keMuHuiZong']) {
            this.keMuHuiZongBiaoAnswer = this.$store.state.answer['keMuHuiZong']
          } else {
            this.keMuHuiZongBiaoAnswer = {}
          }
          this.currentData = {}
          break
        case 'zong-fen-lei-zhang':
          if (this.$store.state.answer['zongFenLeiZhang']) {
            this.zongFenLeiZhangAnswer = this.$store.state.answer['zongFenLeiZhang']['answer']
          } else {
            this.zongFenLeiZhangAnswer = []
          }
          this.currentData = this.handleData.content
          break
        case 'zi-chan-fu-zhai-biao':
          // 资产负债表答案
          if (this.$store.state.answer['ziChanFuZhaiBiao']) {
            this.ziChanFuZhaiBiaoAnswer = this.$store.state.answer['ziChanFuZhaiBiao']
          } else {
            this.ziChanFuZhaiBiaoAnswer = {}
          }
          this.currentData = {}
          break
        case 'li-run-biao':
          // 利润表答案
          if (this.$store.state.answer['liRunBiao']) {
            this.liRunBiaoAnswer = this.$store.state.answer['liRunBiao']
          } else {
            this.liRunBiaoAnswer = {}
          }
          this.currentData = {}
          break
      }
    },
    // 切换左侧参考栏【流程图】的显示隐藏
    leftPanelShow (value) {
      let paneL = document.getElementsByClassName('splitter-paneL')[0]
      let paneR = document.getElementsByClassName('splitter-paneR')[0]
      let paneResizer = document.getElementsByClassName('splitter-pane-resizer')[0]
      if (value) {
        paneL.style.width = '40%'
        paneR.style.width = '60%'
        paneResizer.style.left = '40%'
      } else {
        paneL.style.width = '0%'
        paneR.style.width = '100%'
        paneResizer.style.left = '0%'
      }
    }
  },
  methods: {
    // 初始化数据
    initData () {
      let params = this.$route.params.type
      switch (params) {
        // 企业基本信息
        case 'basic-info':
          this.handleData = {
            title: '了解企业基本信息',
            content: this.$store.state.companyInfo.material
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 'basic-info'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content
          break
        // 期初余额
        case 'qi-chu':
          this.handleData = {
            title: '期初余额',
            content: this.$store.state.companyInfo.qi_chu
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 'qi-chu'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content
          break
        // 记账凭证
        case 'ji-zhang':
          if (!this.$store.state.companyInfo.business) {
            this.$message.warning('未获取到业务信息')
            setTimeout(() => {
              if (sessionStorage.getItem('role') === 'teacher') {
                this.$router.push(`/home/${sessionStorage.getItem('sgz_company_id')}/teacher`)
              } else {
                this.$router.push(`/home/${sessionStorage.getItem('sgz_company_id')}/student`)
              }
            }, 1000)
          }
          this.handleData = {
            title: '记账凭证',
            content: this.$store.state.companyInfo.business ? this.$store.state.companyInfo.business : []
          }
          this.leftMenuShow = true
          this.rightMaterialShow = true
          this.systemType = 'ji-zhang'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content[this.index]
          // 记账凭证答案
          if (this.$store.state.answer['pingZheng'] && this.$store.state.answer['pingZheng'][this.index]) {
            this.pingZhengAnswer = this.$store.state.answer['pingZheng'][this.index]
          } else {
            this.pingZhengAnswer = {}
          }
          break
        // 日记账
        case 'ri-ji-zhang':
          // this.handleData = this.$store.state.riJiZhangInfo
          this.handleData = {
            title: '日记账',
            content: this.$store.state.answer['riJiZhang']
          }
          this.leftMenuShow = true
          this.rightMaterialShow = false
          this.systemType = 'ri-ji-zhang'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content[this.index]
          // 记账凭证答案
          if (this.$store.state.answer['riJiZhang'] && this.$store.state.answer['riJiZhang'][this.index]) {
            // index=0是现金日记账 index=1是银行日记账
            this.riJiZhangAnswer = this.$store.state.answer['riJiZhang'][this.index]['answer']
          } else {
            this.riJiZhangAnswer = {}
          }
          break
        // 明细分类账
        case 'ming-xi-zhang':
          this.handleData = this.$store.state.minXiZhangInfo
          this.handleData = {
            title: '明细分类账',
            content: this.$store.state.answer['minXiZhang']
          }
          this.leftMenuShow = true
          this.rightMaterialShow = false
          this.systemType = 'ming-xi-zhang'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content[this.index]
          // 明细分类账答案
          if (this.$store.state.answer['minXiZhang'] && this.$store.state.answer['minXiZhang'][this.index]) {
            // index=0是三栏式明细账 index=1是应交增值税明细账 index=2是数量金额式明细账
            this.sanLanShuLiangAnswer = this.$store.state.answer['minXiZhang'][this.index]['answer']
          } else {
            this.sanLanShuLiangAnswer = []
          }
          break
        // T型账
        case 't-xing-zhang':
          this.handleData = {
            title: 'T型账',
            content: this.$store.state.answer['TXingZhang']
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 't-xing-zhang'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content
          // T型账答案
          if (this.$store.state.answer['TXingZhang']) {
            this.TXingZhangAnswer = this.$store.state.answer['TXingZhang']['answer']
          } else {
            this.TXingZhangAnswer = []
          }
          break
        // 科目汇总表
        case 'ke-mu-hui-zong':
          this.handleData = {
            title: '科目汇总表',
            content: this.$store.state.answer['keMuHuiZong']
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 'ke-mu-hui-zong'
          this.currentData = {}
          // 科目汇总表答案
          if (this.$store.state.answer['keMuHuiZong']) {
            this.keMuHuiZongBiaoAnswer = this.$store.state.answer['keMuHuiZong']
          } else {
            this.keMuHuiZongBiaoAnswer = {}
          }
          break
        // 总分类账
        case 'zong-fen-lei-zhang':
          this.handleData = {
            title: '总分类账',
            content: this.$store.state.answer['zongFenLeiZhang']
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 'zong-fen-lei-zhang'
          // 初始化index
          this.index = 0
          // 初始化当前数据
          this.currentData = this.handleData.content
          // 总分类账答案
          if (this.$store.state.answer['zongFenLeiZhang']) {
            this.zongFenLeiZhangAnswer = this.$store.state.answer['zongFenLeiZhang']['answer']
          } else {
            this.zongFenLeiZhangAnswer = []
          }
          break
        // 资产负债表
        case 'zi-chan-fu-zhai-biao':
          this.handleData = {
            title: '资产负债表',
            content: this.$store.state.answer['ziChanFuZhaiBiao']
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 'zi-chan-fu-zhai-biao'
          this.currentData = {}
          // 资产负债表答案 todo
          if (this.$store.state.answer['ziChanFuZhaiBiao']) {
            this.ziChanFuZhaiBiaoAnswer = this.$store.state.answer['ziChanFuZhaiBiao']
          } else {
            this.ziChanFuZhaiBiaoAnswer = {}
          }
          break
        // 利润表
        case 'li-run-biao':
          this.handleData = {
            title: '利润表',
            content: this.$store.state.answer['liRunBiao']
          }
          this.leftMenuShow = false
          this.rightMaterialShow = false
          this.systemType = 'li-run-biao'
          this.currentData = {}
          // 利润表答案
          if (this.$store.state.answer['liRunBiao']) {
            console.log(this.$store.state.answer)
            this.liRunBiaoAnswer = this.$store.state.answer['liRunBiao']
          } else {
            this.liRunBiaoAnswer = {}
          }
          break
        default:
          break
      }
    },
    // 查看流程图点击事件
    handleFlowchart () {
      if (this.leftPanel === this.leftPanelType.Liu_Cheng_Tu) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Liu_Cheng_Tu
      }
    },
    // 期初余额的点击事件【切换左侧参考页面内容】
    handleQiChu () {
      if (this.leftPanel === this.leftPanelType.Qi_Chu) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Qi_Chu
      }
    },
    // 记账凭证的点击事件【切换左侧参考页面内容】
    handleJiZhang () {
      if (this.leftPanel === this.leftPanelType.Ji_Zhang) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ji_Zhang
      }
    },
    // T型账的点击事件【切换左侧参考页面内容】
    handleTXingZhang () {
      if (this.leftPanel === this.leftPanelType.T_Xing_Zhang) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.T_Xing_Zhang
      }
    },
    // 科目汇总表的点击事件【切换左侧参考页面内容】
    handleKeMuHuiZong () {
      if (this.leftPanel === this.leftPanelType.Ke_Mu_Hui_Zong) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ke_Mu_Hui_Zong
      }
    },
    // 明细分类账的点击事件【切换左侧参考页面内容】
    handleMingXiFenLeiZhang () {
      if (this.leftPanel === this.leftPanelType.Ming_Xi_Fen_Lei) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ming_Xi_Fen_Lei
      }
    },
    // 总分类账的点击事件【切换左侧参考页面内容】
    handleZongFenLeiZhang () {
      if (this.leftPanel === this.leftPanelType.Zong_Fen_Lei) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Zong_Fen_Lei
      }
    },
    // 菜单栏切换业务
    handleChangeData (i) {
      this.index = i
      if (this.systemType === 'ri-ji-zhang') {
        // 还原日记账的position
        this.riJiPosition = 'first'
      }
      if (this.systemType === 'ming-xi-zhang') {
        // 还原明细分类账的position
        this.mingXiPosition = 'first'
      }
      if (this.systemType === 't-xing-zhang') {
        // 还原明细分类账的position
        this.mingXiPosition = 'first'
      }
    },
    // 上一题
    prevData () {
      if (this.index <= 0) {
        this.$message.warning('已经是第一题了')
        return false
      }
      this.index--
    },
    // 下一题
    nextData () {
      if (this.index >= this.handleData.content.length - 1) {
        this.$message.warning('已经是最后一题了')
        return false
      }
      this.index++
    },
    // 关闭参考
    closeRefer () {
      this.leftPanelShow = false
    },
    // 交卷
    handleSubmit () {
      this.$confirm('交卷后将不能继续答题～', '确定要交卷?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: ''
      }).then(() => {
        this.loading = true
        let companyId = this.$store.state.companyInfo['id'] || sessionStorage.getItem('sgz_company_id')
        let role = this.$store.state.role
        if (role) {
          if (role === 'teacher') {
            if (companyId) {
              window.axios.post(`${window.adminHost}/admin/manual/answer`, { id: companyId, answer: JSON.stringify(this.$store.state.answer) }).then(response => {
                let res = response.data
                if (!res.error_code) {
                  this.$message.success('答案保存成功')
                  this.loading = false
                  this.$router.push(`/home/${companyId}`)
                }
              }).catch()
            } else {
              // 尚未选择企业
              this.$message.error('尚未选择企业')
            }
          } else if (role === 'student') {
            window.axios.post(`${window.studentHost}/stu/manual/submit`, { id: companyId, start_at: sessionStorage.getItem('sgz_start_at'), answer: JSON.stringify(this.$store.state.answer), source: 1 }).then(response => {
              if (!response.error_code) {
                this.$message.success('交卷成功')
                this.loading = false
                this.resultData = response.data.data
                this.resultData['start_at'] = this.timeStampToSting(sessionStorage.getItem('sgz_start_at'))
                setTimeout(() => {
                  this.submitDialogVisible = true
                }, 1000)
              }
            })
          }
        } else {
          this.$message.error('缺少角色')
        }
      }).catch(() => {
        console.log('取消交卷')
      })
    },
    // 返回
    handleBack () {
      let companyId = this.$store.state.companyInfo['id'] || sessionStorage.getItem('sgz_company_id')
      let role = this.$store.state.role
      if (companyId) {
        if (role) {
          if (role === 'teacher') {
            this.$router.push(`/home/${companyId}`)
          } else {
            this.$router.push(`/home`)
          }
        } else {
          this.$message.error('缺少角色')
        }
      } else {
        // 尚未选择企业
        this.$message.error('尚未选择企业')
      }
    },
    // 关闭弹窗
    closeDialog () {
      this.submitDialogVisible = false
      this.handleBack()
    },
    // 解析页面
    goParse () {
      this.submitDialogVisible = false
      this.handleBack()
    },
    // 错误提示
    error_message (key) {
      let value = {
        pingZheng: '您填写的记账凭证数据有误！',
        riJiZhang: '您填写的日记账数据有误！',
        minXiZhang: '您填写的明细分类账数据有误！',
        TXingZhang: '您填写的T型账数据有误！',
        keMuHuiZong: '您填写的科目汇总表数据有误！',
        zongFenLeiZhang: '您填写的总分类账数据有误！',
        ziChanFuZhaiBiao: '您填写的资产负债表数据有误！',
        liRunBiao: '您填写的利润表数据有误！'
      }
      return value[key]
    },
    timeStampToSting (timeStamp) {
      const d = new Date(timeStamp * 1000) // 根据时间戳生成的时间对象
      return `${d.getFullYear()}-${parseInt(d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)}-${parseInt(d.getDate()) > 9 ? d.getDate() : '0' + d.getDate()} ${parseInt(d.getHours()) > 9 ? d.getHours() : '0' + d.getHours()}:${parseInt(d.getMinutes()) > 9 ? d.getMinutes() : '0' + d.getMinutes() + ':' +
        (parseInt(d.getSeconds()) > 9 ? d.getSeconds() : '0' + d.getSeconds())}`
    }
  }
}
</script>
<style>
  .el-dialog.el-dialog--center{
    margin-top: 35vh!important;
  }
  .letter-space {
    letter-spacing: 0.5px;
  }
  .font-14{
    font-size: 14px;
  }
  .font-20{
    font-size: 20px;
  }
  .mr-10{
    margin-right: 10px;
  }
  .ml-15{
    margin-left: 15px;
  }
  .mt-5{
    margin-top: 5px;
  }
  .mt-10{
    margin-top: 10px;
  }
  .mt-40{
    margin-top: 40px;
  }
  .splitter-pane-resizer.vertical[data-v-212fa2a4]{
    border-left: 5px solid #f6f6f6;
    border-right: 5px solid #f6f6f6;
  }
  .splitter-pane-resizer[data-v-212fa2a4]{
    background: #f6f6f6;
  }
  .wrap-handle .el-radio-button--small .el-radio-button__inner:hover{
    color: #3A81D6;
  }
  .wrap-handle .el-radio-button__orig-radio:checked + .el-radio-button__inner{
    background-color: #3A81D6;
    border-color: #3A81D6;
    box-shadow: -1px 0 0 0 #3A81D6;
  }
  .wrap-handle .el-radio-button__orig-radio:checked + .el-radio-button__inner:hover{
    color: #FFFFFF;
  }
  .col-blue.el-button:hover,
  .col-blue.el-button:focus{
    color: #3A81D6;
    border-color: #3A81D6;
  }
  .el-button--primary.col-blue.el-button{
    background-color: #2A68B2;
    border-color: #2A68B2;
  }
  .el-message-box__title{
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    font-weight: bold;
  }
  .el-message-box__header {
    padding: 40px;
    padding-bottom: 10px;
  }
  .el-message-box__content{
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    padding: 5px 40px 40px 40px;
  }
  .dialog-submit .el-dialog__header{
    background-color: #ffffff;
  }
  .dialog-submit .dialog-content{
    position: absolute;
    top: -115px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #93C343;
  }
</style>
<style lang="scss" scoped>
  .main {
    position: relative;
    height: 100vh;
    .left-container{
      height: 100%;
      background-color: #FFFFFF;
      overflow: auto;
    }
    .right-container{
      height: 100%;
      width: 100%;
      /*min-width: 1300px;*/
      overflow-y: hidden;
      overflow-x: auto;
      .menu-content{
        width: 200px;
        min-width: 200px;
        height: 100%;
        overflow-y: auto;
        background-color: #FFFFFF;
        /*transition: width 0.28s;*/
        .menu-content-header{
          height: 50px;
          line-height: 50px;
          background: #3A81D6;
          font-size: 16px;
          text-align: center;
          color: #FFFFFF;
        }
        .menu-content-wrap{
          color: #666666;
          font-size: 13px;
          .item{
            width: 200px;
            /*width: 100%;*/
            height: 50px;
            line-height: 50px;
            padding: 0 10px;
            cursor: pointer;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
          }
          .item.active{
            background-color: #E6F7FF;
            color: #3A81D6;
          }
        }
      }
      .wrap{
        height: 100%;
        min-height: 100%;
        overflow: hidden;
        position: relative;
        .wrap-header{
          min-width: 500px;
          height: 50px;
          min-height: 50px;
          background-color: #3A81D6;
          font-size: 16px;
          color: #FFFFFF;
          .back {
            height: 50px;
            line-height: 50px;
            font-size: 13px;
            color: #ffffff;
            background-color: #2A68B2;
            padding: 0 20px;
            cursor: pointer;
          }
        }
        .wrap-handle{
          height: 50px;
          line-height: 50px;
          min-width: 500px;
          background-color: #FFFFFF;
          box-shadow: 0 2px 6px 0 rgba(0,0,0,0.04);
          text-align: right;
          padding: 0 10px 0 0;
        }
        .wrap-content-parent{
          padding: 20px 20px 0 20px;
          height: auto;
          overflow: auto;
          background-color: transparent;
          border-left: solid 1px #FFFFFF;
          .wrap-content{
            text-align: center;
            min-height: 100%;
            /*min-width: 900px;*/
            height: auto;
            overflow-y: auto;
            background-color: #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
            padding: 10px 0;
            /*img{*/
            /*  width: 100%;*/
            /*  height: auto;*/
            /*}*/
          }
          .material-parent{
            margin-left: 20px;
            height: 100%;
          }
        }
      }
    }
  }

</style>
