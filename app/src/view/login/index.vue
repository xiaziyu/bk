<template>
  <div class="page">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { getToken, getPin } from '@/api/login'

  export default{
    name: 'login',
    computed: {
      ...mapGetters([
        'token',
        'states',
        'pin'
      ])
    },
    created() {
      this.getDate()
    },
    methods: {
      getDate() {
        const data ={token: this.token}
        alert(this.token)
          getPin(data).then(res => {
            alert(JSON.stringify(res))
          })
          // this.$router.push({name:'join'})
      },
    }
  }

</script>