<template>
  <div class="demo-container">
    <div class="text-container" @mouseup="handleMouseUp">
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本</p>
      <p>这是一段文本这是一段文本这是这是一段文本这是一段文本这是一段文本</p>
    </div>
    <ToolBar max-length="100" ref="toolBar" @selectText="handleSelectText">
      <div class="btn-container">
        <span class="btn" @click="handleClick('功能1')">功能1</span>
        <span class="btn" @click="handleClick('功能2')">功能2</span>
        <span class="btn" @click="handleClick('功能3')">功能3</span>
        <span class="btn" @click="toolBar.hideToolBar">关闭</span>
      </div>
    </ToolBar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ToolBar from '@/components/ToolBar/ToolBar.vue'

const toolBar = ref()

function handleMouseUp(event) {
  toolBar.value.showToolBar(event)
}

function handleClick(text) {
  alert(text)
}

function handleSelectText(text) {
  console.log('handleSelectText', text)
}
</script>

<style lang="scss" scoped>
.demo-container {
  width: 100%;
  height: 100vh;
  display: flow-root;
  .text-container {
    width: 600px;
    height: 500px;
    margin: 100px auto 0;
    border: 1px solid #ddd;
    overflow-y: auto;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 5px 0;
    .btn {
      cursor: pointer;
    }
  }
}
</style>
