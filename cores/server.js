//server 
var local = {}
  , qs    = require('querystring')

function startup (route, handler, sockets, db, session, ip, port) {
	var app	= require('http').createServer(onRequest).listen(port, ip)
    , socketHandler = new sockets.socketHandler

    socketHandler.listen( app )

  local.log({ label:'server', nodes: ['online', ip+':'+port] })

	function onRequest(request, response) {
		route(request,response,handler,db)
	}

}// end startup




exports.startup = startup
exports.locals  = local