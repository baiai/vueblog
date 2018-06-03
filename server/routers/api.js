let express = require('express')
let router = express.Router()
let User = require('../models/User')

// 统一返回格式
let responseData
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next()
})

/* 用户注册 --start */

// 简单信息有前端进行判断
router.post('/user/register',function (req,res,next) {
  var username = req.body.username
  var password = req.body.password
  var repassword = req.body.repassword
  User.findOne({ 
    username: username
  }).then(function (userInfo) {
    if(userInfo) {
      return reject()
    }
    // 没有找到，说明没有注册过，所以要保存到数据库中
    // 调用User对象user中的save方法保存到数据库
    var user = new User({
      username: username,
      password: password
    })
    return user.save()
  }).then(function (saveInfo) {
    console.log(saveInfo.code)
    responseData.message = '注册成功'
    req.cookies.set('userInfo', JSON.stringify({
      _id: saveInfo._id,
      username: saveInfo.username
    }))
    return res.json(responseData)
  }).catch(function () {
    responseData.code = 1
    responseData.message = '用户已经存在'
    return res.json(responseData)
  })
  return
})

/* 用户注册 --end */

/* 用户登录 --start */
router.post('/user/login',function (req,res,next) {
  if(req.userInfo.username) {
    User.findOne({
      username: req.userInfo.username
    }).then(function (userInfo) {
      req.cookies.set('userInfo', JSON.stringify({
        _id: userInfo._id,
        username: userInfo.username
      }))
      responseData.userInfo = {
        _id: userInfo._id,
        username: userInfo.username
      }
      return res.json(responseData)
    })
    return
  }
  var username = req.body.username
  var password = req.body.password
  User.findOne({
    username: username,
    password: password
  }).then(function (userInfo) {
    if(userInfo) {
      responseData.message = '登陆成功';
      responseData.userInfo = {
        _id: userInfo._id,
        username: userInfo.username
      }
      req.cookies.set('userInfo', JSON.stringify({
        _id: userInfo._id,
        username: userInfo.username
      }))
      return res.json(responseData)
    }else{
      responseData.code = 1
      responseData.message = '用户名或密码不正确'
      return res.json(responseData)
    }
  })
  return
})
/* 用户登录 --end */

/* 用户退出 --start */

router.get('/user/logout', function (req, res, next) {
  req.cookies.set('userInfo', null)
  responseData.code = 1
  responseData.message = '你还没有登录'
  responseData.userInfo = null
  return res.json(responseData)
})

/* 用户退出 --end*/
module.exports = router
