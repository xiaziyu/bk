<template>
  <div class="page">

  </div>
</template>

<script>
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
    created() {
      this.getDate()
    },
    methods: {
      getDate() {

      }
    }
  }

</script>