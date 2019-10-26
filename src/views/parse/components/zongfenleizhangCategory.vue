<template>
  <div class="ParsezongfenleizhangCategory">
    <div class="title">
      <span>总分类账 - 账目目录表</span>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">科目名称</div>
        <div class="w-160 border-right-bottom-grey flex flex-align-center flex-justify-center bold">页码</div>
        <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">查看账页</div>
      </div>
      <div class="content-table-yinhang-rijizhang">
        <div v-for="(item, index) in answer" :key="index" class="flex h-50 position-relative" :class="index + 1 === active?'bg-green':''">
          <!--一级科目-->
          <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-select v-model="item.subject_name" disabled size="small" clearable placeholder="请选择科目" class="ml-5 mr-5"></el-select>
          </div>
          <!--页码-->
          <div class="w-160 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-input v-model="item.page" readonly size="small" type="text" maxlength="2" class="ml-5 mr-5"></el-input>
          </div>
          <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-button type="text" size="small" @click="editSubject(item, index, type)">编辑</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ParsezongfenleizhangCategory',
  data () {
    return {
      active: 0
    }
  },
  props: {
    answer: {
      type: Array,
      required: true,
      defaults: []
    },
    type: {
      type: String,
      required: true,
      defaults: ''
    }
  },
  methods: {
    editSubject (item, index, type) {
      if (item.subject_name === '' || item.page === '') {
        this.$message.warning('请先完善当前行信息')
      } else {
        this.$emit('toggleClick', index, type)
      }
    }
  }
}
</script>
<style>
  .w-60 {
    width: 60px;
  }
  .ml-5 {
    margin-left: 5px;
  }
  .mr-5 {
    margin-right: 5px;
  }
  .ParsezongfenleizhangCategory .el-input.is-disabled .el-input__inner{
    background-color: transparent;
  }
</style>
<style lang="scss" scoped>
  .ParsezongfenleizhangCategory{
    width: 100%;
    margin: 0 auto;
    color: #333333;
    padding: 10px;
    .title{
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 1px;
      position: relative;
    }
    .content {
      margin-top: 15px;
      border-style: solid;
      border-color: #E8E8E8;
      border-width: 1px 1px 0 1px;
      .content-header{
        width: 100%;
        height: 40px;
        background: #ffffff;
        font-size: 13px;
      }
      .bg-green{
        background-color: #E5F7D6;
      }
      .add-line-icon-div{
        position: absolute;
        height: 50px;
        line-height: 50px;
        width: 30px;
        left: -30px;
        text-align: center;
        top: 0;
      }
      .add-line-icon{
        font-size: 20px;
        color: #6DC3EA;
        cursor: pointer;
      }
      .remove-line-icon-div{
        position: absolute;
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 30px;
        right: -30px;
        top: 0;
      }
      .remove-line-icon{
        font-size: 20px;
        color: #F74C23;
        cursor: pointer;
      }
    }
  }
</style>
