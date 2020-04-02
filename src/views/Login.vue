<template>
  <div class="login" v-loading="loading">
    <div class="logo">

    </div>
    <div class="container">
      <h5 class="text-div">mes后台管理系统</h5>
      <div class="container-box">
        <div class="container-div">
          <el-row :gutter="20">
            <el-col :span="12" class="container-left">
            </el-col>
            <el-col :span="12">
              <h5 class="text-head">欢迎用户登录</h5>
              <el-form label-width="0.1%" label-position="left" :model="formLabelAlign" :rules="rules" ref="ruleForm" class="container-right">
                <el-form-item label="" prop="user" class="myitem_user" style="width:300px">
                  <el-input class='myinput' v-model="formLabelAlign.user" v-focus maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass" class="myitem_pwd" style="width:300px">
                  <el-input type="password" class='myinput' v-model="formLabelAlign.pass" autocomplete="new-password" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="validCode" class="myitem_code" v-if="showValidCode">
                  <el-input type="text" class='myinput passCode' placeholder="请输入验证码" v-model="formLabelAlign.validCode" style="width:50%;">
                  </el-input>
                  <identity class="passCode" :height="38" title="点击更换验证码" :identifyCode="validCode" @click.native="createValidCode"></identity>
                  <!-- <img v-if="formLabelAlign.captchaImg" :src="formLabelAlign.captchaImg" @click="getCaptchaImg" class="avatar" style="width:39%;height:40px;float:right;"> -->
                </el-form-item>
                <el-checkbox v-model="checked" class="remember">自动登录</el-checkbox>
                <el-form-item>
                  <el-button class="button-box" @click="submitForm('ruleForm')">立 即 登 录</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Identity from '@/components/Identity.vue';
import md5 from 'js-md5';
import { setToken, getToken, getLocalToken, setLocalToken } from '@/lib/auth.js';
import { isPassword } from '@/lib/validate.js';
export default {
  name: 'login',
  components: { Identity },
  data () {
    var valid1 = (rules, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      } else {
        if (value.length < 6) {
          return callback(new Error('密码长度不少于6位'));
        } else if (!isPassword(value)) {
          return callback(
            new Error('密码必须包含数字，至少包含字母或_~@#$^,.;*&%等特殊字符')
          );
        } else {
          return callback();
        }
      }
    };
    return {
      loading: false,
      showValidCode: false,
      formLabelAlign: {
        user: '',
        pass: '',
        validCode: ''
      },
      redirect: undefined,
      otherQuery: {},
      failLoginWithErrorPasswordLeft: 0,
      rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ required: true, trigger: 'blur', validator: valid1, }],
        validCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      checked: false,
      validCode: '',
    };
  },

  created () {
    /**
   * 自动登录相关
   */
    // 从本地缓存中读取 是否自动登录
    let isAutoLogin = this.$toolFn.localGet('checked');
    this.checked = isAutoLogin;

    if (isAutoLogin) {
      // console.log(isAutoLogin)
      // 自动登录则从本地缓存中读取token
      let token = getLocalToken();
      if (token) {
        setToken(token);
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        });
      }
    }

    /**
     * 按回车登录
     */
    let that = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13 && !that.hasMessageBox) {
        that.submitForm('ruleForm');// 登录方法名
        return false;
      }
    };

    /**
     * 验证码相关
     */
    this.createValidCode();
    // 获取当前时间
    let nowTime = new Date();
    // 获取本地缓存的时间
    let verificationCodeTime = this.$toolFn.localGet('verificationCode');
    if (nowTime > verificationCodeTime) {
      this.$toolFn.localRemove('verificationCode');
    } else {
      this.showValidCode = true;
    }
  },

  mounted () {
    let rememberUserName = this.$toolFn.cookieGet('userName')
    if (rememberUserName) {
      this.formLabelAlign.user = rememberUserName
    }
  },

  methods: {
    //设置cookie
    setCookie (objName, objValue, objHours) {
      var str = objName + '=' + encodeURI(objValue);
      if (objHours > 0) {
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += '; expires=' + date.toGMTString();
      }
      document.cookie = str;
    },
    //获取cookie
    getCookie (cname) {
      var name = cname + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    // 提交表单
    submitForm (formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.showValidCode) {
            if (this.validCode.toUpperCase() == this.formLabelAlign.validCode.toUpperCase()) {
              _this.loginFn();
            } else {
              this.loading = false;
              this.createValidCode();
              this.hasMessageBox = true;
              this.$alert('验证码错误', '提 示', {
                confirmButtonText: '确定',
                confirmButtonClass: 'el-button--success',
                cancelButtonClass: 'el-button--cancel',
              }).finally(() => {
                this.hasMessageBox = false;
              }).catch(() => { });

            }
          } else {
            _this.loginFn();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 登录
    loginFn () {
      var _this = this;
      let user = {
        phone: _this.formLabelAlign.user,
        password: md5(_this.formLabelAlign.pass),
        type: 1
      };
      this.loading = true
      this.$store
        .dispatch('user/login', user)
        .then(() => {
          this.failLoginWithErrorPasswordLeft = 0;
          this.$toolFn.localRemove('verificationCode');
          /**
           * 自动登录相关
           */
          if (_this.checked) {
            // 自动登录：是
            // 获取token写入本地缓存 
            // 自动登录选择存入本地缓存
            setLocalToken(getToken());
            this.$toolFn.localSet('checked', true);
          } else {
            // 自动登录：否
            this.$toolFn.localRemove('token');
            this.$toolFn.localRemove('checked');
            _this.checked = false
          }
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          });
          this.$toolFn.cookieSet('userName', this.formLabelAlign.user)
        })
        .catch(err => {
          if (
            typeof err == 'string' &&
            (err.indexOf('密码不正确') >= 0 || err.indexOf('密码错误') >= 0)
          ) {
            this.failLoginWithErrorPasswordLeft++;
          }
          this.hasMessageBox = true;
          this.$alert(err, '提 示', {
            confirmButtonText: '确定',
            confirmButtonClass: 'el-button--success',
            cancelButtonClass: 'el-button--cancel',
          })
            .catch(() => { })
            .finally(() => {
              this.hasMessageBox = false;
            });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // 生成验证码
    createValidCode: function () {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let pow = '';
      for (let i = 0; i < 4; i++) {
        pow += chars[Math.floor(Math.random() * chars.length)];
      }
      // console.log(pow);
      this.validCode = pow;
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    },
    failLoginWithErrorPasswordLeft: {
      handler: function (newVal) {
        if (newVal >= 3) {
          this.showValidCode = true;
          let nowTime = new Date();
          let endTime = new Date(nowTime + 8 * 60 * 60);
          this.$toolFn.localSet('verificationCode', endTime);
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  background: url("../assets/images/login-bg.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  -moz-background-size: fixed;
  .logo {
    // background: url("../assets/images/logo1.png") no-repeat;
    margin: 0px 0px 0px 0px;
    background-attachment: cover;
    background-size: 100% 100%;
    position: absolute;
    width: 160px;
    height: 54px;
    left: 60px;
    top: 50px;
  }
  .container {
    .text-div {
      text-align: center;
      font-size: 42px;
      color: #fff;
      height: 100px;
      font-family: "PingFang-SC-Regular";
    }
    .container-box {
      background: url("../assets/images/login-bg2.png") no-repeat;
      margin: 0px 0px 0px 0px;
      background-attachment: cover;
      background-size: 100% 100%;
    }
    position: absolute;
    width: 900px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: 0.5s all;
    .container-div {
      padding: 60px 0;
      width: 860px;
      margin: 0 auto;
      .container-left {
        width: 300px;
        height: 263px;
        margin: 40px 0 0 108px;
        background: url("../assets/images/pic.png") no-repeat;
        background-attachment: cover;
        background-size: 100% 100%;
      }
      .text-head {
        font-size: 24px;
        color: #2c4184;
        height: 60px;
        font-family: "PingFang-SC-Regular";
      }
      .container-right {
        margin: 0 0 0 58px;

        .button-box {
          width: 257px;
          height: 60px;
          text-align: center;
          background: url("../assets/images/button.png") no-repeat;
          background-attachment: cover;
          background-size: 100% 100%;
          border: 0;
          color: #fff;
          margin-left: 30px;
        }
      }
    }
    h5 {
      font-size: 25px;
      text-align: center;
      font-weight: 500;
    }
    .el-form {
      width: 400px;
      margin: 30px auto;
    }
    .passCode {
      float: left;
    }
  }
  // .container:hover {
  //   border-radius: 30px;
  //   input {
  //     outline: none;
  //   }
  // }
}
</style>
<style>
.myinput {
  border-bottom: 1px #2c4184 solid;
}
.myinput input {
  background-color: rgba(0, 0, 0, 0);
  border: 0 !important ;
  padding: 0 20px 0 65px;
  color: #000;
}
.myitem_user {
  background: url("../assets/images/user.png") top 8px left 20px no-repeat;
}
.myitem_pwd {
  background: url("../assets/images/password.png") top 8px left 20px no-repeat;
}
.myitem_code {
  background: url("../assets/images/code.png") top 8px left 20px no-repeat;
}
</style>





