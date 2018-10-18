<template>
  <header class="header">
    <div class="plat-ver">别客青春俱乐部积分管理后台</div>
    <ul class="avatar-container">
      <li class="avatar-wrapper">欢迎您：{{name}}</li>
      <li class="avatar-wrapper" @click="logout()"><svg-icon icon-class="i-logout"/></li>
    </ul>
  </header>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { megError } from '@/utils/notice'

  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      ...mapActions([
        'toggleLoad',
        'LogOut'
      ]),
      logout() {
        this.toggleLoad(true)
        this.LogOut().then(() => {
          this.toggleLoad(false)
          this.$router.push({ name: 'login' })
          location.reload()
        }).catch(() => {
          this.toggleLoad(false)
        })
      }
    }
  }
</script>
