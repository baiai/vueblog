var mongoose = require('mongoose')

// 定义用户的表结构
module.exports = new mongoose.Schema({
  // 分类名
  categoryname: String
})