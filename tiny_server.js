var http  = require('http')
  , path  = require('path')
  , mime = require('mime')
  , url   = require('url')
  , fs    = require("fs")


http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname.replace(/\//,'')

  pathname = pathname == "" ? "index.html" : "./" + pathname;

  console.log( pathname );

  fs.readFile( pathname, function(e, data){
    if( e ) return ERR_not_found(pathname, res);

    res.writeHead(200, {'Content-Type': mime.lookup(pathname) });
    res.end(data);

  });

}).listen(1337, '127.0.0.1');

function ERR_not_found(pathname, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not Found.\n');
}

console.log('Server running at http://127.0.0.1:1337/');