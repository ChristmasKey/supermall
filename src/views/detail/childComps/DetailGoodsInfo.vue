<template>
  <div class="goods-info">略</div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      if(++this.counter === this.imagesLength) {
        this.$emit('imageLoad');
      }
    }
  }
}
</script>

<style scoped>

</style>
