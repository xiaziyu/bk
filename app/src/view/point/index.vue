<style lang="less">
  @import 'index.less';
</style>
<template>
  <van-pull-refresh class="page" v-model="isLoading" @refresh="getUsers">
    <div class="page_top">
      <div class="avatarImg">
        <img v-lazy="userInfo.icon">
      </div>
      <div class="avatar_info">
        <p class="name" v-text="userInfo.user_name"></p>
        <p>当前积分：{{userInfo.jd_point}}</p>
        <p>别克汇积分：{{userInfo.buick_point}}</p>
      </div>
      <button class="inter_btn" @click="interSub()">积分互通</button>
    </div>
    <div class="giftBox">
      <h1 class="title">热门礼品
        <a :href="moreUrl" class="icon icon-arrow-right gift_more">更多</a>
      </h1>
      <ul class="gift_list">
        <li class="gift_img" v-for="(item, i) in giftList"><a :href="item.url" v-lazy:background-image="item.img_url"></a></li>
      </ul>
    </div>
    <div class="taskBox">
      <h1 class="title">任务介绍</h1>
      <ul class="task_list">
        <li class="task_li" v-for="(item, i) in taskList" @click="handleTask(item.url)">
          <div class="task_icon">
            <img v-lazy="item.icon_url">
          </div>
          <div class="task_item">
            <p class="name" v-text="item.title"></p>
            <p class="text" v-text="item.desc"></p>
            <i class="task_detail icon icon-arrow-right">详情</i>
          </div>
        </li>
      </ul>
    </div>
  </van-pull-refresh>
</template>

<script>
  import Vue from 'vue'
  import loadingMap from '@/assets/icon/hearts.svg'
  import errorMap from '@/assets/icon/rect.svg'
  import bitmap from '@/assets/point/bitmap.png'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { Lazyload, PullRefresh } from 'vant'
  import { totFailD } from '@/utils/notice'
  import { getPoint, getGift, getTask } from '@/api/point'

  Vue.use(Lazyload, {
    preLoad: 1,
    error: errorMap,
    loading: loadingMap,
    attempt: 1
  })
  export default{
    name: 'point',
    components: {
      [Lazyload.name]: Lazyload,
      [PullRefresh.name]: PullRefresh
    },
    computed: {
      ...mapGetters([
        'source',
        'token',
        'pin'
      ])
    },
    data() {
      return {
        isLoading: false,
        userInfo: {
          icon:'',
          user_name: 'xxx',
          buick_point: '89',
          jd_point:'12'
        },
        moreUrl: '',
        giftList:[],
        taskList: []
      }
    },
    created() {
      this.getDate()
    },
    methods: {
      ...mapActions([
        'usersUrl'
      ]),
      getDate() {
        getGift().then(res => {
          this.giftList = res.data.giftList
          this.moreUrl = res.data.more
          console.log(res)
          getTask().then(respones => {
            console.log(respones)
            this.taskList = respones.data
            this.isLoading = false
            this.$toast.clear()
          }).catch(()=> {
            this.isLoading = false
          })
        }).catch(()=> {
          this.isLoading = false
        })
      },
      getUsers(){
        getPoint({pin: this.pin}).then(res => {
          if(res.data.status){
            this.userInfo = {
              icon: res.data.icon||'',
              user_name: res.data.user_name||'未知',
              buick_point: res.data.buick_point||'0',
              jd_point:res.data.jd_point||'0'
            }
            this.getDate()
          }else {
            this.usersUrl().then(url => {
              alert('跳转认证')
            })
          }
        }).catch(()=> {
          this.isLoading = false
        })
      },
      interSub(){
        console.log('积分互通')
      },
      handleTask(url){
        location.href = url
        console.log(url)
      }
    }
  }

</script>