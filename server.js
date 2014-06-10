#!/bin/env node
//  OpenShift sample Node application
//var express = require('express');
var   fs = require('fs')
    , ip = process.env.OPENSHIFT_NODEJS_IP
    , port = process.env.OPENSHIFT_NODEJS_PORT


var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, ip);
console.log('running ' + ip + ":" + port);