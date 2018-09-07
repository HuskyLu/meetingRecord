var express = require('express')
var path = require('path')
var logger = require('morgan')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
var port = process.env.PORT || 4567	
var app = express()

mongoose.connect('mongodb://localhost/meetingRecord')

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(session({
	secret: 'meetingRecord',
	store: new mongoStore({
		url: 'mongodb://localhost/meetingRecord',
		collection: 'sessions'
	})
}))
app.use(serveStatic('public'))
app.locals.moment = require('moment')

if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}
require('./config/routes')(app)
app.listen(port)

console.log("服务成功启动")