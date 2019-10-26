<template>
  <div class="Parsexianjinrijizhang flex">
    <div class="flex-1" style="overflow-x: auto">
      <p class="mb-12">我的答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <div class="title">
          <span>现金日记账</span>
          <span class="page font-12">第 <el-input v-model="myAnswer.page" size="mini" class="w-60"></el-input> 页</span>
        </div>
        <div class="content">
          <!--头-->
          <div class="content-header flex">
            <!--年月日-->
            <div class="w-70 flex flex-column">
              <div class="h-30 line-height-30 border-right-bottom-grey flex flex-justify-space-between pl-10 pr-10">
                <el-input v-model="myAnswer.year" size="mini" class="w-50" style="background-color: transparent"></el-input> <span>年</span>
              </div>
              <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">月</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">日</span></div>
            </div>
            <!--凭证字号-->
            <div class="w-70 flex flex-column">
              <div class="h-30 line-height-30 border-right-bottom-grey">凭证</div>
              <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">字</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">号</span></div>
            </div>
            <!--摘要-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">摘要</div>
            <!--选择-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">选择</div>
            <!--借方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
            <!--贷方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">贷方金额</div>
            <!--借或贷-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">借或贷</div>
            <!--余额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">余额</div>
          </div>
          <!--table-->
          <div class="content-table">
            <div v-for="(item, index) in myAnswer.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" >
              <div class="w-70 flex">
                <!--月-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.year" type="text" maxlength="2" size="small" style="text-align: center"/>
                </div>
                <!--日-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.day" type="text" maxlength="2" size="small"/>
                </div>
              </div>
              <div class="w-70 flex">
                <!--字-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.zi" type="text" maxlength="1" size="small"/>
                </div>
                <!--号-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.hao" type="text" maxlength="3" size="small"/>
                </div>
              </div>
              <!--摘要-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zhai_yao" type="text" size="small"/>
              </div>
              <!--选择-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-checkbox v-model="item.state" :true-label="1" :false-label="0" size="medium "/>
              </div>
              <!--借方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.jie_money" type="text" size="small"/>
              </div>
              <!--贷方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.dai_money" type="text" size="small"/>
              </div>
              <!--借或贷-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey center">
                <el-input v-model="item.jie_huo_dai" type="text" maxlength="3" size="small"/>
              </div>
              <!--余额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
                <el-input v-model="item.yu_e" type="text" maxlength="11" size="small"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 ml-10" style="overflow-x: auto">
      <p class="mb-12">正确答案</p>
      <div style="height: calc(100vh - 150px);padding: 10px;min-width: 500px" class="bg-white">
        <div class="title">
          <span>现金日记账</span>
          <span class="page font-12">第 <el-input v-model="rightAnswer.page" size="mini" class="w-60"></el-input> 页</span>
        </div>
        <div class="content">
          <!--头-->
          <div class="content-header flex">
            <!--年月日-->
            <div class="w-70 flex flex-column">
              <div class="h-30 line-height-30 border-right-bottom-grey flex flex-justify-space-between pl-10 pr-10">
                <el-input v-model="rightAnswer.year" size="mini" class="w-50" style="background-color: transparent"></el-input> <span>年</span>
              </div>
              <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">月</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">日</span></div>
            </div>
            <!--凭证字号-->
            <div class="w-70 flex flex-column">
              <div class="h-30 line-height-30 border-right-bottom-grey">凭证</div>
              <div class="flex-1 flex"><span class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">字</span><span class="flex-1 flex flex-justify-center flex-align-center border-right-bottom-grey">号</span></div>
            </div>
            <!--摘要-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">摘要</div>
            <!--选择-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">选择</div>
            <!--借方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">借方金额</div>
            <!--贷方金额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">贷方金额</div>
            <!--借或贷-->
            <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">借或贷</div>
            <!--余额-->
            <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">余额</div>
          </div>
          <!--table-->
          <div class="content-table">
            <div v-for="(item, index) in rightAnswer.table" :key="index" :class="['flex', 'h-36', 'position-relative', index + 1 === active?'bg-green':'']" >
              <div class="w-70 flex">
                <!--月-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.year" type="text" maxlength="2" size="small" style="text-align: center"/>
                </div>
                <!--日-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.day" type="text" maxlength="2" size="small"/>
                </div>
              </div>
              <div class="w-70 flex">
                <!--字-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.zi" type="text" maxlength="1" size="small"/>
                </div>
                <!--号-->
                <div class="flex-1 border-right-bottom-grey flex flex-justify-center flex-align-center center">
                  <el-input v-model="item.hao" type="text" maxlength="3" size="small"/>
                </div>
              </div>
              <!--摘要-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.zhai_yao" type="text" size="small"/>
              </div>
              <!--选择-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-checkbox v-model="item.state" :true-label="1" :false-label="0" size="medium "/>
              </div>
              <!--借方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.jie_money" type="text" size="small"/>
              </div>
              <!--贷方金额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-right-bottom-grey">
                <el-input v-model="item.dai_money" type="text" size="small"/>
              </div>
              <!--借或贷-->
              <div class="w-60 flex flex-align-center flex-justify-center border-right-bottom-grey center">
                <el-input v-model="item.jie_huo_dai" type="text" maxlength="3" size="small"/>
              </div>
              <!--余额-->
              <div class="flex-1 flex flex-align-center flex-justify-center border-bottom-grey">
                <el-input v-model="item.yu_e" type="text" maxlength="11" size="small"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Parsexianjinrijizhang',
  props: {
    myAnswer: {
      type: Object,
      required: true,
      defaults: {}
    },
    rightAnswer: {
      type: Object,
      required: true,
      defaults: {}
    }
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style>
  .pl-10{
    padding-left: 10px;
  }
  .pr-10{
    padding-right: 10px;
  }
  .w-50 {
    width: 50px;
  }
  .w-60 {
    width: 60px;
  }
  .w-70 {
    width: 70px;
  }
  .w-160 {
    width: 160px;
  }
  .h-36 {
    height: 36px;
  }
  .h-30 {
    height: 30px;
  }
  .line-height-30 {
    line-height: 30px;
  }
  .Parsexianjinrijizhang .content-header .el-input__inner{
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .Parsexianjinrijizhang .content-table .el-input__inner{
    padding: 0 5px;
    border: none;
    text-align: right;
    background-color: transparent;
  }
  .Parsexianjinrijizhang .content-table .center .el-input__inner{
    text-align: center;
  }
</style>
<style lang="scss" scoped>
.Parsexianjinrijizhang{
  position: relative;
  .title{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    position: relative;
    .page{
      position: absolute;
      right: 0;
      top: 10px;
    }
  }
  .content{
    margin-top: 35px;
    border-style: solid;
    border-color: #E8E8E8;
    border-width: 1px 1px 0 1px;
    .content-header{
      width: 100%;
      height: 65px;
      background: #F3F3F3;
      font-size: 13px;
    }
    .content-table {
      .bg-green{
        background-color: #E5F7D6;
      }
      .add-line-icon-div{
        position: absolute;
        height: 36px;
        line-height: 36px;
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
        height: 36px;
        line-height: 36px;
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
}
</style>
