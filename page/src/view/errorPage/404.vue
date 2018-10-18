
<style rel="stylesheet/less" lang="less" scoped>
  @import "./404";
</style>
<template>
  <div style="background:#f0f2f5;margin-top: -20px;height:100%;">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img_404" alt="404">
        <img class="pic-404__child left" :src="img_404_cloud" alt="404">
        <img class="pic-404__child mid" :src="img_404_cloud" alt="404">
        <img class="pic-404__child right" :src="img_404_cloud" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，或点击以下按钮返回主页</div>
        <button class="bullshit__return-home" @click="back()">返回积分管理</button>
      </div>
    </div>
  </div>
</template>

<script>
  import img_404 from '@/assets/404_images/404.png'
  import img_404_cloud from '@/assets/404_images/404_cloud.png'

  export default {
    name: 'page404',
    data() {
      return {
        img_404,
        img_404_cloud
      }
    },
    computed: {
      message() {
        return '习大大说这个页面不存在......'
      }
    },
    methods: {
      back(){
        this.$router.push({name:'pointUser'})
      }
    }
  }
</script>

