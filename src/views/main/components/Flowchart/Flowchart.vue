<template>
  <div class="flowchart">
    <div class="content flex-1">
      <div class="header">会计实训全能班-系统流程图</div>
      <div class="flex content-wrap">
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
              <router-link to="/main/basic-info">
                <div class="card">
                  <svg class="icon" aria-hidden="true" style="padding-left:10px;padding-bottom: 20px;font-size: 120px;">
                    <use xlink:href="#iconlejieqiyexinxi"></use>
                  </svg>
                </div>
              </router-link>
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
export default {
  name: 'Flowchart'
}
</script>
<style lang="scss" scoped>
  .flowchart{
    width: 100%;
    .content{
      width: 600px;
      margin: 0 auto;
      height: 100%;
      background-color: #FFFFFF;
      box-sizing: border-box;
      .header{
        width: 550px;
        margin: 0 auto;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: #FFFFFF;
        font-size: 24px;
        background-color: #3A81D6;
        letter-spacing: 1px;
      }
      .content-wrap{
        /*padding-top: 30px;*/
        height: 820px;
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
          padding-left: 30px;
          /*margin-top: 20px;*/
          .tab{
            margin-right: 30px;
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
