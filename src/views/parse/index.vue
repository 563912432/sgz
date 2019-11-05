<template>
  <div class="parse-index">
    <el-container style="height: 100%;">
      <el-header>
        <!--框架顶端-->
        <div class="apex">
          <div class="title">手工全盘账解析</div>
<!--          <div class="score-bg"></div>-->
<!--          <div class="score">总计得分：90分</div>-->
<!--          <div class="backtrack" @click="exit">返回</div>-->
        </div>
      </el-header>
      <split-pane split="vertical" :min-percent='0' :default-percent='0'>
        <template slot="paneL">
          <div class="left-container">
            <ParseReferQiChu v-if="leftPanel === leftPanelType.Qi_Chu" @toggleClick="closeRefer" />
            <ParseReferJiZhang v-if="leftPanel === leftPanelType.Ji_Zhang" :type="referJiZhangType" @toggleClick="closeRefer" />
            <ParseReferTXingZhang v-if="leftPanel === leftPanelType.T_Xing_Zhang" :type="referTXingZhangType" @backClick="closeRefer" />
            <ParseReferkeMuHuiZong v-if="leftPanel === leftPanelType.Ke_Mu_Hui_Zong" :type="referKeMuHuiZongType" @toggleClick="closeRefer" />
            <ParseReferZongFenLeiZhang v-if="leftPanel === leftPanelType.Zong_Fen_Lei" :type="referZongFenLeiType" @toggleClick="closeRefer" />
            <ParseReferSanLanMingXiZhang v-if="leftPanel === leftPanelType.Ming_Xi_Fen_Lei" :answerType="referMingXiType" @toggleClick="closeRefer" />
          </div>
        </template>
        <template slot="paneR">
          <el-container class="right-container">
            <el-scrollbar class="page-component_scroll">
              <el-aside :width="asideWidth">
                <div class="left-list-top">
                  <i class="el-icon-s-unfold" v-if="isCollapse" @click="showLeftList"></i>
                  <i class="el-icon-s-fold" v-else @click="showLeftList"></i>
                </div>
                <el-menu
                  class="el-menu-vertical-demo left-list-list"
                  unique-opened
                  :default-active="defaultMenu"
                  :collapse="isCollapse">
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-edit-outline"></i>
                      <span slot="title">填制记账凭证</span>
                    </template>
                    <el-menu-item v-for="(item, index) in companyInfo['business']" :key="index" :index="'3-' + (index + 1)" @click="changeSystem(index, 'ji-zhang')">
                      {{ index + 1 }}、{{ item['abstract'] }}
                    </el-menu-item>
                  </el-submenu>
                  <el-submenu index="4">
                    <template slot="title">
                      <i class="el-icon-document"></i>
                      <span slot="title">日记账</span>
                    </template>
                    <el-menu-item index="4-1" @click="changeSystem(0, 'xian-jin-ri-ji')">现金日记账</el-menu-item>
                    <el-menu-item index="4-2" @click="changeSystem(1, 'yin-hang-ri-ji')">银行存款日记账</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-notebook-2"></i>
                      <span slot="title">明细分类账</span>
                    </template>
                    <el-menu-item index="5-1" @click="changeSystem(0, 'ming-xi-zhang')">三栏式明细账</el-menu-item>
                    <el-menu-item index="5-2" @click="changeSystem(1, 'zeng-zhi-ming-xi-zhang')">应交增值税明细账</el-menu-item>
                    <el-menu-item index="5-3" @click="changeSystem(2, 'ming-xi-zhang')">数量金额式明细账</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="6" @click="changeSystem(0, 't-xing-zhang')">
                    <i class="el-icon-notebook-1"></i>
                    <span slot="title">T型账</span>
                  </el-menu-item>
                  <el-menu-item index="7" @click="changeSystem(0, 'ke-mu-hui-zong')">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">科目汇总表</span>
                  </el-menu-item>
                  <el-menu-item index="8" @click="changeSystem(0, 'zong-fen-lei-zhang')">
                    <i class="el-icon-reading"></i>
                    <span slot="title">总分类账</span>
                  </el-menu-item>
                  <el-menu-item index="9" @click="changeSystem(0, 'zi-chan-fu-zhai-biao')">
                    <i class="el-icon-data-analysis"></i>
                    <span slot="title">资产负债表</span>
                  </el-menu-item>
                  <el-menu-item index="10" @click="changeSystem(0, 'li-run-biao')">
                    <i class="el-icon-data-line"></i>
                    <span slot="title">利润表</span>
                  </el-menu-item>
                </el-menu>
              </el-aside>
            </el-scrollbar>
            <el-main class="flex-1 flex flex-column">
              <div class="center-top flex flex-justify-space-between">
<!--                <span class="course-info">本题得分：5分/（共20分）</span>-->
                <span></span>
                <!--参考-->
                <div class="">
                  <el-button type="success" size="mini">全屏查看</el-button>
                  <el-button type="success" size="mini">视频讲解</el-button>
                  <el-button v-if="system === 'ji-zhang'" size="mini" @click="back">上一题</el-button>
                  <el-button v-if="system === 'ji-zhang'" size="mini" @click="next">下一题</el-button>
                  <el-button v-if="rightMaterialShow" plain size="small" @click="isRightActive = !isRightActive">资料</el-button>
                </div>
              </div>
              <div class="flex-1 flex" style="overflow: auto">
                <div class="wrap-content-parent flex-1">
                  <div v-if="system === 'ji-zhang'" class="wrap-content flex-1">
                    <ParsePingzheng :business="currentData" :myAnswer="myAnswerJiZhang" :rightAnswer="rightAnswerJiZhang" />
                  </div>
                  <div v-if="system === 'xian-jin-ri-ji'" class="wrap-content flex-1">
                    <Parsexianjinrijizhang :myAnswer="myAnswerXianJinRiJi" :rightAnswer="rightAnswerXianJinRiJi" @clickQiChuMyAnswer="qiChuMyAnswer" @clickJiZhangMyAnswer="jiZhangMyAnswer" @clickJiZhangRightAnswer="jiZhangRightAnswer"/>
                  </div>
                  <div v-if="system === 'yin-hang-ri-ji'" class="wrap-content flex-1">
                    <Parseyinhangrijizhang :myAnswer="myAnswerYinHangRiJi" :rightAnswer="rightAnswerYinHangRiJi" @clickQiChuMyAnswer="qiChuMyAnswer" @clickJiZhangMyAnswer="jiZhangMyAnswer" @clickJiZhangRightAnswer="jiZhangRightAnswer" />
                  </div>
                  <div v-if="system === 'ming-xi-zhang'" class="wrap-content flex-1">
                    <Parsemingxizhang :myAnswer="myAnswerMingXiZhang" :rightAnswer="rightAnswerMingXiZhang" :index="index" @clickQiChuMyAnswer="qiChuMyAnswer" @clickJiZhangMyAnswer="jiZhangMyAnswer" @clickJiZhangRightAnswer="jiZhangRightAnswer" />
                  </div>
                  <div v-if="system === 'zeng-zhi-ming-xi-zhang'" class="wrap-content flex-1">
                    <Parsezengzhimingxizhang :myAnswer="myAnswerZengZhiMingXiZhang" :rightAnswer="rightAnswerZengZhiMingXiZhang" :index="index" @clickQiChuMyAnswer="qiChuMyAnswer" @clickJiZhangMyAnswer="jiZhangMyAnswer" @clickJiZhangRightAnswer="jiZhangRightAnswer" />
                  </div>
                  <div v-if="system === 't-xing-zhang'" class="wrap-content flex-1">
                    <Parsetxingzhang :myAnswer="myAnswerTXingZhang" :rightAnswer="rightAnswerTXingZhang" @clickQiChuMyAnswer="qiChuMyAnswer" @clickJiZhangMyAnswer="jiZhangMyAnswer" @clickJiZhangRightAnswer="jiZhangRightAnswer"/>
                  </div>
                  <div v-if="system === 'zong-fen-lei-zhang'" class="wrap-content flex-1">
                    <Parsezongfenleizhang :myAnswer="myAnswerZongFenLeiZhang" :rightAnswer="rightAnswerZongFenLeiZhang" @clickQiChuMyAnswer="qiChuMyAnswer" @clickKeMuHuiZongMyAnswer="keMuHuiZongMyAnswer" @clickKeMuHuiZongRightAnswer="keMuHuiZongRightAnswer" />
                  </div>
                  <div v-if="system === 'ke-mu-hui-zong'" class="wrap-content flex-1">
                    <Parsekemuhuizong :myAnswer="myAnswerKeMuHuiZong" :rightAnswer="rightAnswerKeMuHuiZong" @clickJiZhangMyAnswer="jiZhangMyAnswer"  @clickTXingZhangMyAnswer="tXingZhangMyAnswer" @clickTXingZhangRightAnswer="tXingZhangRightAnswer"/>
                  </div>
                  <div v-if="system === 'zi-chan-fu-zhai-biao'" class="wrap-content flex-1">
                    <parsezichanfuzhai :myAnswer="myAnswerZiChanFuZhai" :rightAnswer="rightAnswerZiChanFuZhai" @clickQiChuMyAnswer="qiChuMyAnswer" @clickMingXiMyAnswer="mingXiMyAnswer" @clickMingXiRightAnswer="mingXiRightAnswer" @clickZongFenLeiMyAnswer="zongFenLeiMyAnswer" @clickZongFenLeiRightAnswer="zongFenLeiRightAnswer"/>
                  </div>
                  <div v-if="system === 'li-run-biao'" class="wrap-content flex-1">
                    <Parselirun :myAnswer="myAnswerLiRun" :rightAnswer="rightAnswerLiRun" @clickQiChuMyAnswer="qiChuMyAnswer" @clickMingXiMyAnswer="mingXiMyAnswer" @clickMingXiRightAnswer="mingXiRightAnswer" @clickZongFenLeiMyAnswer="zongFenLeiMyAnswer" @clickZongFenLeiRightAnswer="zongFenLeiRightAnswer"/>
                  </div>
                </div>
                <div v-if="rightMaterialShow" v-show="isRightActive" class="material-parent" style="height: 100%">
                  <Material :material-data="currentData?currentData.resource!==''?JSON.parse(currentData.resource):[]:[]" />
                </div>
              </div>
            </el-main>
          </el-container>
        </template>
      </split-pane>
    </el-container>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import Material from '../main/components/Material/Material'
import ParsePingzheng from './components/pingzheng'
import Parsexianjinrijizhang from './components/xianjinrijizhang'
import Parseyinhangrijizhang from './components/yinhangrijizhang'
import Parsemingxizhang from './components/mingxizhang'
import Parsezengzhimingxizhang from './components/zengzhimingxizhang'
import Parsetxingzhang from './components/txingzhang'
import Parsezongfenleizhang from './components/zongfenleizhang'
import Parsekemuhuizong from './components/kemuhuizong'
import Parsezichanfuzhai from './components/zichanfuzhai'
import Parselirun from './components/lirun'
import ParseReferQiChu from './components/Refer/ReferQiChu'
import ParseReferJiZhang from './components/Refer/ReferJiZhang'
import ParseReferTXingZhang from './components/Refer/ReferTXingZhang'
import ParseReferkeMuHuiZong from './components/Refer/ReferKeMuHuiZong'
import ParseReferZongFenLeiZhang from './components/Refer/ReferZongFenLeiZhang'
import ParseReferSanLanMingXiZhang from './components/Refer/ReferMingXiFenLeiZhang'
export default {
  name: 'Index',
  components: { ParseReferSanLanMingXiZhang, ParseReferZongFenLeiZhang, ParseReferkeMuHuiZong, ParseReferTXingZhang, ParseReferJiZhang, ParseReferQiChu, Parselirun, Parsezichanfuzhai, Parsekemuhuizong, Parsezongfenleizhang, Parsetxingzhang, Parsezengzhimingxizhang, Parsemingxizhang, Parseyinhangrijizhang, Parsexianjinrijizhang, splitPane, ParsePingzheng, Material },
  data () {
    return {
      isCollapse: false,
      asideWidth: '240px',
      companyInfo: {},
      defaultMenu: '3-1',
      index: 0,
      system: '',
      handleData: [],
      currentData: {},
      rightMaterialShow: false,
      isRightActive: false,
      rightAnswerJiZhang: {},
      myAnswerJiZhang: {},
      rightAnswerXianJinRiJi: {},
      myAnswerXianJinRiJi: {},
      rightAnswerYinHangRiJi: [],
      myAnswerYinHangRiJi: [],
      rightAnswerMingXiZhang: [],
      myAnswerMingXiZhang: [],
      rightAnswerZengZhiMingXiZhang: {},
      myAnswerZengZhiMingXiZhang: {},
      rightAnswerTXingZhang: [],
      myAnswerTXingZhang: [],
      rightAnswerZongFenLeiZhang: [],
      myAnswerZongFenLeiZhang: [],
      rightAnswerKeMuHuiZong: {},
      myAnswerKeMuHuiZong: {},
      rightAnswerZiChanFuZhai: {},
      myAnswerZiChanFuZhai: {},
      rightAnswerLiRun: {},
      myAnswerLiRun: {},
      leftPanel: 2, // 1：流程图 2：期初余额 3：记账凭证
      leftPanelShow: false,
      referJiZhangType: 1,
      referTXingZhangType: 1,
      referKeMuHuiZongType: 1,
      referMingXiType: 1,
      referZongFenLeiType: 1
    }
  },
  computed: {
    // 左侧收缩栏类型
    leftPanelType () {
      return this.$store.state.leftPanelType
    },
    id () {
      return this.$route.params.company_id
    }
  },
  created () {
    this.initData()
  },
  watch: {
    index (value) {
      let system = this.system
      switch (system) {
        case 'ji-zhang':
          this.handleData = this.companyInfo['business']
          this.currentData = this.handleData[this.index]
          this.rightMaterialShow = true
          this.isRightActive = true
          // 取第一张凭证的信息
          this.rightAnswerJiZhang = this.$store.state.answer['pingZheng'][this.index] ? this.$store.state.answer['pingZheng'][this.index] : {}
          this.myAnswerJiZhang = this.$store.state.record['pingZheng'][this.index] ? this.$store.state.record['pingZheng'][this.index] : {}
          break
        case 'xian-jin-ri-ji':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerXianJinRiJi = this.$store.state.answer['riJiZhang'][0]['answer']
          this.myAnswerXianJinRiJi = this.$store.state.record['riJiZhang'][0]['answer'] ? this.$store.state.record['riJiZhang'][0]['answer'] : {}
          break
        case 'yin-hang-ri-ji':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerYinHangRiJi = this.$store.state.answer['riJiZhang'][1]['answer']
          this.myAnswerYinHangRiJi = this.$store.state.record['riJiZhang'][1]['answer'] ? this.$store.state.record['riJiZhang'][1]['answer'] : []
          break
        case 'ming-xi-zhang':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerMingXiZhang = this.$store.state.answer['minXiZhang'][value]['answer']
          this.myAnswerMingXiZhang = this.$store.state.record['minXiZhang'][value]['answer'] ? this.$store.state.record['minXiZhang'][value]['answer'] : []
          break
        case 'zeng-zhi-ming-xi-zhang':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerZengZhiMingXiZhang = this.$store.state.answer['minXiZhang'][value]['answer']
          this.myAnswerZengZhiMingXiZhang = this.$store.state.record['minXiZhang'][value]['answer'] ? this.$store.state.record['minXiZhang'][value]['answer'] : []
          break
        case 't-xing-zhang':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerTXingZhang = this.$store.state.answer['TXingZhang']['answer']
          this.myAnswerTXingZhang = this.$store.state.record['TXingZhang']['answer'] ? this.$store.state.record['TXingZhang']['answer'] : []
          break
        case 'zong-fen-lei-zhang':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerZongFenLeiZhang = this.$store.state.answer['zongFenLeiZhang']['answer']
          this.myAnswerZongFenLeiZhang = this.$store.state.record['zongFenLeiZhang']['answer'] ? this.$store.state.record['zongFenLeiZhang']['answer'] : []
          break
        case 'ke-mu-hui-zong':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerKeMuHuiZong = this.$store.state.answer['keMuHuiZong']
          this.myAnswerKeMuHuiZong = this.$store.state.record['keMuHuiZong'] ? this.$store.state.record['keMuHuiZong'] : {}
          break
        case 'zi-chan-fu-zhai-biao':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerZiChanFuZhai = this.$store.state.answer['ziChanFuZhaiBiao']
          this.myAnswerZiChanFuZhai = this.$store.state.record['ziChanFuZhaiBiao'] ? this.$store.state.record['ziChanFuZhaiBiao'] : {}
          break
        case 'li-run-biao':
          this.rightMaterialShow = false
          this.isRightActive = false
          this.rightAnswerLiRun = this.$store.state.answer['liRunBiao']
          this.myAnswerLiRun = this.$store.state.record['liRunBiao'] ? this.$store.state.record['liRunBiao'] : {}
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
    initData () {
      // 取业务 取正确答案 取用户答案
      // 取当前企业的基本信息
      window.axios.get(`${window.studentHost}/stu/manual/company`).then(response => {
        let res = response.data
        if (!res.error_code) {
          // 保存企业信息
          this.$store.commit('SAVE_COMPANY_INFO', res.data)
          this.companyInfo = res.data
          // 取正确答案
          this.getAnswer()
          // 取用户答题记录
          this.getRecord(this.companyInfo.id)
          // 渲染数据
          this.system = 'ji-zhang'
          this.handleData = this.companyInfo['business']
          this.currentData = this.handleData[this.index]
          this.rightMaterialShow = true
          this.isRightActive = true
        } else {
          this.$message.error('未找到企业信息')
          // todo 跳转
        }
      })
    },
    changeSystem (index, system) {
      this.index = index
      this.system = system
      this.leftPanelShow = false
      if (system === 'ji-zhang') {
        this.rightMaterialShow = true
        this.isRightActive = true
        this.handleData = this.$store.state.companyInfo.business
        this.currentData = this.handleData[this.index]
        this.rightAnswerJiZhang = this.$store.state.answer['pingZheng'][this.index] ? this.$store.state.answer['pingZheng'][this.index] : {}
        this.myAnswerJiZhang = this.$store.state.record['pingZheng'][this.index] ? this.$store.state.record['pingZheng'][this.index] : {}
      }
      if (system === 'xian-jin-ri-ji') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerXianJinRiJi = this.$store.state.answer['riJiZhang'][this.index]['answer']
        this.myAnswerXianJinRiJi = this.$store.state.record['riJiZhang'][this.index]['answer'] ? this.$store.state.record['riJiZhang'][this.index]['answer'] : {}
      }
      if (system === 'yin-hang-ri-ji') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerYinHangRiJi = this.$store.state.answer['riJiZhang'][this.index]['answer']
        this.myAnswerYinHangRiJi = this.$store.state.record['riJiZhang'][this.index]['answer'] ? this.$store.state.record['riJiZhang'][this.index]['answer'] : []
      }
      if (system === 'ming-xi-zhang') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerMingXiZhang = this.$store.state.answer['minXiZhang'][this.index]['answer']
        this.myAnswerMingXiZhang = this.$store.state.record['minXiZhang'][this.index]['answer'] ? this.$store.state.record['minXiZhang'][this.index]['answer'] : []
      }
      if (system === 'zeng-zhi-ming-xi-zhang') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerZengZhiMingXiZhang = this.$store.state.answer['minXiZhang'][this.index]['answer']
        this.myAnswerZengZhiMingXiZhang = this.$store.state.record['minXiZhang'][this.index]['answer'] ? this.$store.state.record['minXiZhang'][this.index]['answer'] : []
      }
      if (system === 't-xing-zhang') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerTXingZhang = this.$store.state.answer['TXingZhang']['answer']
        this.myAnswerTXingZhang = this.$store.state.record['TXingZhang']['answer'] ? this.$store.state.record['TXingZhang']['answer'] : []
      }
      if (system === 'zong-fen-lei-zhang') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerZongFenLeiZhang = this.$store.state.answer['zongFenLeiZhang']['answer']
        this.myAnswerZongFenLeiZhang = this.$store.state.record['zongFenLeiZhang']['answer'] ? this.$store.state.record['zongFenLeiZhang']['answer'] : []
      }
      if (system === 'ke-mu-hui-zong') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerKeMuHuiZong = this.$store.state.answer['keMuHuiZong']
        this.myAnswerKeMuHuiZong = this.$store.state.record['keMuHuiZong'] ? this.$store.state.record['keMuHuiZong'] : {}
      }
      if (system === 'zi-chan-fu-zhai-biao') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerZiChanFuZhai = this.$store.state.answer['ziChanFuZhaiBiao']
        this.myAnswerZiChanFuZhai = this.$store.state.record['ziChanFuZhaiBiao'] ? this.$store.state.record['ziChanFuZhaiBiao'] : {}
      }
      if (system === 'li-run-biao') {
        this.rightMaterialShow = false
        this.isRightActive = false
        this.rightAnswerLiRun = this.$store.state.answer['liRunBiao']
        this.myAnswerLiRun = this.$store.state.record['liRunBiao'] ? this.$store.state.record['liRunBiao'] : {}
      }
    },
    // 期初余额的点击事件【切换左侧参考页面内容】
    qiChuMyAnswer () {
      if (this.leftPanel === this.leftPanelType.Qi_Chu) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Qi_Chu
      }
    },
    jiZhangMyAnswer () {
      this.referJiZhangType = 1
      if (this.leftPanel === this.leftPanelType.Ji_Zhang) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ji_Zhang
      }
    },
    jiZhangRightAnswer () {
      this.referJiZhangType = 2
      if (this.leftPanel === this.leftPanelType.Ji_Zhang) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ji_Zhang
      }
    },
    tXingZhangMyAnswer () {
      this.referTXingZhangType = 1
      if (this.leftPanel === this.leftPanelType.T_Xing_Zhang) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.T_Xing_Zhang
      }
    },
    tXingZhangRightAnswer () {
      this.referTXingZhangType = 2
      if (this.leftPanel === this.leftPanelType.T_Xing_Zhang) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.T_Xing_Zhang
      }
    },
    keMuHuiZongMyAnswer () {
      this.referKeMuHuiZongType = 1
      if (this.leftPanel === this.leftPanelType.Ke_Mu_Hui_Zong) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ke_Mu_Hui_Zong
      }
    },
    keMuHuiZongRightAnswer () {
      this.referTXingZhangType = 2
      if (this.leftPanel === this.leftPanelType.Ke_Mu_Hui_Zong) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ke_Mu_Hui_Zong
      }
    },
    mingXiMyAnswer () {
      this.referMingXiType = 1
      if (this.leftPanel === this.leftPanelType.Ming_Xi_Fen_Lei) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ming_Xi_Fen_Lei
      }
    },
    mingXiRightAnswer () {
      this.referMingXiType = 2
      if (this.leftPanel === this.leftPanelType.Ming_Xi_Fen_Lei) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Ming_Xi_Fen_Lei
      }
    },
    zongFenLeiMyAnswer () {
      this.referZongFenLeiType = 1
      if (this.leftPanel === this.leftPanelType.Zong_Fen_Lei) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Zong_Fen_Lei
      }
    },
    zongFenLeiRightAnswer () {
      this.referZongFenLeiType = 2
      if (this.leftPanel === this.leftPanelType.Zong_Fen_Lei) {
        this.leftPanelShow = !this.leftPanelShow
      } else {
        if (!this.leftPanelShow) {
          this.leftPanelShow = true
        }
        this.leftPanel = this.leftPanelType.Zong_Fen_Lei
      }
    },
    // 关闭参考
    closeRefer () {
      this.leftPanelShow = false
    },
    getAnswer () {
      // 取正确答案记录
      window.axios.get(`${window.studentHost}/stu/manual/${this.id}/parse`).then(response => {
        let res = response.data
        if (!res.error_code) {
          if (res.data.length > 0) {
            // 数组转成对象
            const answer = res.data.data[0]
            // 现金日记账
            if (answer['riJiZhang'][0] && answer['riJiZhang'][0]['answer'] && Array.isArray(answer['riJiZhang'][0]['answer'])) {
              answer['riJiZhang'][0]['answer'] = this.arrayToObj(answer['riJiZhang'][0]['answer'])
            }
            // 增值税明细账
            if (answer['minXiZhang'][1] && answer['minXiZhang'][1]['answer'] && Array.isArray(answer['minXiZhang'][1]['answer'])) {
              answer['minXiZhang'][1]['answer'] = this.arrayToObj(answer['minXiZhang'][1]['answer'])
            }
            // 科目汇总表
            if (Array.isArray(answer['keMuHuiZong'])) {
              answer['keMuHuiZong'] = this.arrayToObj(answer['keMuHuiZong'])
            }
            // 资产负债表
            if (Array.isArray(answer['ziChanFuZhaiBiao'])) {
              answer['ziChanFuZhaiBiao'] = this.arrayToObj(answer['ziChanFuZhaiBiao'])
            }
            // 利润表
            if (Array.isArray(answer['liRunBiao'])) {
              answer['liRunBiao'] = this.arrayToObj(answer['liRunBiao'])
            }
            this.$store.commit('SAVE_ANSWER', answer)
            // 取第一张凭证的信息
            this.rightAnswerJiZhang = this.$store.state.answer['pingZheng'][this.index]
          }
        } else {
          this.$message.error('未获取到正确答案')
          setTimeout(() => {
            this.$router.push('/home')
          }, 1000)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getRecord (companyId) {
      // 取用户记录
      window.axios.post(`${window.studentHost}/stu/manual/record`, { sx_id: 1, company_id: companyId }).then(response => {
        let res = response.data
        if (!res.error_code) {
          if (res.data) {
            // 数组转成对象
            const answer = JSON.parse(res.data)
            // 记账凭证
            if (answer['pingzheng'] && Array.isArray(answer['pingzheng'])) {
              answer['pingzheng'] = this.arrayToObj(answer['pingzheng'])
            }
            // 现金日记账
            if (answer['riJiZhang'][0] && answer['riJiZhang'][0]['answer'] && Array.isArray(answer['riJiZhang'][0]['answer'])) {
              answer['riJiZhang'][0]['answer'] = this.arrayToObj(answer['riJiZhang'][0]['answer'])
            }
            // 增值税明细账
            if (answer['minXiZhang'][1] && answer['minXiZhang'][1]['answer'] && Array.isArray(answer['minXiZhang'][1]['answer'])) {
              answer['minXiZhang'][1]['answer'] = this.arrayToObj(answer['minXiZhang'][1]['answer'])
            }
            // 科目汇总表
            if (Array.isArray(answer['keMuHuiZong'])) {
              answer['keMuHuiZong'] = this.arrayToObj(answer['keMuHuiZong'])
            }
            // 资产负债表
            if (Array.isArray(answer['ziChanFuZhaiBiao'])) {
              answer['ziChanFuZhaiBiao'] = this.arrayToObj(answer['ziChanFuZhaiBiao'])
            }
            // 利润表
            if (Array.isArray(answer['liRunBiao'])) {
              answer['liRunBiao'] = this.arrayToObj(answer['liRunBiao'])
            }
            this.$store.commit('SAVE_RECORD', answer)
            this.myAnswerJiZhang = this.$store.state.record['pingZheng'][this.index] ? this.$store.state.record['pingZheng'][this.index] : {}
          }
        } else {
          this.$message.error('操作失败')
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    arrayToObj (arrayData) {
      let obj = {}
      arrayData.forEach((value, index) => {
        obj[index] = value
      })
      return obj
    },
    showLeftList () {
      if (this.isCollapse) {
        this.isCollapse = false
        this.asideWidth = '240px'
      } else {
        this.isCollapse = true
        setTimeout(() => {
          this.asideWidth = '64px'
        }, 0)
      }
    },
    back () {
      if (this.index <= 0) {
        this.$message.warning('已经是第一题了')
        return false
      }
      this.defaultMenu = this.defaultMenu.substring(0, 2) + (parseInt(this.defaultMenu.substring(2, this.defaultMenu.length)) - 1)
      this.index--
    },
    next () {
      if (this.index >= this.handleData.length - 1) {
        this.$message.warning('已经是最后一题了')
        return false
      }
      this.defaultMenu = this.defaultMenu.substring(0, 2) + (parseInt(this.defaultMenu.substring(2, this.defaultMenu.length)) + 1)
      this.index++
    },
    exit () {
    }
  }
}
</script>

<style>
  .parse-index .page-component_scroll{
    height: 100%;
    overflow-x: hidden;
    background-color: #ffffff;
    border-right: solid 1px #E8E8E8;
  }
  .parse-index .page-component_scroll .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
  .parse-index .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    border-right: 0;
  }
  .parse-index .el-menu{
    border-right: 0;
  }
</style>
<style lang="scss" scoped>
  .parse-index{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .apex {
      .title{
        position: absolute;
        top: 10px;
        left: 25px;
        font-size: 16px;
      }
      .score-bg{
        position: absolute;
        top: 5px;
        left: 165px;
        width: 165px;
        height: 30px;
        background-color: #ffffff;
        filter:alpha(Opacity=20);
        -moz-opacity:0.2;
        opacity: 0.2;
      }
      .score{
        position: absolute;
        top: 12px;
        left: 200px;
        color: #ffffff;
        font-size: 13px;
      }
      .backtrack{
        position: absolute;
        right: 0;
        top: 0;
        width: 110px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        background-color: #2A68B2;
        font-size: 13px;
        cursor: pointer;
      }
    }
    .left-container{
      height: 100%;
      background-color: #FFFFFF;
      overflow: auto;
    }
    .right-container {
      height: 100%;
      width: 100%;
      overflow-y: hidden;
      overflow-x: auto;
    }
    .left-list-top{
      text-align: right;
      height: 45px;
      border-bottom: 1px solid #E8E8E8;
    }
    .center-top{
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #E8E8E8;
      background-color: #ffffff;
      padding: 0 15px 0 15px;
      .course-info{
        color: #FF0000;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .left-list-top i{
      margin-top: 12px;
      margin-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
    .left-list-list li{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
  .el-header{
    padding: 0;
    background-color: #3A81D6;
    color: #ffffff;
    height: 40px !important;
    position: relative;
  }
  .el-aside {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #333;
    /*border-right: 1px solid #E4E4E4;*/
    overflow-x: hidden;
  }
  .el-main {
    padding: 0;
    background-color: #F0F2F5;
    color: #333;
    .wrap-content-parent{
      padding: 10px;
      height: auto;
      overflow: auto;
      background-color: transparent;
      .wrap-content{
        min-height: 100%;
        height: auto;
        overflow-y: auto;
        background-color: transparent;
      }
    }
  }
</style>
