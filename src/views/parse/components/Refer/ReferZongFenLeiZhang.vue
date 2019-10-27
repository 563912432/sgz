<template>
  <div class="ParseReferZongFenLeiZhang">
    <div class="title flex flex-justify-space-between">
      <div class="flex-1 flex flex-align-center">
        <span class="icon-span"></span>
        <span class="ml-10">总分类账</span>
      </div>
      <div class="w-20 flex flex-align-center"><i class="el-icon-circle-close col-9 cursor-pointer" @click="click"></i></div>
    </div>
    <ParseReferZongFenLeiZhangCatalog :type="type" v-if="page === 1" @toggleClick="editSubject"/>
    <ParseReferZongFenLeiZhangDetail :type="type" v-else :subject-index="tableIndex"  @toggleClick="backToSubject"/>
  </div>
</template>

<script>
import ParseReferZongFenLeiZhangCatalog from './ReferZongFenLeiZhangCatalog'
import ParseReferZongFenLeiZhangDetail from './ReferZongFenLeiZhangDetail'
export default {
  name: 'ParseReferZongFenLeiZhang',
  data () {
    return {
      page: 1,
      tableIndex: 0
    }
  },
  props: {
    type: {
      type: Number,
      required: true,
      defaults: 1
    }
  },
  components: { ParseReferZongFenLeiZhangCatalog, ParseReferZongFenLeiZhangDetail },
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
  .ParseReferZongFenLeiZhang{
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
