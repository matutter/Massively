
//  OpenShift sample Node application
//var express = require('express');
var   fs = require('fs')
    , jade = require('jade')
    , ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
    , port = process.env.OPENSHIFT_NODEJS_PORT || '8888'


var http = require('http');

http.createServer(function (req, res) {


	jade.renderFile('./views/index.jade', {locals:false},function(e,page){
		if(e) console.log( e )
		res.writeHead(200, {
	  		'Content-Length': page.length,
	  		'Content-Type': 'text/html' 
	  	});

		res.end( page )
	})

}).listen(port, ip);


console.log('running ' + ip + ":" + port);