<template>
  <div class="Parsemingxizhang flex">
    <div class="flex-1" style="overflow-x: auto">
      <p class="mb-12">我的答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <ParsemingxizhangCategory v-if="myAnswerPage === 1" :type="'myAnswer'" :index="index" :answer="myAnswer" @toggleClick="editSubject"/>
        <ParsemingxizhangDetail v-else :subject-index="myAnswerTableIndex" :type="'myAnswer'" :index="index" :answer="myAnswer"  @toggleClick="backToSubject" />
      </div>
    </div>
    <div class="flex-1" style="overflow-x: auto">
      <p class="mb-12">正确答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <ParsemingxizhangCategory v-if="rightAnswerPage === 1" :index="index" :type="'rightAnswer'" :answer="rightAnswer" @toggleClick="editSubject"/>
        <ParsemingxizhangDetail v-else :subject-index="rightAnswerTableIndex" :index="index" :type="'rightAnswer'" :answer="rightAnswer"  @toggleClick="backToSubject" />
      </div>
    </div>
  </div>
</template>

<script>
import ParsemingxizhangCategory from './mingxizhangCategory'
import ParsemingxizhangDetail from './mingxizhangDetail'
export default {
  name: 'Parsemingxizhang',
  components: { ParsemingxizhangDetail, ParsemingxizhangCategory },
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
    },
    index: {
      type: Number,
      required: true,
      defaults: ''
    }
  },
  watch: {
    index () {
      this.initData()
    }
  },
  data () {
    return {
      rightAnswerPage: 1,
      rightAnswerTableIndex: 0,
      myAnswerPage: 1,
      myAnswerTableIndex: 0
    }
  },
  methods: {
    initData () {
      this.rightAnswerPage = 1
      this.rightAnswerTableIndex = 0
      this.myAnswerPage = 1
      this.myAnswerTableIndex = 0
    },
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
    }
  }
}
</script>

<style scoped>

</style>
