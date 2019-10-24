<template>
  <div class="ReferZongFenLeiZhang">
    <div class="title flex flex-justify-space-between">
      <div class="flex-1 flex flex-align-center">
        <span class="icon-span"></span>
        <span class="ml-10">总分类账</span>
      </div>
      <div class="w-20 flex flex-align-center"><i class="el-icon-circle-close col-9 cursor-pointer" @click="click"></i></div>
    </div>
    <ReferZongFenLeiZhangCatalog v-if="page === 1" @toggleClick="editSubject"/>
    <ReferZongFenLeiZhangDetail v-else :subject-index="tableIndex"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import ReferZongFenLeiZhangCatalog from './ReferZongFenLeiZhangCatalog'
import ReferZongFenLeiZhangDetail from './ReferZongFenLeiZhangDetail'
export default {
  name: 'ReferZongFenLeiZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  components: { ReferZongFenLeiZhangCatalog, ReferZongFenLeiZhangDetail },
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
    click () {
      this.$emit('toggleClick')
    }
  }
}
</script>
<style lang="scss" scoped>
  .ReferZongFenLeiZhang{
    min-width: 500px;
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
