//server 
var local = {}

function startup (route, handler, ip, port) {
	var app	= require('http').createServer(onRequest).listen(port, ip)

  	console.log('+ server online ')

	function onRequest(request, response) {
		route( request, response, handler )
	}

}//startup


exports.startup = startup
exports.locals  = local