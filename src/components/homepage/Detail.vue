<template>
  <div class="detail-container">
    <div class="title"><h1>{{content.title}}</h1></div>
    <div class="author">{{content.user.username}}</div>
    <div class="addTime">{{content.addTime}}</div>
    <vue-markdown class="article" :source="content.contentTextarea" v-highlightjs></vue-markdown>
    <div class="split-line">-- THE END --</div>
    <Comment :contentId="content._id"></Comment>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import 'highlight.js/styles/atom-one-dark.css'
import Comment from './Comment'
import hljs from 'highlight.js'
import dayjs from 'dayjs'
Vue.directive('highlightjs', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

export default {
  data () {
    return {
      content: {}
    }
  },
  mounted () {
    this.$axios.get(this.$store.getters.detailPath).then((res) => {
      this.content = res.data.content
      this.content.addTime = dayjs(this.content.addTime).format('YYYY-MM-DD HH:mm:ss')
    })
  },
  components: {
    Comment,
    VueMarkdown
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
.detail-container
  padding 70px 300px 0 100px
  .title
    text-align center
    height 50px
    line-height 50px
  .author
    text-align center
    font-size 30px
  .addTime
    text-align center
  .split-line
    height 40px
    line-height 40px
    text-align center
</style>
