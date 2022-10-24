<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules" ref="deptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          @focus="getEmployeeSimple"
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
        >
        <el-option 
        v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username"
        />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartments,getDepartDetail,updateDepartments } from "@/api/department";
import { getEmployeeSimple } from '@/api/employees'
export default {
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rules,value,callback) => {
      const { depts} = await getDepartments()
      let isRepeat = false
      if(this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      }else {
       isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
    
     isRepeat ? callback(new Error(`同级部门下以及存在这个${value}部门了`)) : callback()
    }
     const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      let isRepeat = false
      if(this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
           isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
     
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [{required: true, message: '部门名称不能为空', trigger: 'blur'},
        {min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur'},
        {validator: checkNameRepeat }],
        code: [{required: true, message: '部门编码不能为空', trigger: 'blur'},
        {min: 1, max: 50, message: '部门名称编码为1-50个字符', trigger: 'blur'},
        {validator: checkCodeRepeat}],
        manager: [{required: true, message: '部门负责人不能为空', trigger: 'blur'}],
        introduce: [{required: true, message: '部门介绍不能为空', trigger: 'blur'},
        {min: 1, max: 300, message: '部门介绍长度为1-300个字符', trigger: 'blur'}],
      },
      peoples: []
    };
  },
  methods: {
    async getEmployeeSimple() {
     this.peoples = await getEmployeeSimple()
    },
    btnOk() {
      this.$refs.deptForm.validate(async isOk => {
        if(isOk) {
          if(this.formData.id) {
            await updateDepartments(this.formData)
          } else {
              await addDepartments({...this.formData, pid: this.treeNode.id})
          }
         
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      }
       this.$refs.deptForm.resetFields()
       this.$emit('update:showDialog', false)
    },
   async getDepartDetail(id) {
     this.formData =  await getDepartDetail(id)
    }
  }
};
</script>

<style>
</style>