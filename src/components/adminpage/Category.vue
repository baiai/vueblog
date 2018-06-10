<template>
  <div>
    <div class="add-button">
      <button type="button" class="btn btn-primary-outline add" @click="add">添加</button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>_id</th>
          <th>类名</th>
          <th>_v</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in categories" :key="item._id">
          <td>{{item._id}}</td>
          <td>{{item.categoryname}}</td>
          <td>{{item.__v}}</td>
          <td><button type="button" class="btn btn-danger-outline delete" @click="deleteCategory">删除</button></td>
        </tr>
      </tbody>
    </table>
    <Pagigation @next-page="clickNext" @pre-page="clickPre" :pages="pages" :page="page" :url="url"></Pagigation>
    <div class="add-detail" v-show="showAddDetail">
        <div class="title">添加分类</div>
        <div class="input-wrapper">
          <label>标题</label>
          <input type="text" ref="title">
          <label>描述</label>
          <textarea class="desc"></textarea>
        </div>
        <div class="confirm">
          <button type="button" class="btn btn-secondary-outline" @click="cancel">取消</button>
          <button type="button" class="btn btn-success-outline" @click="confirm">确认</button>
        </div>
      </div>
  </div>
</template>
<script type="text/javascript">
import Pagigation from '../Pagigation'
export default {
  data () {
    return {
      categories: [],
      showAddDetail: false,
      page: 0,
      pages: 0,
      url: '/admin/category?page='
    }
  },
  created () {
    this.$axios.get('/admin/category').then((res) => {
      this.categories = res.data.categories
      this.page = res.data.page
      this.pages = res.data.pages
    })
  },
  methods: {
    clickPre (resData) {
      this.categories = resData.categories
      this.page = resData.page
      this.pages = resData.pages
    },
    clickNext (resData) {
      this.categories = resData.categories
      this.page = resData.page
      this.pages = resData.pages
    },
    add () {
      this.showAddDetail = true
    },
    cancel () {
      this.showAddDetail = false
    },
    confirm () {
      let tl = this.$refs.title.value
      if (tl) {
        let postData = {
          categoryname: tl
        }
        this.$axios.post('/admin/category', postData).then((res) => {
          this.categories[this.categories.length] = res.data.category
        })
      }
    },
    deleteCategory () {
      let id = event.target.parentElement.parentElement.children[0].innerText
      this.$axios.get('/admin/category/delete?id=' + id).then((res) => {
        if (res.data.code === 0) {
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i]._id === id) {
              this.categories.splice(i, 1)
              return
            }
          }
        }
      })
    }
  },
  components: {
    Pagigation
  }
}
</script>
<style lang="stylus" scoped>
.add-button
  overflow hidden
  position relative
  height 50px
  line-height 50px
  .add
    position absolute
    top 5px
    right 30px
.add-detail
  position absolute
  left 50%
  top 50%
  margin-left -250px
  margin-top -250px
  height 500px
  width 500px
  background #f99
  display flex
  flex-direction column
  padding 10px 30px
  margin-bottom 30px
  .title
    display block
    height 50px
    line-height 50px
  .input-wrapper
    flex 1
    flex-direction column
    display flex
    margin-bottom 30px
    label
      display block
      height 50px
      line-height 50px
    input
      display block
      width 100%
      height 30px
      line-height 30px
    .desc
        flex 1
  .confirm
    height 35px
    line-height 35px
    display flex
    justify-content flex-end
    button
      margin-right 50px
</style>
