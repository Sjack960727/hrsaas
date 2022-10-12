<template>
  <div>
    <div class="dashboard-container">
      <div class="app-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设施" name="first">
            <el-form ref="form" :model="userInfo" :rules="userInfoRules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="userInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUserInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="个人详情" name="second">
            <userinfo />
          </el-tab-pane>

          <el-tab-pane label="岗位信息" name="third">
            <jobinfo />
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import userinfo from './components/user-info.vue'
import jobinfo from './components/job-info.vue'
export default {
  components: {
    userinfo,
    jobinfo
  },
  data() {
    return {
      activeName: 'first',
      userInfo: {},
      userInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名2-10位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码大于6位数', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      // console.log(res)
      this.userInfo = res
    },
    async  updateUserInfo() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.userInfo)
        // console.log('success')
        this.$message.success('数据更新成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
