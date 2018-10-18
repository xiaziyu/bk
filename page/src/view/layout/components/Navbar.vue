<template>
  <header class="header">
    <div class="plat-ver">别客青春俱乐部积分管理后台</div>
    <ul class="avatar-container">
      <li class="avatar-wrapper">欢迎您：admin</li>
      <li class="avatar-wrapper"><svg-icon icon-class="i-logout"/></li>
    </ul>
  </header>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { megError } from '@/utils/notice'
  import { afterGetPub } from '@/utils/auth'

  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      logout() {
        /*this.loading.all = true
        this.$store.dispatch('adminLogOut').then(() => {
          this.loading.all = false
          this.$router.push({ name: 'login' })
          location.reload()
        }).catch(() => {
          this.loading.all = false
        })*/
        /*this.$store.dispatch('FedLogOut').then(() => {
         location.reload()// 为了重新实例化vue-router对象 避免bug
         })*/
      }
    }
  }
</script>
