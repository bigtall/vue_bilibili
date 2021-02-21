<!-- 编辑个人信息页面 -->
<template>
  <div>
    <nav-bar style="margin-bottom: 2.778vw" ref="navbar"></nav-bar>

    <div v-if="model" class="editViews">
      <div class="uploadfile">
        <div class="uploadimg">
          <van-uploader preview-size="100vw" :after-read="afterRead" />
        </div>
        <edit-banner left="头像">
          <img
            :src="model.user_img"
            slot="right"
            alt=""
            v-if="model.user_img"
          />
          <img src="@/assets/default_img.jpg" slot="right" alt="" v-else />
        </edit-banner>
      </div>

      <edit-banner left="昵称" @bannerClick="show = true">
        <a href="javascript:;" slot="right">{{ model.name }}</a>
      </edit-banner>

      <edit-banner left="账号">
        <a href="javascript:;" slot="right">{{ model.username }}</a>
      </edit-banner>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/common/navBar.vue";
import EditBanner from "../components/common/editbanner.vue";
export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    NavBar,
    EditBanner,
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      console.log(this.model, 38);
    },

    // 上传图片回调
    async afterRead(file) {
      console.log(file, "上传的文件数据");
      const fromdata = new FormData(); // 文件上传formData格式
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      console.log(res, "上传结果");
      this.model.user_img = res.data.url;
      
      this.$forceUpdate(); // 强制刷新dom

      // 直接更新所有用户信息
      this.UserUpdate();

      // 刷新导航信息
      this.$refs.navbar.NavInit();
    },

    // 更新用户数据
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg("修改成功");
      }
    },
  },
};
</script>

<style scoped lang="less">
.editViews {
  a {
    color: #333;
  }
  img {
    width: 11.111vw;
    height: 11.111vw;
    border-radius: 50%;
  }
  .uploadfile {
    overflow: hidden;
    position: relative;
    .uploadimg {
      opacity: 0;
      position: absolute;
    }
  }
}
</style>