var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var RecordSchema = new Schema({
	name: String,
	point: Array,
	// 0: normal user
	// 1: verified user
	// 2: professonal user
	// 3: admin
	content: Array,
	recorder: String,
	role: {
		type: Number,
		default: 0
	},
	department: {
		type: ObjectId,
		ref: 'recordlist'
	},
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

RecordSchema.pre('save',function(next){
	var user = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next()
})

RecordSchema.statics = {
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

module.exports = RecordSchema