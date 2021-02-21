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

      <edit-banner left="性别" @bannerClick="gendershow = true">
        <a href="javascript:;" slot="right">{{ model.gender ? "男" : "女" }}</a>
      </edit-banner>

      <edit-banner left="个签" @bannerClick="showSign = true">
        <a href="javascript:;" slot="right">{{ model.user_desc }}</a>
      </edit-banner>

      <div class="editback" @click="$router.back()">返回个人中心</div>
    </div>

    <van-dialog
      v-model="textshow"
      title="昵称修改"
      @confirm="confirmName"
      @cancel="name2 = ''"
    >
      <van-field v-model="name2" autofocus />
    </van-dialog>

    <van-dialog
      v-model="showSign"
      title="个性签名"
      @confirm="confirmSign"
      @cancel="name2 = ''"
    >
      <van-field v-model="name2" autofocus type="textarea" />
    </van-dialog>

    <van-action-sheet
      v-model="gendershow"
      cancel-text="取消"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import NavBar from "../components/common/navBar.vue";
import EditBanner from "../components/common/editbanner.vue";
export default {
  data() {
    return {
      model: {},
      show: false,
      showSign: false,
      gendershow: false,
      name2: "",
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 },
      ],
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

    confirmName() {
      this.model.name = this.name2;
      this.UserUpdate();
      this.name2 = "";
    },

    confirmSign() {
      this.model.user_desc = this.name2;
      this.UserUpdate();
      this.name2 = "";
    },

    // 切换性别
    onSelect(data) {
      this.model.gender = data.val;
      this.UserUpdate();
      this.gendershow = false;
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

  .editback {
    margin-top: 5.556vw;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    color: #999;
    padding: 4.167vw 0;
    font-size: 4vw;
  }
}
</style>