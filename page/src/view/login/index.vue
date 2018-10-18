
<style lang="less" scoped>
  @import 'login.less';
</style>

<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" size="medium" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="login_box">
        <h3 class="title">欢迎使用 别克青春俱乐部后台管理系统</h3>
        <el-form-item prop="user_name">
          <el-input name="user_name" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.user_name" autoComplete="on" placeholder="管理员" maxlength="50"/>
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="i-user" />
          </span>
        </el-form-item>
        <el-form-item class="forget-item" prop="password">
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" maxlength="30" placeholder="密码" />
          <span class="svg-container">
            <svg-icon icon-class="i-password" />
          </span>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="i-eye" v-if="pwdIcon==='closed'"/><i class="el-icon-view" v-else></i></span>
        </el-form-item>
        <el-button type="primary" class="login-button" :loading="loadBtn" @click.native.prevent="handleLogin">登录</el-button>
      </div>
    </el-form>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
  import { validateEmail } from '@/utils/validate'
  import { megError, megSuc } from '@/utils/notice'
  import { getForget } from '@/api/login'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          user_name: '',
          password: ''
        },
        loginRules: {
          user_name: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        pwdIcon: 'closed',
        loadBtn: false
      }
    },
    methods: {
      ...mapActions([
        'toggleLoad'
      ]),
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
          this.pwdIcon = 'open'
        } else {
          this.pwdType = 'password'
          this.pwdIcon = 'closed'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loadBtn = true
            const data = {
              user_name: this.loginForm.user_name,
              password: this.loginForm.password
              //password: this.loginForm.password
            }
            this.$store.dispatch('LoginByUsername', data).then(() => {
              this.loadBtn = false
              this.$router.push({ name: 'pointUser' })
            }).catch(() => {
              console.log('接口错误')
              this.loadBtn = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
