<template>
  <div class="demo-container">
    <div class="carousel">
      <ThreeDCarousel
        :img-list="imgList"
        img-width="150px"
        img-height="135px"
        img-distance="320px"
        :auto-play="autoPlay"
        :speed="3000"
        ref="carousel"
        @imgClick="handleClickImg"
      />
      <div class="btn-container">
        <button @click="prev">上一张</button>
        <button @click="next">下一张</button>
        <button @click="handleAutoPlay">自动轮播</button>
        <button @click="handleCancelAutoPlay">关闭轮播</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ThreeDCarousel from '@/components/Carousel/ThreeDCarousel.vue'

const carousel = ref()
const autoPlay = ref(false)
const imgList = ref([
  // '../../assets/img/HomeBg.png',
  'https://img0.baidu.com/it/u=1446729335,4267600834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=2922694860,2270800253&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img0.baidu.com/it/u=595403291,2269048245&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img0.baidu.com/it/u=1164365158,2722332607&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=9876582,1040648435&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=2172054385,2684839842&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=1879107733,3573789717&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=1720323410,218932174&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=2479779032,1379361694&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=537208727,895387248&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=3310720258,943543712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  // 'https://img2.baidu.com/it/u=2165957654,3023194084&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  // 'https://img0.baidu.com/it/u=1280320387,1585665801&fm=253&fmt=auto&app=138&f=JPEG?w=368&h=368',
  // 'https://img0.baidu.com/it/u=1403512971,1919400898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  // 'https://img0.baidu.com/it/u=707869343,3146161581&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
])

function prev() {
  carousel.value.prev()
}

function next() {
  carousel.value.next()
}

function handleAutoPlay() {
  autoPlay.value = true
}

function handleCancelAutoPlay() {
  autoPlay.value = false
}

function handleClickImg(item) {
  alert('你点击了图片' + (item.imgIndex + 1))
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
    width: 1200px;
    height: 300px;
    margin: 100px auto;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
