<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <svg-icon icon-class="logo"/>
      <span class="name">管理后台</span>
    </div>
    <el-menu class="sidebar-container" mode="vertical" :default-active="$route.path" :collapse="isCollapse"><!-- @select="changeRoute"-->
      <sidebar-item :routes="routerMap"></sidebar-item>
      <!--:disabled="disabled"-->
    </el-menu>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import { routerMap } from '@/router/index'
  import hamburger from '@/components/hamburger'


  export default {
    components: {
      SidebarItem,
      hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    data(){
      return {
        routerMap: routerMap
      }
    },
    created(){
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      }
    }
  }
</script>
