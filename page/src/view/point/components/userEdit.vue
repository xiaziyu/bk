<template>
  <el-dialog :visible.sync="dialogView"  :width="dialog.medWid" custom-class="maxDialog"  :close-on-click-modal="false" v-loading="dialogLoad">
    <dialogTitle slot="title" :title="'编辑用户'"></dialogTitle>
    <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="85px" label-position="left">
      <el-form-item label="姓名:" prop="user_name">
        <el-input v-model="viewForm.user_name" placeholder="姓名" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="手机:" prop="phone_num">
        <el-input v-model="viewForm.phone_num" placeholder="手机" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="viewForm.email" placeholder="邮箱" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="当前积分:">
        <span v-text="viewForm.total_point"></span>
      </el-form-item>
      <el-form-item label="积分增量:" prop="point">
        <el-input v-model="viewForm.point" placeholder="积分增量为负数时扣减积分" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea" :rows="2" v-model="viewForm.remark" placeholder="备注" maxlength="10"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogView = false">取消</el-button>
      <el-button type="primary" @click="onEdit()">确认修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { megError, megSuc } from '@/utils/notice'
  import { validateEmail, valIph, validateInt } from '@/utils/validate'
  import { userEdit } from '@/api/point'
  import dialogTitle from '@/components/dialogTitle'

  export default{
    name: 'userEdit',
    components: { dialogTitle },
    computed: {
      ...mapGetters([
        'loading',
        'dialog'
      ])
    },
    data() {
      const ruleEmail = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }
      const rulePhone = (rule, value, callback) => {
        if (!valIph(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
      const rulePoint = (rule, value, callback) => {
        const num = Number(value)+Number(this.viewForm.total_point)
        if (value!==''&&value.toString()!=='0'&&!validateInt(value)) {
          callback(new Error('积分增量只能为整数'))
        } else if(num<0){
          callback(new Error('扣除积分不能大于当前积分'))
        }else {
          callback()
        }
      }
      return {
        dialogView: false,
        dialogLoad: false,
        viewForm:{
          user_name: '',
          phone_num:'',
          email: '',
          total_point: '',
          point: '',
          remark: ''
        },
        viewRules: {
          user_name: [{ required: true, message: '请输入姓名', trigger: 'blur'}],
          phone_num: [{ required: true, message: '请输入手机号码', trigger: 'blur'},
            { required: true, trigger: 'blur', validator: rulePhone}
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur'},
            { required: true, trigger: 'blur', validator: ruleEmail}
          ],
          point: [
            { required: false, trigger: 'blur', validator: rulePoint}
          ],
          remark: [{ required: true, message: '请输入操作备注', trigger: 'blur'}]
        }
      }
    },
    methods: {
      ...mapActions([
        'toggleLoad'
      ]),
      getInfo(row) {
        if (this.$refs['viewForm']) this.$refs['viewForm'].resetFields()
        this.viewForm = {
          id: row.id,
          user_name: row.user_name||'',
          phone_num:row.phone_num||'',
          email: row.email||'',
          total_point: row.total_point||'',
          point: '',
          remark: ''
        }
        this.dialogView = true
      },
      onEdit() {
        this.$refs.viewForm.validate(valid => {
          if (valid) {
            this.dialogLoad = true
            const data = {...this.viewForm}
            userEdit(data).then(res => {
              megSuc('操作成功！')
              this.dialogLoad = false
              this.dialogView = false
              this.$emit('on-edit-submit')
            }).catch(()=> {
              this.dialogLoad = false
            })
          }
        })
      }
    }
  }

</script>