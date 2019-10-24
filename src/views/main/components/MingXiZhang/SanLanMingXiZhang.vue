<template>
  <div class="sanLanMingXiZhang">
    <SanLanMingXiZhangCatalog v-if="page === 1" :index="index" :answer="sanLanShuLiangAnswer" @toggleClick="editSubject"/>
    <SanLanMingXiZhangDetail v-else :subject-index="tableIndex" :answer="sanLanShuLiangAnswer" :index="index" @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import SanLanMingXiZhangCatalog from './SanLanMingXiZhangCatalog'
import SanLanMingXiZhangDetail from './SanLanMingXiZhangDetail'
export default {
  name: 'SanLanMingXiZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  props: {
    index: {
      type: Number,
      required: true,
      defaults: 0
    },
    sanLanShuLiangAnswer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  components: { SanLanMingXiZhangCatalog, SanLanMingXiZhangDetail },
  methods: {
    // 切换到详情页
    editSubject (index) {
      this.tableIndex = index
      this.page = 2
    },
    // 切换到科目填写页
    backToSubject () {
      this.page = 1
    }
  }
}
</script>
<style>
  .sanLanMingXiZhang{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
  }
</style>
