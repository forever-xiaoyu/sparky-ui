<template>
  <div class="carousel-container" :style="carouselStyle" ref="carouselCon">
    <div class="carousel" ref="carousel">
      <div
        v-for="(item, index) in carouselList"
        :key="index"
        class="carousel-item"
        :style="item.style"
        @click="handleClick(item)"
      >
        <img class="image" :style="item.imgStyle" :src="item.imgUrl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    imgList: {
      type: Array,
      default: [],
    },
    imgWidth: {
      type: String,
      default: '300px',
    },
    imgHeight: {
      type: String,
      default: 'auto',
    },
    imgDistance: {
      type: String,
      default: '300px',
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 3000,
    },
  },

  data() {
    return {
      currentIndex: 0, // 轮播图索引
      carouselList: [], // 轮播图列表
      currentCarousel: null, // 当前轮播图信息
      rotationAngle: 0, // 图片旋转角度
      transformAngle: 0, // 图片移动角度
      isChangingCarousel: false,
      carouselStyle: {},
    }
  },

  watch: {
    autoPlay(val) {
      if (val) {
        this.handleAutoPlay()
      } else {
        this.handleCancelAutoPlay()
      }
    },
  },

  mounted() {
    console.log('imgList', this.imgList)
    this.init()
  },

  methods: {
    async init() {
      this.computedImgList()
      // this.bindTouchEvent()
      // this.bindMouseEvent()
      this.handleAutoPlay()
    },

    /**
     * 轮播图切换
     * @param {number} index 图片索引
     */
    changeCarousel(index) {
      if (this.isChangingCarousel) {
        return
      }
      console.log('index', index)

      /**
       * 判断点击图片方向及切换张数
       * 点击左侧第一张，逆时针旋转一圈，点击右侧第一张，顺时针旋转一圈
       * 点击左侧第二张，逆时针旋转两圈，点击右侧第二张，顺时针旋转两圈
       */
      // 点击右侧第一张
      if (
        (this.currentIndex <= 4 && index - this.currentIndex == 1) ||
        (this.currentIndex == 4 && index == 0)
      ) {
        this.isChangingCarousel = true
        this.rotateCarousel(1)
      }

      // 点击左侧第一张
      if (
        (this.currentIndex >= 0 && index - this.currentIndex == -1) ||
        (this.currentIndex <= 0 && index == 4)
      ) {
        this.isChangingCarousel = true
        this.rotateCarousel(-1)
      }
    },

    /**
     * @description 轮播图旋转
     * @param {number} direction - 上一张 -1  下一张 1
     * @param {number} round - 旋转张数
     */
    rotateCarousel(direction, round = 1) {
      // 判断旋转方向，计算旋转后图片索引
      if (direction > 0) {
        this.currentIndex = (this.currentIndex + direction * round) % this.imgLen
      } else {
        let c = this.currentIndex + direction * round
        c = c < 0 ? this.imgLen + c : c
        this.currentIndex = c % this.imgLen
      }

      console.log('currentIndex', this.currentIndex)

      const carousel = this.$refs.carousel
      this.transformAngle += this.rotationAngle * -direction * round
      carousel.style.transform = `rotateY(${this.transformAngle}deg)`
    },

    computedImgList() {
      if (this.imgWidth) {
        this.carouselStyle['--imgWidth'] = this.imgWidth
      }
      if (this.imgHeight) {
        this.carouselStyle['--imgHeight'] = this.imgHeight
      }
      if (this.imgDistance) {
        this.carouselStyle['--translateZ'] = this.imgDistance
      }

      this.imgLen = this.imgList.length
      this.rotationAngle = 360 / this.imgLen
      this.carouselList = this.imgList.map((imgUrl, index) => {
        if (imgUrl.includes('../')) {
          imgUrl = new URL(imgUrl, import.meta.url).href
        }
        return {
          imgIndex: index,
          imgUrl,
          rotate: this.rotationAngle * index,
          style: `transform: rotateY(${this.rotationAngle * index}deg) translateZ(var(--translateZ))`,
          imgStyle: '',
        }
      })
    },

    bindTouchEvent() {
      let startX
      let endX
      let that = this
      let swiper = this.$refs.carouselCon

      swiper.addEventListener('touchmove', () => {
        let touch = event.targetTouches[0]
        endX = touch.pageX
      })

      swiper.addEventListener('touchstart', () => {
        let touch = event.targetTouches[0]
        startX = touch.pageX
      })

      swiper.addEventListener('touchend', () => {
        let distanceX = endX - startX

        if (!endX || that.isChangingCarousel) return

        if ((distanceX > 0 && distanceX < 50) || (distanceX < 0 && distanceX > -50)) return

        if (distanceX < 0) {
          console.log('touch left')
          that.isChangingCarousel = true
          that.rotateCarousel(1)
        } else {
          console.log('touch right')
          that.isChangingCarousel = true
          that.rotateCarousel(-1)
        }

        startX = endX = 0
      })
    },

    bindMouseEvent() {
      let startX = 0,
        endX = 0
      let isDragging = false
      let swiper = this.$refs.carouselCon

      swiper.addEventListener('mousedown', (event) => {
        // console.log(event.clientX)
        isDragging = true
        startX = event.clientX
      })

      swiper.addEventListener('mousemove', (event) => {
        if (!isDragging) return
      })

      swiper.addEventListener('mouseup', (event) => {
        // console.log(event.clientX)
        isDragging = false
        endX = event.clientX
        let distanceX = endX - startX
        // console.log(distanceX)

        if (this.isChangingCarousel) {
          return
        }

        if (distanceX > 50) {
          this.isChangingCarousel = true
          this.rotateCarousel(-1)
        } else if (distanceX < -50) {
          this.isChangingCarousel = true
          this.rotateCarousel(1)
        }

        startX = endX = 0
      })

      // 处理鼠标离开窗口的情况
      swiper.addEventListener('mouseleave', () => {
        isDragging = false
      })
    },

    handleAutoPlay() {
      if (this.autoPlay && !this.autoPlayTimer) {
        this.autoPlayTimer = setInterval(() => {
          this.rotateCarousel(1)
        }, this.speed)
      }
    },

    handleCancelAutoPlay() {
      if (this.autoPlayTimer) {
        this.autoPlayTimer = clearInterval(this.autoPlayTimer)
      }
    },

    handleClick(item) {
      console.log('handleClick', item)
      this.$emit('imgClick', item)
    },

    prev() {
      if (this.autoPlay) {
        this.handleCancelAutoPlay()
        setTimeout(this.handleAutoPlay, 500)
      }
      this.rotateCarousel(-1)
    },

    next() {
      if (this.autoPlay) {
        this.handleCancelAutoPlay()
        setTimeout(this.handleAutoPlay, 500)
      }
      this.rotateCarousel(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel-container {
  height: 100%;
  display: flex;
  justify-content: center;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  position: relative;
  user-select: none;
  .carousel {
    position: relative;
    // width: 100%;
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    transform: rotateY(0deg);
    .carousel-item {
      position: absolute;
      width: var(--imgWidth);
      height: var(--imgHeight);
      /* backface-visibility: hidden; 隐藏背面 */
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
      transition: transform 0.5s;
      .image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
