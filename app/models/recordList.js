var mongoose = require('mongoose')
var RecordListSchema = require('../schemas/recordList')
var RecordList = mongoose.model('RecordList',RecordListSchema)

module.exports = RecordList