<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片"/>
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton'

export default {
  name: 'CartListItem',
  props: {
    itemInfo: {
      type: Object,
      // type: String,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
}
</script>

<style scoped>

</style>
