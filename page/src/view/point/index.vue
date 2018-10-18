<template>
  <div class="app-container">
    <div class="page-header">
      <el-form class="form-filter" :inline="true" :model="form"  ref="form">
        <el-form-item>
          <el-input v-model="form.key" placeholder="搜索关键字"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSearch()">搜索</el-button>
        <!--<el-button type="text" icon="el-icon-search" @click="onSearch()"></el-button>-->
        <el-form-item>
          <!--<el-button type="primary" @click="handlesInfo()">操作历史</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="container">
      <listTitle :title="'积分管理列表'">
      </listTitle>
      <el-table ref="multipleTable" :data="tableData" empty-text="抱歉，暂无相关数据" border style="width: 100%" size="medium">
        <el-table-column label="编号" type="index" width="50"></el-table-column>
        <el-table-column prop="code" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="company_code" label="手机" class-name="overflow" min-width="133"></el-table-column>
        <el-table-column prop="company_name" label="邮箱" min-width="133"></el-table-column>
        <el-table-column prop="category_name" label="当前积分" min-width="130"></el-table-column>
        <el-table-column label="操作" min-width="65" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row['is_used']==='USED'||scope.row['status']==='DELETED'" icon="el-icon-circle-close-outline" @click="handleEdit(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页码-->
      <Pagination ref="Pagination" :current="form.current" :limit="form.limit" :total="form.total" @on-current-change="pageCurrentChange"></Pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { megError, megSuc } from '@/utils/notice'
  import { getList } from '@/api/point'
  import listTitle from '@/components/listTitle'
  import Pagination from '@/components/Pagination'

  export default{
    name: 'pointUser',
    components: { Pagination, listTitle },
    computed: {
      ...mapGetters([
        'pagination',
        'loading'
      ])
    },
    data() {
      return {
        form: {
          current: 1,
          limit: 25,
          total: 0,
          key: ''
        },
        exportLoad: false,
        tableData: [],
        multipleSelection: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      ...mapActions([
        'toggleLoad'
      ]),
      test(){
        this.$router.push({name:'logsHandle'})
      },
      getList() {
        this.toggleLoad(true)
        const data ={}
        getList(data).then(res => {
          this.toggleLoad(false)
          console.log(res)
        }).catch(()=> {
          this.toggleLoad(false)
        })
      },
      onSearch() {
        if (this.form.current === 1) {
          this.getList()
        } else {
          this.form.current = 1
        }
      },
      handleEdit(row){

      },
      pageCurrentChange(val) {
        this.form.current = val
        this.getList()
      }
    }
  }

</script>