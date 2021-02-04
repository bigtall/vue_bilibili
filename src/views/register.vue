<!-- 注册页面 -->
<template>
  <div id="loginPage">
    <login-top Text="我是注册页"></login-top>

    <van-field v-model="text" label="姓名" class="name" />
     <van-field v-model="text" label="账号" />
      <van-field v-model="text" label="密码" type="password" />
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue";
export default {
  data() {
    return {};
  },
  components: {
    LoginTop,
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
#loginPage {
  .name {
    margin: 4.167vw auto;
  }
}
</style>