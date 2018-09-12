var _ = require('underscore')
var User = require('../models/user')
var RecordList = require('../models/recordList')

//signin
exports.signin = function(req, res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({
		name: name
	}, function(err, user) {
		if (err) {
			console.log(err)
		}
		if (!user) {
			return res.redirect('/')
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				console.log(err)
			}
			if (isMatch) {
				req.session.user = user
				if (user.role == 0) {
					
				}
				return res.redirect('/home')
			} else {
				return res.redirect('/')
			}
		})
	})
}
//password change
exports.password = function(req,res){
	var user = req.session.user
	res.render('userPass',{
		title: '修改密码',
		user: user
	})
}

//logout 
exports.logout = function(req, res) {
	delete req.session.user
	// delete app.locals.user
	res.redirect('/')
}

//admin
//userlist page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err)
		}
		res.render('userlist', {
			title: '用户列表页',
			users: users
		})
	})
}
//add
exports.add = function(req,res){
	RecordList.fetch(function(err, department){
		if (err) {
			console.log(err)
		}
		res.render('userAdd',{
			title: '用户添加',
			department: department
		})
	})
}
//change
exports.change = function(req,res){
	var id = req.params.id
	User.findById(id,function(err,_user){
		if (err) {
			console.log(err)
		}
		RecordList.fetch(function(err, department){
			if (err) {
				console.log(err)
			}
			res.render('userChange',{
				title: '用户修改：' + _user.name,
				_user: _user,
				department: department
			})
		})
	})
}
//save
exports.save = function(req,res){
	var id = req.body.user._id
	var userObj = req.body.user
	var _user

	if (id !== undefined) {
		User.findById(id, function(err, user) {
			if (err) {
				console.log(err)
			}
			_user = _.extend(user, userObj)
			_user.save(function(err, user) {
				if (err) {
					console.log(err)
				}
				res.redirect('/admin/user/list')
			})
		})
	} else {
		_user = new User({
			name: userObj.name,
			password: userObj.password,
			role: userObj.role,
			department: userObj.department
		})
		_user.save(function(err, user) {
			if (err) {
				console.log(err)
			}
			res.redirect('/admin/user/list')
		})
	}
}
//reset password
exports.setPass = function(req,res){
	var id = req.body.id
	var pass = req.body.pass
	var oldPass = req.body.oldPass
	var confirm = req.body.confirm
	var _user
	if (pass !== confirm) {
		res.redirect('/user/password')
	}
	if(id){
		if (pass !== undefined) {
			var passObj = {
				_id: id,
				password: pass
			}
			User.findOne({
				_id: id,
			}, function(err,user){
				if (err) {
					console.log(err)
				}
				user.comparePassword(oldPass, function(err, isMatch) {
					if (err) {
						console.log(err)
					}
					if (isMatch) {
						_user = _.extend(user, passObj)
						_user.save(function(err,user){
							if (err) {
								console.log(err)
							}
							res.redirect('/home')
						})
					} else {
						return res.redirect('/user/password')
					}
				})
			})
		} else {
			var passObj = {
				_id: id,
				password: '123456'
			}
			User.findById(id, function(err, user){
				if (err) {
					console.log(err)
				}
				_user = _.extend(user, passObj)
				_user.save(function(err,user){
					if (err) {
						console.log(err)
					}
					res.json({
						success: 1
					})
				})
			})
		}
	}
}
//delete user
exports.delete = function(req,res){
	var id = req.body.id
	if (id) {
		User.remove({
			_id: id
		}, function(err,user){
			if (err) {
				console.log(err)
			} else {
				res.json({
					success: 1
				})
			}
		})
	}
}

//midware for user
exports.signinRequired = function(req,res,next){
	var user = req.session.user
	if (!user) {
		return res.redirect('/')
	}
	next()
}
exports.adminRequired = function(req,res,next){
	var user = req.session.user
	if (user.role != 3 || !user.role) {
		return res.redirect('/')
	}
	next()
}