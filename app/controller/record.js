var Record = require('../models/record')
var RecordList = require('../models/recordList')
var _ = require('underscore')

//home
exports.home = function(req,res){
	var _user = req.session.user
	var role = _user.role
	var department = _user.department
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
			.populate({path: 'Record', option: {limit: 25}})
			.exec(function(err,records){
				if (err) {
					console.log(err)
				}
				res.render('home', {
					title: '会议记录页',
					records: records
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
					// res.redirect('/record/detail/' + record._id)
					res.redirect('/home')
				})
			})
		})
	}
}

//detail
exports.detail = function(req,res){

}