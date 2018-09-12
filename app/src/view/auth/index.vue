<template>
  <div class="page">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { authStudent } from '@/api/join'

  export default{
    name: 'auth',
    computed: {
      ...mapGetters([
        'codes',
        'states',
        'pin'
      ])
    },
    created() {
      this.getDate()
    },
    methods: {
      getDate(){
        if(this.$route.params['0']==='success'){
          authStudent({pin: this.pin, status: '2'}).then(res => {
            const pin = res.data.pin
            this.$router.push({name:'join'})
          })
        }else {
          authStudent({pin: this.pin, status: '3'}).then(res => {
            totFailD('认证失败！')
          })
        }
      }
    }
  }

</script>