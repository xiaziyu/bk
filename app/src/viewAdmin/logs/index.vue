<template>
  <div class="page">
    操作历史
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { getPin } from '@/api/login'

  export default{
    name: 'logsHandle',
    computed: {
      ...mapGetters([
        'source',
        'token',
        'pin'
      ])
    },

    created() {

    },
    methods: {
      ...mapActions([
        'changeToken',
        'changePin',
        'jumpUrl'
      ]),
      test(){
        this.$router.push({name:'logsHandle'})
      },
      getDate() {
        const data ={token: this.token, source: this.source}
        getPin(data).then(res => {
          this.changePin(res.data.pin)
          if(res.data.status==='1'){
            this.$router.push({name:'point'})
          }else {
            this.$router.push({name:'join'})
          }
        })
      }
    }
  }

</script>