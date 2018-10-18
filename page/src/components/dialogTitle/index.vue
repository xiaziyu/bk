<template>
  <!--弹窗title-->
  <span>{{title}}<slot></slot></span>
</template>

<script>

  export default {
    name: 'dialogTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>