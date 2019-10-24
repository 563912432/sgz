<template>
  <div class="referTXingZhang">
    <ReferTXingZhangCatalog v-if="page === 1" :index="0" @toggleClick="editSubject" @backClick="close"/>
    <ReferTXingZhangDetail v-else :subject-index="tableIndex"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import ReferTXingZhangCatalog from './ReferTXingZhangCatalog'
import ReferTXingZhangDetail from './ReferTXingZhangDetail'
export default {
  name: 'ReferTXingZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  components: { ReferTXingZhangCatalog, ReferTXingZhangDetail },
  methods: {
    // 切换到详情页
    editSubject (index) {
      this.tableIndex = index
      this.page = 2
    },
    // 切换到科目填写页
    backToSubject () {
      this.page = 1
    },
    // 关闭当前T型账
    close () {
      this.$emit('backClick')
    }
  }
}
</script>
<style>
  .referTXingZhang{
    min-width: 500px;
    /*padding: 20px;*/
  }
</style>
