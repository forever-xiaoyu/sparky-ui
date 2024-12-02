<template>
  <div
    v-show="toolBarVisible"
    class="text-toolbar"
    :style="{ top: toolBarPosition.y + 'px', left: toolBarPosition.x + 'px' }"
  >
    <div class="toolbar-container">
      <slot></slot>
    </div>
    <div class="toolbar-mask" @click="hideToolBar"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Range from '@/utils/notation/Range'

const props = defineProps({
  maxLength: {
    type: Number,
    default: undefined,
  },
})

const emits = defineEmits(['selectText'])
const toolBarVisible = ref(false) // 控制工具栏显示
const toolBarPosition = ref({ x: 0, y: 0 }) // 工具栏位置
const selectedTextClass = 'toolbar-text-selected'
let selectedRange // 选中文本

function showToolBar(event) {
  const selection = window.getSelection()
  const text = selection?.toString()?.trim()

  if (text) {
    if (props.maxLength && text.length > props.maxLength) {
      return
    }

    // 计算工具栏位置
    toolBarPosition.value = {
      x: event.clientX - 80,
      y: event.clientY + window.scrollY + 20,
    }
    
    addSelectedTextStyle()

    toolBarVisible.value = true

    emits('selectText', text)
  } else {
    hideToolBar()
  }
}

function hideToolBar() {
  resetSelectedTextStyle()
  toolBarVisible.value = false
}

function addSelectedTextStyle() {
  const getRange = () => {
    let rangeOne = new Range(window.document)
    let sel = window.getSelection()
    let selectStr = sel.toString()
    if (sel && sel.rangeCount) {
      let firstRange = sel.getRangeAt(0)
      let lastRange = sel.getRangeAt(sel.rangeCount - 1)
      rangeOne
        .setStart(firstRange.startContainer, firstRange.startOffset)
        .setEnd(lastRange.endContainer, lastRange.endOffset)
    }
    return rangeOne
  }

  selectedRange = getRange()
  selectedRange.applyInlineStyle('i', {
    class: selectedTextClass,
  })
  selectedRange.select()
  window.getSelection()?.removeAllRanges()
}

function resetSelectedTextStyle() {
  if (selectedRange) {
    try {
      selectedRange.removeInlineStyle('i', selectedTextClass)
    } catch (error) {
      console.log('resetSelectedTextStyle', error)
    }
  }
}

defineExpose({
  showToolBar,
  hideToolBar,
})
</script>

<style lang="scss" scoped>
.text-toolbar {
  position: absolute;
  .toolbar-container {
    position: relative;
    z-index: 3;
    padding: 5px 10px;
    // width: 160px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 5px 5px 10px #ababab;
  }
  .toolbar-top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 44px;
    margin: 0 auto;
    .toolbar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      user-select: none;
      .toolbar-icon {
        display: inline-block;
        width: 25px;
        height: 20px;
        font-size: 16px;
        text-align: center;
      }
      .toolbar-icon-active {
        background: #f1f110;
      }
      .toolbar-text {
        font-size: 12px;
      }
    }
  }
  .toolbar-bottom {
    margin-top: 5px;
    text-align: center;
    .ant-input {
      width: 100%;
      padding: 2px 5px;
      line-height: 1.4;
    }
    .btn-view {
      display: flex;
      justify-content: flex-end;
      margin: 5px auto 0;
    }
    .toolbar-btn {
      display: inline-block;
      width: 70px;
      height: 23px;
      font-size: 12px;
      line-height: 23px;
      color: #fff;
      cursor: pointer;
      background: #0292fe;
      border-radius: 5px;
      user-select: none;
    }
  }
  .toolbar-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100vh;
  }
}
</style>

<style lang="scss">
.toolbar-text-selected {
  padding: 2px 0;
  font-style: normal !important;
  color: #fff !important;
  background-color: #3368d2;
  .toolbar-text-highlight {
    border-bottom: none !important;
  }
  #highlight1 {
    color: #fff !important;
    border-width: 1px !important;
  }
  mark {
    color: #fff !important;
    background-color: #3368d2 !important;
  }
}
.toolbar-text-highlight {
  padding: 1px 0;
  border-bottom: 2px solid #fcdf7e;
}
</style>
