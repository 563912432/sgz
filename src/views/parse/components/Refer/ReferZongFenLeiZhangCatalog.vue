<template>
  <div class="ParseReferZongFenLeiZhangCatalog">
<!--    <el-button @click="editSubject">点击切换页面</el-button>-->
    <div class="title">
      <span>总分类账 - 账目目录表</span>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">科目名称</div>
        <div class="w-96 border-right-bottom-grey flex flex-align-center flex-justify-center bold">页码</div>
        <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">查看账页</div>
      </div>
      <div class="content-table-yinhang-rijizhang font-12">
        <div v-for="(item, index) in tableData" :key="index" class="flex h-50 position-relative" :class="index + 1 === active?'bg-green':''" >
          <!--一级科目-->
          <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center">{{ item.subject_name }}</div>
          <!--页码-->
          <div class="w-96 border-right-bottom-grey flex flex-align-center flex-justify-center">{{ item.page }}</div>
          <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-button type="text" size="small" @click="editSubject(item, index)">查看</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ParseReferZongFenLeiZhangCatalog',
  data () {
    return {
      tableData: [
        { subject_name: '', page: '' }
      ],
      active: 0
    }
  },
  props: {
    type: {
      type: Number,
      required: true,
      defaults: 1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let answer = {}
      if (this.type === 1) {
        answer = this.$store.state['record']['zongFenLeiZhang']['answer']
      } else {
        answer = this.$store.state['answer']['zongFenLeiZhang']['answer']
      }
      // 初始数据
      if (answer[0]['subject_name'] !== '' || answer[0]['page'] !== '') {
        this.tableData = answer
      } else {
        this.tableData = []
      }
    },
    editSubject (item, index) {
      this.$emit('toggleClick', index)
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
</style>
<style lang="scss" scoped>
 .ParseReferZongFenLeiZhangCatalog{
   width: 100%;
   color: #333333;
   padding: 20px 0;
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
