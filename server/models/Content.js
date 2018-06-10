var mongoose = require('mongoose')
var contentsSchema = require('../schemas/contents')

// 创建一个User模型并导出，导出的是一个构造函数
module.exports = mongoose.model('Content',contentsSchema)