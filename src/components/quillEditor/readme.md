# quill-editor
对vue-quill-editor富文本编辑器再封装，对其做了一些修改：
- 修复一些样式显示异常问题
- 增加tooltip的中文提示
- 对字体大小，字体，标题等内容进行汉化显示
- 调整一些样式，使功能按钮排列更加紧凑

## 使用注意
依赖vue-quill-editor插件，因此需要提前安装vue-quill-editor，通过npm方式安装：
```
npm install vue-quill-editor --save
```

## 详细说明
为了能像直接使用vue-quill-editor本身一样，重写了v-model双向绑定，和v-on事件绑定。

默认重新绑定了常用的blur，change，focus事件。

### Props
| 名称        | 说明                             | 类型     | 默认值  |
|:--------   | ---------------------------------| -------- |--       |
| options    | 配置选项，同原生                    |Object    |空       |
| height     | 输入框高度，单位：px              |Number     |170     |
|placeholder |空白占位符                        |String     |“请输入内容”|
|v-model     |双向绑定的值                      |String     |空        |

### Events
| 名称        | 说明                             | 参数  |
|:--------   | ---------------------------------|--     |
| blur      | 失去焦点触发事件                    | Quill  |
| focus     | 获取焦点时触发事件                  |{html, text, quill}    |
| change    | 输入内容改变事件响应                | Quill |