<!-- 登录页面 -->
<template>
  <div id="loginPage">
    <login-top Text="登录">
     <router-link to="/register" slot="right" style="font-size:3.889vw">注册</router-link>
    </login-top>
    <van-field v-model="form.username" label="账号" placeholder="请输入账号" class="inputItem" />
    <van-field
      v-model="form.password"
      label="密码"
      type="password"
      placeholder="请输入密码"
    />

    <login-btn BtnText="登录" @TextClick="login"></login-btn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue";
import LoginBtn from "@/components/common/LoginBtn.vue";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    LoginTop,
    LoginBtn,
  },
  created() {},
  mounted() {},
  methods: {
    async login() {
      let rule = /^.{6,16}$/;
      if (rule.test(this.form.username) && rule.test(this.form.password)) {
        const res = await this.$http.post("/login", this.form);
        this.$msg(res.data.msg);
         localStorage.setItem('token',res.data.token) ;      
          localStorage.setItem('id',res.data.id);
           setTimeout(()=>{
            this.$router.push('/userinfo');
          },1000)
        
      } else {
        this.$msg.fail("格式不正确,6-16位数据");
      }
    },
  },
};
</script>
<style scoped lang="less">
#loginPage {
  .name {
    margin: 4.167vw auto;
  }
  .inputItem{
    margin: 2.778vw auto;
  }
}
</style>
