<template>
  <div class="adminIndex">
    <div class="font-13 mb-12 bold flex flex-justify-space-between flex-align-center">
      <span>全盘账管理</span>
      <el-button type="primary" size="small" @click="addCompany">企业新增</el-button>
    </div>
    <div v-if="companyData.length > 0">
      <div class="header flex flex-justify-space-between font-13">
      <span class="bold">
        <span>企业名称：</span><span>{{ companyData[0]['trade_name'] }}</span>
      </span>
        <span>
          <el-button type="text" size="mini" @click="subject(companyData[0].id)">科目设置</el-button>
          <el-button type="text" size="mini" @click="addBusiness(companyData[0].id)">新增业务</el-button>
          <el-button type="text" size="mini" @click="toSaveAnswer(companyData[0].id)">答案绑定</el-button>
          <el-button type="text" size="mini" @click="editCompany(companyData[0])">编辑</el-button>
          <el-button type="text" size="mini" @click="delCompany(companyData[0].id)">删除</el-button>
        </span>
      </div>
      <div>
        <el-table
          size="mini"
          :data="companyData[0]['business']"
          border
          class="mb-12"
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column label="业务摘要" width="" align="" >
            <template slot-scope="{ row }">
              {{ row.abstract  }}
            </template>
          </el-table-column>
          <el-table-column label="业务内容" width="" align="" >
            <template slot-scope="{ row }">
              {{ row.content  }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="{row}">
              <el-button type="text" size="mini" @click="editBusiness(row, companyData[0]['id'])">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="delBusiness(row, companyData[0]['id'])">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination class="text-center" small layout="prev, pager, next" :page-size="pageQuery.page_size" :current-page="pageQuery.page" :total="total" @current-change="changePageIndex"></el-pagination>
      </div>
    </div>
    <div v-else class="text-center font-13 col-9">
      暂无数据
    </div>
    <!--科目管理-->
    <div v-if="dialogSubjectVisible">
      <el-dialog v-el-drag-dialog class="subject-dialog" width="450px" :modal="false" :close-on-click-modal="false" title="科目管理" :visible.sync="dialogSubjectVisible" @dragDialog="handleSubjectDrag">
        <div ref="subjectDiv">
          <Subject :company-id="companyId" :data="subjectData"/>
        </div>
      </el-dialog>
    </div>
    <!--企业管理-->
    <el-dialog v-el-drag-dialog class="company-dialog" width="900px" :modal="false" :close-on-click-modal="false" title="企业管理" :visible.sync="dialogCompanyVisible" @dragDialog="handleCompanyDrag">
      <div style="height: 600px;overflow-y: auto;padding: 20px">
        <el-form ref="companyForm" :rules="companyRules" :model="companyFormData" label-position="left" label-width="85px">
          <el-form-item label="企业名称" prop="trade_name">
            <el-input v-model="companyFormData.trade_name" size="mini" />
          </el-form-item>
          <el-form-item label="背景信息">
            <quill-editor v-model="companyFormData.material" :options="editorOption"></quill-editor>
          </el-form-item>
          <el-form-item label="期初余额表">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="listQiChu"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div ref="divCompany" slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="saveCompany('companyForm')">
          确定
        </el-button>
        <el-button size="mini" plain @click="dialogCompanyVisible = false">
          返回
        </el-button>
      </div>
    </el-dialog>
    <!--业务管理-->
    <div v-if="dialogBusinessVisible">
      <el-dialog v-el-drag-dialog class="business-dialog" width="900px" :modal="false" :close-on-click-modal="false" title="业务管理" :visible.sync="dialogBusinessVisible" @dragDialog="handleBusinessDrag">
        <div ref="businessDiv">
          <Business :company-id="companyId" :business-data="businessData" @save="saveBusiness"/>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
import Subject from './components/subject'
import Business from './components/business'
import { Quill } from 'vue-quill-editor'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name: 'AdminIndex',
  components: { Business, Subject },
  directives: { elDragDialog },
  data () {
    return {
      activeName: 'first',
      companyData: [],
      subjectData: [],
      businessData: {},
      // listCompanyLoading: false,
      dialogSubjectVisible: false,
      companyId: 0,
      dialogCompanyVisible: false,
      companyRules: {
        trade_name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }]
      },
      companyFormData: {
        trade_name: '',
        material: '',
        qi_chu: ''
      },
      pageQuery: {
        page: 1,
        page_size: 1
      },
      total: 0,
      dialogBusinessVisible: false,
      listQiChu: [],
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            size: 1, // 单位为M, 1M = 1024KB
            action: window.host + 'uploadEditorImg',
            response: (res) => {
              if (res.status === 1) {
                return res.resultData
              } else {
                this.$message.error(res.info)
              }
            },
            sizeError: () => {
              this.$message.error('图片尺寸最大为1M')
            },
            // 可选参数 设置请求头部
            headers: (xhr) => {
              xhr.setRequestHeader('token', this.$store.state.access_token_teacher)
            }
          },
          toolbar: {
            container: ['bold', 'italic', 'underline', { 'script': 'sub' }, { 'script': 'super' }, 'clean', 'image'],
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData: function () {
      // 取全部企业列表
      window.axios.post(`${window.adminHost}/admin/manual/company/list?page=${this.pageQuery.page}&&page_size=${this.pageQuery.page_size}`).then(response => {
        let res = response.data
        if (!res.error_code) {
          // 请求成功
          this.companyData = res.data.data
          this.total = res.data.total
          if (this.companyData[0]['subject'] && this.companyData[0]['subject'] !== '') {
            this.subjectData = JSON.parse(this.companyData[0]['subject'])
          } else {
            this.subjectData = []
          }
        } else {
          this.$message.error('请求失败')
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 新增企业
    addCompany () {
      this.companyFormData = {
        trade_name: '',
        // 模拟背景信息图片
        material: '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527304102667327.jpg" title="1500255209245050.jpg"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527304102492960.jpg" title="1500255209203102.jpg"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527304102419714.jpg" title="1500255209925022.jpg"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527304731358168.jpg" title="1500255257431719.jpg"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527304731416762.jpg" title="1500255257394861.jpg"/></p>' +
          '<p><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527304808298965.jpg" title="1500254541330256.jpg" alt="了解三：企业主要税收征收政策.jpg" style="white-space: normal;"/></p>' +
          '<p><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527313849503003.jpg" title="1500254593418550.jpg" alt="了解四：账簿组织概述.jpg" style="white-space: normal;"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527313883602407.jpg" title="1500686362155841.jpg"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527313883498343.jpg" title="1500686367688571.jpg"/></p>' +
          '<p style="white-space: normal;"><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527313883234030.jpg" title="1500686374617496.jpg"/></p>' +
          '<p><img src="http://www.wenyunjy.com:8081/Uploads/ueImage/20180526/1527313933589344.jpg" title="1500254873934369.jpg" alt="了解六：会计科目.jpg" style="white-space: normal;"/></p>',
        qi_chu: JSON.stringify(['/Uploads/ueImage/20181212/1544603457867972.jpg', '/Uploads/ueImage/20181212/1544603462375950.jpg', '/Uploads/ueImage/20181212/1544603466237929.jpg', '/Uploads/ueImage/20181212/1544603473197232.jpg', '/Uploads/ueImage/20181212/1544603477389145.jpg'])
      }
      this.dialogCompanyVisible = true
      this.$nextTick(() => {
        this.$refs['companyForm'].clearValidate()
      })
    },
    // 编辑企业
    editCompany (data) {
      this.companyFormData = Object.assign(data)
      let dataArr = []
      if (this.companyFormData.qi_chu.length > 0) {
        this.companyFormData.qi_chu.forEach(v => {
          dataArr.push({ url: 'http://www.wenyunjy.com:8081' + v, name: '期初余额表' })
        })
      }
      this.listQiChu = dataArr
      this.dialogCompanyVisible = true
      this.$nextTick(() => {
        this.$refs['companyForm'].clearValidate()
      })
    },
    // 删除企业
    delCompany (id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.axios.delete(`${window.adminHost}/admin/manual/company/del/${id}`).then(response => {
          let res = response.data
          if (!res.error_code) {
            this.$message.success('删除成功')
            this.pageQuery.page = this.pageQuery.page - 1
            this.initData()
          } else {
            this.$message.error('删除失败')
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    // 科目设置
    subject (id) {
      // 取数据
      this.companyId = id
      this.dialogSubjectVisible = true
    },
    saveCompany (formName) {
      // 保存企业
      this.$refs[formName].validate((valid) => {
        if (valid) {
          window.axios.post(`${window.adminHost}/admin/manual/company/add`, this.companyFormData).then(response => {
            let res = response.data
            if (!res.error_code) {
              this.$message.success('保存成功')
              this.dialogCompanyVisible = false
              this.initData()
            } else {
              this.$message.error('保存失败')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    // 新增业务
    addBusiness (id) {
      this.companyId = id
      this.businessData = {}
      this.dialogBusinessVisible = true
    },
    // 编辑业务
    editBusiness (row, companyId) {
      this.companyId = companyId
      this.businessData = row
      this.dialogBusinessVisible = true
    },
    // 删除业务 delBusiness
    delBusiness (row, companyId) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.axios.delete(`${window.adminHost}/admin/manual/business/${row.id}`).then(response => {
          let res = response.data
          if (!res.error_code) {
            this.$message.success('删除成功')
            this.initData()
          } else {
            this.$message.error('删除失败')
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    saveBusiness () {
      this.dialogBusinessVisible = false
      this.initData()
    },
    // 保存答案 todo
    toSaveAnswer (id) {
      // window.open(`/shou_gong_zhang/#/home/${id}`)
      this.$router.push('/home/' + id)
    },
    handleSubjectDrag () {
      this.$refs['subjectDiv'].blur()
    },
    handleCompanyDrag () {
      this.$refs['divCompany'].blur()
    },
    handleBusinessDrag () {
      this.$refs['businessDiv'].blur()
    },
    changePageIndex (val) {
      this.pageQuery.page = val
      this.initData()
    }
  }
}
</script>

<style>
  .adminIndex .el-tabs__item{
    height: 30px;
    line-height: 30px;
    font-size: 13px;
  }
  .company-dialog .el-dialog__body,
  .business-dialog .el-dialog__body,
  .subject-dialog .el-dialog__body{
    padding: 0;
  }
  .adminIndex .ql-editor {
    height: 200px;
  }
  .adminIndex .ql-toolbar.ql-snow {
    padding: 0;
  }
</style>
<style lang="scss" scoped>
  .adminIndex{
    padding: 20px;
    background-color: #ffffff;
    height: 100%;
    .header{
      font-size: 13px;
      height: 36px;
      line-height: 36px;
      border: solid 1px #EBEEF5;
      border-bottom: none;
      padding: 0 10px;
    }
  }
</style>
