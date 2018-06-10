<template>
  <div class="adminHeader">
    <div class="header-top">你好，{{username}}</div>
    <ul class="nav nav-tabs" @click="chooseActive" ref="ul">
      <li class="nav-item">
        <a href="javascript:;" class="nav-link active" name="users">用户管理</a>
      </li>
      <li class="nav-item">
        <a href="javascript:;" class="nav-link" name="category">分类管理</a>
      </li>
      <li class="nav-item">
        <a href="javascript:;" class="nav-link" name="content">内容管理</a>
      </li>
      <li class="nav-item disabled">
        <a href="javascript:;" class="nav-link">Disabled</a>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.$axios.get('/admin/').then((res) => {
      let resData = res.data
      this.username = resData.userInfo.username
    })
  },
  methods: {
    chooseActive () {
      let activeLi = this.$refs.ul.getElementsByClassName('active')[0]
      activeLi.classList.remove('active')
      event.target.classList.add('active')
      let activeName = event.target.name
      this.$emit('change-active', activeName)
    }
  }
}
</script>
<style lang="stylus" scoped>
.adminHeader
  margin-top 70px
</style>
