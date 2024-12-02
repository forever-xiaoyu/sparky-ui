<template>
  <div class="typewriter-container">
    <div class="text-container" v-html="text"></div>
    <div class="btn-container">
      <button class="btn" @click="start">开始打印</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TypeWriter from '@/utils/typeWriter/typeWriter'
import { testText, testArrayText } from './text'

const text = ref('')

function start() {
  const typewriter = new TypeWriter(20)

  typewriter.start(testText, {
    output: (t) => {
      text.value += t
    },
    finish: () => {
      console.log('finished')
    },
  })
}

function start2() {
  const typewriter = new TypeWriter(20, 'para')

  typewriter.start(testArrayText, {
    output: (t) => {
      text.value += t
    },
    finish: () => {
      console.log('finished')
    },
  })
}
</script>

<style lang="scss">
.typewriter-container {
  width: 100%;
  height: 100vh;
  display: flow-root;
  .text-container {
    width: 600px;
    height: 400px;
    margin: 100px auto 0;
    border: 1px solid #ddd;
    padding: 10px;
    overflow-y: auto;
    .paragraph {
      display: block;
      margin-bottom: 10px;
      text-indent: 20px;
    }
  }
  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .btn {
      cursor: pointer;
    }
  }
}
</style>
