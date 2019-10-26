import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
// 前端持久化存储
const vuexLocal = new VuexPersistence({
  key: 'sgz_info',
  storage: window.sessionStorage
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    // 登录用户角色
    role: '',
    // 左侧收缩栏类型
    leftPanelType: {
      Liu_Cheng_Tu: 1,
      Qi_Chu: 2,
      Ji_Zhang: 3,
      T_Xing_Zhang: 4,
      Ke_Mu_Hui_Zong: 5,
      Ming_Xi_Fen_Lei: 6,
      Zong_Fen_Lei: 7
    },
    // 题目类型
    tiMuType: {
      Cha_Kan: 1,
      Cao_Zuo: 2,
      KeMu_CaoZuo: 3
    },
    ModuleTypeState: {
      Ri_JI_Zhang: 1,
      Ming_Xi_Zhang: 2,
      T_Xing_Zhang: 3,
      Ke_Mu: 4,
      Zong_Zhang: 5
    },
    ModuleTypeStateString: {
      1: '日记账',
      2: '明细分类账',
      3: 'T型账',
      4: '科目汇总表',
      5: '总账'
    },
    tiMuTypeString: {
      1: '查看题',
      2: '操作题',
      3: '科目操作题'
    },
    // 内置的一级科目（记账凭证）
    basicKeMu: [
      { id: 1, title: '库存现金', parent_id: '0', level: '1' },
      { id: 2, title: '银行存款', parent_id: '0', level: '1' },
      { id: 3, title: '应收票据', parent_id: '0', level: '1' },
      { id: 4, title: '应收账款', parent_id: '0', level: '1' },
      { id: 5, title: '其他应收款', parent_id: '0', level: '1' },
      { id: 6, title: '原材料', parent_id: '0', level: '1' },
      { id: 7, title: '库存商品', parent_id: '0', level: '1' },
      { id: 8, title: '周转材料', parent_id: '0', level: '1' },
      { id: 9, title: '固定资产', parent_id: '0', level: '1' },
      { id: 10, title: '累计折旧', parent_id: '0', level: '1' },
      { id: 11, title: '短期借款', parent_id: '0', level: '1' },
      { id: 12, title: '应付票据', parent_id: '0', level: '1' },
      { id: 13, title: '应付账款', parent_id: '0', level: '1' },
      { id: 14, title: '应付职工薪酬', parent_id: '0', level: '1' },
      { id: 15, title: '应交税费', parent_id: '0', level: '1' },
      { id: 16, title: '应付利润', parent_id: '0', level: '1' },
      { id: 17, title: '其他应付款', parent_id: '0', level: '1' },
      { id: 18, title: '盈余公积', parent_id: '0', level: '1' },
      { id: 19, title: '本年利润', parent_id: '0', level: '1' },
      { id: 20, title: '利润分配', parent_id: '0', level: '1' },
      { id: 21, title: '生产成本', parent_id: '0', level: '1' },
      { id: 22, title: '制造费用', parent_id: '0', level: '1' },
      { id: 23, title: '主营业务收入', parent_id: '0', level: '1' },
      { id: 24, title: '其他业务收入', parent_id: '0', level: '1' },
      { id: 25, title: '营业外收入', parent_id: '0', level: '1' },
      { id: 26, title: '主营业务成本', parent_id: '0', level: '1' },
      { id: 27, title: '税金及附加', parent_id: '0', level: '1' },
      { id: 28, title: '销售费用', parent_id: '0', level: '1' },
      { id: 29, title: '管理费用', parent_id: '0', level: '1' },
      { id: 30, title: '财务费用', parent_id: '0', level: '1' },
      { id: 31, title: '所得税费用', parent_id: '0', level: '1' },
      { id: 32, title: '营业外支出', parent_id: '0', level: '1' },
      { id: 33, title: '实收资本', parent_id: '0', level: '1' },
      { id: 34, title: '应付利息', parent_id: '0', level: '1' },
      { id: 35, title: '其他业务成本', parent_id: '0', level: '1' }
    ],
    // 科目列表【完整的科目】（记账凭证）
    keMuInfo: [],
    companySubject: [],
    // 内置的日记账科目
    basicKeMuRiJi: [
      { id: 2, title: '银行存款', parent_id: '0', level: '1' }
    ],
    // 科目列表【完整的科目】（日记账）
    keMuRiJiZhangInfo: [],
    // 内置的数量金额式明细账科目
    basicKeMuShuLiangMingXi: [
      { id: 6, title: '原材料', parent_id: '0', level: '1' },
      { id: 7, title: '库存商品', parent_id: '0', level: '1' }
    ],
    // 科目列表【完整的科目】（数量金额式明细账）
    keMuShuLiangMingXiInfo: [],
    // 总的结果 【对比答案需要的结果存储】
    answer: {
      pingZheng: {},
      riJiZhang: [
        // 现金日记账记录
        { abstract: '现金日记账', type: 2, answer: {} },
        // 银行存款日记账记录
        { abstract: '银行存款日记账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }] }
      ],
      minXiZhang: [
        // 三栏式明细账记录
        { abstract: '三栏式明细账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }] },
        // 应交增值税明细账
        { abstract: '应交增值税明细账', type: 2, answer: {} },
        // 数量金额式明细账
        { abstract: '数量金额式明细账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }] }
      ],
      TXingZhang: {
        abstract: 'T型账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }]
      },
      keMuHuiZong: {},
      zongFenLeiZhang: {
        abstract: '总分类账', type: 3, answer: [{ subject_name: '', page: '', info: [] }]
      },
      ziChanFuZhaiBiao: {},
      liRunBiao: {}
    },
    companyInfo: {},
    // 用户答案
    record: {
      pingZheng: {},
      riJiZhang: [
        // 现金日记账记录
        { abstract: '现金日记账', type: 2, answer: {} },
        // 银行存款日记账记录
        { abstract: '银行存款日记账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }] }
      ],
      minXiZhang: [
        // 三栏式明细账记录
        { abstract: '三栏式明细账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }] },
        // 应交增值税明细账
        { abstract: '应交增值税明细账', type: 2, answer: {} },
        // 数量金额式明细账
        { abstract: '数量金额式明细账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }] }
      ],
      TXingZhang: {
        abstract: 'T型账', type: 3, answer: [{ subject_name: '', second_subject_name: '', page: '', info: [] }]
      },
      keMuHuiZong: {},
      zongFenLeiZhang: {
        abstract: '总分类账', type: 3, answer: [{ subject_name: '', page: '', info: [] }]
      },
      ziChanFuZhaiBiao: {},
      liRunBiao: {}
    }
  },
  mutations: {
    SAVE_ROLE (state, data) {
      state.role = data
    },
    SAVE_COMPANY_INFO (state, data) {
      state.companyInfo = data
    },
    SAVE_COMPANY_SUBJECT (state, data) {
      state.companySubject = data
    },
    SAVE_KE_MU_INFO (state, data) {
      state.keMuInfo = data
    },
    SAVE_ANSWER (state, data) {
      state.answer = data
    },
    SAVE_RECORD (state, data) {
      state.record = data
    },
    // 保存记账凭证做题记录
    SAVE_JI_ZHANG_ANSWER (state, data) {
      state.answer.pingZheng = data
    },
    // 保存日记账做题记录
    SAVE_RI_JI_ZHANG_ANSWER (state, data) {
      state.answer.riJiZhang[0]['answer'] = data
    },
    // 保存银行存款日记账的做题记录
    SAVE_YIN_HANG_RI_JI_ZHANG_ANSWER (state, data) {
      state.answer.riJiZhang[1]['answer'] = data
    },
    // 保存三栏明细账的做题记录
    SAVE_SAN_LAN_MING_XI_ANSWER (state, data) {
      state.answer.minXiZhang[0]['answer'] = data
    },
    // 保存数量金额式明细账的做题记录
    SAVE_SHU_LIANG_MING_XI_ANSWER (state, data) {
      state.answer.minXiZhang[2]['answer'] = data
    },
    // 保存应交增值税明细账的做题记录
    SAVE_ZENG_ZHI_MING_XI_ANSWER (state, data) {
      state.answer.minXiZhang[1]['answer'] = data
    },
    // 保存T型账的做题记录
    SAVE_T_XING_ZHANG_ANSWER (state, data) {
      state.answer.TXingZhang['answer'] = data
    },
    // 保存科目汇总表的做题记录
    SAVE_KE_MU_HUI_ZONG_ANSWER (state, data) {
      state.answer.keMuHuiZong = data
    },
    // 保存总分类账的做题记录
    SAVE_ZONG_FEN_LEI_ZHANG_ANSWER (state, data) {
      state.answer.zongFenLeiZhang['answer'] = data
    },
    // 保存资产负债表的做题记录
    SAVE_ZI_CHAN_FU_ZHAI_ANSWER (state, data) {
      state.answer.ziChanFuZhaiBiao = data
    },
    // 保存利润表的做题记录
    SAVE_LI_RUN_ANSWER (state, data) {
      state.answer.liRunBiao = data
    }
  },
  actions: {

  }
})
