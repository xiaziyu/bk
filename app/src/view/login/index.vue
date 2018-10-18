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
        'pin',
        'client'
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
        'jumpUrl'
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
        alert('京东打开啦，求文档~')
        /*getIsvToken({client: this.client}).then(res => {

        })*/
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