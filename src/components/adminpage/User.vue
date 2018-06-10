<template>
  <div>
    <div class="table-container">
      <table class="table table-bordered table-hover">
        <tr class="table-header">
          <th>_id</th>
          <th>username</th>
          <th>password</th>
          <th>isAdmin</th>
          <th>_v</th>
        </tr>
        <tr v-for="user in users" :key="user._id">
          <td>{{user._id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.password}}</td>
          <td>{{user.isAdmin}}</td>
          <td>{{user._v}}</td>
        </tr>
      </table>
    </div>
    <Pagigation @next-page="clickNext" @pre-page="clickPre" :pages="pages" :page="page" :url="url"></Pagigation>
  </div>
</template>
<script type="text/javascript">
import Pagigation from '../Pagigation'
export default {
  data () {
    return {
      // username: '',
      users: [],
      keys: [],
      pages: 0,
      page: 0,
      url: '/admin/user?page='
    }
  },
  methods: {
    clickPre (resData) {
      this.users = resData.users
      this.pages = resData.pages
      this.page = resData.page
    },
    clickNext (resData) {
      this.users = resData.users
      this.pages = resData.pages
      this.page = resData.page
    }
  },
  created () {
    this.$axios.get('/admin/').then((res) => {
      let resData = res.data
      this.username = resData.userInfo.username
    })
    this.$axios.get('/admin/user').then((res) => {
      let resData = res.data
      this.users = resData.users
      this.pages = resData.pages
      this.page = resData.page
      this.keys = Object.keys(this.users[0])
    })
  },
  components: {
    Pagigation
  }
}
</script>
<style lang="stylus" scoped>
  .table-container
    tr
      &:hover
        background #eee
      th
        text-align center
      td
        text-align center
</style>
