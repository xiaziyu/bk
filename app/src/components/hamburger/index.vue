<template>
  <div @click="toggleClick">
    <svg-icon class="hamburger" :class="{'is-active':isActive}" icon-class="hamburger"></svg-icon>
  </div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>
