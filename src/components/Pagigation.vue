<template>
  <div>
    <nav class="pagigation">
      <ul class="pager">
        <li class="pager-prev">
          <a href="javascript:;" @click="pre">上一页</a>
        </li>
        <li>
          当前页：{{page}}，总{{pages}}页
        </li>
        <li class="pager-next disabled">
          <a href="javascript:;" @click="next">下一页</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    pages: Number,
    page: Number,
    url: String
  },
  data () {
    return {
    }
  },
  methods: {
    pre () {
      if (this.page !== 1) {
        console.log('pre', this.url)
        this.$axios.get(this.url + (this.page - 1)).then((res) => {
          this.$emit('pre-page', res.data)
        })
      }
    },
    next () {
      console.log('next', this.url)
      if (this.page !== this.pages) {
        this.$axios.get(this.url + (this.page + 1)).then((res) => {
          this.$emit('next-page', res.data)
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .pagigation
    text-align center
    ul
      display inline-block
      li
        background #eee
        float left
        list-style none
        height 30px
        line-height 30px
        border-radius 12px
        padding 0 5px
        margin 0 10px
      .turn-page
        input
          height 30px
          width 45px
          line-height 30px
        button
          height 30px
          line-height 30px
</style>
