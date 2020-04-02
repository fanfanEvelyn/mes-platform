<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="left">
          <div
            class="collapse-btn"
            @click="collapseFun"
          >
            <i
              v-if="isCollapse"
              class="iconfont icon-spread"
            ></i>
            <i
              v-else
              class="iconfont icon-close"
            ></i>
          </div>
          <img
            src="@/assets/images/logo.png"
            alt
          />
        </div>
        <div class="right">
          <span class="community-select"> 
            <img  
            src="@/assets/images/icon_choicehome.png"
            alt
          />
            <el-select
              :value="community_selected_id"
              @change="handleCommunityChange"
              placeholder="请选择"
              style="width:180px"
            >
              <el-option
                v-for="item in community_options"
                :key="item.communityId"
                :label="item.communityName"
                :value="item.communityId"
              >
              </el-option>
              <el-option v-if="hasCreateCommunityPermission" :key="-1" :value="-1">
                <el-button size="mini" type="primary" style="width: 100%;">新增小区</el-button>
              </el-option>
            </el-select>
          </span>
          <!-- <span class="welcome-tip">欢迎使用昇辉物业信息管理系统</span> -->
          <span class="avatar-img">
            <img
            :src="avatar || require('@/assets/images/face_ico.jpg')"
            alt
           />
          </span>
         
          <el-dropdown @command="handleDropdownCommand">
            <span>
              <span>{{username}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updatePass">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-header>
      <el-container>
        <el-aside :width="collapseSize">
          <el-scrollbar style="height:100%;">
            <div class="demo-type">
              <div>
                <el-avatar
                  shape="square"
                  :style="styles"
                  :src="logoImagePath || require('@/assets/images/property-default.png')"
                ></el-avatar>
              </div>
              <div>
                <!-- <i class="el-icon-edit-outline cursor" @click="opendDialog"></i> -->
                <span v-if="!isCollapse">{{customerName}}</span>
              </div>
            </div>

            <sidebar :isCollapse="isCollapse"></sidebar>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main :style="mainStyle">
            <el-scrollbar style="height: 100%;">
              <breadcrumb></breadcrumb>
              <router-view
                class="pad10"
                :key="key"
              >
              </router-view>
            </el-scrollbar>
          </el-main>
          <el-footer>

            <img  
              src="@/assets/images/bottom-text.png"
              alt
            />
            <!-- 版权所有 (C) 2019 GRAMMY TECH。保留所有权利。 -->
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <change-password
        v-if="dialogVisible"
        @close="dialogVisible=false"
      ></change-password>
    </el-dialog>
  </div>
</template>
<script>
import sidebar from './components/Sidebar.vue';
import Breadcrumb from './components/Breadcrumb.vue'
// import Tags from "./components/Tags.vue";
import ChangePassword from './components/ChangePassword.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'Layout',
  inject: ['reload'],
  components: { sidebar, ChangePassword, Breadcrumb },
  data () {
    return {
      isCollapse: false, //左侧导航栏是否折叠
      dialogVisible: false
    };
  },
  computed: {
    //用户信息获取
    ...mapGetters(['avatar', 'username', 'phone', 'customerName', 'logoImagePath', 'community_options', 'community_selected_id', 'permission_tree']),
    key () {
      return this.$route.name
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
    // 是否有“新增小区”权限
    hasCreateCommunityPermission: function() {
      return this.permission_tree.some(i => i.url == '/project' && i.children.some(ii => ii.url == '/project/community' && ii.children.some(iii => iii.name == '新增')))
    },
    // main区域样式
    mainStyle: function () {
      if (this.isCollapse) {
        return {
          width: window.browserName === 'IE' ? 'calc(100vw - 64px)' : '',
          height: 'calc(100vh - 120px)'
        }
      } else {
        return {
          width: window.browserName === 'IE' ? 'calc(100vw - 220px)' : '',
          height: 'calc(100vh - 120px)'
        }
      }
    },
    // 侧边栏宽度
    collapseSize: function () {
      return this.isCollapse ? '64px' : '220px'
    },
    // 物业logo图片样式
    styles: function () {
      return this.isCollapse ? { height: '48px', width: '48px' } : { height: '80px', width: '80px' }
    }
  },

  methods: {
    collapseFun () {
      this.isCollapse = !this.isCollapse;
    },

    // 处理下拉菜单事件
    handleDropdownCommand: function (cmd) {
      if (cmd == 'loginout') {
        this.$store
          .dispatch('user/loginout')
          .then(() => {
            this.$router.replace('/login');
            this.$toolFn.localRemove('token');
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '登出失败：' + err
            });
          });
      } else if (cmd == 'updatePass') {
        // 显示修改密码
        this.dialogVisible = true;
      }
    },
    handleCommunityChange: function (value) {
      if (value !== -1) {
        this.$store.dispatch('community/changeSelected', value).then(() => { this.reload() })
      } else {
        this.$router.push({ path: '/project/community' })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  .allCenter {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .el-header {
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #D4AD85 0%, #D4AD85 100%);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    .left {
      @extend .allCenter;
      height: 40px;
      line-height: 40px;
      .iconfont {
        color: #896440;
      }
      .collapse-btn {
        width: 64px;
        height: 100%;
        font-size: 25px;
        text-align: center;
        cursor: pointer;
      }
      .collapse-btn:hover {
        color: #02fb60;
      }
    }
    .right {
      @extend .allCenter;
      padding: 20px;
      font-size: 14px;
      i {
        font-size: 24px;
      }
      span {
        margin: 0 5px;
        color: #896440;
      }
      .avatar-img img{
         width: 40px;
        height: 40px;
        border-radius: 100%;
      }
      
      .welcome-tip {
        margin-left: 20px;
        margin-right: 40px;
      }
      .community-select {
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
        width: 24px;
        height: 24px;
        }
      }
      .el-dropdown {
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .el-aside {
    width: 220px;
    height: calc(100vh - 60px);
    background: #222328;
    // background: url("../assets/images/aside-bg.png") no-repeat; 
    transition: 0.3s all;
    // background-size: 100% 100%; 
  }
  .el-main {
    padding: 0; 
  }
  
  .el-footer {
    background-color: rgba(238, 238, 238, 1);
    color: #333;
    line-height: 60px; 
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width:450px; 
    }
  }
  .demo-type {
    padding: 20px 0;
    background: #282A30;
  }
  .demo-type > div {
    flex: 1;
    text-align: center;
    color: #CAA27C;
  }
  .demo-type > div > i {
    margin-right: 10px;
  }
  .cursor {
    cursor: pointer;
  }
  .head-modification {
    width: 100%;
    height: 120px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .demo-avatar.demo-basic .demo-basic--circle,
  .demo-avatar.demo-basic .demo-basic--square {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .head-modification img,
  .business-license img {
    background-size: cover;
    width: 100%;
    // height: 100%;
  }
  .business-license {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .pad10 {
    padding: 20px;
    // background-color: #fff;
  }
}
.layout .el-icon--right {
  font-size: 12px !important;
}
// 更改el-select部分样式
.layout .el-select /deep/ .el-input__inner {
  height: 30px;
  line-height: 30px; 
      border: 1px solid #D4AD85; 
      background-color: #D4AD85;  
      color: #896440;
}
.layout .el-select /deep/ .el-input__icon {
  line-height: 30px;
   color: #896440;
}
.layout .el-main /deep/ .el-scrollbar .el-scrollbar__view {
  margin: 10px;
  min-height: calc(100% - 20px); // 减去上下边距
} 
.el-avatar {
  background: transparent;
}
</style>
 
 
