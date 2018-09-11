var Record = require('../models/record')
var RecordList = require('../models/recordList')
var _ = require('underscore')
var count = 25

//home
exports.home = function(req,res){
	var _user = req.session.user
	var role = _user.role
	var department = _user.department
	var page = parseInt(req.query.page, 10) - 1 || 0
	var index = page * count
	if (department === '老师/常委') {
		RecordList
			.find({})
			.populate({path: 'records', option: {limit: 5}})
			.exec(function(err,records){
				if (err) {
					console.log(err)
				}
				console.log(records)
				res.render('home', {
					title: '会议记录页',
					records: records,
					department: department
				})
			})
	} else {
		RecordList
			.find({department: department})
			.populate({path: 'records'})
			.exec(function(err,records){
				if (err) {
					console.log(err)
				}
				var result = records.slice(index, index + count)
				res.render('home', {
					title: '会议记录页',
					totalPage: Math.ceil(records.length / count),
					page: (page + 1),
					department: department,
					records: result
				})
			})
	}
}

//add report
exports.add = function(req,res){
	var department = req.session.user.department
	RecordList.findOne({
		department: department
	},function(err,department){
		res.render('recordAdd',{
			title: '记录添加',
			department: department
		})
	})
	
}

//change report
exports.change = function(req,res){
	var id = req.params.id
	console.log(id+'test')
	Record.findById(id,function(err,record){
		if (err) {
			console.log(err)
		}
		res.render('recordChange',{
			title: '记录修改',
			record: record
		})
	})
}

//save
exports.save = function(req,res){
	var recordObj = req.body.record
	var id = req.body.record._id
	var _record
	if (id !== undefined) {
		Record.findById(id,function(err,record){
			if (err) {
				console.log(err)
			}
			_record = _.extend(record, recordObj)
			_record.save(function(err,record){
				if (err) {
					console.log(err)
				}
				res.redirect('/record/detail/' + record._id)
				// res.redirect('/home')
			})
		})
	} else {
		_record = new Record(recordObj)
		var recordlist = req.body.record.department
		_record.save(function(err,record){
			if (err) {
				console.log(err)
			}
			RecordList.findById(recordlist,function(err,recordlist){
				recordlist.records.push(record._id)
				recordlist.save(function(err,recordlist){
					res.redirect('/record/detail/' + record._id)
					// res.redirect('/home')
				})
			})
		})
	}
}

//delete
exports.delete = function(req,res){
	var id = req.body.id
	if (id) {
		Record.remove({
			_id: id
		}, function(err, record){
			if (err) {
				console.log(err)
			}
			res.json({
				success: 1
			})
		})
	}
}

//detail
exports.detail = function(req,res){
	var id = req.params.id
	Record.findById(id,function(err,record){
		res.render('recordDetail',{
			title: '记录详情',
			record: record
		})
	})
}

//list for teacher or president
exports.recordList = function(req,res){
	var department = req.query.id
	var page = parseInt(req.query.page, 10) - 1 || 0
	var index = page * count
	RecordList
		.find({department: department})
		.populate({path: 'records'})
		.exec(function(err,records){
			if (err) {
				console.log(err)
			}
			var record = records[0].records
			var result = record.slice(index, index + count)
			res.render('recordList', {
				title: department + '会议记录页',
				totalPage: Math.ceil(records.length / count),
				page: (page + 1),
				department: department,
				records: result
			})
		})
}