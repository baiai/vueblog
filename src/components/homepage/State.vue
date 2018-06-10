<template>
  <div class="home">
    <!-- 用户信息表 -->
    <div class="rightBox" v-show="isShow === 'userInfo'">
      <div class="title"><span>{{username}}</span></div>
      <div class="admin" v-if="username === 'admin'">
        你好，管理员
        <div><a href="javascript:;" @click="toAdminPage">进入后台管理</a></div>
        <span @click="logout">退出</span>
      </div>
      <div class="user" v-else>
        欢迎来到我的博客
        <span @click="logout">退出</span>
      </div>
    </div>
    <!-- 登录表单 -->
    <div class="rightBox" v-show="isShow === 'login'">
      <div class="title"><span>登录</span></div>
      <div class="line">
        <input type="text" v-model="username" class="form-control" placeholder="用户名" />
      </div>
      <div class="line">
        <input type="password" v-model="password" class="form-control" placeholder="密码" />
      </div>
      <div class="line">
        <button @click="login" type="button" class="btn btn-secondary login-button">登录</button>
      </div>
      <p class="textRight">还没注册？
        <a href="javascript:;" class="colMint" @click="showRegister">马上注册</a>
      </p>
    </div>
    <!-- 注册表 -->
    <div class="rightBox" v-show="isShow === 'register'">
      <div class="title"><span>注册</span></div>
      <div class="line">
        <input type="text" v-model="username" class="form-control" placeholder="用户名" />
      </div>
      <div class="line">
        <input type="password" v-model="password" class="form-control" placeholder="密码" />
      </div>
      <div class="line">
        <input type="password" v-model="repassword" class="form-control" placeholder="再输入一次密码" />
      </div>
      <div class="line">
        <button @click="register" type="button" class="btn btn-secondary login-button">注册</button>
      </div>
      <p class="textRight">已有账号？
        <a href="javascript:;" class="colMint" @click="showLogin">马上登录</a>
      </p>
    </div>
    <p class="colWarning textCenter">{{warnText}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: 'login',
      username: '',
      password: '',
      repassword: '',
      warnText: '',
      isRefresh: false
    }
  },
  created () {
    this.$axios.post('/api/user/login').then((res) => {
      let resData = res.data
      if (resData.userInfo) {
        this.isShow = 'userInfo'
        this.username = resData.userInfo.username
      }
    })
  },
  methods: {
    toAdminPage () {
      this.$router.push({path: '/admin'})
    },
    showLogin () {
      this.isShow = 'login'
    },
    showRegister () {
      this.isShow = 'register'
    },
    login () {
      if (this.username === '') {
        this.warnText = '用户名不能为空'
      } else if (this.password === '') {
        this.warnText = '密码不能为空'
      } else {
        let postData = {
          username: this.username,
          password: this.password
        }
        this.$axios.post('/api/user/login', postData).then((res) => {
          let resData = res.data
          this.isShow = 'userInfo'
          this.username = resData.userInfo.username
        })
      }
    },
    register () {
      if (this.username === '') {
        this.warnText = '用户名不能为空'
      } else if (this.password === '') {
        this.warnText = '密码不能为空'
      } else if (this.repassword !== this.password) {
        this.warnText = '两次密码输入不同'
      } else {
        let postData = {
          username: this.username,
          password: this.password,
          repassword: this.repassword
        }
        this.$axios.post('/api/user/register', postData).then((res) => {
          let resData = res.data
          if (resData.code === 1) {
            this.warnText = resData.message
          } else {
            this.isShow = 'login'
            this.password = ''
          }
        })
      }
    },
    logout () {
      this.$axios.get('/api/user/logout').then((res) => {
        this.isShow = 'login'
        this.username = ''
        this.password = ''
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.rightBox
  width 240px
  .title
    color red
    span
      border-bottom 2px solid red
  .line
    height 25px
    line-height 25px
    margin-top 20px
    .colDrak
      display inline-block
      width 50px
      text-align center
      word-break break-all
    .login-button
      width 100%
  .textRight
    margin-top 20px
</style>
