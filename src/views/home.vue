<!-- 主页 -->
<template>
  <div>
      <nav-bar></nav-bar>
      <van-tabs v-model="active">
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">  内容 1</van-tab>
</van-tabs>

  </div>
</template>

<script>
import NavBar from "@/components/common/navBar";
export default {
  data () {
    return {
        active:0,
        category:[]
    };
  },

  components: {
      NavBar
  },

  computed: {},

  mounted() {
      this.init();
  },

  methods: {
    async init(){
         const res = await this.$http.get("/category");
         this.category = res.data;

      }
  }
}

</script>
<style scoped>
</style>