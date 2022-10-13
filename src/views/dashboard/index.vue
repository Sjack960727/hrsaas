<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}
      <!-- <UploadExcel
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
      /> -->
      <Upload-Img />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log('data', data)
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size / 1024 > 1024) {
        this.$message.error('文件大小不能超过1024kb')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
