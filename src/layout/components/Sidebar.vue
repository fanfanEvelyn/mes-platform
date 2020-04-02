<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      router
      class="el-menu-vertical-demo"
      background-color="rgba(35, 65, 163, 0)"
      text-color="#fff"
      active-text-color="#fff"
      :unique-opened="true"
      :collapse="isCollapse"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route" 
        :base-path="route.path"
        :collapse="isCollapse"
      ></sidebar-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem.vue";
export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
};
</script>
<style lang="scss" scoped>
 .el-menu {
  border-right: 0;
}

// 侧边栏折叠相关样式
.el-menu--collapse {
  /deep/ .el-menu-item {
    span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
    .el-submenu__icon-arrow {
      display: none;
    }
  }
}

.el-menu--collapse {
  /deep/.el-submenu {
    .el-submenu__title {
      span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
}

</style>


