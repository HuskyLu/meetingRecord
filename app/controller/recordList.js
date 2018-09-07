var RecordList = require('../models/recordList')

exports.list = function(req,res){
	RecordList.fetch(function(err, departments){
		if (err) {
			console.log(err)
		}
		res.render('department',{
			title: '部门',
			departments: departments
		})
	})
}

exports.save = function(req,res){
	var _department = req.body.department
	var department = new RecordList({
		department: _department
	})
	console.log(department)
	department.save(function(err, department){
		if (err) {
			console.log(err)
		}
		res.redirect('/department/list')
	})
}