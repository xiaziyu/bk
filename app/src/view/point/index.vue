<style lang="less">
  @import 'index.less';
</style>
<template>
  <div class="page">
    <div class="page_top">

    </div>
    <div class="giftBox">

    </div>
    <div class="taskBox">

    </div>
  </div>
</template>

<script>
  import bg_top from '@/assets/point/bg_top.png'
  import { mapGetters } from 'vuex'
  import { totFailD } from '@/utils/notice'
  //import { getPin } from '@/api/point'

  export default{
    name: 'point',
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
          user_name: 'xxx',
          integral: '89'
        },
        show: false
      }
    },
    created() {
      this.getDate()
    },
    methods: {
      getDate() {
        this.$toast.clear()
      }
    }
  }

</script>