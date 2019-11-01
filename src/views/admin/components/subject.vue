<template>
  <div class="subject">
    <div style="height: 300px;overflow-y: auto">
      <el-tree
        :data="subjectData"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ data.title }}</span>
        <span>
          <!--添加-->
          <i class="el-icon-circle-plus-outline tree-icon-blue ml-3" :style="data.level === '1'?'margin-right:34px': ''" @click="() => addSubject(data)"></i>
          <!--编辑-->
          <i v-if="data.level !== '1'" class="el-icon-edit-outline tree-icon-orange ml-3" @click="editSubject(data)"></i>
          <!--删除-->
          <i v-if="data.level !== '1'" class="el-icon-circle-close tree-icon-red ml-3" @click="delSubject(node, data)"></i>
        </span>
      </span>
      </el-tree>
    </div>
    <div class="text-right" style="padding: 10px">
      <el-button type="primary" size="small" @click="save">保存</el-button>
    </div>
    <!--科目管理弹窗-->
    <el-dialog v-el-drag-dialog class="subject-detail-dialog" width="400px" :modal="false" :close-on-click-modal="false" title="科目管理" :visible.sync="dialogSubjectVisible" @dragDialog="handleSubjectDrag">
      <el-form ref="subjectForm" :rules="subjectRules" :model="subjectFormData" label-position="left" label-width="100px">
        <el-form-item label="科目名称" prop="title">
          <el-input v-model="subjectFormData.title" clearable size="mini" />
        </el-form-item>
      </el-form>
      <div ref="divSubject" slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="saveAddSubject('subjectForm')">
          确定
        </el-button>
        <el-button size="small" plain @click="dialogSubjectVisible = false">
          返回
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  name: 'Subject',
  directives: { elDragDialog },
  props: {
    companyId: {
      type: Number,
      required: true,
      defaults: 0
    },
    data: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  data () {
    return {
      subjectData: [],
      dialogSubjectVisible: false,
      subjectFormData: {
        id: '',
        title: '',
        parent_id: '',
        level: ''
      },
      subjectRules: {
        title: [{ required: true, message: '请填写科目名称', trigger: 'blur' }]
      },
      handleData: [],
      handleIndex: 0,
      resultData: [],
      resultId: 0
    }
  },
  computed: {
    basicKeMu () {
      return this.$store.state.basicKeMu
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.subjectData = this.$store.state['basicKeMu']
      // 合成最终结果
      if (this.data.length > 0) {
        this.subjectData.forEach(v => {
          let data = this.getTree(this.data, v.id)
          if (data.length > 0) {
            this.$set(v, 'children', data)
          }
        })
      }
      this.resultId = this.subjectData.concat(this.data).length + 1
      // 还原基本科目
      this.resetBasicKeMu()
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
    addSubject (data) {
      this.subjectFormData = {
        id: '',
        title: '',
        parent_id: '',
        level: ''
      }
      this.handleData = data
      this.subjectData.forEach((value, index) => {
        if (value === data) {
          this.handleIndex = index
        }
      })
      this.dialogSubjectVisible = true
    },
    editSubject (data) {
      this.subjectFormData = data
      this.handleData = data
      this.dialogSubjectVisible = true
    },
    // 保存新增和编辑的科目
    saveAddSubject (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.subjectFormData.id && this.subjectFormData.id !== '') {
            // 编辑
            this.$set(this.handleData, 'title', this.subjectFormData.title)
          } else {
            // 新增
            const newChild = { id: this.resultId, title: this.subjectFormData.title, parent_id: this.handleData.id, level: parseInt(this.handleData.level) + 1 }
            if (!this.handleData.children) {
              this.$set(this.handleData, 'children', [])
            }
            this.handleData.children.push(newChild)
            this.resultId += 1
          }
          // this.$message.success('保存成功')
          this.dialogSubjectVisible = false
        }
      })
    },
    // 保存最终的科目结果
    save () {
      this.resultData = []
      this.subjectData.forEach(value => {
        if (value.children) {
          this.handleChildren(value.children)
        }
      })
      window.axios.post(`${window.adminHost}/admin/manual/company/add`, { id: this.companyId, subject: JSON.stringify(this.resultData) }).then(response => {
        let res = response.data
        if (!res.error_code) {
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 删除科目
    delSubject (node, data) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }).catch(() => {
        console.log('cancel')
      })
    },
    handleSubjectDrag () {
      this.$refs['divSubject'].blur()
    },
    handleChildren (item) {
      if (item && item.length > 0) {
        item.forEach(value => {
          this.resultData.push({ id: value.id, title: value.title, parent_id: value.parent_id, level: value.level })
          this.handleChildren(value.children)
        })
      } else {
        return false
      }
    },
    resetBasicKeMu () {
      this.$store.commit('SAVE_BASIC_KE_MU', this.returnBasicKeMu())
    },
    returnBasicKeMu () {
      return [
        { id: 1, title: '库存现金', parent_id: '0', level: '1' },
        { id: 2, title: '银行存款', parent_id: '0', level: '1' },
        { id: 3, title: '应收票据', parent_id: '0', level: '1' },
        { id: 4, title: '应收账款', parent_id: '0', level: '1' },
        { id: 5, title: '其他应收款', parent_id: '0', level: '1' },
        { id: 6, title: '原材料', parent_id: '0', level: '1' },
        { id: 7, title: '库存商品', parent_id: '0', level: '1' },
        { id: 8, title: '周转材料', parent_id: '0', level: '1' },
        { id: 9, title: '固定资产', parent_id: '0', level: '1' },
        { id: 10, title: '累计折旧', parent_id: '0', level: '1' },
        { id: 11, title: '短期借款', parent_id: '0', level: '1' },
        { id: 12, title: '应付票据', parent_id: '0', level: '1' },
        { id: 13, title: '应付账款', parent_id: '0', level: '1' },
        { id: 14, title: '应付职工薪酬', parent_id: '0', level: '1' },
        { id: 15, title: '应交税费', parent_id: '0', level: '1' },
        { id: 16, title: '应付利润', parent_id: '0', level: '1' },
        { id: 17, title: '其他应付款', parent_id: '0', level: '1' },
        { id: 18, title: '盈余公积', parent_id: '0', level: '1' },
        { id: 19, title: '本年利润', parent_id: '0', level: '1' },
        { id: 20, title: '利润分配', parent_id: '0', level: '1' },
        { id: 21, title: '生产成本', parent_id: '0', level: '1' },
        { id: 22, title: '制造费用', parent_id: '0', level: '1' },
        { id: 23, title: '主营业务收入', parent_id: '0', level: '1' },
        { id: 24, title: '其他业务收入', parent_id: '0', level: '1' },
        { id: 25, title: '营业外收入', parent_id: '0', level: '1' },
        { id: 26, title: '主营业务成本', parent_id: '0', level: '1' },
        { id: 27, title: '税金及附加', parent_id: '0', level: '1' },
        { id: 28, title: '销售费用', parent_id: '0', level: '1' },
        { id: 29, title: '管理费用', parent_id: '0', level: '1' },
        { id: 30, title: '财务费用', parent_id: '0', level: '1' },
        { id: 31, title: '所得税费用', parent_id: '0', level: '1' },
        { id: 32, title: '营业外支出', parent_id: '0', level: '1' },
        { id: 33, title: '实收资本', parent_id: '0', level: '1' },
        { id: 34, title: '应付利息', parent_id: '0', level: '1' },
        { id: 35, title: '其他业务成本', parent_id: '0', level: '1' }
      ]
    }
  }
}
</script>
<style>
  .subject .custom-tree-node .el-input--mini .el-input__inner{
    height: 20px;
  }
  .subject-detail-dialog .el-dialog__body{
    padding: 20px!important;
  }
</style>
<style lang="scss" scoped>
.subject{
  padding:0;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    padding-top: 5px;
  }
  .tree-icon-blue{
    color: #84CDED;
    font-weight: bold
  }
  .tree-icon-orange{
    color: #F5CD1D;
    font-weight: bold
  }
  .tree-icon-red{
    color: #F85832;
    font-weight: bold
  }
  .tree-icon-green{
    color: #7CCB40;
  }
}
</style>
