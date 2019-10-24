<template>
  <div class="TXingZhang">
    <TXingZhangCatalog v-if="page === 1" :answer="TXingZhangAnswer" @toggleClick="editSubject"/>
    <TXingZhangDetail v-else :subject-index="tableIndex" :answer="TXingZhangAnswer"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import TXingZhangCatalog from './TXingZhangCatalog'
import TXingZhangDetail from './TXingZhangDetail'
export default {
  name: 'TXingZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  props: {
    TXingZhangAnswer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  components: { TXingZhangCatalog, TXingZhangDetail },
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
  .TXingZhang{
    min-width: 900px;
  }
</style>
