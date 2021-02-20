<!-- 注册页面 -->
<template>
  <div id="loginPage">
    <login-top Text="注册">
      <router-link to="/login" slot="right" style="font-size:3.889vw">登录</router-link>
    </login-top>

    <van-field
      v-model="form.name"
      label="姓名"
      class="name"
      placeholder="请输入姓名"
    />
    <van-field
      v-model="form.username"
      label="账号"
      placeholder="请输入账号"
      class="inputItem"
    />
    <van-field
      v-model="form.password"
      label="密码"
      type="password"
      placeholder="请输入密码"
    />

    <login-btn BtnText="注册" @TextClick="doRegister"></login-btn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue";
import LoginBtn from "@/components/common/LoginBtn.vue";
export default {
  data() {
    return {
      form: {
        name: "",
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
    async doRegister() {
      let rule = /^.{6,16}$/;
      if (
        rule.test(this.form.name) &&
        rule.test(this.form.username) &&
        rule.test(this.form.password)
      ) {
        const res = await this.$http.post("/register", this.form);
        this.$msg(res.data.msg);
        if(res.data.code===200){ 
          localStorage.setItem('token',res.data.objtoken) ;      
          localStorage.setItem('id',res.data.id);
          setTimeout(()=>{
            this.$router.push('/userinfo');
          },1000)
          
        }
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

  .inputItem {
    margin: 2.778vw auto;
  }
}
</style>
