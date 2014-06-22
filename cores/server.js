//server 
var local = {}

function startup (route, handler, sockets, db, defs, session, forms, ip, port) {
	var app	= require('http').createServer(onRequest).listen(port, ip)
    , socketHandler = new sockets.socketHandler(db, defs)

    socketHandler.listen( app )

  	//local.log({ label:'server', nodes: ['online', ip+':'+port] }, true)
  	console.log('[] server online')


	function onRequest(request, response) {
		route( request, response, handler, db, session, forms )
	}

}//startup


exports.startup = startup
exports.locals  = local