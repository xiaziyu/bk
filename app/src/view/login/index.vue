<template>
  <div class="page">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { getOpenid } from '@/api/login'

  export default{
    name: 'login',
    computed: {
      ...mapGetters([
        'codes',
        'states'
      ])
    },
    created() {
      this.jdGetCode()
    },
    methods: {
      ...mapActions([
        'changeCode',
        'changeOpenid',
        'jdOpenIdUrl'
      ]),
      jdGetCode(){
        const [code, state] = [this.$route.query['code']||'', this.$route.query['state']||'']
        if(code&&state){
          //alert(code)
          //alert(state)
          const data = { code, state }
          this.changeCode(data).then(() => {
            this.getDate(data)
          })
          /*getToken({ code, state}).then(res => {
            alert(JSON.stringify(res))
            if(res.data){
              this.changeToken({ token: res.data } ).then(() => {
                this.getDate()
              })
            }
          })*/
        }else {
          if(this.$route.query['errcode']){
            const text = this.$route.query['errcode']||'登录有误，请稍候重试'
            totFailD(text)
          }else {
            this.jdOpenIdUrl().then(url => {
              location.href = url
            })
          }
        }
      },
      getDate(data){
        getOpenid(data).then(res => {
          alert(JSON.stringify(res))
          this.changeOpenid(res.data.openid)
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