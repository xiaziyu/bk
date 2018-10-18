<template>
  <el-dialog :visible.sync="dialogView"  :width="table.medWid" custom-class="maxDialog"  :close-on-click-modal="false" v-loading="dialogLoad">
    <span slot="title"><svg-icon icon-class="title"/>确认委托应付信息</span>
    <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="95px" label-position="left">
      <el-row>
        <el-col :span="12" class="pr-8">
          <el-form-item label="委托应付单号:" prop="out_delegate_payable_bill_no">
            <el-input v-model="viewForm.out_delegate_payable_bill_no" placeholder="委托应付单号" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="pl-8">
          <el-form-item label="委托应付总额:">
            <span v-text="viewForm.sum_amount"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="pr-8">
          <el-form-item label="供应商名称:">
            <p class="overflow" v-text="viewForm.vendor_name"></p>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="pl-8">
          <el-form-item label="成品供应商名称:">
            <p class="overflow" v-text="viewForm.module_name"></p>
          </el-form-item>
        </el-col>
      </el-row>
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

  export default{
    name: 'userEdit',
    //components: { Pagination, listTitle, userEdit },
    computed: {
      ...mapGetters([
        'pagination',
        'loading',
        'table'
      ])
    },
    data() {
      return {
        dialogView: false,
        dialogLoad: false,
        viewForm:{
          out_delegate_payable_bill_no: '',//用户填写
          sum_amount:'',
          vendor_name: '',
          module_name: '',
          tableList: []
        },
        viewRules: {
          out_delegate_payable_bill_no: [{ required: true, message: '请输入委托应付单号', trigger: 'blur'}]
          //payment_expire_time: [{ required: true, message: '请选择委托应付款到期日', trigger: 'blur'}]
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