<template>
  <div class="referQiChu flex flex-column">
    <div class="title flex flex-justify-space-between">
      <div class="flex-1 flex flex-align-center">
        <span class="icon-span"></span>
        <span class="ml-10">期初余额</span>
      </div>
      <div class="w-20 flex flex-align-center"><i class="el-icon-circle-close col-9 cursor-pointer" @click="click"></i></div>
    </div>
    <div class="content flex-1">
      <img v-for="(item, index) in initData['qi_chu']" :key="index" :src="'http://www.wenyunjy.com:8081' + item"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReferQiChu',
  data () {
    return {
      initData: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initData = this.$store.state.companyInfo
    },
    click () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .referQiChu{
    width: 100%;
    color: #333333;
    padding: 20px;
    .title{
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
