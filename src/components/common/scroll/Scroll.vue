<template>
  <!-- 组件通信：ref / children -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        pullUpLoad: true,
        observeDOM: true
      });

      this.scroll.on('pullingUp', () => {
        // console.log('到底了');
        this.scroll.finishPullUp();
      });
    }
  }
</script>

<style scoped>

</style>
