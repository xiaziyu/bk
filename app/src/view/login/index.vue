<template>
  <div class="page">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { getPin, getIsvToken } from '@/api/login'

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
      if(this.source==='JD'){
        this.jdGetToken()
      }else {
        this.wxGetToken()
      }
    },
    methods: {
      ...mapActions([
        'changeToken',
        'changePin',
        'jumpUrl',
        'jdCodeUrl'
      ]),
      wxGetToken(){
        const token = this.$route.query['token']||''
        if(token){
          this.changeToken({ token } ).then(() => {
            this.getDate()
          })
        }else {
          this.jumpUrl().then(url => {
            location.href = url
          })
        }
      },
      jdGetToken(){
        const [code, state] = [this.$route.query['code']||'', this.$route.query['state']||'']
        alert(code)
        alert(state)
        if(code&&state){
          getIsvToken({ code, state}).then(res => {
            alert(JSON.stringify(res))
          })
        }else {
          this.jdCodeUrl().then(url => {
            location.href = url
          })
        }
      },
      getDate() {
        const data ={token: this.token, source: this.source}
        alert(JSON.stringify(data))
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