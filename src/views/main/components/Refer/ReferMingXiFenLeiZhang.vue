<template>
  <div class="sanLanMingXiZhang flex flex-column">
    <div class="title flex flex-justify-space-between">
      <div class="flex-1 flex flex-align-center">
        <span class="icon-span"></span>
        <span class="ml-10">明细分类账</span>
      </div>
      <div class="w-20 flex flex-align-center"><i class="el-icon-circle-close col-9 cursor-pointer" @click="click"></i></div>
    </div>
    <div class="filter h-50 flex flex-align-center flex-justify-space-between">
      <div class="flex flex-align-center">
        <span class="font-12">业务：</span>
        <el-select v-model="yeWuIndex" placeholder="请选择" size="mini">
          <el-option v-for="(item, index) in initData" :key="index" :label="item.abstract" :value="index"></el-option>
        </el-select>
      </div>
    </div>
    <div v-if="type === timuType.Cao_Zuo">
      <ReferZengZhiMingXiZhang :title="title" :index="yeWuIndex"/>
    </div>
    <div v-if="type === timuType.KeMu_CaoZuo">
      <ReferSanLanMingXiZhangCatalog v-if="page === 1" :index="yeWuIndex" :title="title" @toggleClick="editSubject"/>
      <ReferSanLanMingXiZhangDetail v-else :subject-index="tableIndex" :index="yeWuIndex" @toggleClick="backToSubject"/>
    </div>
  </div>
</template>

<script>
import ReferSanLanMingXiZhangCatalog from './ReferSanLanMingXiZhangCatalog'
import ReferSanLanMingXiZhangDetail from './ReferSanLanMingXiZhangDetail'
import ReferZengZhiMingXiZhang from './ReferZengZhiMingXiZhang'
export default {
  name: 'SanLanMingXiZhang',
  data () {
    return {
      page: 1,
      initData: [],
      yeWuIndex: 0,
      type: '',
      title: '',
      tableIndex: 0
    }
  },
  components: { ReferSanLanMingXiZhangCatalog, ReferSanLanMingXiZhangDetail, ReferZengZhiMingXiZhang },
  created () {
    this.init()
  },
  computed: {
    timuType () {
      return this.$store.state.tiMuType
    }
  },
  watch: {
    yeWuIndex (value) {
      this.type = this.initData[value].type
      this.title = this.initData[value].abstract
      this.page = 1
    }
  },
  methods: {
    init () {
      this.initData = this.$store.state.answer['minXiZhang']
      this.type = this.initData[this.yeWuIndex].type
      this.title = this.initData[this.yeWuIndex].abstract
    },
    // 切换到详情页
    editSubject (index) {
      this.tableIndex = index
      this.page = 2
    },
    // 切换到科目填写页
    backToSubject () {
      this.page = 1
    },
    click () {
      this.$emit('toggleClick')
    }
  }
}
</script>
<style lang="scss" scoped>
  .sanLanMingXiZhang{
    min-width: 600px;
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
  }
</style>
