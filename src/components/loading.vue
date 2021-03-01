<!-- 全局loading组件 -->
<template>
  <div class="loading" >
      <van-loading vertical>加载中...</van-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style scoped>
loading {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  padding-top: 5.333333rem;
}
</style>