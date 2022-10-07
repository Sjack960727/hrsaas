<template>
  <div>

    <div class="app-container">
      <PageTools>
        <template #before>
          <span>共166条记录</span>
        </template>

        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" sortable="" width="80" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{row}">
              <span>{{ row.timeOfEntry | formatDate }}</span>

            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total"
            :current-page.sync="page.page"
            :page-size.sync="page.size"
            :page-sizes="[5,10,15,20]"
            :total="total"
            @current-change="getEmployeeList"
            @size-change="getEmployeeList"
          />
        </el-row>
      </el-card>
    </div>

  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeeList } from '@/api/employees'
import EnumHireType from '@/api/constant/employees'
// console.log(EnumHireType)
export default {
  name: 'HrsaasIndex',
  // components: { PageTools },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        // console.log(res)
        this.list = rows
        this.total = total
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    // 格式化
    formatterFn(row, column, cellvalue) {
      const res = this.hireType.find(item => item.id === cellvalue)
      return res ? res.value : '不知道'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
