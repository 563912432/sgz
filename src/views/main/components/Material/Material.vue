<template>
  <div class="material">
    <div class="title">
      <i class="el-icon-folder"></i>
      <span style="margin-left: 10px">原始资料</span>
    </div>
    <div class="content">
      <div v-for="(item, index) in materialData" :key="index" class="content-item" @click="imgDetail(index)">
        <img :src="item.url" alt="">
        <div class="item-title">{{ item.name }}</div>
      </div>
    </div>
    <el-dialog
      :title="currentData.name"
      :visible.sync="dialogVisible"
      :fullscreen="true">
      <div class="dialogDiv">
        <img :src="currentData.url" :alt="currentData.name">
        <el-button class="prevButton" type="info" icon="el-icon-arrow-left" circle  @click="prevData"/>
        <el-button class="nextButton" type="info" icon="el-icon-arrow-right" circle  @click="nextData"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Material',
  data () {
    return {
      dialogVisible: false,
      index: 0,
      currentData: {
        title: '',
        content: ''
      }
    }
  },
  props: {
    materialData: {
      type: Array,
      required: true
    }
  },
  watch: {
    index (value) {
      this.currentData = this.materialData[value]
    }
  },
  methods: {
    imgDetail (index) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.currentData = this.materialData[index]
      })
    },
    // 上一题
    prevData () {
      if (this.index <= 0) {
        return false
      }
      this.index--
    },
    // 下一题
    nextData () {
      if (this.index >= this.materialData.length - 1) {
        return false
      }
      this.index++
    }
  }
}
</script>

<style>
  .material .el-button{
    font-size: 30px;
  }
</style>
<style lang="scss" scoped>
  .material{
    width: 220px;
    height: 100%;
    background-color: #FFFFFF;
    padding: 30px 10px;
    font-size: 16px;
    text-align: center;
    .title{
      border: 1px solid #F1F1F1;
      padding: 15px 0;
    }
    .content{
      width: 100%;
      .content-item{
        position: relative;
        cursor: pointer;
        img{
          width: 100%;
          height: auto;
        }
        .item-title{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          opacity: 0.65;
          background: #000000;
          font-size: 14px;
          color: #FFFFFF;
          padding: 5px 0;
        }
      }
    }
    .dialogDiv{
      width: 100%;
      height: 100%;
      position: relative;
      img{
        width: 100%;
        height: auto;
      }
      .prevButton{
        position: absolute;
        left: 0;
        top: 40%;
      }
      .nextButton{
        position: absolute;
        right: 0;
        top: 40%;
      }
    }
  }
</style>
