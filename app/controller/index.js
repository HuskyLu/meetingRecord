var Index = require('../models/user')
//index
exports.index = function(req,res){
	res.render('index',{
		title: '登录页面'
	})
}