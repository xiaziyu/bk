<style lang="less">
  @import 'index.less';
</style>
<template>
  <div class="page">
    <div class="page_top">
      <div class="avatarImg">
        <img v-lazy="userInfo.img">
      </div>
      <div class="avatar_info">
        <p class="name" v-text="userInfo.user_name"></p>
        <p>当前积分：{{userInfo.integral}}</p>
        <p>别克汇积分：{{userInfo.bk}}</p>
      </div>
      <button class="inter_btn" @click="interSub()">积分互通</button>
    </div>
    <div class="giftBox">
      <h1 class="title">热门礼品
        <a class="icon icon-arrow-right gift_more">更多</a>
      </h1>
      <ul class="gift_list">
        <li class="gift_img" v-for="(item, i) in giftList"><a :href="item.href" v-lazy:background-image="item.img"></a></li>
      </ul>
    </div>
    <div class="taskBox">
      <h1 class="title">任务介绍</h1>
      <ul class="task_list">
        <li class="task_li" v-for="(item, i) in taskList" @click="handleTask(item.id)">
          <div class="task_icon">
            <img v-lazy="item.img">
          </div>
          <div class="task_item">
            <p class="name" v-text="item.title"></p>
            <p class="text" v-text="item.text"></p>
            <i class="task_detail icon icon-arrow-right">详情</i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import loadingMap from '@/assets/icon/hearts.svg'
  import errorMap from '@/assets/icon/rect.svg'
  import bitmap from '@/assets/point/bitmap.png'
  import { mapGetters } from 'vuex'
  import { Lazyload } from 'vant'
  import { totFailD } from '@/utils/notice'
  //import { getPin } from '@/api/point'

  Vue.use(Lazyload, {
    preLoad: 1,
    error: errorMap,
    loading: loadingMap,
    attempt: 1
  })
  export default{
    name: 'point',
    components: {
      [Lazyload.name]: Lazyload
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
        userInfo: {
          img:'',
          user_name: 'xxx',
          integral: '89',
          bk:'12'
        },
        giftList:[{img: bitmap, href: ''}, {img: '', href: ''}, {img: bitmap, href: ''}],
        taskList: [{img: '', title: '这里是文案1这里是文案1这里是文案1这里是文案1这里是文案1这里是文案1这里是文案1', text: '说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案', id:'12'}, {img: '', title: '这里是文案2', text: '说明文案', id:'12'}]
      }
    },
    created() {
      this.getDate()
    },
    methods: {
      getDate() {
        this.$toast.clear()
      },
      interSub(){
        console.log('积分互通')
      },
      handleTask(id){
        console.log(id)
      }
    }
  }

</script>