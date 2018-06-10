let mongoose = require('mongoose')
let dayjs = require('dayjs')

module.exports = new mongoose.Schema({

  // 关联字段，分类的id，和其他表当中的字段是有关联，应该是设置为对象形式
  category: {
    // 类型
    type: mongoose.Schema.Types.ObjectId,

    // 引用
    ref: 'Category'
  },

  // 作者
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // 标题
  title: String,

  // 简介
  description: {
    type: String,
    default: ''
  },

  // 内容
  contentTextarea: {
    type: String,
    default: ''
  },

  // 添加时间
  addTime: {
    type: Date,
    default: dayjs().format('YYYY-MM-DD HH:mm:ss').toString()
  },

  // 点击量
  views: {
    type: Number,
    default: 0
  },

  comments: {
    type: Array,
    default: []
  }

})