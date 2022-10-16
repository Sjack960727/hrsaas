<template>
  <div>
    <el-upload
      v-loading="loading"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :limit="1"
      class="uploadIMG"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
    >
      <img style="width: 100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')
const cos = new COS({
  SecretId: 'AKIDra6QYUChx2tYhdMr8f7PXddR1CC3kHcn',
  SecretKey: '3sUr33pNjurZ6RddP0OZYKvKYbTEnCTa' })
export default {
  name: 'UploadImg',
  props: {
    defaultURL: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ]
    }
  },
  watch: {
    defaultURL() {
      this.fileList.push({
        name: 'default', url: this.defaultURL
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onChange(file, fileList) {
      this.fileList = fileList
    //   this.fileList.push(file)
    //   console.log(this.fileList)
    },
    onHttpRequest({ file }) {
      this.loading = true
      // console.log(file)
      cos.putObject({
        Bucket: 'sjk01-1314348460', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // console.log(err || data)
        if (err) { return this.$message.error('上传失败') }
        this.loading = false
        this.$emit('onSuccess', {
          imgURL: 'http://' + data.Location
        })
      })
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.uploadIMG{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>
