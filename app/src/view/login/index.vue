<template>
  <div class="page">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { totFailD } from '@/utils/notice'
  import { getOpenid, getUserInfo } from '@/api/login'

  export default{
    name: 'login',
    computed: {
      ...mapGetters([
        'codes',
        'states',
        'openid'
      ])
    },
    created() {
      if(this.openid){
        this.getInfo()
      }else {
        this.jdGetCode()
      }
    },
    methods: {
      ...mapActions([
        'changeCode',
        'changeOpenid',
        'jdOpenIdUrl',
        'FedLogOut'
      ]),
      jdGetCode(){
        const [code, state] = [ this.$route.query['code']||'', 'jdbk' ]
        const data = { code, state }
        getOpenid(data).then(res => {
          //alert(JSON.stringify(res))
          if(res.data.openid){
            this.changeOpenid(res.data.openid).then(()=> {
              this.getInfo()
            })
          }else {
            this.jdOpenIdUrl().then(url => {
              location.href = url
            })
          }
        }).catch(error => {

        })
      },
      getInfo(){
        const data ={openid: this.openid}
        getUserInfo(data).then(res => {
          //res.data.status为1 是已报名，2是未报名
          if(res.data.status==='1'){
            this.$router.push({name:'point'})
          }else {
            this.$router.push({name:'join'})
          }
        }).catch(error => {
          this.FedLogOut()
          totFailD(error)
        })
      }
      /*if(code&&state){
       //alert(code)
       //alert(state)
       const data = { code, state }
       this.changeCode(data).then(() => {
       this.getDate(data)
       })
       }else {
       if(this.$route.query['errcode']){
       const text = this.$route.query['errcode']||'登录有误，请稍候重试'
       totFailD(text)
       }else {
       this.jdOpenIdUrl().then(url => {
       location.href = url
       })
       }
       }*/
    }
  }
</script>