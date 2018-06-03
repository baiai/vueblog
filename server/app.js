let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let Cookies = require('cookies')
let User = require('./models/User')

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  req.cookies = new Cookies(req,res)
  req.userInfo = {}
  if(req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'))
    } catch (e) {
      console.log(e)
    }
  }
  next()
})

// 设置响应头部
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials','true')
  next()
})

app.use('/api', require('./routers/api'))

mongoose.connect('mongodb://localhost:27017/vueBlog', function (err) {
  if(err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    app.listen(3000)
  }
})

