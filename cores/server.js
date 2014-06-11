//server 
var local = {}
  , qs = require('querystring')
	, io
	, app


function startup (route, handler, db, session, ip, port) {
	app	= require('http').createServer(onRequest).listen(port, ip)
	//io	= require('socket.io').listen(app)

  local.log({ label:'server', nodes: ['online', ip+':'+port] })



	function onRequest(request, response) {
		route(request,response,handler,db)
	}

}// end startup




exports.startup = startup
exports.locals  = local