<template>
  <div class="Parsetxingzhang flex">
    <div class="flex-1" style="overflow-x: auto">
      <p class="mb-12">我的答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <ParsetxingzhangCategory v-if="myAnswerPage === 1" :type="'myAnswer'" :answer="myAnswer" @toggleClick="editSubject"/>
        <ParsetxingzhangDetail v-else :subject-index="myAnswerTableIndex" :type="'myAnswer'" :answer="myAnswer"  @toggleClick="backToSubject" />
      </div>
    </div>
    <div class="flex-1" style="overflow-x: auto">
      <p class="mb-12">正确答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <ParsetxingzhangCategory v-if="rightAnswerPage === 1" :type="'rightAnswer'" :answer="rightAnswer" @toggleClick="editSubject"/>
        <ParsetxingzhangDetail v-else :subject-index="rightAnswerTableIndex" :type="'rightAnswer'" :answer="rightAnswer"  @toggleClick="backToSubject" />
      </div>
    </div>
  </div>
</template>

<script>
import ParsetxingzhangCategory from './txingzhangCategory'
import ParsetxingzhangDetail from './txingzhangDetail'
export default {
  name: 'Parsetxingzhang',
  components: { ParsetxingzhangDetail, ParsetxingzhangCategory },
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
      myAnswerTableIndex: 0
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
    }
  }
}
</script>

<style scoped>

</style>
