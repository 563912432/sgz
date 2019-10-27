<template>
  <div class="ParseReferTXingZhang">
    <ParseReferTXingZhangCatalog :type="type" v-if="page === 1" :index="0" @toggleClick="editSubject" @backClick="close"/>
    <ParseReferTXingZhangDetail :type="type"  v-else :subject-index="tableIndex"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import ParseReferTXingZhangCatalog from './ReferTXingZhangCatalog'
import ParseReferTXingZhangDetail from './ReferTXingZhangDetail'
export default {
  name: 'ParseReferTXingZhang',
  components: { ParseReferTXingZhangDetail, ParseReferTXingZhangCatalog },
  props: {
    type: {
      type: Number,
      required: true,
      defaults: 1
    }
  },
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
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
  .ParseReferTXingZhang{
    min-width: 500px;
    /*padding: 20px;*/
  }
</style>
