<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="list-wrapper">
      <ul class="nav nav-tabs type-list">
        <li class="nav-item">
          <a href="#" class="nav-link" @click="backHome">首页</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="javascript:;">分类</a>
          <div class="dropdown-menu" @click="categoryFilter">
            <a class="dropdown-item" href="javascript:;"
            v-for="category in categories" :key="category._id"
            :categoryId="category._id"
            >{{category.categoryname}}</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="javascript:;" class="nav-link">归档</a>
        </li>
      </ul>
      <input class="form-control search-input" type="text" placeholder="Search" disabled="">
      <button class="btn search-button iconfont" type="button">&#xe632;</button>
    </div>
    <div class="header-right"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.$axios.get('/api/category').then((res) => {
      this.categories = res.data.categories
    })
  },
  methods: {
    backHome () {
      this.$store.commit('setContentPath', '/api/content')
      this.$router.push({path: '/'})
    },
    categoryFilter () {
      let categoryId = event.target.getAttribute('categoryId')
      this.$store.commit('setContentPath', `/api/content?categoryId=${categoryId}`)
      this.$router.push({path: '/category'})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
.header
  position fixed
  left 0
  top 0
  height 70px
  width 100%
  display flex
  background-color rgba(255, 255, 255, 1)
  padding-bottom 10px
  .header-left
    width 100px
  .header-right
    width 300px
  .list-wrapper
    flex 1
    display flex
    align-items flex-end
    .type-list
      flex 1
      .dropdown:hover
        .dropdown-menu
          display block
    .search-input
      width 250px
      margin-right 10px
</style>
