<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容，插槽 -->
          <tree-tools
           @editDepts="editDepts"
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
             @addDepts="addDepts"
          />
         
        </el-tree>
      </el-card>
    </div>
    <add-dept
    ref="addDept"
    :showDialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import { getDepartments, delDepartments } from "@/api/department";
import { tranListToTreeData } from "@/utils";
import AddDept from "./components/add-dept";
export default {
  data() {
    return {
      company: { name: "", manager: "" },
      defaultProps: {
        label: "name",
      },
      departs: [],
      showDialog: false,
      node: null
    }
  },
  components: {
    TreeTools,
    AddDept,
  },
  created() {
    
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人", id: '' };
      this.departs = tranListToTreeData(result.depts, "");

      // console.log(result)
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
     
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>