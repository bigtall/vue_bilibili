<!-- 主页 -->
<template>
  <div class="home">
      <nav-bar></nav-bar>
      <van-tabs v-model="active" swipeable sticky animated >
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad">
            <div class="detailparent">
              <cover
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem,categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        </van-tab>
</van-tabs>

  </div>
</template>

<script>
import NavBar from "@/components/common/navBar";
import Cover from './cover'
export default {
  data () {
    return {
        active:0,
        category:[]
    };
  },

  components: {
      NavBar,
    Cover
  },

  watch:{
    active:function (val) {
      console.log(val);
      this.selectArticle()

    }
  },

  computed: {},

  mounted() {
      this.getCategory();
  },

  methods: {
    async getCategory(){
         const res = await this.$http.get("/category");
         // 处理data的值
          res.data.map(item=>{
            item.list = []; // 详细文章
            item.page = 1;
            item.pagesize = 10;
            item.finished = false; // 是否加载到底
            item.loading = true;
          })
         this.category = res.data;

          this.selectArticle();
      },

      async selectArticle(){
        const curCategory=this.category[this.active]; // 当前的一级大分类
        const res=await this.$http.get('/detail/'+curCategory._id,{
          params:{
            page: curCategory.page,
            pagesize: curCategory.pagesize
          }
        });

        curCategory.list.push(...res.data);
        curCategory.loading=false;

        // 判断是否加载到底
        if(res.data.length<curCategory.pagesize){
          curCategory.finished=true;
        }
      },

    onLoad(){
      const curCategory=this.category[this.active]; // 当前的一级大分类
      curCategory.page++;
      this.selectArticle();
    }
  }
}

</script>
<style scoped lang="less">
  .home {
    background-color: white;
  }
  .detailparent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detailitem {
      margin: 1.389vw 0;
      width: 45%;
    }
  }
  .categorytab{
    position: relative;
    .category-ico{
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.944vw;
      padding: 1.389vw 2.778vw;
      background-color: white;
    }
  }

</style>
