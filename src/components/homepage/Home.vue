<template>
  <div class="home">
    <div class="main-container">
      <content-list :contents="contents"></content-list>
    </div>
    <Pagigation @next-page="clickNext" @pre-page="clickPre" :pages="pages" :page="page" :url="url"></Pagigation>
    <State class="log-aside"></State>
  </div>
</template>
<script type="text/javascript">
import ContentList from './ContentList'
import Pagigation from '../Pagigation'
import State from './State'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      contents: [],
      page: 0,
      pages: 0,
      url: '/api/content?page='
    }
  },
  created () {
    this.$axios.get('/api/content').then((res) => {
      res.data.contents.forEach((content) => {
        content.addTime = dayjs(content.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.page = res.data.page
      this.pages = res.data.pages
      this.contents = res.data.contents
    })
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
    Pagigation,
    State
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
.main-container
  padding 70px 300px 0 100px
.log-aside
  position absolute
  top 100px
  right 20px
</style>
