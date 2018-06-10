<template>
  <div>
    <div class="show-content" v-show="chooseActive === 'showContent'">
      <div class="add-button">
        <button type="button" class="btn add" @click="add">添加内容</button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>_id</th>
            <th>类名</th>
            <th>标题</th>
            <th>作者</th>
            <th>添加时间</th>
            <th>点击率</th>
            <th>_v</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in contents" :key="item._id">
            <td>{{item._id}}</td>
            <td>{{item.category.categoryname}}</td>
            <td><a href="javascript:;">{{item.title}}</a></td>
            <td>{{item.user.username}}</td>
            <td>{{item.addTime}}</td>
            <td>{{item.views}}</td>
            <td>{{item.__v}}</td>
            <td>
              <a href="javascript:;" @click="editContent">修改 </a>|
              <a href="javascript:;" @click="deleteContent">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagigation @next-page="clickNext" @pre-page="clickPre" :pages="pages" :page="page" :url="url"></Pagigation>
    <div class="add-content" v-show="chooseActive === 'addContent'">
      <form>
        <fieldset class="form-group">
          <label for="exampleSelect1">分类</label>
          <select class="form-control"
          id="exampleSelect1"
          @click="selectCategory"
          >
            <option v-for="item in categories" :key="item._id">{{item.categoryname}}</option>
          </select>
        </fieldset>
        <fieldset class="form-group">
          <label for="contentTitle">标题</label>
          <input type="text" class="form-control" id="contentTitle" placeholder="请给本文起一个名字" required>
        </fieldset>
        <fieldset class="form-group">
          <label for="description">描述</label>
          <input type="text" class="form-control" id="description" placeholder="请简述本文的主要内容">
        </fieldset>
        <fieldset class="form-group">
          <label for="contentTextarea">内容</label>
          <textarea class="form-control" id="contentTextarea" rows="25" required></textarea>
        </fieldset>
        <fieldset class="form-group">
          <label for="exampleInputFile">File input</label>
          <input type="file" class="form-control-file" id="exampleInputFile">
          <small class="text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
        </fieldset>
        <button type="button" class="btn btn-primary" @click="submit">提交</button>
        <button type="button" class="btn btn-primary" @click="cancel">取消</button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
import Pagigation from '../Pagigation'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      chooseActive: 'showContent',
      submitData: {},
      categories: [],
      contents: [],
      showError: false,
      page: 0,
      pages: 0,
      url: '/admin/content?page='
    }
  },
  created () {
    this.$axios.get('/admin/category').then((res) => {
      this.categories = res.data.categories
    })
    this.$axios.get('/admin/content').then((res) => {
      this.page = res.data.page
      this.pages = res.data.pages
      this.contents = res.data.contents
      this.contents.forEach((item) => {
        item.addTime = dayjs(item.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
    })
  },
  methods: {
    clickPre (resData) {
      this.page = resData.page
      this.pages = resData.pages
      this.contents = resData.contents
      this.contents.forEach((item) => {
        item.addTime = dayjs(item.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    clickNext (resData) {
      this.page = resData.page
      this.pages = resData.pages
      this.contents = resData.contents
      this.contents.forEach((item) => {
        item.addTime = dayjs(item.addTime).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    add () {
      this.chooseActive = 'addContent'
    },
    cancel () {
      this.chooseActive = 'showContent'
    },
    selectCategory () {
      this.submitData.category = this.categories[event.target.selectedIndex]._id
    },
    submit () {
      this.submitData.contentTitle = document.getElementById('contentTitle').value
      this.submitData.contentTextarea = document.getElementById('contentTextarea').value
      this.submitData.description = document.getElementById('description').value
      if (this.submitData.contentTitle === '') {
        this.showError = true
        this.errorMessage = '标题不能为空'
      } else if (this.submitData.contentTextarea === '') {
        this.showError = true
        this.errorMessage = '内容不能为空'
      } else {
        if (this.submitData.category === '') {
          this.submitData.category = '5b15451d0525eb3744d930ad'
        }
        this.$axios.post('/admin/content/add', this.submitData).then((res) => {
          this.contents[this.contents.length] = res.data.content
          this.contents.forEach((item) => {
            item.addTime = dayjs(item.addTime).format('YYYY-MM-DD HH:mm:ss')
          })
          this.chooseActive = 'showContent'
        })
      }
    },
    editContent () {
      let slcElem = event.target.parentElement.parentElement
      let categoryname = slcElem.children[1].innerText
      let index = 0
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].categoryname === categoryname) {
          index = i
          break
        }
      }
      let chsOption = document.getElementById('exampleSelect1').children[index]
      chsOption.selected = 'selected'
      let searchTitle = slcElem.children[2].innerText
      let idx = 0
      for (let i = 0; i < this.contents.length; i++) {
        if (this.contents[i].title === searchTitle) {
          idx = i
          break
        }
      }
      document.getElementById('contentTitle').value = this.contents[idx].title
      document.getElementById('contentTextarea').value = this.contents[idx].contentTextarea
      document.getElementById('description').value = this.contents[idx].description
      this.chooseActive = 'addContent'
    },
    deleteContent () {
      let slcElem = event.target.parentElement.parentElement
      let delId = slcElem.children[0].innerText
      this.$axios.post('/admin/content/delete', {
        delId: delId
      }).then((res) => {
        this.contents = res.data.contents
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
  .add
    margin 10px 50px
    float right
.add-content
  margin 10px 50px
</style>
