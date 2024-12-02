# ThreeDCarousel 组件

`ThreeDCarousel` 组件是一个3d轮播图组件，将指定的图片集以3d轮播图的形式展示出来，同时可以指定是否自动轮播、图片宽高等，建议图片在大于6张时使用该组件。

## 使用示例

在你的 Vue 组件中导入并使用 ThreeDCarousel 组件。

```js
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
  'image1',
  'image2',
  'image3',
  'image4',
  'image5',
  'image6',
  'image7',
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
```

## API
### 属性
| 属性 | 说明 | 类型 | 默认值
| :--: | :--: | :--: | :--: |
| imgList | 图片集 | array | - |
| imgWidth | 图片宽度 | String | 300px |
| imgHeight | 图片高度 | String | auto |
| imgDistance | 图片间距 | String | 300px |
| autoPlay | 是否自动轮播 | Boolean | false |
| speed | 轮播间隔时间 | Number | 3000 |

### 事件
| 事件 | 说明 | 回调参数 | 参数说明
| :--: | :--: | :--: | :-: |
| imgClick | 点击事件 | item | 点击图片对象信息 |

### 方法
| 方法 | 说明 | 参数 | 参数说明
| :--: | :--: | :--: | :-: |
| prev | 上一张图片 | - | - |
| next | 下一张图片 | - | - |