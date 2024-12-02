<template>
  <div class="demo-container">
    <div class="carousel">
      <CustomCarousel />
    </div>
  </div>
</template>

<script lang="ts">
import CustomCarousel from '@/components/Carousel/CustomCarousel.vue'

export default {
  components: {
    CustomCarousel
  },
}
</script>

<style lang="scss" scoped>
.demo-container {
  width: 100%;
  height: 100vh;
  // background-image: url('@/assets/img/HomeBg.png');
  background-size: 100%;
  display: flow-root;
  .carousel {
    width: 600px;
    height: 600px;
    margin: 200px auto;
  }
}
</style>
