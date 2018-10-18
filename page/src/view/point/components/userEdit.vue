<template>
  <el-dialog :visible.sync="dialogView"  :width="dialog.medWid" custom-class="maxDialog"  :close-on-click-modal="false" v-loading="dialogLoad">
    <dialogTitle slot="title" :title="编辑用户"></dialogTitle>
    <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="95px" label-position="left">
      <el-form-item label="姓名:" prop="user_name">
        <el-input v-model="viewForm.user_name" placeholder="姓名" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="手机:" prop="phone_num">
        <el-input v-model="viewForm.phone_num" placeholder="手机" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="viewForm.email" placeholder="邮箱" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="当前积分:" prop="total_point">
        <el-input v-model="viewForm.total_point" placeholder="当前积分" maxlength="10"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogView = false">取消</el-button>
      <el-button type="primary" @click="onSub()">确认修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { megError, megSuc } from '@/utils/notice'
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
      return {
        dialogView: false,
        dialogLoad: false,
        viewForm:{
          user_name: '',//用户填写
          phone_num:'',
          email: '',
          total_point: ''
        },
        viewRules: {
          user_name: [{ required: true, message: '请输入姓名', trigger: 'blur'}],
          phone_num: [{ required: true, message: '请输入手机号码', trigger: 'blur'}],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur'},
            { required: true, message: '请输入邮箱地址', trigger: 'blur'}
          ],
          total_point: [{ required: true, message: '请输入用户积分', trigger: 'blur'}]
        }
      }
    },
    methods: {
      ...mapActions([
        'toggleLoad'
      ]),
      getInfo() {
        this.toggleLoad(true)
        const data ={ ...this.form }
        getList(data).then(res => {
          this.tableData = res.data.list
          this.form.total = Number(res.data.count)
          this.toggleLoad(false)
          console.log(res)
        }).catch(()=> {
          this.toggleLoad(false)
        })
      },
      onEdit() {


      }
    }
  }

</script>