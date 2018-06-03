/*
  在数据库中直接操作模型对数据进行增删改查
*/
var mongoose = require('mongoose')
var usersSchema = require('../schemas/users')

// 创建一个User模型并导出，导出的是一个构造函数
module.exports = mongoose.model('User',usersSchema)