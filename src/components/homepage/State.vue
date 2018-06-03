<template>
  <div class="home">
    <!-- 用户信息表 -->
    <div class="rightBox" v-show="isShow === 'userInfo'">
      <div class="title"><span>{{username}}</span><span @click="logout">退出</span></div>
    </div>
    <!-- 登录表单 -->
    <div class="rightBox" v-show="isShow === 'login'">
      <div class="title"><span>登录</span></div>
      <div class="line">
        <span class="colDrak">用户名</span>
        <input type="text" v-model="username" />
      </div>
      <div class="line">
        <span class="colDrak">密 码</span>
        <input type="password" v-model="password" />
      </div>
      <div class="line">
        <button @click="login">登录</button>
      </div>
      <p class="textRight">还没注册？
        <a href="#" class="colMint" @click="showRegister">马上注册</a>
      </p>
    </div>
    <!-- 注册表 -->
    <div class="rightBox" v-show="isShow === 'register'">
      <div class="title"><span>注册</span></div>
      <div class="line">
        <span class="colDrak">用户名</span>
        <input type="text" v-model="username" />
      </div>
      <div class="line">
        <span class="colDrak">密 码</span>
        <input type="password" v-model="password" />
      </div>
      <div class="line">
        <span class="colDrak">确 认</span>
        <input type="password" v-model="repassword" />
      </div>
      <div class="line">
        <button @click="register">注册</button>
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
      console.log(resData)
      if (resData.userInfo) {
        this.isShow = 'userInfo'
        this.username = resData.userInfo.username
      }
    })
  },
  methods: {
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
    .colDrak
      display inline-block
      width 50px
      text-align center
      word-break break-all
</style>
