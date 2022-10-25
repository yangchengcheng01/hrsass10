<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :showBefore="true">
        <span slot="before">共{{ page.total }}条标签</span>
      <div slot="after">
        <el-button size="small" type="success">excel导入</el-button>
        <el-button size="small" type="danger">excel导出</el-button>
        <el-button size="small" type="primary">新增员工</el-button>
      </div>
      </page-tools>
       <el-card>
      <el-table border v-loading="loading" :data="list">
            <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" :formatter="formatEmployment" prop="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
             <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
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

        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" 
           :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"/>
        </el-row>
         </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
     changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    async getEmployeeList() {
      this.loading = true
     const { total, rows } = await getEmployeeList(this.page)
     this.page.total = total
     this.list = rows
     this.loading = false
    },
  formatEmployment(row, column, cellValue, index) {
    const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
    return obj ? obj.value : '未知'
  }
  }
}
</script>

<style>

</style>