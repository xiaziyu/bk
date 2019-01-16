<template>
  <div class="app-container">
    <div class="container">
      <listTitle :title="'操作历史信息'">
      </listTitle>
      <el-table ref="multipleTable" :data="tableData" empty-text="抱歉，暂无相关数据" border style="width: 100%" size="medium">
        <el-table-column label="编号" type="index" width="60"></el-table-column>
        <el-table-column prop="log_time" label="时间" min-width="100"></el-table-column>
        <el-table-column prop="remark" label="操作" class-name="overflow" min-width="133"></el-table-column>
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
  import { getList } from '@/api/log'
  import listTitle from '@/components/listTitle'
  import Pagination from '@/components/Pagination'

  export default{
    name: 'logsHandle',
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
          total: 0
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
        const data ={...this.form}
        getList(data).then(res => {
          this.form.total = Number(res.data.count)
          this.tableData = res.data.list
          this.toggleLoad(false)
        }).catch(()=> {
          this.tableData = []
          this.form.total = 0
          this.toggleLoad(false)
        })
      },
      pageCurrentChange(val) {
        this.form.current = val
        this.getList()
      }
    }
  }

</script>