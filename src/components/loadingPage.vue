<template>
  <div class="loadingPage">
    <i class="el-icon-loading"></i>
  </div>
</template>
<script>
export default {
  created () {
    let homeRoute = this.$store.getters.permission_routes.find(route => {
      return route.name !== 'loading' && route.name !== 'login' && route.name !== '404'
    })
    if (homeRoute) {
      // 页面重定向至该用户可访问的第一个页面
      this.$router.replace({ path: homeRoute.path })
    } else {
      this.$message({
        type: 'error',
        message: '您暂无权限，请联系管理员'
      })
      this.$store.dispatch('user/resetToken')
      this.$toolFn.localRemove('token')
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>
<style scoped lang="scss">
.loadingPage {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 60px;
    color: #ffffff;
  }
}
</style>

