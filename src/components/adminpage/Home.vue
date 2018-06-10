<template>
  <div>
    <Header @change-active="changeActive"></Header>
    <User v-show="showActive === 'users'"></User>
    <Category v-show="showActive === 'category'"></Category>
    <Content v-show="showActive === 'content'"></Content>
  </div>
</template>
<script type="text/javascript">
import Header from './Header'
import User from './User'
import Category from './Category'
import Content from './Content'
export default {
  data () {
    return {
      showActive: 'users'
    }
  },
  components: {
    Header,
    User,
    Category,
    Content
  },
  methods: {
    changeActive (activeName) {
      this.showActive = activeName
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
