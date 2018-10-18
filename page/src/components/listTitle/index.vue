<template>
  <!--表格title-->
  <div class="table_header clearfix">
    <h3 class="table_tit fl">{{title}}</h3>
    <el-button-group class="fr">
      <slot></slot>
    </el-button-group>
  </div>
</template>

<script>

  export default {
    name: 'listTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>