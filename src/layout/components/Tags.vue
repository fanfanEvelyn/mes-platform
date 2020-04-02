<template>
  <div class="tabs-wrap">
    <el-tabs
      v-model="TabsValue"
      type="card"
      closable
      @tab-click="tabSelection"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item) in visited_views"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <el-button>
        标签选项
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" style="margin-top:-10px;">
        <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
        <!-- <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Tags",
  data() {
    return {
      TabsValue: ""
    };
  },
  mounted() {
    this.addTags();
  },
  methods: {
    initTags() {
      // 加入标签
      this.addTags();
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        // 加入标签
        this.$store.dispatch("tags/addVisitedView", this.$route);
        // 设置选中
        this.TabsValue = name;
      }
      return false;
    },
    // 选中标签
    tabSelection(tab) {
      this.$router.push({ name: tab.name });
    },
    // 移除标签
    removeTab(tab) {
      if (this.visited_views.length == 1) {
        return false;
      } else {
        this.$store.dispatch("tags/delVisitedView", tab).then(tabs => {
          if (tabs.length > 0) {
            const isExist = tabs.filter(tab => {
              return tab.name === this.TabsValue;
            });
            if (isExist.length <= 0) {
              this.TabsValue = tabs[tabs.length - 1].name;
              this.tabSelection(tabs[tabs.length - 1]);
            }
          }
        });
      }
    },
    handleCommand(cmd) {
      if (cmd == "closeOther") {
        this.$store
          .dispatch("tags/delOthersVisitedView", this.TabsValue)
          .then(tabs => {
            if (tabs.length > 0) {
              this.TabsValue = tabs[tabs.length - 1].name;
              this.tabSelection(tabs[tabs.length - 1]);
            }
          });
      }
    }
  },
  computed: {
    ...mapGetters(["visited_views"]),
    navTabs() {
      return this.visited_views;
    }
  },
  watch: {
    $route() {
      this.addTags();
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs-wrap {
  display: flex;
  padding: 5px 10px 0;
  .el-tabs {
    flex: 1;
  }

}

.el-tabs__item.is-active {
  color: #de8033;
}
</style>