var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var RecordListSchema = new Schema({
	// 0: teacher or president
	// 1: ~~~
	department: String,
	records: [{
		type: ObjectId,
		ref: 'Record'
	}],
	meta: {
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

RecordListSchema.pre('save',function(next){
	var recordList = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next()
})

RecordListSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.createAt')
			.exec(cb)
	},
	findById: function(id,cb){
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = RecordListSchema