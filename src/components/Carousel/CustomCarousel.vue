<template>
  <div class="carousel-container" ref="carouselCon">
    <div class="carousel" ref="carousel">
      <div
        v-for="(item, index) in carouselList"
        :key="index"
        :class="`carousel-item item${index + 1}`"
        :style="item.style"
        @click="changeCarousel(index)"
      >
        <img
          :class="`image image${index + 1}`"
          :style="item.imgStyle"
          :src="getImgUrl(item.imgIndex)"
        />
      </div>
    </div>
    <div class="mask" @click="mainSlideClick(currentCarousel)">
      <img class="image image1" src="../../assets/img/index-0.png" />
      <div :class="`icon icon-${currentCarousel.icon}`"></div>
      <div class="title">{{ currentCarousel.title }}</div>
      <div class="description">{{ currentCarousel.description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
const carouselStyle = {
  frontSideOffsetDeg: 20, // 前方两侧图片的偏移角度
  rearOffsetDeg: -12, // 后方两张图片的偏移角度
}

const carouselCenterList = [
  {
    type: 3,
    icon: 'znflzs',
    title: 'Title 4',
    description: 'Description 4',
  },
  {
    type: 2,
    icon: 'ajjsq',
    title: 'Title 3',
    description: 'Description 3',
  },
  {
    type: 1,
    icon: 'wssc',
    title: 'Title 2',
    description: 'Description 2',
  },
  {
    type: 0,
    icon: 'znzx',
    title: 'Title 1',
    description: 'Description 1',
  },
]

export default {
  props: {
    imgList: {
      type: Array,
      default: [],
    },
    maskImg: {
      type: String,
      default: '../../assets/img/index-0.png',
    },
  },
  
  data() {
    return {
      currentIndex: 0, // 轮播图索引
      // 轮播图列表
      carouselList: [
        {
          imgIndex: 1, // 当前的图片
          rotate: 0, // 每张图片旋转角度
          style: `transform: rotateY(0deg) translateZ(var(--translateZ))`, // 图片上层样式
          imgStyle: '', // 图片样式
        },
        {
          imgIndex: 1,
          rotate: 72,
          style: `transform: rotateY(${
            72 - carouselStyle.frontSideOffsetDeg
          }deg) translateZ(var(--translateZ))`,
          imgStyle: '',
        },
        {
          imgIndex: 2,
          rotate: 144,
          style: `transform: rotateY(${
            144 + carouselStyle.rearOffsetDeg
          }deg) translateZ(var(--rearTranslateZ)) scale(0.9)`,
          imgStyle: 'transform: rotateY(180deg)',
        },
        {
          imgIndex: 3,
          rotate: -144,
          style: `transform: rotateY(${
            -144 - carouselStyle.rearOffsetDeg
          }deg) translateZ(var(--rearTranslateZ)) scale(0.9)`,
          imgStyle: 'transform: rotateY(180deg)',
        },
        {
          imgIndex: 4,
          rotate: -72,
          style: `transform: rotateY(${
            -72 + carouselStyle.frontSideOffsetDeg
          }deg) translateZ(var(--translateZ))`,
          imgStyle: '',
        },
      ],
      currentCarousel: carouselCenterList[0], // 当前轮播图信息
      rotationAngle: 0,
      isChangingCarousel: false,
    }
  },

  computed: {
    getImgUrl() {
      return (imgIndex) => {
        return new URL(`../../assets/img/index-${imgIndex}.png`, import.meta.url).href
      }
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.bindTouchEvent()
      this.bindMouseEvent()
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
        this.handleCenterInfo(1, index)
        this.rotateCarousel(1)
      }

      // 点击左侧第一张
      if (
        (this.currentIndex >= 0 && index - this.currentIndex == -1) ||
        (this.currentIndex <= 0 && index == 4)
      ) {
        this.isChangingCarousel = true
        this.handleCenterInfo(-1, index)
        this.rotateCarousel(-1)
      }

      // if (
      //     (this.currentIndex <= 2 && index - this.currentIndex == 2) ||
      //     (this.currentIndex >= 3 && index - this.currentIndex == -3)
      // ) {
      //     this.rotateCarousel(1, 2)
      // }

      // if (
      //     (this.currentIndex <= 1 && index - this.currentIndex == 3) ||
      //     (this.currentIndex >= 2 && index - this.currentIndex == -2)
      // ) {
      //     this.rotateCarousel(-1, 2)
      // }
    },

    /**
     * @description 轮播图旋转
     * @param {number} direction - -1 逆时针 右滑 1 顺时针 左滑
     * @param {number} round - 旋转张数
     * @param {boolean} reset - 是否为重置轮播
     */
    rotateCarousel(direction, round = 1, reset = false) {
      // 判断旋转方向，计算旋转后图片索引
      if (direction > 0) {
        this.currentIndex = (this.currentIndex + direction * round) % 5
      } else {
        let c = this.currentIndex + direction * round
        c = c < 0 ? 5 + c : c
        this.currentIndex = c % 5
      }

      // 1. 中心图片两侧的两张图片单独做额外倾斜度处理
      // 2. 后方的两张图片反转180度
      this.carouselList.forEach((item, index) => {
        if (this.currentIndex + 1 == index || (this.currentIndex == 4 && index == 0)) {
          // 倾斜右侧图片
          item.style = `transform: rotateY(${
            item.rotate - carouselStyle.frontSideOffsetDeg
          }deg) translateZ(var(--translateZ))`
          item.imgStyle = ''
        } else if (this.currentIndex - 1 == index || (this.currentIndex == 0 && index == 4)) {
          // 倾斜左侧图片
          item.style = `transform: rotateY(${
            item.rotate + carouselStyle.frontSideOffsetDeg
          }deg) translateZ(var(--translateZ))`
          item.imgStyle = ''
        } else if (this.currentIndex - index == -2 || this.currentIndex - index == 3) {
          // 翻转后方右侧图片，并做一定倾斜
          item.style = `transform: rotateY(${
            item.rotate + carouselStyle.rearOffsetDeg
          }deg) translateZ(var(--rearTranslateZ)) scale(0.9)`
          item.imgStyle = 'transform: rotateY(180deg)'
        } else if (this.currentIndex - index == 2 || this.currentIndex - index == -3) {
          // 翻转后方左侧图片，并做一定倾斜
          item.style = `transform: rotateY(${
            item.rotate - carouselStyle.rearOffsetDeg
          }deg) translateZ(var(--rearTranslateZ)) scale(0.9)`
          item.imgStyle = 'transform: rotateY(180deg)'
        } else {
          item.style = ''
          item.imgStyle = ''
        }

        if (reset) {
          item.style += ';transition: unset !important'
        } else {
          item.style = item.style.replace('/;transition: unset !important/', '')
        }
      })

      const carousel = this.$refs.carousel
      this.rotationAngle = this.rotationAngle + (direction * round * -360) / 5
      carousel.style.transform = `rotateY(${this.rotationAngle}deg)`

      setTimeout(() => {
        const carousel = this.$refs.carousel
        /**
         * 当轮播到最后一张图片时，将整体轮播重置到初始状态
         * 需要注意重置前提，一种是点击左侧图片重置，一种是点击右侧图片重置
         * 同时需要考虑二者冲突问题
         */
        if (direction > 0 && this.currentIndex == 4) {
          // 当中心右侧图是智能法律助手时，再重置
          let rightImgIndex = this.currentIndex == 4 ? 0 : this.currentIndex + 1
          if (this.carouselList[rightImgIndex].imgIndex == 1) {
            carousel.style.transition = 'unset'
            this.rotateCarousel(direction, 1, true)
            this.carouselList.forEach((item, index) => {
              item.imgIndex = index == 0 ? index + 1 : index
            })
          }
        } else if (direction < 0 && this.currentIndex == 1) {
          // 当中心左侧图是智能咨询时，再重置
          let leftImgIndex = this.currentIndex == 0 ? 4 : this.currentIndex - 1
          if (this.carouselList[leftImgIndex].imgIndex == 4) {
            carousel.style.transition = 'unset'
            this.rotateCarousel(direction, 1, true)
            this.carouselList.forEach((item, index) => {
              item.imgIndex = index == 0 ? index + 1 : index
            })
          }
        } else {
          carousel.style.removeProperty('transition')
        }
      }, 500)

      // 防止频繁点击
      this.changeTimer && clearTimeout(this.changeTimer)
      this.changeTimer = setTimeout(() => {
        this.isChangingCarousel = false
      }, 550)
    },

    /**
     * @desc 处理中心图信息
     * @param direction -1顺时针 右滑 1逆时针 左滑
     * @param index 点击图片索引
     */
    handleCenterInfo(direction, index) {
      // debugger // eslint-disable-line
      // 替换中心图片 | 替换中心占位图相关信息
      if (direction > 0) {
        let imgIndex
        let nextItemIndex // 中心图片的下一张图片索引
        let imgInfo // 中心图片的上一张图片信息

        // 替换中心图片
        nextItemIndex = this.currentIndex == 4 ? 0 : this.currentIndex + 1
        imgInfo = this.carouselList[nextItemIndex]
        this.carouselList[this.currentIndex].imgIndex = imgInfo.imgIndex

        // 替换中心占位图相关信息
        if (this.currentIndex == 4) {
          nextItemIndex = 0
        } else {
          nextItemIndex = this.currentIndex + 1
        }
        console.log(this.carouselList[nextItemIndex])
        this.currentCarousel =
          carouselCenterList[
            this.carouselList[nextItemIndex].imgIndex == 4
              ? 0
              : this.carouselList[nextItemIndex].imgIndex
          ]
      } else {
        let imgIndex
        let lastItemIndex // 中心图片的上一张图片索引
        let imgInfo // 中心图片的上一张图片信息

        // 替换中心图片
        lastItemIndex = this.currentIndex == 0 ? 4 : this.currentIndex - 1
        imgInfo = this.carouselList[lastItemIndex]
        this.carouselList[this.currentIndex].imgIndex = imgInfo.imgIndex

        // 替换中心占位图相关信息
        if (this.currentIndex == 0) {
          lastItemIndex = 4
        } else {
          lastItemIndex = this.currentIndex - 1
        }
        console.log(this.carouselList[lastItemIndex])
        this.currentCarousel =
          carouselCenterList[
            this.carouselList[lastItemIndex].imgIndex == 0
              ? 4
              : this.carouselList[lastItemIndex].imgIndex - 1
          ]
      }
    },

    /**
     * @desc 中心图片点击
     * @param {Object} item 点击的图片信息
     */
    mainSlideClick(item) {
      console.log('mainSlideClick', item)
    },

    bindTouchEvent() {
      let startX
      let endX
      let that = this
      let swiper = this.$refs.carouselCon

      swiper.addEventListener('touchmove', function (ev) {
        let touch = event.targetTouches[0]
        endX = touch.pageX
      })

      swiper.addEventListener('touchstart', function (ev) {
        let touch = event.targetTouches[0]
        startX = touch.pageX
      })

      swiper.addEventListener('touchend', function (ev) {
        let distanceX = endX - startX

        if (!endX || that.isChangingCarousel) return

        if ((distanceX > 0 && distanceX < 50) || (distanceX < 0 && distanceX > -50)) return

        if (distanceX < 0) {
          console.log('touch left')
          that.isChangingCarousel = true
          that.handleCenterInfo(1)
          that.rotateCarousel(1)
        } else {
          console.log('touch right')
          that.isChangingCarousel = true
          that.handleCenterInfo(-1)
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
          this.handleCenterInfo(-1)
          this.rotateCarousel(-1)
        } else if (distanceX < -50) {
          this.isChangingCarousel = true
          this.handleCenterInfo(1)
          this.rotateCarousel(1)
        }

        startX = endX = 0
      })

      // 处理鼠标离开窗口的情况
      swiper.addEventListener('mouseleave', () => {
        isDragging = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel-container {
  --translateZ: 220px;
  --rearTranslateZ: 220px;
  $index-width: 30% !important;
  $index-height: 30% !important;
  height: 100%;
  display: flex;
  justify-content: center;
  perspective: 3000px;
  perspective-origin: 50% 0%;
  position: relative;
  user-select: none;
  .carousel {
    position: relative;
    width: $index-width;
    height: $index-height;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    transform: rotateY(0deg);
    .carousel-item {
      position: absolute;
      width: 100%;
      height: 100%;
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
  .item1 {
    transform: rotateY(0deg) translateZ(var(--translateZ));
  }
  .item2 {
    transform: rotateY(72deg) translateZ(var(--translateZ));
  }
  .item3 {
    transform: rotateY(144deg) translateZ(var(--translateZ));
  }
  .item4 {
    transform: rotateY(-144deg) translateZ(var(--translateZ));
  }
  .item5 {
    transform: rotateY(-72deg) translateZ(var(--translateZ));
  }
  .mask {
    width: $index-width;
    height: $index-height;
    transform: rotateY(0deg) translateZ(var(--translateZ)) scale(1.04);
    position: absolute;
    top: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    .image {
      width: 100%;
      height: 100%;
    }
    .icon {
      width: 20%;
      height: 20%;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 18%;
      left: 0;
      right: 0;
      margin: auto;
    }
    .icon-znflzs {
      background-image: url('../../assets/img/znflzs.png');
      background-position: -1px 1px;
    }
    .icon-ajjsq {
      background-image: url('../../assets/img/calculator_logo.png');
      background-position: -1px 1px;
    }
    .icon-wssc {
      background-image: url('../../assets/img/smartInstrumentsIconFont.png');
    }
    .icon-znzx {
      background-image: url('../../assets/img/legalAdviceIconFont.png');
    }
    .title {
      font-size: 14px;
      color: #fff;
      position: absolute;
      bottom: 38%;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      text-shadow: 0 1px 4px #2d2d2d;
    }
    .description {
      font-size: 10px;
      color: #fff;
      position: absolute;
      bottom: 30%;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
    }
  }
}
</style>
