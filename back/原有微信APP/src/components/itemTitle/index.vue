<template>
  <!--页面title-->
  <div class="title">
    <template v-if="title">{{title}}</template>
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'itemTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>