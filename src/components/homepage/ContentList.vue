<template>
<div class="content-wrapper">
  <ul class="content">
    <li class="content-list" v-for="content in contents" :key="content._id">
      <div class="title">{{content.title}}</div>
      <div class="description">{{content.user.username}}</div>
      <div class="content-detail">
        {{content.contentTextarea}}
      </div>
      <div class="param">
        <div class="readmore">
          <a href="javascript:;" @click="readmore" :contentId="content._id">全文阅读>></a>
        </div>
        <div class="placeholder"></div>
        <div class="add-time">{{content.addTime}}</div>
        <div class="views">点击量：{{content.views}}</div>
      </div>
    </li>
  </ul>
</div>
</template>
<script type="text/javascript">
export default {
  props: {
    contents: Array
  },
  methods: {
    readmore () {
      let contentId = event.target.getAttribute('contentId')
      this.$store.commit('setDetailPath', `/api/detail?contentId=${contentId}`)
      this.$axios.get(`/api/content/editViews?contentId=${contentId}`)
      this.$router.push({path: '/detail'})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
.content-wrapper
  display block
  .content
    padding 0
    .content-list
      padding-bottom 10px
      list-style none
      color #666
      border-bottom 1px solid #eee
      .title
        font-size 20px
        height 45px
        line-height 45px
        color #28a745
      .description
        height 25px
        line-height 25px
        color #aaa
        ellipsis()
      .content-detail
        height 50px
        line-height 50px
        ellipsis()
      .param
        font-size 12px
        display flex
        .placeholder
          flex 1
        .add-time
          margin-right 25px
        .views
            margin-right 10px
</style>
