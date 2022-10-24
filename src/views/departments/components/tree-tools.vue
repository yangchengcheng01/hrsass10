<template>
   <el-row 
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px; width: 100%"
          
        >
          <el-col>
            <!-- 左侧内容 -->
            <span>{{ treeNode.name }}</span>
          </el-col>
          <el-col :span="4">
            <!-- 右侧内容 -->
            <el-row type="flex" justify="end">
              <el-col>{{ treeNode.manager }}</el-col>
              <el-col>
                <!-- 下拉菜单 -->
                <el-dropdown @command="operateDepts">
                  <span
                    >操作
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                     <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                      <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
</template>

<script>
import { delDepartments, addDepartments } from '@/api/department'
export default {
  methods: {
    operateDepts(type) {
       if (type === 'add') {
        // 添加子部门的操作
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        //  编辑部门的操作
        this.$emit('editDepts', this.treeNode)
      } else {
        //  删除操作
        this.$confirm('您确定要删除该组织部门吗').then(() => {
         return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }

    }
  },
props: {
  treeNode: {
    required: true,
    type: Object
  },
  isRoot: {
    type: Boolean,
    default: false
  }
}
}
</script>

<style>

</style>