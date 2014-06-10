#!/bin/env node
//  OpenShift sample Node application
//var express = require('express');
var   fs = require('fs')
    , jade = require('jade')
    , ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
    , port = process.env.OPENSHIFT_NODEJS_PORT || '8888'


var http = require('http');

http.createServer(function (req, res) {


    jade.renderFile('views/index.jade', function(e,page){
        res.end( page )
    })

}).listen(port, ip);


console.log('running ' + ip + ":" + port);