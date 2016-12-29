### 画图板功能分析
---

- 功能区(保存、清空)
- 工具区(形状和工具)
- 属性设置区(颜色和线宽)
- 绘图区域(canvas)

### 技术分析
---

- 页面布局
  - HTML5标签
- 页面美化
  - css
- 功能设置  
  - JavaScript编程
- canvas API
  - 属性设置、画线、写字、画图、画布操作(清空、获取画布信息)
- 下载
  - 使用php的下载功能(JS无法操作本地文件)

### 画一个简单的画布
---

- 鼠标点击时
  - 准备起始点 moveTo()、设置标志位
- 鼠标移动时
  - 判断标志位，值为true画图，false不画图
  - 移动时指定路径lineTo()，并且画出来stroke()
- 鼠标离开或者抬
  - 清空标志位

### 复杂的在线画板
---

- 获取相应元素对象
- 设置点击状态
- 设置触发功能
  - 颜色属性设置
  - 线宽属性设置
  - 绘图形状设置
  - 工具指定

### Demo
---

- [演示](blog.poetries.top/drawing-board)

### License
---

© 2016 A [poetries's](http://blog.poetries.top) [Ideas](https://github.com/poetries/ideas).