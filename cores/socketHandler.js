var local = {}
	, socketIO = require('socket.io')

function socketHandler() {
	var global = new __globalSocketData

	this.listen = function( httpServer ) {
		socketIO.listen( httpServer ).on('connection', function( socket ){
			var ip = usableIP( socket.handshake.address.address )
			global.current.ip.add( ip )
			handleConnection( socket, ip )
		})
	}//listen


	function handleConnection( socket, ip ) {




		socket.on('disconnect', function(res) {
			global.current.ip.remove( ip )
		})
	}// handleConnection


}



function __globalSocketData() {
	this.current = {}
	this.current.ip = new ipStore
}//__globalSocketData

function ipStore () {
	var list = {}
	this.add = function(ip) {
		list[ ip ] = new Date().toJSON()
	}
	this.remove = function(ip) {
		delete list[ip]
	}
	this.toString = function() {
		var s = []
		var n = 0
		for( var i in list ) {
			s.push( (n++) +' '+ i +' '+ list[i] )
		}
		return s
	}
}//ipStore

function usableIP( ip ) {
	if(!ip) return 'error'
	return ip.replace(/\./g,'_')
}


exports.socketHandler = socketHandler
exports.locals  = local