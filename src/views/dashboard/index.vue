<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <page-tools :showBefore="true">
      <span slot="before" >2222</span>
      <el-button slot="after" type="primary" >导入excel</el-button>
    </page-tools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PageTolls from '@/components/PageTools'

export default {
  name: 'Dashboard',
  
  computed: {
    ...mapGetters([
      'name'
    ])
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
