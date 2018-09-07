var Index = require('../app/controller/index')
var User = require('../app/controller/user')
var Record = require('../app/controller/record')
var RecordList = require('../app/controller/recordList')

module.exports = function(app) {
	//pre handle user
	app.use(function(req, res, next) {
		var _user = req.session.user
		app.locals.user = _user
		next()
	})
	//index
	app.get('/', Index.index)

	//user
	app.post('/user/signin', User.signin)
	app.get('/logout',User.logout)
	app.get('/admin/user/list', User.signinRequired,User.adminRequired, User.list)
	app.get('/admin/user/add', User.signinRequired,User.adminRequired, User.add)
	app.get('/admin/user/change/:id',User.signinRequired,User.adminRequired,User.change)
	app.post('/user/save',User.signinRequired,User.adminRequired,User.save)
	app.post('/user/setPass',User.signinRequired,User.setPass)
	app.delete('/user/delete',User.signinRequired,User.adminRequired,User.delete)
	app.get('/user/password',User.signinRequired,User.password)
	
	//record
	app.get('/home',User.signinRequired,Record.home)
	app.get('/record/add',User.signinRequired,Record.add)
	app.post('/record/save',User.signinRequired,Record.save)

	//department
	app.get('/department/list',User.signinRequired,User.adminRequired,RecordList.list)
	app.post('/department/save',User.signinRequired,User.adminRequired,RecordList.save)
}