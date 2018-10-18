
<style lang="less" scoped>
  @import 'login.less';
</style>

<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" size="medium" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="login_box">
        <h3 class="title">欢迎使用 别克青春俱乐部后台管理系统</h3>
        <el-form-item prop="uname">
          <el-input name="uname" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.uname" autoComplete="on" placeholder="管理员" maxlength="50"/>
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="i-user" />
          </span>
        </el-form-item>
        <el-form-item class="forget-item" prop="pwd">
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.pwd" autoComplete="on" maxlength="30" placeholder="密码" />
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
  import { megError, megSuc } from '@/utils/notice'
  import { getForget } from '@/api/login'

  export default {
    name: 'login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          uname: '',
          pwd: ''
        },
        loginRules: {
          uname: [
            {required: true, message: '管理员不能为空', trigger: 'change'}
            ],
          pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        pwdIcon: 'closed',
        loadBtn: false
      }
    },
    methods: {
      ...mapActions([
        'LoginByUsername'
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
              uname: this.loginForm.uname,
              pwd: this.loginForm.pwd
              //pwd: this.loginForm.pwd
            }
            this.LoginByUsername(data).then(() => {
              this.loadBtn = false
              this.$router.push({ name: 'pointUser' })
            }).catch(() => {
              console.log('接口错误')
              this.loadBtn = false
            })
          } else {
            console.log('表单验证有误!!')
            return false
          }
        })
      }
    }
  }
</script>
