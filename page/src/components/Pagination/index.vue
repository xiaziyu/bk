<template>
  <!--页码-->
  <div v-show="total > 0" class="pagination-container">
    <el-pagination background @current-change="onCurrentChange" :current-page.sync="myCurrent" :page-size.sync="limit" :total="total" :layout="pagination.layout">
    </el-pagination>
    <span class="el-pagination__total" v-text="'共'+total+'条数据'"></span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Pagination',
    computed: {
      ...mapGetters([
        'pagination'
      ])
    },
    props: {
      current: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        myCurrent: this.current
      }
    },
    methods: {
      onCurrentChange(val) {
        this.$emit('on-current-change',val)
      }
    },
    watch: {
      current(val) {
        this.myCurrent = val
      }
    }
  }
</script>