<template>
  <div class="yinhangRiJiZhang">
    <YinHangRiJiZhangCatalog v-if="page === 1" :answer="riJiZhangAnswer" @toggleClick="editSubject"/>
    <YinHangRiJiZhangDetail v-else :subject-index="tableIndex" :answer="riJiZhangAnswer"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import YinHangRiJiZhangCatalog from './YinHangRiJiZhangCatalog'
import YinHangRiJiZhangDetail from './YinHangRiJiZhangDetail'
export default {
  name: 'YinhangRiJiZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  props: {
    riJiZhangAnswer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  components: { YinHangRiJiZhangCatalog, YinHangRiJiZhangDetail },
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
</style>
