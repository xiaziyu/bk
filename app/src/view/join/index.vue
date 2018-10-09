<style lang="less">
  @import './index.less';
</style>
<template>
  <div class="page page-join">
    <img class="page-top" :src="headerImg">
    <div class="item">
      <itemTitle :title="'活动介绍'"></itemTitle>
      <div class="inform" :class="show?'':'max'">
        由别克品牌联合京东少东家打造的高校实践型校园社群，致力于打造一个集人才培养、知识分享、生活体验的社会实践平台，通过提供世界500强名企的培训活、活动、实习等机会，为在校大学生创造丰富的生活体验，挖掘并培养未来企业精英。
      </div>
      <i class="icon" :class="show?'icon-less':'icon-more'" @click="handleShow()"></i>
    </div>
    <div class="item">
      <itemTitle :title="'报名信息填写'"></itemTitle>
      <van-cell-group class="form">
        <van-field v-model="userForm.user_name" :readonly="type==='1'" clearable label="姓名" placeholder="请输入姓名" maxlength="20"/>
        <van-field v-model="userForm.phone_num" :readonly="type==='1'" clearable label="手机号" placeholder="请输入手机号" maxlength="11"/>
        <van-field v-model="userForm.email" :disabled="type==='1'" clearable label="邮箱" placeholder="请输入常用邮箱" maxlength="50"/>
      </van-cell-group>
    </div>
    <p class="join_jf" @click="handleWx()" v-if="type==='1'"><span>进入别克积分</span></p>
    <van-button class="btn-join" v-if="type==='1'" disabled>已报名</van-button>
    <van-button class="btn-join" @click="joinSub()" v-else>报名</van-button>
  </div>
</template>

<script>
  import headerImg from '@/assets/join/banner.png'
  import { Field, Cell, CellGroup, Button } from 'vant'
  import itemTitle from '@/components/itemTitle'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { validateEmail, valIph } from '@/utils/validate'
  import { totText } from '@/utils/notice'
  import { getPin } from '@/api/login'
  import { subJoin } from '@/api/join'

  export default {
    name: 'join',
    components: {
      [Field.name]: Field,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      itemTitle
    },
    computed: {
      ...mapGetters([
        'token',
        'pin',
        'source'
      ])
    },
    data() {
      return {
        headerImg : headerImg+'?v=1',
        type:'2',
        userForm: {
          user_name: '',
          phone_num: '',
          email: ''
        },
        show: false
      }
    },
    mounted(){
      this.$nextTick(function () {
        // console.log(this.$route.params)
      });
    },
    created() {
      this.getDate()
    },
    methods: {
      ...mapActions([
        'setPin',
        'getUserInfo'
      ]),
      getDate() {
        const data ={token: this.token, source: this.source}
        alert(JSON.stringify(data))
        getPin(data).then(res => {
          console.log(res)
          this.setPin(res.data.pin)
          //store.dispatch('setPin', res.data.pin )
          this.type = res.data.status//res.data.status为1 是已报名，2是未报名
          if(this.type==='1'){
            this.userForm = {
              user_name: res.data.user_name||'',
              phone_num: res.data.phone_num||'',
              email: res.data.email||''
            }
          }
          this.$toast.clear()
        })
      },
      handleShow(){
        this.show = !this.show
      },
      check(){
        if(this.userForm.user_name===''){
          totText('姓名不能为空')
        }else if(this.userForm.phone_num===''){
          totText('手机号不能为空')
        }else if(!valIph(this.userForm.phone_num)){
          totText('手机号格式不符，请检查输入')
        }else if(this.userForm.email===''){
          totText('邮箱不能为空')
        }else if(!validateEmail(this.userForm.email)){
          totText('邮箱格式不符，请检查输入')
        }else {
          return true
        }
        return false
      },
      joinSub(){
        if(this.check()){
          const data = { pin: this.pin, ...this.userForm }
          alert(JSON.stringify(data))
          subJoin(data).then(res => {
            alert(JSON.stringify(res))
          })
          console.log('报名提交')
        }
      },
      handleWx(){
        console.log('进入别克积分')
      }
    }
  }
</script>
