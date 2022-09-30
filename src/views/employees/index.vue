<template>
  <div>

    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        style="width:900px"
        :current-page="currentPage4"
        :page-size="100"
        background
        prev-text="上一页"
        next-text="下一页"
        layout="total,pager,prev,next"
        :total="400"
      >
        <slot name="page123"> 第几页</slot>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HrsaasIndex',

  data() {
    return {
      currentPage4: 4
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
