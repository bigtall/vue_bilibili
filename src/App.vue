<template>
  <div id="app">
    <loading v-show="isShowLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
import Loading from './components/loading.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    Loading
  },
  computed:{
    ...mapState(['isShowLoading'])
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
</style>
