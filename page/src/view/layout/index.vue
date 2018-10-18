<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}" v-loading="loading" element-loading-text="正在请求中……">
    <sidebar></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from './components'

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      loading() {
        return this.$store.state.app.loading
      }
    }
  }
</script>

