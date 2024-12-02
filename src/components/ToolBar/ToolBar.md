# ToolBar 组件

`ToolBar` 组件是一个基础的悬浮工具栏组件，通常用于文章详情页，当鼠标选择了文本后，会出现悬浮的工具栏在选择文本下方。

## 使用示例

在你的 Vue 组件中导入并使用 ToolBar 组件。

```js
<template>
  <div class="demo-container">
    <div class="text-container" @mouseup="handleMouseUp">
      <p>这里是正文内容</p>
    </div>
    <ToolBar max-length="100" ref="toolBar" @selectText="handleSelectText">
      <div class="btn-container">
        <span class="btn">功能1</span>
        <span class="btn">功能2</span>
        <span class="btn">功能3</span>
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

function handleSelectText(text) {
  console.log('handleSelectText', text)
}
</script>
```

## API
### 属性
| 属性 | 说明 | 类型 | 默认值
| :--: | :--: | :--: | :--: |
| maxLength | 最大选中字符数 | number | - |

### 事件
| 事件 | 说明 | 回调参数 | 参数说明
| :--: | :--: | :--: | :-: |
| selectText | 选中文本事件 | text | 选中文本内容 |

### 方法
| 方法 | 说明 | 参数 | 参数说明
| :--: | :--: | :--: | :-: |
| showToolBar | 显示工具栏 | event | 事件源 |
| hideToolBar | 隐藏工具栏 | - | - |