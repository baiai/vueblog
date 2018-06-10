let express = require('express')
let router = express.Router()
let User = require('../models/User')
let Category = require('../models/Category')
let Content = require('../models/Content')

let responseData = {}
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next()
})

// 判断一下，当前用户是否是管理员，不是的话，就不让访问
router.use(function (req, res, next) {
  if (req.userInfo.username !== 'admin') {
    res.send('对不起，只有管理员才能进入后台管理')
    return
  }
  next()
})

// 管理员首页
router.get('/', function (req, res, next) {
  User.findOne({
    username: req.userInfo.username
  }).then(function (userInfo) {
    responseData.userInfo = {
      username: userInfo.username
    }
    res.json(responseData)
  })
  return
})

// 用户管理
router.get('/user', function (req, res, next) {
  let page = Number(req.query.page || 1)
  let limit = 2
  User.count().then(function (count) {
    let pages = Math.ceil(count/limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    let skip = (page - 1)*limit
    User.find().limit(limit).skip(skip).then(function (users) {
      responseData.users = users
      responseData.pages = pages
      responseData.page = page
      res.json(responseData)
    })
  })
  
  return
})

// 分类管理，获取当前已有的分类
router.get('/category', function (req, res, next) {
  let page = Number(req.query.page || 1)
  let limit = 2
  // Category.find().sort({_id: -1}) 按照_id降序排序
  // Category.find().sort({_id: 1}) 按照_id升序排序
  Category.count().then(function (count) {
    let pages = Math.ceil(count/limit)
    page = Math.max(page, 1)
    page = Math.min(page, pages)
    let skip = (page-1)*limit
    Category.find().limit(limit).skip(skip).then(function (categories) {
      responseData.page = page
      responseData.pages = pages
      responseData.categories = categories
      res.json(responseData)
    })
  })
  // Category.find().then(function (categories) {
  //   responseData.categories = categories
  //   res.json(responseData)
  // })
  return
})

// 添加分类
router.post('/category', function (req, res,next) {
  let categoryname = req.body.categoryname
  Category.findOne({
    categoryname: categoryname
  }).then(function (category) {
    if(category) {
      return reject()
    }else {
      category = new Category({
        categoryname: categoryname
      })
      category.save().then(function (category) {
        responseData.category = category
        res.json(responseData)
      })
      return
    }
  }).catch(function (code) {
    responseData.code = 1
    responseData.message = '添加分类失败'
    console.log('失败了')
  })
  return
})

// 删除分类
router.get('/category/delete', function (req, res) {
  let id = req.query.id
  Category.remove({
    _id: id
  }).then(function () {
    responseData.message = '删除成功'
    res.json(responseData)
  })
})

// 
// 内容管理
// 
// 内容添加
router.post('/content/add', function (req, res) {
  new Content({
    category: req.body.category,
    user: req.userInfo._id,
    title: req.body.contentTitle,
    description: req.body.description,
    contentTextarea: req.body.contentTextarea
  }).save().then(function (ctn) {
    Content.findById(ctn._id).populate(['category', 'user']).then(function (content) {
      responseData.content = content
      res.json(responseData)
    })
  })
})

// 内容获取
router.get('/content', function (req, res) {
  let page = Number(req.query.page || 1)
  let limit = 2
  Content.count().then(function (count) {
    let pages = Math.ceil(count/limit)
    page = Math.max(page, 1)
    page = Math.min(page, pages)
    let skip = (page - 1) * limit
    Content.find().limit(limit).skip(skip)
    .populate(['category', 'user']).sort({addTime: -1})
    .then(function (contents) {
      responseData.page = page
      responseData.pages = pages
      responseData.contents = contents
      res.json(responseData)
    })
  })
  // Content.find().populate(['category', 'user']).then(function (contents) {
  //   responseData.contents = contents
  //   res.json(responseData)
  // })
  return
})

// 删除内容
router.post('/content/delete', function (req, res) {
  Content.findByIdAndRemove({
    _id: req.body.delId
  }).then(function () {
    Content.find().populate('category').then(function (contents) {
      responseData.contents = contents
      res.json(responseData)
    })
  })
})


module.exports = router