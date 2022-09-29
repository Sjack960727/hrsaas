<template>
  <div class="app-container">
    <el-card><el-tabs v-model="activeName">
      <el-tab-pane label="角色管理123" name="first">
        <el-row :gutter="10" style="height:60px"><el-button
          type="primary"
          style="margin-left:10px;"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
        >新增角色</el-button>
        </el-row>
        <el-table v-loading="loading" border="" :data="roleList">
          <el-table-column label="序号" width="120" type="index" />
          <el-table-column label="角色名称" width="240" prop="name" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作" width="240px">
            <template slot-scope="{row}">
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
              <el-button size="small" type="danger" @click="delRole(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <!-- 分页组件 -->
          <el-pagination
            v-if="total>0"
            background
            :current-page.sync="page.page"
            :page-size.sync="page.pagesize"
            :page-sizes="[2, 5, 8, 10]"
            :total="total"
            layout="prev, pager, next, sizes, total"
            @current-change="getRoleList"
            @size-change="getRoleList"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
          :closable="false"
        />
        <el-form label-width="120px" style="margin-top:50px">
          <el-form-item label="公司名称">
            <el-input v-model="formData.name" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="formData.companyAddress" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.mailbox" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
          </el-form-item>
        </el-form></el-tab-pane>
    </el-tabs></el-card>
    <add-roles ref="addRoles" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/settings'
import { mapGetters } from 'vuex'
import addRoles from './components/addRoles.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    addRoles
  },
  data() {
    return {
      activeName: 'first',
      roleList: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      loading: true,
      total: 0,
      dialogVisible: false,
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getCompanyInfo()
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true
    },
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
        if (this.total > 0 && this.roleList.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    editRole(row) {
      this.$refs.addRoles.formData = { ...row }
      this.dialogVisible = true
    },
    async delRole(row) {
      try {
        await this.$confirm('确认删除该角色吗？', '提示', {
          confirmButtonTextL: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        deleteRole(row.id)
        getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
