<template>
  <div v-if="!item.hidden">
    <el-menu-item
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow"
      :index="resolvePath(onlyOneChild.path)"
      :disabled="onlyOneChild.meta && onlyOneChild.meta.disabled"
    >
      <img v-if="item.meta && item.meta.icon" :src="item.meta && item.meta.icon">
      <!-- <i :class="onlyOneChild.meta.icon"></i> -->
      <span slot="title" class="solt-title">{{onlyOneChild.meta && onlyOneChild.meta.title}}</span>
    </el-menu-item>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title" v-if="item.meta">
         <img v-if="item.meta.icon" :src="item.meta.icon">
        <!-- <i :class="item.meta.icon"></i> -->
        <span slot="title" class="solt-title">{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        :collapse="collapse"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>
<script>
const path = require('path')
export default {
  name: 'SidebarItem',
  props: {
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });

      // 只有一个子路由时，默认显示
      if (showingChildren.length === 1) {
        return true;
      }

      // 没有子路由时显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (this.isExternal(routePath)) {
        return routePath;
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    }
  }
};
</script>
<style lang="scss" scoped>
.solt-title {
  margin-left: 10px;
}
</style>