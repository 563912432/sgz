<template>
  <div class="home">
    <Header />
    <div class="content mt-20 flex">
      <div class="content-left flex flex-column">
        <div class="left-card flex-1 pt-20 pl-40 pr-40">
          <div class="title mb-20">01 基础资料</div>
          <div class="wrap">&nbsp;&nbsp;&nbsp;&nbsp;本模块包括“了解企业信息”和“期初余额”两部分。通过“了解企业信息”模块，能够了解到企业的基本情况， 这项工作是我们进入企业后首先需要做的事项。“期初余额”是该企业截至11月底的财务基础数据。</div>
        </div>
        <div class="left-card flex-1 pt-20 pl-40 pr-40">
          <div class="title mb-20">02 填制凭证</div>
          <div class="wrap">包括“原始凭证”和“记账凭证”。这个模块是整个课程中的核心模块，也是学员必须要全面、细致进行操作的模块。 学员在本模块中可以见到与实际工作中真实单据样式完全相同的电子彩色原始凭证。</div>
        </div>
        <div class="left-card flex-1 pt-20 pl-40 pr-40">
          <div class="title mb-20">03 登记账簿</div>
          <div class="wrap">主要是根据前面填制的凭证进行登账操作。包括明细账、日记账、总账登记，同时根据科目汇总表账务处理程序下的会计操作流程， 设置了T型账的登记以及科目汇总表的编制，依据编制的科目汇总表来登记总账。</div>
        </div>
        <div class="left-card flex-1 pt-20 pl-40 pr-40">
          <div class="title mb-20">04 编制报表</div>
          <div class="wrap">这项操作设置了资产负债表和利润表的编制操作，需要学员根据前面所有操作自行编制会计报表，编制完成之后点击“保存”来保存数据</div>
        </div>
      </div>
      <div class="content-right ml-20 flex-1 flex">
        <div class="right-line-div">
          <div class="tag tag1">01 基础资料</div>
          <div class="flex flex-column flex-align-center">
            <div class="line line1"></div>
            <div class="line-arrow"><i class="el-icon-caret-bottom"></i></div>
          </div>
          <div class="tag tag2">02 填制凭证</div>
          <div class="flex flex-column flex-align-center">
            <div class="line line2"></div>
            <div class="line-arrow"><i class="el-icon-caret-bottom"></i></div>
          </div>
          <div class="tag tag3">03 登记账簿</div>
          <div class="flex flex-column flex-align-center">
            <div class="line line3"></div>
            <div class="line-arrow"><i class="el-icon-caret-bottom"></i></div>
          </div>
          <div class="tag">04 编制报表</div>
        </div>
        <div class="right-tab-div flex flex-column">
          <!--第一行 基础资料-->
          <div class="flex-1 flex flex-align-center">
            <div class="tab text-center">
<!--              <router-link to="/main/basic-info">-->
                <div class="card" @click="toUrl">
                  <svg class="icon" aria-hidden="true" style="padding-left:10px;padding-bottom: 20px;font-size: 120px;">
                    <use xlink:href="#iconlejieqiyexinxi"></use>
                  </svg>
                </div>
<!--              </router-link>-->
              <div class="card-title">了解企业信息</div>
            </div>
            <div class="tab text-center">
              <router-link to="/main/qi-chu">
                <div class="card">
                  <svg class="icon" aria-hidden="true" style="box-sizing:border-box;padding-left: 15px;padding-bottom:10px;font-size: 105px">
                    <use xlink:href="#iconqichuyue"></use>
                  </svg>
                </div>
              </router-link>
              <div class="card-title">期初余额</div>
            </div>
          </div>
          <!--第二行 填制凭证-->
          <div class="flex-1 flex flex-align-center">
            <div class="tab text-center">
              <router-link to="/main/ji-zhang">
                <div class="card">
                  <svg class="icon" aria-hidden="true" style="box-sizing:border-box;padding-left: 10px;padding-bottom:20px;font-size: 120px">
                    <use xlink:href="#icontianzhijizhangpingzheng"></use>
                  </svg>
                </div>
              </router-link>
              <div class="card-title">填制记账凭证</div>
            </div>
          </div>
          <!--第三行 登记账簿-->
          <div class="flex-2 flex flex-column">
            <div class="flex flex-1 flex-align-center">
              <div class="tab text-center">
                <router-link to="/main/ri-ji-zhang">
                  <div class="card">
                    <svg class="icon" aria-hidden="true" style="font-size: 85px">
                      <use xlink:href="#iconrijizhang"></use>
                    </svg>
                  </div>
                </router-link>
                <div class="card-title">日记账</div>
              </div>
              <div class="tab text-center">
                <router-link to="/main/ming-xi-zhang">
                  <div class="card">
                    <svg class="icon" aria-hidden="true" style="padding-left: 10px;font-size: 100px">
                      <use xlink:href="#iconmingxifenleizhang"></use>
                    </svg>
                  </div>
                </router-link>
                <div class="card-title">明细分类账</div>
              </div>
            </div>
            <div class="flex-1 flex flex-align-center">
              <div class="tab text-center">
                <router-link to="/main/t-xing-zhang">
                  <div class="card">
                    <svg class="icon" aria-hidden="true" style="padding-left: 10px;font-size: 100px">
                      <use xlink:href="#iconTxingzhang"></use>
                    </svg>
                  </div>
                </router-link>
                <div class="card-title">T型账</div>
              </div>
              <div class="tab text-center">
                <router-link to="/main/ke-mu-hui-zong">
                  <div class="card">
                    <svg class="icon" aria-hidden="true" style="box-sizing: border-box;padding-left: 5px;padding-bottom:5px;font-size: 80px">
                      <use xlink:href="#iconkemuhuizongbiao"></use>
                    </svg>
                  </div>
                </router-link>
                <div class="card-title">科目汇总表</div>
              </div>
              <div class="tab text-center">
                <router-link to="/main/zong-fen-lei-zhang">
                  <div class="card">
                    <svg class="icon" aria-hidden="true" style="box-sizing:border-box;padding-left: 5px;padding-bottom:5px;font-size: 80px">
                      <use xlink:href="#iconzongfenleizhang"></use>
                    </svg>
                  </div>
                </router-link>
                <div class="card-title">总分类账</div>
              </div>
            </div>
          </div>
          <!--第四行 编制报表-->
          <div class="flex-1 flex flex-align-center">
            <div class="tab text-center">
              <router-link to="/main/zi-chan-fu-zhai-biao">
                <div class="card">
                  <svg class="icon" aria-hidden="true" style="padding-left: 5px;">
                    <use xlink:href="#iconzichanfuzhaibiao"></use>
                  </svg>
                </div>
              </router-link>
              <div class="card-title">资产负债表</div>
            </div>
            <div class="tab text-center">
              <router-link to="/main/li-run-biao">
                <div class="card">
                  <svg class="icon" aria-hidden="true" style="padding-left: 5px;">
                    <use xlink:href="#iconlirunbiao"></use>
                  </svg>
                </div>
              </router-link>
              <div class="card-title">利润表</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from '../../utils/index'
import Header from './components/Header'
export default {
  name: 'Home',
  components: { Header },
  computed: {
    role () {
      return this.$route.params.role
    },
    trade_id () {
      return this.$route.params.company_id
    },
    basicKeMu () {
      return this.$store.state.basicKeMu
    }
  },
  data () {
    return {
      subjectData: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      if (parseInt(getCookie('scope')) === 1) {
        // 老师
        if (this.trade_id) {
          // 保存企业id跳转使用
          sessionStorage.setItem('sgz_company_id', this.trade_id)
          window.axios.get(`${window.adminHost}/admin/manual/company/${this.trade_id}`).then(response => {
            let res = response.data
            if (!res.error_code) {
              // 保存企业信息
              this.$store.commit('SAVE_COMPANY_INFO', res.data)
              // 处理科目信息
              let subject = JSON.parse(res.data['subject'])
              this.subjectData = this.basicKeMu
              // 合成最终结果
              if (subject) {
                this.subjectData.forEach(v => {
                  let data = this.getTree(subject, v.id)
                  if (data.length > 0) {
                    this.$set(v, 'children', data)
                  }
                })
              }
              this.$store.commit('SAVE_COMPANY_SUBJECT', subject)
              this.$store.commit('SAVE_KE_MU_INFO', this.deepTraversal(this.subjectData))
              this.getAnswer()
            } else {
              this.$message.error('未找到企业信息')
              // todo 跳转
            }
          })
          // 取当前企业的基本信息
        } else {
          this.$message.error('缺少企业标识参数')
        }
      }
      if (parseInt(getCookie('scope')) === 3) {
        // 学生
        window.axios.get(`${window.studentHost}/stu/manual/company`).then(response => {
          console.log(response)
          let res = response.data
          if (!res.error_code) {
            // 保存企业信息
            this.$store.commit('SAVE_COMPANY_INFO', res.data)
            sessionStorage.setItem('sgz_company_id', res.data.id)
            // 处理科目信息
            let subject = JSON.parse(res.data['subject'])
            this.subjectData = this.basicKeMu
            // 合成最终结果
            if (subject) {
              this.subjectData.forEach(v => {
                let data = this.getTree(subject, v.id)
                if (data.length > 0) {
                  this.$set(v, 'children', data)
                }
              })
            }
            // 角色 学生 开始时间
            let start = Date.parse(new Date()) / 1000
            this.$store.commit('SAVE_KE_MU_INFO', this.deepTraversal(this.subjectData))
            sessionStorage.setItem('sgz_start_at', start.toString())
            this.getRecord(res.data.id)
          }
        })
      }
    },
    getAnswer () {
      // 取答案记录
      window.axios.get(`${window.adminHost}/admin/manual/answer/${this.trade_id}`).then(response => {
        let res = response.data
        if (!res.error_code) {
          if (res.data.length > 0) {
            // 数组转成对象
            const answer = res.data[0]
            // 现金日记账
            if (answer['riJiZhang'][0] && answer['riJiZhang'][0]['answer'] && Array.isArray(answer['riJiZhang'][0]['answer'])) {
              answer['riJiZhang'][0]['answer'] = this.arrayToObj(answer['riJiZhang'][0]['answer'])
            }
            // 增值税明细账
            if (answer['minXiZhang'][1] && answer['minXiZhang'][1]['answer'] && Array.isArray(answer['minXiZhang'][1]['answer'])) {
              answer['minXiZhang'][1]['answer'] = this.arrayToObj(answer['minXiZhang'][1]['answer'])
            }
            // 科目汇总表
            if (Array.isArray(answer['keMuHuiZong'])) {
              answer['keMuHuiZong'] = this.arrayToObj(answer['keMuHuiZong'])
            }
            // 资产负债表
            if (Array.isArray(answer['ziChanFuZhaiBiao'])) {
              answer['ziChanFuZhaiBiao'] = this.arrayToObj(answer['ziChanFuZhaiBiao'])
            }
            // 利润表
            if (Array.isArray(answer['liRunBiao'])) {
              answer['liRunBiao'] = this.arrayToObj(answer['liRunBiao'])
            }
            this.$store.commit('SAVE_ANSWER', answer)
          }
        } else {
          this.$message.error('请求失败')
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getRecord (companyId) {
      // 取用户记录
      window.axios.post(`${window.studentHost}/stu/manual/record`, { sx_id: 1, company_id: companyId }).then(response => {
        let res = response.data
        if (res.data) {
          // 数组转成对象
          const answer = JSON.parse(res.data)
          // 现金日记账
          if (answer['riJiZhang'][0] && answer['riJiZhang'][0]['answer'] && Array.isArray(answer['riJiZhang'][0]['answer'])) {
            answer['riJiZhang'][0]['answer'] = this.arrayToObj(answer['riJiZhang'][0]['answer'])
          }
          // 增值税明细账
          if (answer['minXiZhang'][1] && answer['minXiZhang'][1]['answer'] && Array.isArray(answer['minXiZhang'][1]['answer'])) {
            answer['minXiZhang'][1]['answer'] = this.arrayToObj(answer['minXiZhang'][1]['answer'])
          }
          // 科目汇总表
          if (Array.isArray(answer['keMuHuiZong'])) {
            answer['keMuHuiZong'] = this.arrayToObj(answer['keMuHuiZong'])
          }
          // 资产负债表
          if (Array.isArray(answer['ziChanFuZhaiBiao'])) {
            answer['ziChanFuZhaiBiao'] = this.arrayToObj(answer['ziChanFuZhaiBiao'])
          }
          // 利润表
          if (Array.isArray(answer['liRunBiao'])) {
            answer['liRunBiao'] = this.arrayToObj(answer['liRunBiao'])
          }
          this.$store.commit('SAVE_ANSWER', answer)
        }
      }).catch((error) => {
        console.log(error)
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
    arrayToObj (arrayData) {
      let obj = {}
      arrayData.forEach((value, index) => {
        obj[index] = value
      })
      return obj
    },
    // 树拆数组
    deepTraversal (data) {
      const result = []
      data.forEach(item => {
        const loop = data => {
          result.push({
            value: data.title
          })
          let child = data.children
          if (child) {
            for (let i = 0; i < child.length; i++) {
              loop(child[i])
            }
          }
        }
        loop(item)
      })
      return result
    },
    toUrl () {
      this.$router.replace('/main/basic-info')
    },
    getCookie (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    width: 1000px;
    margin: 0 auto;
    height: 100%;
    overflow-y: auto;
    .content{
      height: 850px;
      .content-left{
        width: 280px;
        height: 100%;
        background-color: #FFFFFF;
        .left-card{
        }
        .left-card:hover{
          cursor: default;
          background-color: #F8FBFF;
          color: #3A81D6;
        }
        .title{
          font-size: 18px;
          font-weight: bold;
        }
        .wrap{
          font-size: 14px;
          letter-spacing: 1px;
          color: #666666;
        }
      }
      .content-right{
        height: 100%;
        background-color: #FFFFFF;
        padding: 20px 50px;
        box-sizing: border-box;
        .right-line-div{
          width: 110px;
          height: 100%;
          .tag{
            width: 110px;
            padding: 5px 0;
            background: #3A81D6;
            border-radius: 4px;
            text-align: center;
            font-size: 16px;
            color: #FFFFFF;
          }
          .tag1{
            margin-top: 60px;
          }
          .line {
            width: 0.1px;
            border: 0.5px dashed #979797;
            margin-top: 10px;
          }
          .line1 {
            height: 105px;
          }
          .line2 {
            height: 185px;
          }
          .line3{
            height: 185px;
          }
          .line-arrow{
            margin-top: -5px;
          }
        }
        .right-tab-div{
          padding-left: 50px;
          .tab{
            margin-right: 45px;
            .card{
              font-size: 90px;
              width: 100px;
              height: 100px;
              line-height: 100px;
              text-align: center;
              margin-bottom: 5px;
            }
            .card:hover{
              cursor: pointer;
              box-shadow: 0 5px 10px 0 rgba(0,0,0,0.08);
              border-radius: 4px;
            }
            .card-title{
              font-size: 14px;
              font-weight: bold;
              color: #666666;
            }
          }
        }
      }
    }
  }
</style>
