<template>
  <div class="app-container">
    <div class="page-header">
      <el-form class="form-filter" :inline="true" :model="form"  ref="form">
        <el-form-item>
          <el-input v-model="form.keyword" clearable placeholder="搜索关键字:姓名、手机、邮箱"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native="onSearch()">搜索</el-button>
      </el-form>
    </div>
    <div class="container">
      <listTitle :title="'积分管理列表'">
      </listTitle>
      <el-table ref="multipleTable" :data="tableData" empty-text="抱歉，暂无相关数据" border style="width: 100%" size="medium">
        <el-table-column label="编号" type="index" width="50"></el-table-column>
        <el-table-column prop="user_name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="phone_num" label="手机" class-name="overflow" min-width="133"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="133"></el-table-column>
        <el-table-column prop="total_point" label="当前积分" min-width="130"></el-table-column>
        <el-table-column label="操作" min-width="65" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" @click="handleEdit(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页码-->
      <Pagination ref="Pagination" :current="form.current" :limit="form.limit" :total="form.total" @on-current-change="pageCurrentChange"></Pagination>
    </div>
    <userEdit ref="userEdit" @on-edit-submit="getList"></userEdit>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { megError, megSuc } from '@/utils/notice'
  import { getList } from '@/api/point'
  import listTitle from '@/components/listTitle'
  import Pagination from '@/components/Pagination'
  import userEdit from './components/userEdit'

  export default{
    name: 'pointUser',
    components: { Pagination, listTitle, userEdit },
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
          keyword: ''
        },
        tableData: []
      }
    },
    created() {
      this.form.limit = this.pagination.limit
      this.getList()
    },
    methods: {
      ...mapActions([
        'toggleLoad'
      ]),
      getList() {
        this.toggleLoad(true)
        const data ={ ...this.form }
        getList(data).then(res => {
          this.tableData = res.data.list
          this.form.total = Number(res.data.count)
          this.toggleLoad(false)
        }).catch(()=> {
          this.tableData = []
          this.form.total = 0
          this.toggleLoad(false)
        })
      },
      onSearch() {
        this.form.current = 1
        this.getList()
      },
      handleEdit(row){
        this.$refs.userEdit.getInfo(row)
      },
      pageCurrentChange(val) {
        this.form.current = val
        this.getList()
      }
    }
  }

</script>