<template>
  <div class="comment-wrapper">
    <div class="input-wrapper">
      <div class="title">评论</div>
      <textarea class="form-control comment-input" rows="3" required placeholder="说点什么..." v-model="statement"></textarea>
      <div class="commit-wrapper">
        <div class="warning-palceholder">
          <div class="warning" v-show="isWarning">{{this.warning}}</div>
        </div>
        <div @click="commit" class="commit">提交</div>
      </div>
    </div>
    <ul class="comment-list-wrapper">
      <li class="comment-wrapper" v-for="comment in comments" :key="comment.postTime">
        <div class="head-img iconfont">&#xe657;</div>
        <div class="user-info">
          <div class="info-head">
            <div class="username">{{comment.username}}</div>
            <div class="post-time">{{comment.postTime}}</div>
          </div>
          <div class="comment">{{comment.statement}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    contentId: String
  },
  data () {
    return {
      statement: '',
      comments: [],
      isWarning: false,
      warning: ''
    }
  },
  created () {
    this.$axios.get(`/api/comment?contentId=${this.contentId}`).then((res) => {
      this.comments = res.data.comments
      this.comments.forEach(comment => {
        comment.postTime = dayjs(comment.postTime).format('YYYY-MM-DD HH:mm:ss')
      })
    })
  },
  methods: {
    commit () {
      if (this.statement === '') {
        this.warning = '内容不能为空'
        this.isWarning = true
        return
      }
      let postData = {
        statement: this.statement,
        contentId: this.contentId
      }
      this.$axios.post('api/comment/post', postData).then((res) => {
        this.comments = res.data.comments
        this.comments.forEach(comment => {
          comment.postTime = dayjs(comment.postTime).format('YYYY-MM-DD HH:mm:ss')
        })
      })
      this.statement = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.comment-wrapper
  .input-wrapper
    margin-bottom 55px
    .title
      text-align center
      height 30px
      line-height 30px
    .commit-wrapper
      display flex
      .warning-palceholder
        flex 1
        margin-top 10px
        .warning
          height 40px
          line-height 40px
      .commit
        height 40px
        width 60px
        line-height 40px
        margin-top 10px
        border-radius 5px
        text-align center
        color #eee
        background #0062cc
        &:hover
          cursor pointer
  .comment-list-wrapper
    padding 0
    .comment-wrapper
      list-style none
      display flex
      overflow hidden
      margin-top 10px
      border 1px solid #aaa
      border-radius 5px
      .head-img
        width 100px
        margin 0
        padding-bottom 500px
        margin-bottom -500px
        font-size 50px
        text-align center
      .user-info
        .info-head
          display flex
          justify-content flex-end
          height 40px
          line-height 40px
          .username
            flex 1
            font-weight bold
          .post-time
            width 200px
            text-align center
</style>
