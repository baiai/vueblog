<template>
  <div class="home">
    <div class="header">this is header</div>
    <div class="container">
      <div class="content">this is content</div>
      <div class="aside">
        <State></State>
      </div>
    </div>
    <div class="footer">this is footer</div>
  </div>
</template>
<script type="text/javascript">
import State from './State'
export default {
  components: {
    State
  }
}
</script>
<style lang="stylus" scoped>
  .header
    height 50px
    line-height 50px
    text-align center
    border-bottom 1px solid #eee
  .container
    overflow hidden
    display flex
    padding-left 50px
    .content
      flex 1
      border-right 1px solid black
    .aside
      width 240px
      margin-right 30px
      padding-left 30px
      padding-top 50px
      border-right 1px solid black
  .footer
    position absolute
    bottom 0px
    left 0px
    display block
    width 100%
    height 50px
    line-height 50px
    text-align center
    border-top 1px solid #eee
</style>
