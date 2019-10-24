<template>
  <div class="zongFenLeiZhang">
    <ZongFenLeiZhangCatalog v-if="page === 1" :answer="zongFenLeiZhangAnswer" @toggleClick="editSubject"/>
    <ZongFenLeiZhangDetail v-else :subject-index="tableIndex" :answer="zongFenLeiZhangAnswer"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import ZongFenLeiZhangCatalog from './ZongFenLeiZhangCatalog'
import ZongFenLeiZhangDetail from './ZongFenLeiZhangDetail'
export default {
  name: 'ZongFenLeiZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  props: {
    zongFenLeiZhangAnswer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  components: { ZongFenLeiZhangCatalog, ZongFenLeiZhangDetail },
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
  .zongFenLeiZhang{
    min-width: 900px;
  }
</style>
