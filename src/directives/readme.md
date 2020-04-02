# 全局自定义指令

为了能简化一些功能相似的代码，实现自定义指令并注册到全局，你可以在任何页面的组件中使用它的功能。

所有位于`index.js`文件中的指令定义会被自动注册到全局生成[Vue 自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)，注册代码位于主文件`/src/main.js`中：

```
// 注册全局自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
```

## 指令集

### v-focus 输入框自动获取焦点

进入页面或刷新页面后，焦点自动聚集到使用该指令的第一个表单元素，即带 input 的组件。多使用于 el-input，也可以使用到 el-select 等组件。

你可以像如下这样使用即可实现自动获取焦点：

```
<el-input v-focus></el-input>
```

### v-permission 按钮级权限

自动从全局权限许可树中查询当前用户是否具有该按钮的权限，若没有，则使用了`v-permission`指令的此按钮将会从 DOM 中移除。

以功能名称作为关键字匹配是否具有该项权限，`v-permission`会自动获取按钮的`Text`属性作为默认的功能名称。

你可以像如下这样使用即可实现功能按钮的权限自动判断：

```
<el-button v-permission>删除</el-button>
```

若权限表里为当前页面配置了“删除”功能，则该`button`就会存在，反之则会被移除。

对于多个具有不同`Text`的`button`共用同一个权限，如“启用|禁用”；或非`button`的组件也需要绑定权限，但是不具有固定的`Text`，如`el-select`组件。

v-permission 接受一个传入参数作为功能名称，传入参数的类型必须是 String 类型。你可以像如下这样使用：

```
<el-select v-permission="'状态更改'"></el-select>
```

*注意：传入的参数具有更高的优先级，并且传入的功能名称应与权限表配置的功能名称完全一致才会获取到权限*

### v-formitemtip 表单项提示

在表单项`<el-form-item>`末尾添加一个`el-icon-question`图标，光标移动至图标时弹出提示。通常用来描述表单输入的合法性，或是对表单项的解释说明。

接受一个`String`类型的输入参数作为提示内容，目前只支持显示文本内容。

你可以像如下这样使用：
```
<el-form-item v-formtip="'提示内容'"></el-form-item>
```

*注意：使用了全局样式