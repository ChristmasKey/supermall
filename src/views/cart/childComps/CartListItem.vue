<template>
  <div>
    {{product}}
  </div>
</template>

<script>
export default {
  name: 'CartListItem',
  props: {
    product: {
      // type: Object,
      type: String,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
