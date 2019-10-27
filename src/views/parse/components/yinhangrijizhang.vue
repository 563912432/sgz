<template>
  <div class="Parseyinhangrijizhang flex">
    <div v-if="leftShow"  class="flex-1" style="overflow-x: auto">
      <div class="mb-12 flex flex-justify-space-between pl-10 pr-10">
        <span>
          <el-button plain size="small" @click="qiChuMyAnswer">期初余额</el-button>
          <el-button plain size="small" @click="jiZhangMyAnswer">记账凭证</el-button>
        </span>
        <span>
          <el-button v-if="leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-right" circle @click="showLeft"></el-button>
          <el-button v-if="leftShow && !rightShow" type="primary" size="small" icon="el-icon-d-arrow-left" circle @click="rightShow = !rightShow"></el-button>
        </span>
      </div>
      <p class="mb-12">我的答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <ParseyinghangrijizhangCategory v-if="myAnswerPage === 1" :type="'myAnswer'" :answer="myAnswer" @toggleClick="editSubject"/>
        <ParseyinghangrijizhangDetail v-else :subject-index="myAnswerTableIndex" :type="'myAnswer'" :answer="myAnswer"  @toggleClick="backToSubject" />
      </div>
    </div>
    <div v-if="rightShow"  class="flex-1" style="overflow-x: auto">
      <div class="mb-12 flex flex-justify-space-between pl-10 pr-10">
        <span>
          <el-button plain size="small" @click="qiChuMyAnswer">期初余额</el-button>
          <el-button plain size="small" @click="jiZhangRightAnswer">记账凭证</el-button>
        </span>
        <span>
          <el-button v-if="leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-left" circle @click="showRight"></el-button>
          <el-button v-if="!leftShow && rightShow" type="primary" size="small" icon="el-icon-d-arrow-right" circle @click="leftShow = !leftShow"></el-button>
        </span>
      </div>
      <p class="mb-12">正确答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <ParseyinghangrijizhangCategory v-if="rightAnswerPage === 1" :type="'rightAnswer'" :answer="rightAnswer" @toggleClick="editSubject"/>
        <ParseyinghangrijizhangDetail v-else :subject-index="rightAnswerTableIndex" :type="'rightAnswer'" :answer="rightAnswer"  @toggleClick="backToSubject" />
      </div>
    </div>
  </div>
</template>

<script>
import ParseyinghangrijizhangCategory from './yinghangrijizhangCategory'
import ParseyinghangrijizhangDetail from './yinghangrijizhangDetail'
export default {
  name: 'Parseyinhangrijizhang',
  components: { ParseyinghangrijizhangDetail, ParseyinghangrijizhangCategory },
  props: {
    myAnswer: {
      type: Array,
      required: true,
      defaults: []
    },
    rightAnswer: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  data () {
    return {
      rightAnswerPage: 1,
      rightAnswerTableIndex: 0,
      myAnswerPage: 1,
      myAnswerTableIndex: 0,
      leftShow: true,
      rightShow: true
    }
  },
  methods: {
    // 正确答案切换到详情页
    editSubject (index, type) {
      if (type === 'rightAnswer') {
        this.rightAnswerTableIndex = index
        this.rightAnswerPage = 2
      } else {
        this.myAnswerTableIndex = index
        this.myAnswerPage = 2
      }
    },
    // 正确答案切换到科目填写页
    backToSubject (type) {
      if (type === 'rightAnswer') {
        this.rightAnswerPage = 1
      } else {
        this.myAnswerPage = 1
      }
    },
    showLeft () {
      this.rightShow = false
      this.leftShow = true
    },
    showRight () {
      this.rightShow = true
      this.leftShow = false
    },
    qiChuMyAnswer () {
      this.$emit('clickQiChuMyAnswer')
    },
    jiZhangMyAnswer () {
      this.$emit('clickJiZhangMyAnswer')
    },
    jiZhangRightAnswer () {
      this.$emit('clickJiZhangRightAnswer')
    }
  }
}
</script>

<style scoped>

</style>
