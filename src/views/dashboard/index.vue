<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}
      <!-- <UploadExcel
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
      /> -->
      <Upload-Img @onSuccess="onSuccess1" />
      <Upload-Img @onSuccess="onSuccess2" />

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
    onSuccess1(val) {
      console.log(val)
    },
    onSuccess2(val) {
      alert(222 + val)
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
