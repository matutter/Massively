var http  = require('http')
  , path  = require('path')
  , mime  = require('mime')
  , url   = require('url')
  , fs    = require("fs")
  , ip    = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
  , port  = process.env.OPENSHIFT_NODEJS_PORT || '8000'
  , dbAddr= 'mongodb://' + openShiftDB()


http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname.replace(/\//,'')

  pathname = pathname == "" ? "index.html" : "./" + pathname;

  //console.log( pathname );

  fs.readFile( pathname, function(e, data){
    if( e ) return ERR_not_found(pathname, res);

    res.writeHead(200, {'Content-Type': mime.lookup(pathname) });
    res.end(data);

  });

}).listen(port, ip);

/*Handle error*/
function ERR_not_found(pathname, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not Found.\n');
}

/*Get environment from OPENSHIFT*/
function openShiftDB() {
  return process.env.OPENSHIFT_MONGODB_DB_PASSWORD ? process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME : '127.0.0.1:27017/massively' 
}

/*Hello world*/
console.log('Server running at http://'+ip+':'+port+'/');