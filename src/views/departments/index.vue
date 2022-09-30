<template>
  <div class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDepts="addDepts" /></el-card>
    <el-tree :data="depts" :props="defaultProps" :default-expand-all="true" style="margin-top:30px">
      <tree-tools slot-scope="{data}" :tree-node="data" @addDepts="addDepts" />
    </el-tree>
    <add-dept :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import treeTools from './components/treeTools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: { treeTools, AddDept },

  data() {
    return {
      showDialog: false,
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      depts: [],
      currentNode: {}
    }
  },

  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      this.depts = tranListToTreeData(depts, '')
      // console.log(this.depts)
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.currentNode = node
    }
  }
}
</script>

<style lang="scss" scoped>
.departments-container {
  width: 900px;
  margin: 20px auto;
}
</style>
