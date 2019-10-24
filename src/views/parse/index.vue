<template>
  <div class="parse-index">
    <el-container style="height: 100%;">
      <el-header>
        <!--框架顶端-->
        <div class="apex">
          <div class="title">手工全盘账解析</div>
          <div class="score-bg"></div>
          <div class="score">总计得分：90分</div>
          <div class="backtrack">返回</div>
        </div>
      </el-header>
      <el-container>
        <el-scrollbar class="page-component_scroll">
          <el-aside :width="asideWidth">
            <div class="left-list-top">
              <i class="el-icon-s-unfold" v-if="isCollapse" @click="showLeftList"></i>
              <i class="el-icon-s-fold" v-else @click="showLeftList"></i>
            </div>
            <el-menu
              default-active="3-1"
              class="el-menu-vertical-demo left-list-list"
              unique-opened
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse">
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">填制记账凭证</span>
                </template>
                <el-menu-item index="3-1" @click="toUrl">1:销售（赊购）</el-menu-item>
                <el-menu-item index="3-2">2:销售（电汇收款）</el-menu-item>
                <el-menu-item index="3-3">3:收货款（承兑）</el-menu-item>
                <el-menu-item index="3-4">4.备用提金</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">日记账</span>
                </template>
                <el-menu-item index="4-1">现金日记账</el-menu-item>
                <el-menu-item index="4-2">银行存款日记账</el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-notebook-2"></i>
                  <span slot="title">明细分类账</span>
                </template>
                <el-menu-item index="5-1">三栏式明细账-1</el-menu-item>
                <el-menu-item index="5-2">三栏式明细账-2</el-menu-item>
                <el-menu-item index="5-3">应交增值税明细账</el-menu-item>
                <el-menu-item index="5-4">数量金额式明细账</el-menu-item>
              </el-submenu>
              <el-menu-item index="6">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">T型账</span>
              </el-menu-item>
              <el-menu-item index="7">
                <i class="el-icon-document-copy"></i>
                <span slot="title">科目汇总表</span>
              </el-menu-item>
              <el-menu-item index="8">
                <i class="el-icon-reading"></i>
                <span slot="title">总分类账</span>
              </el-menu-item>
              <el-menu-item index="9">
                <i class="el-icon-data-analysis"></i>
                <span slot="title">资产负债表</span>
              </el-menu-item>
              <el-menu-item index="10">
                <i class="el-icon-data-line"></i>
                <span slot="title">利润表</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </el-scrollbar>
        <el-main>
          <div class="centent-top">
            <span class="fl course-info">本题得分：5分/（共20分）</span>
            <div class="fr">
              <el-button type="success" size="mini">全屏查看</el-button>
              <el-button type="success" size="mini">视频讲解</el-button>
              <!--<el-button size="mini">上一题</el-button>-->
              <!--<el-button size="mini">下一题</el-button>-->
            </div>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      isCollapse: false,
      asideWidth: '240px'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    showLeftList () {
      if (this.isCollapse) {
        this.isCollapse = false
        this.asideWidth = '240px'
      } else {
        this.isCollapse = true
        setTimeout(() => {
          this.asideWidth = '64px'
        }, 0)
      }
    },
    toUrl () {
      console.log(123)
    }
  }
}
</script>

<style>
  .parse-index .page-component_scroll{
    height: 100%;
    overflow-x: hidden;
    background-color: #ffffff;
    border-right: solid 1px #E8E8E8;
  }
  .parse-index .page-component_scroll .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
  .parse-index .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    border-right: 0;
  }
  .parse-index .el-menu{
    border-right: 0;
  }
</style>
<style lang="scss" scoped>
  .parse-index{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .apex {
      .title{
        position: absolute;
        top: 10px;
        left: 25px;
        font-size: 16px;
      }
      .score-bg{
        position: absolute;
        top: 5px;
        left: 165px;
        width: 165px;
        height: 30px;
        background-color: #ffffff;
        filter:alpha(Opacity=20);
        -moz-opacity:0.2;
        opacity: 0.2;
      }
      .score{
        position: absolute;
        top: 12px;
        left: 200px;
        color: #ffffff;
        font-size: 13px;
      }
      .backtrack{
        position: absolute;
        right: 0;
        top: 0;
        width: 110px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        background-color: #2A68B2;
        font-size: 13px;
        cursor: pointer;
      }
    }
    .left-list-top{
      text-align: right;
      height: 45px;
      border-bottom: 1px solid #E8E8E8;
    }
    .centent-top{
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #E8E8E8;
      background-color: #ffffff;
      padding: 0 15px 0 15px;
      .course-info{
        color: #FF0000;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .left-list-top i{
      margin-top: 12px;
      margin-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
    .left-list-list li{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
  .el-header{
    padding: 0;
    background-color: #3A81D6;
    color: #ffffff;
    height: 40px !important;
    position: relative;
  }
  .el-aside {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #333;
    /*border-right: 1px solid #E4E4E4;*/
    overflow-x: hidden;
  }
  .el-main {
    padding: 0;
    background-color: #F0F2F5;
    color: #333;
  }
</style>
