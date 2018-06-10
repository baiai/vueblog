<template>
  <div class="home">
    <div class="main-container">
      <content-list :contents="contents"></content-list>
    </div>
    <Pagigation @next-page="clickNext" @pre-page="clickPre" :pages="pages" :page="page" :url="url"></Pagigation>
  </div>
</template>
<script type="text/javascript">
import ContentList from './ContentList'
import Pagigation from '../Pagigation'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      contents: [],
      page: 0,
      pages: 0,
      url: this.$store.getters.contentPath + '&page='
    }
  },
  created () {
    this.$axios.get(this.$store.getters.contentPath).then((res) => {
      res.data.contents.forEach((content) => {
        content.addTime = dayjs(content.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.contents = res.data.contents
      this.page = res.data.page
      this.pages = res.data.pages
    })
  },
  computed: {
    path () {
      return this.$store.getters.contentPath
    }
  },
  methods: {
    clickNext (resData) {
      this.page = resData.page
      this.pages = resData.pages
      this.contents = resData.contents
      this.contents.forEach((content) => {
        content.addTime = dayjs(content.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    clickPre (resData) {
      this.page = resData.page
      this.pages = resData.pages
      this.contents = resData.contents
      this.contents.forEach((content) => {
        content.addTime = dayjs(content.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
    }
  },
  components: {
    ContentList,
    Pagigation
  },
  watch: {
    path: function (newPath, oldPath) {
      this.$axios.get(newPath).then((res) => {
        res.data.contents.forEach((content) => {
          content.addTime = dayjs(content.addTime).format('YYYY-MM-DD HH:mm:ss')
        })
        this.contents = res.data.contents
        this.page = res.data.page
        this.pages = res.data.pages
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
.main-container
  padding 70px 300px 0 100px
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
          &:hover
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
