<template>
  <div class="zongFenLeiZhangCatalog">
<!--    <el-button @click="editSubject">点击切换页面</el-button>-->
    <div class="title">
      <span>总分类账 - 账目目录表</span>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">科目名称</div>
        <div class="w-160 border-right-bottom-grey flex flex-align-center flex-justify-center bold">页码</div>
        <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">查看账页</div>
<!--        <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">更改页码</div>-->
      </div>
      <div class="content-table-yinhang-rijizhang">
        <div v-for="(item, index) in tableData" :key="index" class="flex h-50 position-relative" :class="index + 1 === active?'bg-green':''" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <!--一级科目-->
          <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-select v-model="item.subject_name" size="small" clearable placeholder="请选择科目" class="ml-5 mr-5" @change="(value) => selectChange(value, index)">
              <el-option
                v-for="(value, i) in subjectData"
                :key="i"
                :label="value.title"
                :value="value.title"></el-option>
            </el-select>
          </div>
          <!--页码-->
          <div class="w-160 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-input v-model="item.page" size="small" type="text" maxlength="2" class="ml-5 mr-5"></el-input>
          </div>
          <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-button type="text" size="small" @click="editSubject(item, index)">编辑</el-button>
          </div>
          <!--<div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-button type="text" size="small">更改页码</el-button>
          </div>-->
          <!--增行按钮-->
          <div v-show="index + 1 === active" class="add-line-icon-div">
            <i class="el-icon-circle-plus-outline add-line-icon" @click="addLine"></i>
          </div>
          <!--减少按钮-->
          <div v-show="index + 1 === active" class="remove-line-icon-div">
            <i class="el-icon-remove-outline remove-line-icon" @click="removeLine(index)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-15 text-left">
      <el-button type="primary" size="small" @click="saveAnswer">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZongFenLeiZhangCatalog',
  data () {
    return {
      subjectData: [], // 一级科目
      subjectIndex: 0,
      tableData: [
        { subject_name: '', page: '', info: [] }
      ],
      active: 0
    }
  },
  props: {
    answer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 初始数据
      if (this.answer.length > 0) {
        this.tableData = this.answer
      } else {
        this.tableData = [
          { subject_name: '', page: '', info: [] }
        ]
      }
      // 一级科目【树】
      this.subjectData = this.$store.state.basicKeMu
    },
    selectChange (value, index) {
      var counts = {}
      this.tableData.forEach(v => {
        if (v.subject_name !== '') {
          counts[v.subject_name] = (counts[v.subject_name] || 0) + 1
        }
      })
      if (counts[value] > 1) {
        this.$message.warning('请勿重复选择科目')
        this.tableData[index].subject_name = ''
      }
    },
    editSubject (item, index) {
      if (item.subject_name === '' || item.page === '') {
        this.$message.warning('请先完善当前行信息')
      } else {
        this.$emit('toggleClick', index)
      }
    },
    // 增行
    addLine () {
      this.tableData.push({ subject_name: '', page: '', info: [] })
    },
    // 删行 有值清空数据，没值删除行
    removeLine (index) {
      if (this.tableData[index].subject_name !== '' || this.tableData[index].page !== '') {
        this.tableData[index].subject_name = ''
        this.tableData[index].page = ''
        this.tableData[index].info = []
      } else if (this.tableData.length >= 2) {
        this.tableData.splice(index, 1)
      }
    },
    mouseoverLine (index) {
      this.active = index + 1
    },
    mouseLeaveLine () {
      this.active = 0
    },
    saveAnswer () {
      this.$store.commit('SAVE_ZONG_FEN_LEI_ZHANG_ANSWER', this.tableData)
      this.$message.success('保存成功')
      console.log(this.$store.state.answer)
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
 .zongFenLeiZhangCatalog{
   width: 1000px;
   color: #333333;
   padding: 20px;
   margin: 0 auto;
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
