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
        'codes',
        'states',
        'pin'
      ])
    },
    created() {
      this.getDate()
    },
    methods: {
      getDate() {
        const data ={code: this.codes, state: this.states}
        // console.log(data)
        getToken(data).then(response => {
          const token = response.data?response.data.access_token:''
          getPin({state: this.states, source: this.source, access_token: token}).then(res => {
            const pin = res.data.pin||''
            const status = res.data.status
            this.$store.dispatch('setPin', pin)
            this.type = status ==='1'?'1':status ==='3'||status ==='5'?'2':'3'
          })
          this.$router.push({name:'join'})
        })
      },
    }
  }

</script>