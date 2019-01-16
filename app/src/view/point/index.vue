<style lang="less" scoped>
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
        <p>
          别客汇积分：
          <button v-if="is_sign!=='Y'" @click="handleJoin()" v-track-event="{category:'button_join', action:'click',opt_label: '按钮注册'}" class="join_btn">加入</button>
          <span v-else>{{userInfo.buick_point}}</span>
        </p>
      </div>
      <button class="inter_btn" v-track-event="{category:'exchange', action:'click',opt_label: '积分兑换'}" @click="interSub()">积分互通</button>
    </div>
    <div class="giftBox">
      <h1 class="title">别克会员商城
        <a @click="handleGift(moreUrl, 'more')" class="icon icon-arrow-right gift_more">更多</a>
      </h1>
      <van-swipe class="banner_list" :autoplay="3000" indicator-color="#ffffff">
        <van-swipe-item v-for="(item, i) in giftList" :key="i">
          <img @click="handleGift(item.url, 'list')" v-lazy="item.img_url" />
        </van-swipe-item>
      </van-swipe>
      <!--<ul class="gift_list">
        <li class="gift_img" v-for="(item, i) in giftList" @click="handleGift(item.url)"><img v-lazy="item.img_url"/></li>
      </ul>-->
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
  import errorMap from '@/assets/icon/noimages.svg'
  import bitmap from '@/assets/point/bitmap.png'
  import { mapGetters } from 'vuex'
  //import { mapActions } from 'vuex'
  import { Lazyload, PullRefresh, Swipe, SwipeItem } from 'vant'
  import { totFailD, totText, totSuc, allLoad } from '@/utils/notice'
  import { getPoint, changePoint, getGift, getTask, getHotGiftUrl } from '@/api/point'
  import ba from 'vue-ba'

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
      [PullRefresh.name]: PullRefresh,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },
    computed: {
      ...mapGetters([
        'source',
        'codes',
        'states',
        'openid'
      ])
    },
    data() {
      return {
        isLoading: false,
        userInfo: {
          icon:'',
          user_name: '',
          buick_point: '0',
          jd_point:'0'
        },
        sing_url: '',
        is_sign: 'N',
        moreUrl: '',
        giftList:[{img_url: 'http://img.michro.club/jdbk/banner1little.jpeg', url: ''}],
        taskList: []
      }
    },
    mounted() {
      this.$toast.clear()
      this.getUsers()
    },
    methods: {
      getUsers(){
        allLoad()
        getPoint({openid: this.openid}).then(res => {
          this.userInfo = {
            icon: res.data.icon||'',
            user_name: res.data.user_name||'--',
            buick_point: res.data.buick_point||'0',
            jd_point:res.data.jd_point||'0'
          }
          this.is_sign = res.data.status?'Y':'N'
          this.sign_url = res.data.sign_url || ''
          this.getDate()
        }).catch(()=> {
          this.isLoading = false
        })
      },
      getDate() {
        const data = {openid: this.openid, is_sign: this.is_sign}
        getGift(data).then(res => {
          this.giftList = res.data.giftList
          this.moreUrl = res.data.more
          getTask({openid: this.openid}).then(respones => {
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
      interSub(){
        if(this.is_sign==='Y'){//已注册别客汇
          if(this.userInfo.jd_point&&Number(this.userInfo.jd_point)>0){
            allLoad()
            changePoint({openid: this.openid}).then(res => {
              this.$toast.clear()
              totSuc('兑换成功')
              this.getUsers()
            }).catch(()=> {
              this.$toast.clear()
            })
          }else {
            totText('您的京东积分不足！')
          }
        }else {
          totText('您还未加入别克会员！')
        }
      },
      handleJoin(){
        if(this.sign_url){
          location.href = this.sign_url
        }
      },
      handleGift(url, type){
        if(this.is_sign==='Y'){
          if(type==='more'){
            ba.trackEvent('more_mall', 'click', '更多链接商城')
          }else {
            ba.trackEvent('banner_mall', 'click', '通栏图片商城')
          }
          allLoad()
          const data = {openid: this.openid, is_sign: this.is_sign}
          getHotGiftUrl(data).then(res => {
            location.href = url+res.data
            this.$toast.clear()
          }).catch(()=> {
          })
        }else {
          if(type==='more'){
            ba.trackEvent('more_join', 'click', '更多链接注册')
          }else {
            ba.trackEvent('banner_join', 'click', '通栏图片注册')
          }
          location.href = this.sign_url
        }
        /*if(!this.is_sign==='Y'){//已注册别客汇
          location.href = url
        }else {
          //location.href = 'http://m.buick.com.cn/app.html'
          location.href = this.sign_url
        }*/
      },
      handleTask(url){
        if(url){
          location.href = url
        }
      }
      /*startApp(){
        //启动APP
        if(this.source==='WX'){     //微信中
          totFailD('请在浏览器中打开')
        }else if(this.client){      //非微信中
          if(this.client==='ios'){
            window.location.href = 'ibuick://'
          }else {
            let [hasApp, t, t1] = [true , 1000, Date.now()]
            setTimeout(function () {  //没有安装APP则跳转至应用宝下载，延时时间设置为2秒
              if(!hasApp) window.location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.buick"
            } , 2000)
            window.location.href = 'scheme://host/iBuick'
            setTimeout(function () {
              //t的时间就是出发APP启动的时间，若APP启动了，再次返回页面时t2这行代码执行，hasApp即为true。反之若APP没有启动即为false
              const t2 = Date.now()
              hasApp = !(!t1 || t2 - t1 < t + 150)
            } , t);
          }
        }
      },*/
    }
  }

</script>