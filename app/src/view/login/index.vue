<template>
  <div class="page">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { getPin } from '@/api/login'

  export default{
    name: 'login',
    computed: {
      ...mapGetters([
        'source',
        'token',
        'pin'
      ])
    },
    created() {
      console.log(this.$route.query['token'])
      if(this.$route.query['token']){
        const token = this.$route.query['token']
        this.$store.dispatch('setToken', { token } ).then(() => {
          this.$router.push({name:'join'})
        })
      }else {
        this.$store.dispatch('jumpUrl').then(url => {
          location.href = url
        })
      }
    },
    methods: {
      getDate() {
        const data ={token: this.token}
        getPin(data).then(res => {
          console.log(res)
          this.$router.push({name:'join'})
        })
      }
    }
  }

</script>