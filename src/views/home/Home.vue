<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1"
     class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :click="true" :probeType="3" 
    :pullUpLoad="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils';

export default {
  name: 'home',
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    HomeRecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods('pop', 1);
    this.getHomeGoods('new', 1);
    this.getHomeGoods('sell', 1);
  },
  mounted() {    
    // 监听item中图片加载完成
    // 通过 总线 实现非父子组件之间的通信
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh();
    // });
  },
  methods: {
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        // this.goods[type].list.push(...res.data.list);
        this.goods[type].list.push(...res);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      // 参数：x, y, time
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

      // 2.决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },

    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
      
    },

    // tabControl的 吸顶 效果
    swiperImageLoad() {
      // 首先获取tabControl的offsetTop：必须知道滚动到多少时，开始有 吸顶 效果
      // 在mounted中获取该值是不正确的（HomeSwiper中尚有图片未加载完）
      // 监听HomeSwiper中的img加载完成，发出事件，在Home中获取正确的值
      
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性 $el : 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
