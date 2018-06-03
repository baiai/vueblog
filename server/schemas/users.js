var mongoose = require('mongoose')

// 定义用户的表结构
module.exports = new mongoose.Schema({
  // 用户名
  username: String,
  // 密码
  password: String,
  // 是否为管理员账号
  isAdmin: {
    type: Boolean,
    default: false
  }
})