<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog=true">新增角色</el-button>
            </el-row>
            <el-table border="" :data="list">
              <el-table-column align="center" label="序号" type="index" width="120"></el-table-column>
              <el-table-column align="center" prop="name" label="角色名称" width="240"></el-table-column>
              <el-table-column align="center" prop="description" label="描述"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }" >
                  <el-button size="small" align="center" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination 
              :current-page="page.page"
              :page-size="page.pagesize"
              :total="page.total"
              @current-change="changePage"
              layout="prev,pager,next"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert 
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
             />
             <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled v-model="formData.name" style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled v-model="formData.companyAddress" style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px"  v-model="formData.mailbox" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea"  v-model="formData.remarks" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
         <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole,getRoleDetail,updateRole, addRole, assignPerm} from '@/api/setting'
import { mapGetters } from 'vuex'
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {},//公司信息
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur'}]
      },
      showPermDialog: false,
       defaultProps: {
        label: 'name'
      },
       permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null // 用来记录分配角色的id
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  methods: {
   async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
   async deleteRole(id) {
    try {
      await this.$confirm('确认删除该角色吗')
      await deleteRole(id)
      this.getRoleList()
      this.$message.success('删除角色成功')
    } catch (error) {
      console.log(error)
    }
    },
   async editRole(id) {
   this.roleForm = await getRoleDetail(id)
    this.showDialog = true
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false 
    },
   async btnOk() {
    try {
       await this.$refs.roleForm.validate()
       if(this.roleForm.id) {
          await updateRole(this.roleForm) //编辑任务
       } else {
        // 新增功能
        await addRole(this.roleForm)
       }
   
      this.getRoleList()
      this.$message.success('操作成功')
      this.showDialog = false
    } catch (error) {
        console.log(error)
    }
    },
   async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermissionList(), '0') // 转化list到树形数据
      this.roleId = id
      // 应该去获取 这个id的 权限点
      // 有id 就可以 id应该先记录下来
      const { permIds } = await getRoleDetail(id) // permIds是当前角色所拥有的权限点数据
      this.selectCheck = permIds // 将当前角色所拥有的权限id赋值
      this.showPermDialog = true
    },
      async  btnPermOK() {
      // 调用el-tree的方法
      // console.log(this.$refs.permTree.getCheckedKeys())
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel() {
      this.selectCheck = [] // 重置数据
      this.showPermDialog = false
    }
  }
}
</script>

<style>

</style>