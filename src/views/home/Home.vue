<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'

import {getHomeMultidata} from 'network/home'

export default {
  name: 'home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      keywords: [],
      dKeywords: [],
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      this.keywords = res.data.keywords.list;
      this.dKeywords = res.data.dKeyword.list;
    });
  }
}
</script>

<style scoped>
  .home-navbar {
    background-color: var(--color-tint);
    color: white;
  }
</style>
