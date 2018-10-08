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
      this.getDate()
      if(this.$route.query['token']){
        const data ={token: this.token}
        store.dispatch('setToken', data ).then(() => {
          this.$router.push({name:'join'})
          //this.getDate()
        })
      }else {
        store.dispatch('jumpUrl').then(url => {
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