<!-- 用户信息 -->
<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/bannerTop_new.png" class="topBgImage">
    <user-detail></user-detail>

  </div>
</template>

<script>
import NavBar from "@/components/common/navBar";
import UserDetail from "@/components/userComponent/userDetail"
export default {
  data() {
    return {
      model:{

      }
    };
  },
  components: {
    NavBar,
    UserDetail
  },

  created() {
    this.getUserInfo();
  },
  mounted() {},
  methods:{
    async getUserInfo(){
      console.log(localStorage.getItem('id'), 33);
      const res =  await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0];    

    }
  }
};
</script>
<style scoped lang="less">
  .userinfo{
    .topBgImage{
      width:100%;
    }
  }

</style>