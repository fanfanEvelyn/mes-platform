<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item
        label="旧密码"
        prop="oldPass"
      >
        <el-input
          ref="oldPassword"
          type="password"
          v-model="ruleForm.oldPass"
          autocomplete="new-password"
          maxlength="32"
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="新密码"
        prop="newPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          autocomplete="new-password"
          maxlength="32"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="确认新密码"
        prop="checkPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="new-password"
          maxlength="32"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="submitForm('ruleForm')"
        >确认修改</el-button>
        <el-button
          size="small"
          @click="cancelForm('ruleForm')"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { updatePassword } from '@/api/user.js';
import { isPassword } from '@/lib/validate.js';
import md5 from 'js-md5';
export default {
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
    var valid2 = (rules, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      } else {
        if (value.length < 6) {
          return callback(new Error('密码长度不少于6位'));
        } else if (!isPassword(value)) {
          return callback(
            new Error('密码至少包含数字和字母，可以包含特殊字符!_*')
          );
        } else {
          this.$refs.ruleForm.validateField('checkPass');
          return callback();
        }
      }
    };
    var valid3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ required: true, validator: valid1, trigger: 'blur' }],
        newPass: [{ required: true, validator: valid2, trigger: 'blur' }],
        checkPass: [{ required: true, validator: valid3, trigger: 'blur' }]
      }
    };
  },
  mounted () {
    this.$refs.oldPassword.focus();
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            phone: this.phone,
            type: 1,
            oldPassword: md5(this.ruleForm.oldPass),
            password: md5(this.ruleForm.newPass)
          };
          updatePassword(data).then(async res => {
            if (res.code > 0) {
              this.$message({
                type: 'success',
                message: '密码修改成功，请重新登录'
              });
              this.$emit('close');
              // 清空token
              await this.$store.dispatch('user/loginout');
              // 重新登录
              this.$router.push({ path: '/login' });
              this.$toolFn.localRemove('token')
            } else {
              this.$message({
                type: 'error',
                message: `密码修改失败：${res.msg}`
              });
            }
          });
        }
      });
    },
    cancelForm: function () {
      this.$emit('close');
    }
  },
  computed: {
    ...mapGetters(['token', 'phone'])
  }
};
</script>
<style lang="scss" scoped>
</style>