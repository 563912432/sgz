<template>
  <div class="yinHangRiJiZhangCatalog">
<!--    <el-button @click="editSubject">点击切换页面</el-button>-->
    <div class="title">
      <span>银行存款日记账 - 账目目录表</span>
    </div>
    <div class="content">
      <!--头-->
      <div class="content-header flex">
        <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">科目名称</div>
        <div class="flex-2 border-right-bottom-grey flex flex-align-center flex-justify-center bold">二级科目名称</div>
        <div class="w-96 border-right-bottom-grey flex flex-align-center flex-justify-center bold">页码</div>
        <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">查看账页</div>
<!--        <div class="flex-1 border-bottom-grey flex flex-align-center flex-justify-center bold">更改页码</div>-->
      </div>
      <div class="content-table-yinhang-rijizhang">
        <div v-for="(item, index) in tableData" :key="index" class="flex h-50 position-relative" :class="index + 1 === active?'bg-green':''" @mouseover="mouseoverLine(index)" @mouseleave="mouseLeaveLine">
          <!--一级科目-->
          <div class="flex-1 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-select v-model="item.subject_name" size="small" clearable placeholder="请选择科目" class="ml-5 mr-5">
              <el-option
                v-for="(value, i) in subjectData"
                :key="i"
                :label="value.title"
                :value="value.title"></el-option>
            </el-select>
          </div>
          <!--二级科目-->
          <div class="flex-2 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
            <el-select v-model="item.second_subject_name" size="small" clearable placeholder="请选择科目" class="ml-5 mr-5" @change="(value) => selectChange(value, index)">
              <template v-if="subjectData[subjectDataNew.indexOf(item.subject_name)]">
                <el-option
                  v-for="(value, i) in subjectData[subjectDataNew.indexOf(item.subject_name)]['children']"
                  :key="i"
                  :label="value.title"
                  :value="value.title"></el-option>
              </template>
            </el-select>
          </div>
          <!--页码-->
          <div class="w-96 border-right-bottom-grey flex flex-align-center flex-justify-center bold">
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
  name: 'YinHangRiJiZhangCatalog',
  data () {
    return {
      subjectData: [], // 一级科目
      subjectDataNew: [], // 重组一级科目的数组
      subjectIndex: 0,
      tableData: [
        { subject_name: '', second_subject_name: '', page: '' }
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
          { subject_name: '', second_subject_name: '', page: '', info: [] }
        ]
      }
      // 一级科目【树】
      this.subjectData = this.$store.state.basicKeMuRiJi
      const companySubject = this.$store.state.companySubject
      this.subjectData.forEach(v => {
        let data = this.getTree(companySubject, v.id)
        if (data.length > 0) {
          this.$set(v, 'children', data)
        }
      })
      // 重组一级科目的数组
      this.subjectData.forEach(v => {
        this.subjectDataNew.push(v.title)
      })
    },
    getTree (treeData, parentId) {
      let treeArr = []
      treeData.forEach(value => {
        if (value.parent_id === parentId) {
          let newNode = { id: value.id, title: value.title, parent_id: value.parent_id, level: value.level, children: this.getTree(treeData, value.id) }
          treeArr.push(newNode)
        }
      })
      return treeArr
    },
    selectChange (value, index) {
      var counts = {}
      this.tableData.forEach(v => {
        if (v.second_subject_name !== '') {
          counts[v.second_subject_name] = (counts[v.second_subject_name] || 0) + 1
        }
      })
      if (counts[value] > 1) {
        this.$message.warning('请勿重复选择科目')
        this.tableData[index].second_subject_name = ''
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
      this.tableData.push({ subject_name: '', second_subject_name: '', page: '', info: [] })
    },
    // 删行 有值清空数据，没值删除行
    removeLine (index) {
      if (this.tableData[index].subject_name !== '' || this.tableData[index].second_subject_name !== '' || this.tableData[index].page !== '') {
        this.tableData[index].subject_name = ''
        this.tableData[index].second_subject_name = ''
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
    // 保存答案
    saveAnswer () {
      this.$store.commit('SAVE_YIN_HANG_RI_JI_ZHANG_ANSWER', this.tableData)
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
 .yinHangRiJiZhangCatalog{
   width: 1000px;
   margin: 0 auto;
   color: #333333;
   padding: 20px;
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
