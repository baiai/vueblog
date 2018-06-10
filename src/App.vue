<template>
  <div id="app">
    <Header></Header>
    <Contact></Contact>
    <router-view v-if="refresh"/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/homepage/Header'
import Contact from '@/components/homepage/Contact'
import Footer from '@/components/homepage/Footer'
export default {
  name: 'App',
  data () {
    return {
      refresh: true
    }
  },
  created () {
    this.$store.commit('setContentPath')
    this.$store.commit('setDetailPath')
  },
  methods: {
    reload () {
      this.refresh = false
      this.nextTick(() => (this.refresh = true))
    }
  },
  components: {
    Header,
    Contact,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
</style>
