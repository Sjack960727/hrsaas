<template>
  <div>
    <UploadExcel :on-success="handleSuccess" />
  </div>

</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {

    }
  },
  methods: {
    async handleSuccess({ headers, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      // console.log(arr)
      await importEmployee()
      this.$message.success('批量导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>

