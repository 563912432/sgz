<template>
  <div class="business">
    <el-form ref="businessForm" :rules="rules" :model="formData" label-position="left" label-width="100px">
      <el-form-item label="业务摘要" prop="abstract">
        <el-input v-model="formData.abstract" clearable size="mini" />
      </el-form-item>
      <el-form-item label="业务说明" prop="content">
        <el-input type="textarea" :rows="2" placeholder="请填写业务说明" v-model="formData.content" clearable size="mini" />
      </el-form-item>
      <el-form-item label="原始资料上传" prop="sort">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="原始资料名称" prop="">
        <div v-if="formData.resource && formData.resource.length > 0">
          <div v-for="(item, index) in formData.resource" :key="index" class="flex flex-align-center">
            <el-input v-model="item.name" placeholder="请填写原始资料名称" clearable size="mini" />
            <span class="ml-5"><el-button size="mini" plain @click="delMaterial(index)">删除</el-button></span>
          </div>
        </div>
        <div><el-button size="mini" plain icon="el-icon-plus" @click="addMaterial">添加一条原始资料</el-button></div>
      </el-form-item>
      <el-form-item label="文字解析" prop="content">
        <el-input type="textarea" :rows="2" placeholder="请填写文字解析" v-model="formData.textParse" clearable size="mini" />
      </el-form-item>
      <el-form-item label="视频解析" prop="sort">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="saveBusiness('businessForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Business',
  props: {
    companyId: {
      type: Number,
      required: true,
      defaults: 0
    },
    businessData: {
      type: Object,
      required: true,
      defaults: {}
    }
  },
  data () {
    return {
      formData: {
        abstract: '',
        content: '',
        resource: [{ url: '', name: '' }],
        textParse: '',
        videoParse: ''
      },
      imageUrl: [],
      rules: {
        abstract: [{ required: true, message: '请填写业务摘要', trigger: 'blur' }],
        number: [{ required: true, message: '请填写编号', trigger: 'blur' }]
      },
      fileList: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      if (JSON.stringify(this.businessData) !== '{}') {
        this.formData = {
          id: this.businessData.id,
          abstract: this.businessData.abstract,
          content: this.businessData.content,
          resource: JSON.parse(this.businessData.resource),
          textParse: this.businessData.textParse,
          videoParse: this.businessData.videoParse
        }
        if (this.formData.resource.length > 0) {
          this.fileList = this.formData.resource
        }
      } else {
        this.formData = {
          abstract: '',
          content: '',
          resource: [{ url: '', name: '' }],
          textParse: '',
          videoParse: ''
        }
      }
    },
    addMaterial () {
      this.formData.resource.push({ url: '', name: '' })
    },
    delMaterial (index) {
      if (this.formData.resource.length > 1) {
        this.formData.resource.splice(index, 1)
      } else {
        this.$message.warning('至少保留一条原始资料')
      }
    },
    saveBusiness (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            trade_id: this.companyId,
            abstract: this.formData.abstract,
            content: this.formData.content,
            resource: JSON.stringify(this.formData.resource),
            textParse: this.formData.textParse,
            videoParse: this.formData.videoParse
          }
          if (this.formData.id) {
            data.id = this.formData.id
          }
          window.axios.post('/exam/add', data).then(response => {
            let res = response.data
            if (!res.error_code) {
              this.$message.success('保存成功')
              this.$emit('save')
            } else {
              this.$message.error('保存失败')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .business{
    height: 600px;
    overflow-y: auto;
    padding: 20px;
  }
</style>
